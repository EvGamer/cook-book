import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableHighlight } from 'react-native';
import { some, forOwn, entries } from 'lodash';

import style from './Chain.style';
import ProdTable from './ProdTable';
import {
  Header,
  RecipeList,
  RecipeEntry,
  ItemList,
} from '../../components';

const ptRatio = PropTypes.shape({
  id: PropTypes.string,
  amount: PropTypes.number,
});

const MODES = {
  overview: 'overview',
  selectBaseItem: 'selectBaseItem',
  selectDesiredItem: 'selectDesiredItem',
};

const ITEM_KEYS = {
  baseItem: 'baseItem',
  desiredItem: 'desiredItem',
};

const hasItemIn = (type, item) => recipe => (
  recipe[type].find(result => result.id === item.id) != null
);

const toRatioListEnties = ([id, amount]) => ({ id, amount });

function gcd(x, y) {
  if (!x || !y) return 1;
  let a = x;
  let b = y;
  let r = 0;
  while (b !== 0) {
    r = a % b;
    a = b;
    b = r;
  }
  return a;
}

const lcm = (a, b) => (
  (a && b)
    ? (a * b) / gcd(a, b)
    : 1
);

function getTruthy(list, callback){
  let result = null;
  for (let i = 0; i < list.length; i += 1) {
    result = callback(list[i], i, list);
    if (result) {
      return result;
    }
  }
  return null;
}

class Chain extends PureComponent {
  static propTypes = {
    recipeList: PropTypes.arrayOf(PropTypes.shape({
      time: PropTypes.number,
      ingredients: ptRatio,
      results: ptRatio,
    })),
    itemList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      amount: PropTypes.number,
    })),
  };

  static defaultProps = {
    recipeList: [],
    itemList: [],
  };


  static renderSelector(title, onPress, item) {
    return (
      <TouchableHighlight onPress={onPress}>
        <View style={style.itemSelector}>
          <Text style={style.label}>{title}</Text>
          <Text style={style.selection}>
            {item ? item.name : 'Select item'}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  constructor(props, context) {
    super(props, context);
    this.toSelectBaseItem = this.setMode.bind(MODES.selectBaseItem);
    this.toSelectDesiredItem = this.setMode.bind(MODES.selectDesiredItem);
    this.selectBaseItem = this.selectItem.bind(ITEM_KEYS.baseItem);
    this.selectDesiredItem = this.selectItem.bind(ITEM_KEYS.desiredItem);
  }

  state = {
    mode: MODES.overview,
    recipeChain: null,
    required: null,
    baseItem: null,
    desiredItem: null,
    time: 0,
  };

  setMode(mode) { this.setState({ mode }); }

  selectItem = (field, id) => {
    const selectedItem = this.props.itemList.find(item => item.id === id);
    if (selectedItem) {
      const { desiredItem, baseItem } = this.state;
      const pair = { desiredItem, baseItem };
      pair[field] = selectedItem;
      if (pair.desiredItem && pair.baseItem) {
        this.createChain(pair);
      } else {
        this.setState({ [field]: selectedItem });
      }
    }
  };

  createChain({ desiredItem, baseItem }) {
    const chain = this.continueChain(desiredItem, baseItem);
    const stats = new ProdTable(chain);
    let maxTime = 0;
    forOwn(chain, (recipe) => {
      if (recipe.time > maxTime) {
        maxTime = recipe.time;
      }
      forOwn(recipe, (ratio) => {
        if (stats.supply[ratio.id]) {
          const flow = lcm(stats.supply[ratio.id], stats.demand[ratio.id]);
          recipe.balanceMultiplier *= flow / stats.demand[ratio.id]; // eslint-disable-line
          const supplyBalanceMultiplier = flow / stats.supply[ratio.id];
          const stack = [...(stats.supplyRecipeMap[ratio.id] || [])];
          while (stack.length > 0) {
            const subrecipe = stack.pop();
            subrecipe.balanceMultiplier *= supplyBalanceMultiplier;
            forOwn(subrecipe.ingredients, (ingredient) => {
              stack.concat(stats.supplyRecipeMap[ingredient.id] || []);
            });
          }
        }
      });
      stats.update();
    });
    this.setState({
      desiredItem,
      baseItem,
      recipeChain: stats.chain,
      required: {
        time: maxTime,
        ingredients: entries(stats.demand).map(toRatioListEnties),
        results: [],
      },
    });
  }

  continueChain(item, baseItem, recipeStack = []) {
    const validRecipes = this.props.recipeList.filter(hasItemIn('results', item));
    if (validRecipes.length < 1) {
      return null;
    }
    const endRecipe = validRecipes.find(hasItemIn('ingredients', baseItem));
    if (endRecipe) {
      return [...recipeStack, endRecipe];
    } else {
      return getTruthy(validRecipes, recipe =>
        getTruthy(recipe.ingredients, ingredient => (
          !some(recipeStack, { id: recipe.id })
            ? this.continueChain(ingredient, baseItem, [...recipeStack, recipe])
            : null
        )),
      );
    }
  }

  renderChain() {
    return (
      <View style={style.result}>
        <RecipeEntry
          noRecipeNames
          ingredients={this.state.required}
          time={this.state.time}
        />
        <RecipeList
          noRecipeNames
          list={this.state.recipeChain}
        />
      </View>
    );
  }

  render() {
    switch (this.state.mode) {
      case MODES.selectBaseItem:
        return (
          <ItemList
            list={this.props.itemList}
            select={this.selectBaseItem}
          />
        );
      case MODES.selectDesiredItem:
        return (
          <ItemList
            list={this.props.itemList}
            select={this.selectDesiredItem}
          />
        );
      default:
        return (
          <View style={style.screen}>
            <Header>
              Craft chain
            </Header>
            {this.renderSelector('Base Item', this.toSelectBaseItem, this.state.baseItem)}
            {this.renderSelector('Desired Item', this.toSelectDesiredItem, this.state.desiredItem)}
            {(this.state.required && this.state.recipeChain)
              ? this.renderChain()
              : <Text style={style.resultText}>No sequence found</Text>
            }
          </View>
        );
    }
  }
}


export default Chain;
