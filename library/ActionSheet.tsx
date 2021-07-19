import React from 'react';
import { ScrollView, Dimensions, StyleProp, ViewStyle } from 'react-native';
import { Divide } from 'rn-divide';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import { DarklyText, DarklyView } from 'rn-darkly';
import { styles } from './styles';
import { ActionSheetAction } from './ActionSheetAction';

export type Action = {
  text: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  darkStyle?: StyleProp<ViewStyle>;
};

export type ActionSheetProps = {
  title?: string;
  actions: Action[];
  onCancel?: () => void;
  cancelText?: string;
  onRequestClose?: () => void;
};

const { height } = Dimensions.get('window');

export const ActionSheet = ({
  title,
  actions,
  onCancel,
  cancelText = '取消',
  onRequestClose = () => {},
}: ActionSheetProps) => {
  const onCancelPress = () => {
    onRequestClose();
    onCancel?.();
  };

  return (
    <DarklyView darkStyle={styles.darkContainer} style={styles.container}>
      {!!title && (
        <Divide>
          <DarklyText darkStyle={styles.darkTitle} style={styles.title}>
            {title}
          </DarklyText>
        </Divide>
      )}
      <ScrollView
        alwaysBounceVertical={false}
        alwaysBounceHorizontal={false}
        style={{
          maxHeight:
            height -
            (title ? 65 : 0) -
            54 -
            getBottomSpace() -
            getStatusBarHeight(true),
        }}>
        {actions.map((action, index) => {
          return (
            <ActionSheetAction
              {...action}
              offset={15}
              key={action.text}
              divideVisible={!!index}
              onPress={() => {
                onRequestClose();
                action.onPress?.();
              }}
            />
          );
        })}
      </ScrollView>
      <ActionSheetAction
        style={styles.cancelText}
        darkStyle={styles.darkCancelText}
        text={cancelText}
        onPress={onCancelPress}
        divideSize={8}
      />
    </DarklyView>
  );
};
