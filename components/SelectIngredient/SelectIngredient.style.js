import { StyleSheet } from 'react-native';
import color from '../../color';

export default StyleSheet.create({
  screen: {
    backgroundColor: color.background,
    flex: 1,
  },
  item: {
  },
  amount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountSlider: {
    flex: 1,
  },
  amountText: {
    fontSize: 24,
    marginLeft: 10,
  },
});
