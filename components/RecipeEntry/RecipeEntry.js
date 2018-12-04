import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';

import style from './RecipeEntry.style';

class RecipeEntry extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    onPress: PropTypes.func,
    itemMap: PropTypes.objectOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })),
  };

  static defaultProps = {
    name: '',
    onPress() {},
    itemMap: {},
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


export default RecipeEntry;
