import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Button } from 'react-native';
import { v4 as getID } from 'uuid';

import { Header } from '../';

class EditItem extends Component {
  static propTypes = {
    title: PropTypes.string,
    submit: PropTypes.func,
    item: PropTypes.func,
  };

  static defaultProps = {
    title: 'Edit Item',
    submit() {},
    item: null,
  };

  constructor(props, context){
    super(props, context);
    this.handleNameChange = this.handleFieldChange.bind(this, 'name');
  }

  state = {
    name: '',
    id: getID(),
  };

  componentDidMount() {
    if (this.props.item) {
      const { id, name } = this.props.item;
      this.setState({ id, name });
    } else {
      this.setState({ id: getID() });
    }
  }

  handleFieldChange(field, text) {
    this.setState({ [field]: text });
  }

  submit = () => {
    const { id, name } = this.state;
    this.props.submit({ id, name });
  };

  render() {
    return (
      <View>
        <Header>{this.props.title}</Header>
        <View>
          <TextInput
            onChangeText={this.handleNameChange}
            value={this.state.name}
          />
        </View>
        <Button
          onPress={this.submit}
          title="Submit"
        />
      </View>
    );
  }
}

export default EditItem;
