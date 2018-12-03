import React from 'react';
import PropTypes from 'prop-types';
import { View, ListView, Text } from 'react-native';
import { connect } from 'react-redux';

import style from './style';

const mapStateToProps = state => ({
  itemList: state.items.list,
});

const renderItem = item => <Text>{item.name}</Text>

function ItemList({ navigation, itemList }) {
  return (
    <View style={style.screen}>
      <ListView
        dataSource={itemList}
        renderRow={renderItem}
      />
    </View>
  );
}


ItemList.propTypes = {
  navigation: PropTypes.object.isRequired,
  itemList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })),
};

ItemList.defaultProps = {
  itemList: [],
};

export default connect(mapStateToProps)(ItemList)