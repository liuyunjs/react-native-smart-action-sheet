import { isFunction } from '@liuyunjs/utils/lib/isFunction';
import { isAnyObject } from '@liuyunjs/utils/lib/isAnyObject';
import { ActionSheet, ActionSheetProps, Action } from './ActionSheet';
export { ActionSheetAction } from './ActionSheetAction';

const { show: showInternal, update, hide } = ActionSheet;

export { update, hide };

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
});

export default ExportActionSheet;
export { ExportActionSheet as ActionSheet };
