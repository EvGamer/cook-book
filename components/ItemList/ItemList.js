import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, Text } from 'react-native';

import { ItemEntry } from '../index';
import style from './ItemList.style';

const fromId = item => `${item.id}`;

class ItemList extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    itemList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })),
    select: PropTypes.func,
  };

  static defaultProps = {
    title: 'Items',
    itemList: [],
    select() {},
  };

  state = { selected: 0 };

  handleItemPress = id => {
    this.props.select(id);
    this.setState({ selected: id });
  };

  renderItem = (entry) => {
    console.log(entry);
    return (
      <ItemEntry
        id={entry.item.id}
        name={entry.item.name}
        onPress={this.handleItemPress}
      />
    );
  };

  render() {
    return (
      <View style={style.screen}>
        <Text style={style.text}>{this.props.title} {this.state.selected}</Text>
        <FlatList
          keyExtractor={fromId}
          data={this.props.itemList}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default ItemList