import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, TextInput } from 'react-native';
import { v4 as getID } from 'uuid';

import { Header, SelectIngredient } from '../';
import style from './EditRecipe.style';

const MODES = {
  toEditing: 'toEditing',
  selectIngredient: 'selectIngredient',
  selectResult: 'selectResult',
};

class EditRecipe extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.addIngredient = this.addItem.bind(this, 'ingredients');
    this.addResult = this.addItem.bind(this, 'results');
  }

  state = {
    mode: MODES.toEditing,
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

  cancel = () => {
    this.setState({ mode: MODES.toEditing });
  };

  selectIngredient = () => {
    this.setState({ mode: MODES.selectIngredient });
  };

  selectResult = () => {
    this.setState({ mode: MODES.selectResult });
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

  submit = () => {
    const { id, name, time, ingredients, results } = this.state;
    this.props.submit({ id, name, time, ingredients, results });
  };

  changeName = (name) => {
    this.setState({ name });
  };

  addItem(group, item) {
    this.setState(state => ({
      ...state,
      mode: MODES.toEditing,
      [group]: [...state[group], item],
    }));
  }

  renderItemList(title, list, addItem) {
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
      case MODES.selectIngredient:
        return (
          <SelectIngredient
            title="Add Ingredient"
            cancel={this.cancel}
            submit={this.addIngredient}
          />
        );
      case MODES.selectResult:
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
            <TextInput
              value={this.state.name}
              onChangeText={this.changeName}
            />
            {this.renderItemList(
              'Ingredients',
              this.state.ingredients,
              this.selectIngredient,
            )}
            {this.renderItemList(
              'Results',
              this.state.results,
              this.selectResult,
            )}
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
