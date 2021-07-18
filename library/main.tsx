import React from 'react';
import { Modal, ModalBaseWithOverlayProps } from 'react-native-smart-modal';
import { isFunction } from '@liuyunjs/utils/lib/isFunction';
import { ActionSheet as ActionSheetView, Action } from './ActionSheet';

const namespace = 'ActionSheet';

export const custom = (props: ModalBaseWithOverlayProps) => {
  return Modal.add(namespace, {
    z: 500,
    ...props,
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
