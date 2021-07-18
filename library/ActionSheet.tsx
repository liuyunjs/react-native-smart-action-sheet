import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Divide } from 'rn-divide';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import { DarklyTouchableHighlight, DarklyText, DarklyView } from 'rn-darkly';

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
  onRequestClose,
}: ActionSheetProps) => {
  const onCancelPress = () => {
    onRequestClose?.();
    onCancel?.();
  };

  return (
    <DarklyView darkStyle={styles.darkContainer} style={styles.container}>
      {!!title && (
        <>
          <DarklyText darkStyle={styles.darkTitle} style={styles.title}>
            {title}
          </DarklyText>
          <Divide horizontal />
        </>
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
            <React.Fragment key={action.text}>
              {!!index && <Divide horizontal offset={15} />}
              <DarklyTouchableHighlight
                underlayColor="rgba(0, 0, 0, .15)"
                onPress={() => {
                  onRequestClose?.();
                  action.onPress?.();
                }}
                style={styles.btn}>
                <DarklyText
                  darkStyle={[styles.darkMessage, action.darkStyle]}
                  style={[styles.btnText, action.style]}>
                  {action.text}
                </DarklyText>
              </DarklyTouchableHighlight>
            </React.Fragment>
          );
        })}
      </ScrollView>
      <Divide size={8} />
      <DarklyTouchableHighlight
        underlayColor="rgba(0, 0, 0, .15)"
        onPress={onCancelPress}
        style={styles.btn}>
        <DarklyText darkStyle={styles.darkCancelText} style={styles.cancelText}>
          {cancelText}
        </DarklyText>
      </DarklyTouchableHighlight>
    </DarklyView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#fff',
    paddingBottom: getBottomSpace(),
  },
  darkContainer: {
    backgroundColor: '#333',
  },

  title: {
    fontSize: 22,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  darkTitle: {
    color: '#eee',
  },

  btn: {
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 16,
    color: '#555',
  },
  darkMessage: {
    color: '#ccc',
  },

  cancelText: {
    fontSize: 18,
    color: '#e31111',
  },

  darkCancelText: {
    color: '#d20909',
  },
});
