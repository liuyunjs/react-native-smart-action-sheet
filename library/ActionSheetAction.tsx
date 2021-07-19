import { Divide } from 'rn-divide';
import { DarklyText, DarklyTouchableHighlight } from 'rn-darkly';
import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { styles } from './styles';

export const ActionSheetAction: React.FC<{
  text: string;
  style?: StyleProp<TextStyle>;
  darkStyle?: StyleProp<TextStyle>;
  onPress: () => void;
  divideVisible?: boolean;
  divideSize?: number;
  offset?: number;
}> = ({
  text,
  offset,
  style,
  darkStyle,
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
      <DarklyTouchableHighlight
        underlayColor="rgba(0, 0, 0, .15)"
        onPress={onPress}
        style={styles.btn}>
        <DarklyText
          darkStyle={[styles.darkMessage, darkStyle]}
          style={[styles.btnText, style]}>
          {text}
        </DarklyText>
      </DarklyTouchableHighlight>
    </Divide>
  );
};
