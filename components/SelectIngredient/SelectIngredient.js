import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';

import style from './SelectIngredient.style';
import { ItemList, NumberSlider } from '../';

const ItemProp = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
});

const mapStateToProps = state => ({
  itemList: state.items.list,
  itemMap: state.items.map,
});

class SelectIngredient extends Component {
  static propTypes = {
    title: PropTypes.string,
    itemList: PropTypes.arrayOf(ItemProp),
    itemMap: PropTypes.objectOf(ItemProp),
    itemRatio: PropTypes.shape({
      id: PropTypes.string,
      amount: PropTypes.number,
    }),
    submit: PropTypes.func,
    cancel: PropTypes.func,
    remove: PropTypes.func,
  };

  static defaultProps = {
    title: 'Select Ingredient',
    itemList: [],
    itemMap: {},
    itemRatio: null,
    submit() {},
    cancel() {},
    remove: null,
  };

  state = {
    selected: -1,
    amount: 0,
  };

  componentDidMount(){
    const { itemRatio } = this.props;
    if (itemRatio) {
      this.setState({
        selected: itemRatio.id,
        amount: itemRatio.amount,
      });
    }
  }

  setAmount = (value) => {
    this.setState({ amount: value });
  };

  submit = () => {
    const { selected, amount } = this.state;
    this.props.submit({
      id: selected,
      amount,
    });
  };

  select = (selected) => {
    this.setState({ selected });
  };

  renderItemPanel() {
    if (this.state.selected < 0) {
      return null;
    }
    return (
      <View style={style.item}>
        <Text style={style.itemName}>
          {this.props.itemMap[this.state.selected]
            ? this.props.itemMap[this.state.selected].name
            : 'Not selected'
          }
        </Text>
        <Text style={style.amountHeader}>
          Amount
        </Text>
        <NumberSlider
          value={this.state.amount}
          onValueChange={this.setAmount}
          minimumValue={1}
          step={1}
        />
        {(this.props.itemRatio != null) && (this.props.remove != null) && (
          <Button
            onPress={this.props.remove}
            title="Remove"
            disabled={!this.props.itemMap[this.state.selected]}
          />
        )}
        <Button
          onPress={this.submit}
          title="Confirm"
          disabled={!this.props.itemMap[this.state.selected]}
        />

      </View>
    );
  }

  render() {
    return (
      <View style={style.screen}>
        <ItemList
          title={this.props.title}
          select={this.select}
          list={this.props.itemList}
        />
        {this.renderItemPanel()}

        <Button
          color="red"
          onPress={this.props.cancel}
          title="Cancel"
        />
      </View>
    );
  }
}

export default connect(mapStateToProps)(SelectIngredient);
