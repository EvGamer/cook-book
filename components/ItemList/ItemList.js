import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';

import { ItemEntry, Header } from '../';
import style from './ItemList.style';

const fromId = item => `${item.id}`;

class ItemList extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    itemList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })),
    select: PropTypes.func,
  };

  static defaultProps = {
    title: 'Items',
    itemList: [],
    select() {},
  };

  handleItemPress = id => {
    this.props.select(id);
  };

  renderItem = (entry) => {
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
        <Header>{this.props.title}</Header>
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