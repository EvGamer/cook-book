import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';

import style from './RecipeEntry.style';

const IngredientProp = PropTypes.shape({
  id: PropTypes.string,
  amount: PropTypes.number,
});

class RecipeEntry extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    time: PropTypes.number,
    refineries: PropTypes.number,
    ingredients: PropTypes.arrayOf(IngredientProp),
    results: PropTypes.arrayOf(IngredientProp),
    onPress: PropTypes.func,
    itemMap: PropTypes.objectOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })),
    noRecipeNames: PropTypes.bool,
  };

  static defaultProps = {
    name: '',
    onPress() {},
    itemMap: {},
    time: 0,
    refineries: 0,
    ingredients: [],
    results: [],
    noRecipeNames: false,
  };

  handlePress = () => {
    this.props.onPress(this.props.id);
  };

  renderIngredient = ({ id, amount }) => (
    <View style={style.ingredient} key={id}>
      <Text style={style.ingredientText}>
        {amount} x {this.props.itemMap[id]
          ? this.props.itemMap[id].name
          : 'Unknown'
        }
      </Text>
    </View>
  );

  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <View style={style.frame}>
          {this.props.noRecipeNames && (
            <Text style={style.text}>{this.props.name}</Text>
          )}
          <Text style={style.time}>Time: {this.props.time}</Text>
          {this.props.refineries && (
            <Text style={style.time}>Refineries: {this.props.refineries}</Text>
          )}
          <View style={style.io}>
            <View style={style.ioGroup}>
              {this.props.ingredients.map(this.renderIngredient)}
            </View>
            <View style={style.ioGroup}>
              {this.props.results.map(this.renderIngredient)}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}


export default RecipeEntry;
