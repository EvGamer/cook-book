import { StyleSheet } from 'react-native';
import color from '../../color';


export default StyleSheet.create({
  frame: {
    margin: 5,
    backgroundColor: color.message.blue,
  },
  text: {
    margin: 5,
    color: color.text,
    fontSize: 25,
    padding: 5,
  },
  io: {
    flexDirection: 'row',
  },
  ioGroup: {
    flex: 1,
  },
});