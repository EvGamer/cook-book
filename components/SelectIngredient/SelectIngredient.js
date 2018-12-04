import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, Button, Slider } from 'react-native';

import style from './SelectIngredient.style';
import { ItemList } from '../';

const ItemProp = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
});

const mapStateToProps = state => ({
  recipeList: state.items.list,
  itemMap: state.items.map,
});

const defaultMaxAmount = 20;
const maxAmountLeeway = 10;

const getMaxAmount = amount => Math.max(
  defaultMaxAmount,
  amount + maxAmountLeeway,
);

class SelectIngredient extends Component {
  static propTypes = {
    title: PropTypes.string,
    itemList: PropTypes.arrayOf(ItemProp),
    itemMap: PropTypes.objectOf(ItemProp),
    itemRatio: PropTypes.shaoe({
      id: PropTypes.string,
      amount: PropTypes.number,
    }),
    submit: PropTypes.func,
    cancel: PropTypes.func,
  };

  static defaultProps = {
    title: 'Select Ingredient',
    itemList: [],
    itemMap: {},
    itemRatio: null,
    submit() {},
    cancel() {},
  };

  state = {
    selected: -1,
    amount: 0,
    maxAmount: defaultMaxAmount,
  };

  componentDidMount(){
    const { itemRatio } = this.props;
    if (itemRatio) {
      this.setState({
        selected: itemRatio.id,
        amount: itemRatio.amount,
        maxAmount: getMaxAmount(itemRatio.amount),
      });
    }
  }

  setMaxAmount = () => {
    this.setState(state => ({
      maxAmount: getMaxAmount(state.amount),
    }));
  };

  setAmount = (value) => {
    this.setState({ value });
  };

  submit = () => {
    const { selected, amount } = this.state;
    this.props.submit({
      id: selected,
      amount,
      maxAmount: getMaxAmount(amount),
    });
  };

  select = (selected) => {
    this.setState({ selected });
  };

  render() {
    return (
      <View style={style.screen}>
        <ItemList
          title={this.props.title}
          select={this.select}
          itemList={this.props.itemList}
        />
        <View style={style.item}>
          <Text style={style.itemName}>
            {this.props.itemMap[this.state.selected]
              ? this.props.itemMap[this.state.selected].name
              : 'Not selected'
            }
          </Text>
          <Text style={style.amountText}>
            Amount
          </Text>
          <Slider
            style={style.amount}
            value={this.state.amount}
            onValueChange={this.setAmount}
            onSlidingComplete={this.setMaxAmount}
            minimumValue={1}
            maximumValue={this.state.maxAmount}
            step={1}
          />
          <Button
            onPress={this.submit}
            title="Confirm"
          />
          <Button
            onPress={this.props.cancel}
          />
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(SelectIngredient);
