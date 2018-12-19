import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';

import { EditRecipe, RecipeList } from '../../components';
import { addRecipe, setRecipe, removeRecipe, storageSave } from '../../redux/actions';
import style from './Recipes.style';

const MODES = {
  select: 'select',
  edit: 'toEditing',
  create: 'create',
};

const DEFAULT_MODE = MODES.select;

const mapStateToProps = state => ({
  itemMap: state.items.map,
  recipeMap: state.recipes.map,
  recipeList: state.recipes.list,
});

const mapDispatchToProps = dispatch => ({
  addRecipe(recipe) { dispatch(addRecipe(recipe)); },
  setRecipe(recipe) { dispatch(setRecipe(recipe)); },
  removeRecipe(id) { dispatch(removeRecipe(id)); },
  saveData() { dispatch(storageSave()); },
});

class Recipes extends PureComponent {
  static propTypes = {
    itemMap: PropTypes.objectOf(PropTypes.object),
    recipeMap: PropTypes.objectOf(PropTypes.object),
    recipeList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
    })),
    addRecipe: PropTypes.func,
    setRecipe: PropTypes.func,
    removeRecipe: PropTypes.func,
    saveData: PropTypes.func,
  };

  static defaultProps = {
    itemMap: {},
    recipeList: [],
    recipeMap: {},
    addRecipe() {},
    setRecipe() {},
    saveData() {},
    removeRecipe() {},
  };

  state = {
    mode: DEFAULT_MODE,
    selected: -1,
  };

  setRecipe = (recipe) => {
    this.props.setRecipe(recipe);
    this.backToSelection();
  };

  componentWillUnmount() {
    this.props.saveData();
  }

  addRecipe = (recipe) => {
    this.props.addRecipe(recipe);
    this.backToSelection();
  };

  removeRecipe = (id) => {
    this.props.removeRecipe(id);
    this.backToSelection();
  };

  toCreation = () => {
    this.setState({
      mode: MODES.create,
    });
  };

  toEditing = (selected) => {
    this.setState({
      mode: MODES.edit,
      selected,
    });
  };

  backToSelection = () => {
    this.setState({
      mode: DEFAULT_MODE,
    });
  };

  renderEditRecipe(submit, recipe) {
    return (
      <EditRecipe
        recipe={recipe}
        submit={submit}
        cancel={this.backToSelection}
        itemMap={this.props.itemMap}
        remove={this.removeRecipe}
      />
    );
  }

  render() {
    switch (this.state.mode) {
      case MODES.edit:
        return this.renderEditRecipe(
          this.setRecipe,
          this.props.recipeMap[this.state.selected],
        );

      case MODES.create:
        return this.renderEditRecipe(
          this.addRecipe,
        );

      default:
        return (
          <View style={style.screen}>
            <RecipeList
              title="Recipes"
              list={this.props.recipeList}
              itemMap={this.props.itemMap}
              select={this.toEditing}
            />
            <Button
              title="Add Recipe"
              onPress={this.toCreation}
            />
          </View>
        );
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
