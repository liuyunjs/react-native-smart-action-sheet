import * as React from 'react';
import { ScrollView, Dimensions, StyleProp, ViewStyle } from 'react-native';
import { Divide } from 'rn-divide';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import { DarklyText, DarklyView } from 'rn-darkly';
import {
  ModalInternal,
  ModalInternalProps,
  withModal,
} from 'react-native-smart-modal';
import { styles } from './styles';
import { ActionSheetAction } from './ActionSheetAction';

export type Action = {
  text: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  dark_style?: StyleProp<ViewStyle>;
};

type ActionSheetInternalProps = {
  title?: string;
  actions: Action[];
  onCancel?: () => void;
  cancelText?: string;
  onRequestClose?: () => void;
  forceDark?: boolean;
};

export type ActionSheetProps = ActionSheetInternalProps &
  Omit<
    ModalInternalProps,
    'animationIn' | 'animationOut' | 'animation' | 'animationConf'
  >;

const { height } = Dimensions.get('window');

const ActionSheetInternal = ({
  title,
  actions,
  onCancel,
  cancelText = '取消',
  onRequestClose = () => {},
  forceDark,
}: ActionSheetProps) => {
  const onCancelPress = () => {
    onRequestClose();
    onCancel?.();
  };

  return (
    <DarklyView
      forceDark={forceDark}
      dark_style={styles.darkContainer}
      style={styles.container}>
      {!!title && (
        <Divide forceDark={forceDark}>
          <DarklyText
            forceDark={forceDark}
            dark_style={styles.darkTitle}
            style={styles.title}>
            {title}
          </DarklyText>
        </Divide>
      )}
      <ScrollView
        alwaysBounceVertical={false}
        alwaysBounceHorizontal={false}
        style={{
          width: '100%',
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
              forceDark={forceDark}
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
        forceDark={forceDark}
        style={styles.cancelText}
        dark_style={styles.darkCancelText}
        text={cancelText}
        onPress={onCancelPress}
        divideSize={8}
      />
    </DarklyView>
  );
};

const ActionSheet: React.FC<ActionSheetProps> = ({
  title,
  actions,
  onCancel,
  cancelText,
  ...rest
}) => {
  return (
    <ModalInternal
      {...rest}
      containerStyle={[{ zIndex: 500 }, rest.containerStyle]}>
      <ActionSheetInternal
        forceDark={rest.forceDark}
        title={title}
        actions={actions}
        cancelText={cancelText}
        onCancel={onCancel}
        onRequestClose={rest.onRequestClose}
      />
    </ModalInternal>
  );
};

const ModalActionSheet = withModal(ActionSheet);

export { ModalActionSheet as ActionSheet };
