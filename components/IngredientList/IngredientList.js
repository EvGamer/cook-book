import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';

import style from './IngredientList.style';
import { ItemList } from '../';

const getName = item => (
  item && item.name
    ? item.name
    : 'Unknown'
);

const getDisplayList = props => props.list.map(item => ({
  id: item.id,
  name: `${getName(props.itemMap[item.id])} x ${item.amount}`,
}));

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

  constructor(props, context) {
    super(props, context);
    this.state = {
      displayList: getDisplayList(props),
    };
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

  componentDidUpdate(prevProps) {
    if (prevProps.list !== this.props.list) {
      this.setState({
        displayList: getDisplayList(this.props),
      });
    }
  }
}

export default IngredientList;
