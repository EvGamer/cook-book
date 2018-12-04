import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';

import { ItemList, EditItem } from '../../components';
import { setItem, addItem } from '../../redux/items/actions';
import style from './Items.style';

const mapStateToProps = state => ({
  title: 'Select ingredient',
  itemList: state.items.list,
});

const mapDispatchToProps = dispatch => ({
  setItem(item) { dispatch(setItem(item)); },
  addItem(item) { dispatch(addItem(item)); },
});

class Items extends PureComponent {
  static propTypes = {
    itemList: PropTypes.arrayOf(PropTypes.object),
    setItem: PropTypes.func,
    addItem: PropTypes.func,
  };

  static defaultProps = {
    itemList: [],
    setItem() {},
    addItem() {},
  };

  state = {
    selected: null,
    isCreatingItem: false,
  };

  setItem = (item) => {
    this.props.setItem(item);
    this.setState({ selected: null });
  };

  addItem = (item) => {
    this.props.addItem(item);
    this.setState({ isCreatingItem: false });
  };

  openCreateItemScreen = () => {
    this.setState({ isCreatingItem: true });
  };

  cancelEditing = () => {
    this.setState({
      isCreatingItem: false,
      selected: null,
    });
  };

  selectToEdit = (selected) => {
    this.setState({ selected });
  };

  selectedItemSearch = (item) => {
    return item.id === this.state.selected;
  };

  render() {
    if (this.state.isCreatingItem) {
      return (
        <EditItem
          title="Add Item"
          submit={this.addItem}
          cancel={this.cancelEditing}
        />
      );
    }
    if (this.state.selected) {
      return (
        <EditItem
          item={this.props.itemList.find(this.selectedItemSearch) }
          title="Edit Item"
          submit={this.setItem}
          cancel={this.cancelEditing}
        />
      );
    }
    return (
      <ItemList
        title="Items"
        itemList={this.props.itemList}
        select={this.selectToEdit}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Items);