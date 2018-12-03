import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';

import style from './ItemEntry.style';

class ItemEntry extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    name: '',
    onPress() {},
  };

  handlePress = () => {
    this.props.onPress(this.props.id);
  };

  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <View style={style.frame}>
          <Text style={style.text}>{this.props.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}


export default ItemEntry;
