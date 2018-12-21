import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';

import { RecipeEntry, Header } from '../';
import style from './RecipeList.style';

const fromId = item => `${item.id}`;

const IngredientProp = PropTypes.shape({
  id: PropTypes.string,
  amount: PropTypes.number,
});

class RecipeList extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      time: PropTypes.number,
      ingredients: PropTypes.arrayOf(IngredientProp),
      results: PropTypes.arrayOf(IngredientProp),
    })),
    select: PropTypes.func,
    itemMap: PropTypes.objectOf(PropTypes.object),
    noRecipeNames: PropTypes.boolean,
  };

  static defaultProps = {
    title: null,
    list: [],
    select() {},
    itemMap: {},
    noRecipeNames: false,
  };

  handleRecipePress = id => {
    this.props.select(id);
  };

  renderItem = (entry) => {
    return (
      <RecipeEntry
        id={entry.item.id}
        name={entry.item.name}
        time={entry.item.time}
        ingredients={entry.item.ingredients}
        results={entry.item.results}
        refineries={entry.item.refineries}
        onPress={this.handleRecipePress}
        itemMap={this.props.itemMap}
        noRecipeNames={this.props.noRecipeNames}
      />
    );
  };

  render() {
    return (
      <View style={style.screen}>
        {this.props.title != null && (
          <Header>{this.props.title}</Header>
        )}
        <FlatList
          keyExtractor={fromId}
          data={this.props.list}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default RecipeList