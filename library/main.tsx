import { ModalInternalProps } from 'react-native-smart-modal';
import { isFunction } from '@liuyunjs/utils/lib/isFunction';
import {
  ActionSheet as ActionSheetInternal,
  ActionSheetProps,
  Action,
} from './ActionSheet';

export { ActionSheetAction } from './ActionSheetAction';

const namespace = 'ActionSheet' + Math.random().toString(32);

const {
  show: showInternal,
  update: updateInternal,
  hide: hideInternal,
} = ActionSheetInternal;

export const custom = (props: ModalInternalProps & ActionSheetProps) => {
  return showInternal(namespace, {
    containerStyle: { zIndex: 500 },
    ...props,
  });
};

export const update = (
  key: string,
  props: ModalInternalProps & ActionSheetProps,
) => updateInternal(key, props);

export const hide = (key: string) => hideInternal(namespace, key);

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

  return custom({
    title,
    actions,
    cancelText: cancelTextOrOnCancel,
    onCancel,
  });
}

export const ActionSheet = Object.assign(ActionSheetInternal, {
  show,
  custom,
  update,
  hide,
});
