import { isFunction } from '@liuyunjs/utils/lib/isFunction';
import { isAnyObject } from '@liuyunjs/utils/lib/isAnyObject';
import { ActionSheet, ActionSheetProps, Action } from './ActionSheet';

export { ActionSheetAction } from './ActionSheetAction';

const { show: showInternal, update, hide } = ActionSheet;

export { update, hide };

/**
 * @deprecated 请使用 show 方法调用
 */
// @ts-ignore
export const custom: typeof ActionSheet.show = (...args) => {
  console.warn(
    '[rn-smart-action-sheet]: custom 方法将会被废弃，请使用 show 方法调用',
  );
  // @ts-ignore
  return show(...args);
};

export function show(props: ActionSheetProps): string;
export function show(namespace: string, props: ActionSheetProps): string;
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
  titleOrNamespaceOrProps: string | ActionSheetProps,
  actionsOrProps?: Action[] | ActionSheetProps,
  cancelTextOrOnCancel?: string | (() => void),
  onCancel?: () => void,
) {
  if (isAnyObject(titleOrNamespaceOrProps)) {
    return showInternal(titleOrNamespaceOrProps);
  }
  if (!Array.isArray(actionsOrProps)) {
    return showInternal(titleOrNamespaceOrProps, actionsOrProps!);
  }

  if (isFunction(cancelTextOrOnCancel)) {
    onCancel = cancelTextOrOnCancel;
    cancelTextOrOnCancel = undefined;
  }

  return showInternal({
    title: titleOrNamespaceOrProps,
    actions: actionsOrProps,
    cancelText: cancelTextOrOnCancel,
    onCancel,
  });
}

const ExportActionSheet = Object.assign(ActionSheet, {
  show,
  /**
   * @deprecated 请使用 show 方法调用
   */
  custom,
});

export default ExportActionSheet;
export { ExportActionSheet as ActionSheet };
