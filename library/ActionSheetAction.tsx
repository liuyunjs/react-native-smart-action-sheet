import { Divide } from 'rn-divide';
import { DarklyText } from 'rn-darkly';
import React from 'react';
import { StyleProp, TextStyle, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export const ActionSheetAction: React.FC<{
  text: string;
  style?: StyleProp<TextStyle>;
  dark_style?: StyleProp<TextStyle>;
  onPress: () => void;
  divideVisible?: boolean;
  divideSize?: number;
  offset?: number;
}> = ({
  text,
  offset,
  style,
  dark_style,
  divideVisible,
  divideSize,
  onPress,
}) => {
  return (
    <Divide
      style={styles.item}
      visible={divideVisible}
      size={divideSize}
      offset={offset}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={styles.btn}>
        <DarklyText
          dark_style={[styles.darkMessage, dark_style]}
          style={[styles.btnText, style]}>
          {text}
        </DarklyText>
      </TouchableOpacity>
    </Divide>
  );
};
