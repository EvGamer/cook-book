import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Slider, Text, View } from 'react-native';

import style from './NumberSlider.style';

const defaultMaxAmount = 20;
const maxAmountLeeway = 10;

const getMaxAmount = (amount, step) => Math.max(
  defaultMaxAmount * step,
  amount + (maxAmountLeeway * step),
);

class NumberSlider extends Component {
  static propTypes = {
    value: PropTypes.number,
    minimumValue: PropTypes.number,
    step: PropTypes.number,
    fractionalDigits: PropTypes.number,
    onValueChange: PropTypes.func,
  };

  static defaultProps = {
    value: 0,
    minimumValue: 0,
    step: 1,
    fractionalDigits: 0,
    onValueChange() {},
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      maxAmount: getMaxAmount(props.value, props.step),
    };
  }

  setMaxAmount = () => {
    this.setState({
      maxAmount: getMaxAmount(this.props.value, this.props.step),
    });
  };

  render() {
    return (
      <View style={style.container}>
        <Text style={style.number}>
          {this.props.value.toFixed((`${this.props.step}`.split('.')[1] || []).length)}
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
