import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';
import { v4 as getID } from 'uuid';

import { Header, SelectIngredient } from '../';
import style from './EditRecipe.style';

class EditRecipe extends PureComponent {
  state = {
    mode: 'toEditing',
    id: getID(),
    name: '',
    time: 0,
    ingredients: [],
    results: [],
  };

  componentDidMount() {
    const { recipe } = this.props;
    if (recipe) {
      this.setState({ ...recipe });
    } else {
      this.setState({ id: getID() });
    }
  }

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
  };

  static defaultProps = {
    itemMap: {},
    title: 'Edit Recipe',
    recipe: null,
  };

  cancel = () => {
    this.setState({ mode: 'toEditing' });
  };

  selectIngredient = () => {
    this.setState({ mode: 'selectIngredient' });
  };

  selectResult = () => {
    this.setState({ mode: 'selectOutput' });
  };

  addIngredient = (ingredient) => {
    this.setState((state) => ({
      ingredients: [ ...state.ingedients, ingredient ],
    }));
  };

  addResult = (result) => {
    this.setState((state) => ({
      results: [ ...state.ingedients, result ],
    }));
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

  renderItemList(title, list, addItem){
    return (
      <View style={style.group}>
        <Text style={style.groupHeader}>{title}</Text>
        <View style={style.groupContent}>
          {list.map(this.renderItem)}
        </View>
        <Button
          title="Add Item"
          onPress={addItem}
        />
      </View>
    );
  }

  render() {
    switch (this.state.mode) {
      case 'selectIngredient':
        return (
          <SelectIngredient
            title="Add Ingredient"
            cancel={this.cancel}
            submit={this.addIngredient}
          />
        );
      case 'selectResult':
        return (
          <SelectIngredient
            title="Add Result"
            cancel={this.cancel}
            submit={this.addResult}
          />
        );
      default:
        return (
          <View style={style.screen}>
            <Header>{this.props.title}</Header>
            {this.renderItemList(
              'Ingredients',
              this.state.ingredients,
              this.selectIngredient,
            )}
            {this.renderItemList(
              'Results',
              this.state.ingredients,
              this.selectIngredient,
            )}
          </View>
        );
    }
  }
}

export default EditRecipe;
