import { Modal, ModalProps } from "antd";
import { ModalStaticFunctions } from "antd/es/modal/confirm";
import { HookAPI, ModalFuncWithPromise } from "antd/es/modal/useModal";
import { useOnChangeValue, useWithResolvers } from "ask-hooks";
import { forwardRef, useImperativeHandle, useRef } from "react";

type DialogFn<R> = {
  onOpen: (value?: R) => Promise<void>;
  onReslove: (value: unknown) => void;
}

const Dialog = forwardRef((props: ModalProps, ref) => {

  const {
    children,
    ...rest
  } = props;

  const [open] = useOnChangeValue(false);

  const { promise, resolve } = useWithResolvers();

  useImperativeHandle(ref, () => {
    return {
      onOpen: (value?: number) => {
        if (value) {

        }
        open.onChange(true);
        return promise;
      },
      onResolve: (value?: number) => {
        resolve(value);
      }
    }
  });

  const onCLose = () => {
    open.onChange(false);
  }

  return (
    <Modal
      open={open.value}
      {...rest}
      onCancel={onCLose}
      onClose={onCLose}
    >
      {children}
    </Modal>
  )
});

export function useDialogOpen<R>()  {
  const dialog = useRef<DialogFn<R>>(null);
  return dialog;
};


type Options = Parameters<ModalFuncWithPromise>[0];

export const useDialog = (): [HookAPI, React.ReactNode] => {

  const [dialog, context] = Modal.useModal();
  const fn: Record<keyof ModalStaticFunctions, Options> | {} = {}
  const text = /\{(.*?)\}/;
  const span = (content: string) => content?.replace(text, (...[, substring]) => {
    return `<span class="ask-dialog-box">${substring}</span>`
  });
  for (const key of Object.keys(dialog)) {
    fn[key] = (options: Options) => {
      const content = options?.content;
      dialog[key]({
        ...options,
        content: (
          <div dangerouslySetInnerHTML={{
            __html: span(content as string)
          }} />
        )
      })
    }
  }
  return [fn, context]
}

export default Dialog;