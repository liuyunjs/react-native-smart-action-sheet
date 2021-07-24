import React from 'react';
import { Easing, EasingNode } from 'react-native-reanimated';
import { Modal } from 'react-native-smart-modal';
import { ModalInternalProps } from 'react-native-smart-modal/dist/types';
import { isFunction } from '@liuyunjs/utils/lib/isFunction';
import { ActionSheet as ActionSheetView, Action } from './ActionSheet';

const namespace = 'ActionSheet' + Math.random().toString(32);

const E: any = EasingNode || Easing;

const animationConf = {
  easing: E.inOut(E.cubic),
};

export const custom = (props: ModalInternalProps) => {
  return Modal.add(namespace, {
    containerStyle: { zIndex: 500 },
    ...props,
    animationConf,
  });
};

export const hide = (key: string) => {
  Modal.remove(namespace, key);
};

export function show(
  title: string,
  actions: Action[],
  cancelText: string,
  onCancel: () => void,
): string;
export function show(
  title: string,
  actions: Action[],
  onCancel: () => void,
): string;
export function show(title: string, actions: Action[]): string;
export function show(
  title: string,
  actions: Action[],
  cancelTextOrOnCancel?: string | (() => void),
  onCancel?: () => void,
) {
  if (isFunction(cancelTextOrOnCancel)) {
    onCancel = cancelTextOrOnCancel;
    cancelTextOrOnCancel = undefined;
  }

  const key = custom({
    children: (
      <ActionSheetView
        onRequestClose={() => hide(key)}
        title={title}
        actions={actions}
        cancelText={cancelTextOrOnCancel}
        onCancel={onCancel}
      />
    ),
  });
  return key;
}

export const ActionSheet = {
  hide,
  show,
  custom,
};
