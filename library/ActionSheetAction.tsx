import { Divide } from 'rn-divide';
import { DarklyText } from 'rn-darkly';
import * as React from 'react';
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
  forceDark?: boolean;
}> = ({
  text,
  offset,
  style,
  dark_style,
  divideVisible,
  divideSize,
  onPress,
  forceDark,
}) => {
  return (
    <Divide
      forceDark={forceDark}
      style={styles.item}
      visible={divideVisible}
      size={divideSize}
      offset={offset}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={styles.btn}>
        <DarklyText
          forceDark={forceDark}
          dark_style={[styles.darkMessage, dark_style]}
          style={[styles.btnText, style]}>
          {text}
        </DarklyText>
      </TouchableOpacity>
    </Divide>
  );
};
