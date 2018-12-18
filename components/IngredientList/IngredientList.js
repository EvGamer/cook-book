import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';

import style from './IngredientList.style';
import { ItemList } from '../';



class IngredientList extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    itemMap: PropTypes.objectOf(PropTypes.object),
    list: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      amount: PropTypes.number,
    })),
    addItem: PropTypes.func,
    select: PropTypes.func,
    back: PropTypes.func,
  };

  static defaultProps = {
    title: 'Ingredients',
    itemMap: {},
    list: [],
    addItem() {},
    select() {},
    back() {},
  };

  state = {
    displayList: [],
  };

  componentDidMount() {
    this.setState({
      displayList: this.props.list.map(item => ({
        id: item.id,
        name: `${
          this.props.itemMap[item.id] && this.props.itemMap[item.id].name
            ? this.props.itemMap[item.id].name
            : 'Unknown'
        } x ${item.amount}`,
      })),
    });
  }

  render() {
    return (
      <View style={style.screen}>
        <ItemList
          title={this.props.title}
          select={this.props.select}
          list={this.state.displayList}
        />
        <Button
          title="Add Item"
          onPress={this.props.addItem}
        />
        <Button
          title="Back"
          onPress={this.props.back}
        />
      </View>
    );
  }
}

export default IngredientList;
