import { connect } from 'react-redux';

import { EditItem } from '../../components/index';
import { addItem } from '../../redux/actions';

const mapStateToProps = state => ({
  title: 'Add Item',
});

const mapDispatchToProps = (dispatch, props) => ({
  submit(item) {
    dispatch(addItem(item));
    props.navigation.navigate('SelectIngredient');
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditItem);
