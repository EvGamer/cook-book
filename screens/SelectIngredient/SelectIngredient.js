import { connect } from 'react-redux';

import { ItemList } from '../../components';

const mapStateToProps = state => ({
  title: 'Select ingredient',
  itemList: state.items.list,
});

const mapDispatchToProps = dispatch => ({
  select: item => dispatch({ type: 'select_item', item }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
