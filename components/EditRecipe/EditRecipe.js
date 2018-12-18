import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import { v4 as getID } from 'uuid';
import { unionBy } from 'lodash';

import {
  Header,
  SelectIngredient,
  IngredientList,
  NumberSlider,
} from '../';
import style from './EditRecipe.style';

const MODES = {
  toEditing: 'toEditing',
  selectIngredient: 'selectIngredient',
  selectResult: 'selectResult',
  listIngredients: 'listIngredients',
  listResults: 'listResults',
  editIngredient: 'editIngredient',
  editResult: 'editResult',
};

const GROUPES = {
  ingredients: 'ingredients',
  results: 'results',
};

function byId(obj, item) {
  obj[item.id] = item; //eslint-disable-line
  return obj;
}
const createIdMap = list => list.reduce(byId, {});

class EditRecipe extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    itemMap: PropTypes.objectOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })),
    recipe: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      time: PropTypes.number,
      ingredients: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        amount: PropTypes.number,
      })),
      results: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        amount: PropTypes.number,
      })),
    }),
    submit: PropTypes.func,
    cancel: PropTypes.func,
  };

  static defaultProps = {
    itemMap: {},
    title: 'Edit Recipe',
    recipe: null,
    submit() {},
    cancel() {},
  };

  constructor(props, context) {
    super(props, context);
    this.addIngredient = this.addItem.bind(
      this, GROUPES.ingredients, MODES.listIngredients,
    );
    this.addResult = this.addItem.bind(
      this, GROUPES.results, MODES.listResults,
    );
    this.replaceIngredient = this.replaceItem.bind(
      this, GROUPES.ingredients, MODES.listIngredients,
    );
    this.replaceResult = this.replaceItem.bind(
      this, GROUPES.results, MODES.listResults,
    );
    this.removeIngredient = this.removeItem.bind(
      this, GROUPES.ingredients, MODES.listIngredients,
    );
    this.removeResult = this.removeItem.bind(
      this, GROUPES.results, MODES.listResults,
    );
    this.cancel = this.setMode.bind(this, MODES.toEditing);
    this.selectIngredient = this.setMode.bind(this, MODES.selectIngredient);
    this.selectResult = this.setMode.bind(this, MODES.selectResult);
    this.listIngredients = this.setMode.bind(this, MODES.listIngredients);
    this.listResults = this.setMode.bind(this, MODES.listResults);
    this.editIngredient = this.editRatio.bind(this, MODES.editIngredient);
    this.editResult = this.editRatio.bind(this, MODES.editResult);
    this.backToIngredientList = this.setModeAndUnselect.bind(
      this, MODES.listIngredients,
    );
    this.backToResultList = this.setModeAndUnselect.bind(
      this, MODES.listResults,
    );
  }

  state = {
    mode: MODES.toEditing,
    id: getID(),
    name: '',
    time: 0,
    ingredients: [],
    results: [],
    selectedIngredient: -1,
    resultsMap: {},
    ingredientsMap: {},
  };

  componentDidMount() {
    const { recipe } = this.props;
    if (recipe) {
      this.setState({
        ...recipe,
        resultsMap: createIdMap(recipe.results),
        ingredientsMap: createIdMap(recipe.ingredients),
      });
    } else {
      this.setState({ id: getID() });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let newState;
    if (prevState.ingredients !== this.state.ingredients) {
      newState = {
        ingredientsMap: createIdMap(this.state.ingredients),
      };
    }
    if (prevState.results !== this.state.results) {
      newState = {
        ...newState, resultsMap: createIdMap(this.state.results),
      };
    }
    if (newState) {
      this.setState(newState);
    }
  }

  setMode(mode) { this.setState({ mode }); }

  setModeAndUnselect(mode) {
    this.setState({ mode, selectedIngredient: -1 });
  }

  addItem(group, mode,  item) {
    this.setState(state => ({
      ...state,
      mode,
      [group]: unionBy([item], state[group], 'id'),
    }));
  }

  removeItem(group, mode) {
    this.setState(state => ({
      ...state,
      mode,
      [group]: state[group].filter(this.isUnselectedItem),
    }));
  }

  editRatio(mode, selectedIngredient) {
    this.setState({ mode, selectedIngredient });
  }

  replaceItem(group, mode, item) {
    this.setState(state => ({
      ...state,
      mode,
      [group]: state[group].map(replaceCandidate => (
        replaceCandidate.id === state.selectedIngredient
          ? item
          : replaceCandidate
      )),
    }));
  }

  isUnselectedItem = item => item.id !== this.state.selectedIngredient;

  changeName = (name) => { this.setState({ name }); };

  setTime = (time) => { this.setState({ time }); };

  submit = () => {
    const {
      id, name, time, ingredients, results,
    } = this.state;
    this.props.submit({ id, name, time, ingredients, results });
  };

  renderItem = ({ id, amount }) => (
    <View style={style.item} key={id}>
      <Text style={style.itemName}>
        {amount} x {this.props.itemMap[id]
        ? this.props.itemMap[id].name
        : 'Unknown Item'
      }
      </Text>
    </View>
  );

  renderItemList(title, list, onPress) {
    return (
      <TouchableHighlight
        onPress={onPress}
      >
        <View style={style.group}>
          <Text style={style.groupHeader}>{title}</Text>
          <View style={style.groupContent}>
            {list.map(this.renderItem)}
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    switch (this.state.mode) {
      case MODES.listIngredients:
        return (
          <IngredientList
            title="Ingredients"
            itemMap={this.props.itemMap}
            select={this.editIngredient}
            list={this.state.ingredients}
            addItem={this.selectIngredient}
            back={this.cancel}
          />
        );
      case MODES.listResults:
        return (
          <IngredientList
            title="Results"
            itemMap={this.props.itemMap}
            select={this.editResult}
            list={this.state.results}
            addItem={this.selectResult}
            back={this.cancel}
          />
        );
      case MODES.editIngredient:
        return (
          <SelectIngredient
            title="Change Ingredient"
            itemRatio={this.state.ingredientsMap[this.state.selectedIngredient]}
            cancel={this.backToIngredientList}
            remove={this.removeIngredient}
            submit={this.replaceIngredient}
          />
        );
      case MODES.editResult:
        return (
          <SelectIngredient
            title="Change Result"
            itemRatio={this.state.resultsMap[this.state.selectedIngredient]}
            cancel={this.backToResultList}
            remove={this.removeResult}
            submit={this.replaceResult}
          />
        );
      case MODES.selectIngredient:
        return (
          <SelectIngredient
            title="Add Ingredient"
            cancel={this.listIngredients}
            submit={this.addIngredient}
          />
        );
      case MODES.selectResult:
        return (
          <SelectIngredient
            title="Add Result"
            cancel={this.listResults}
            submit={this.addResult}
          />
        );
      default:
        return (
          <View style={style.screen}>
            <Header>{this.props.title}</Header>
            <TextInput
              value={this.state.name}
              onChangeText={this.changeName}
            />
            {this.renderItemList(
              'Ingredients',
              this.state.ingredients,
              this.listIngredients,
            )}
            {this.renderItemList(
              'Results',
              this.state.results,
              this.listResults,
            )}
            <Text style={style.label}>
              Time
            </Text>
            <NumberSlider
              value={this.state.time}
              onValueChange={this.setTime}
              step={0.05}
            />
            <Button
              title="Confirm"
              color="green"
              onPress={this.submit}
            />
            <Button
              title="Cancel"
              color="red"
              onPress={this.props.cancel}
            />
          </View>
        );
    }
  }
}

export default EditRecipe;
