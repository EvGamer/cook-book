import React from 'react';
import { View, Text } from 'react-native';

import style from './Header.style';

function Header({ children }) {
  return (
    <View style={style.frame}>
      <Text style={style.text}>{children}</Text>
    </View>
  );
}

export default Header;
