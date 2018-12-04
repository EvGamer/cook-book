import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Button, Text } from 'react-native';
import { v4 as getID } from 'uuid';

import { Header } from '../';

class EditItem extends Component {
  static propTypes = {
    title: PropTypes.string,
    item: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
    submit: PropTypes.func,
    cancel: PropTypes.func,
  };

  static defaultProps = {
    title: 'Edit Item',
    item: null,
    submit() {},
    cancel() {},
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

  cancel = () => {
    this.props.cancel();
  };

  render() {
    return (
      <View>
        <Header>{this.props.title}</Header>
        <View>
          <Text>Name</Text>
          <TextInput
            onChangeText={this.handleNameChange}
            value={this.state.name}
          />
        </View>
        <Button
          onPress={this.submit}
          title="Submit"
        />
        <Button
          onPress={this.cancel}
          title="Cancel"
          color="red"
        />
      </View>
    );
  }
}

export default EditItem;
