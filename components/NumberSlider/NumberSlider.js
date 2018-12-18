import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Slider, Text, View } from 'react-native';

import style from './NumberSlider.style';

const defaultMaxAmount = 20;
const maxAmountLeeway = 10;

const getMaxAmount = amount => Math.max(
  defaultMaxAmount,
  amount + maxAmountLeeway,
);

class NumberSlider extends Component {
  static propTypes = {
    value: PropTypes.number,
    minimumValue: PropTypes.number,
    step: PropTypes.number,
    onValueChange: PropTypes.func,
  };

  static defaultProps = {
    value: 0,
    minimumValue: 0,
    step: 1,
    onValueChange() {},
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      maxAmount: getMaxAmount(props.value),
    };
  }

  setMaxAmount = () => {
    this.setState({
      maxAmount: getMaxAmount(this.props.value),
    });
  };

  render() {
    return (
      <View style={style.container}>
        <Text style={style.number}>
          {this.props.value}
        </Text>
        <Slider
          style={style.slider}
          value={this.props.value}
          onValueChange={this.props.onValueChange}
          onSlidingComplete={this.setMaxAmount}
          minimumValue={this.props.minimumValue}
          maximumValue={this.state.maxAmount}
          step={this.props.step}
        />
      </View>
    );
  }
}

export default NumberSlider;
