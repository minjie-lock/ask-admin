import {
  ProFormProps,
  ProFormSelect,
  ProFormText,
  ProFormTextArea
} from "@ant-design/pro-components";
import { useRequest } from "ahooks";

import {
  Form as IForm,
  Spin
} from "antd";
import { useEffect } from "react";

interface FormProps extends ProFormProps {
  children: React.ReactNode;
  onFetch?: () => Promise<{
    data?: {
      [key: string]: unknown;
    }
  }>
}

export default function Form(props: FormProps) {

  const {
    children,
    form,
    onFetch,
    ...rest
  } = props;

  const {loading } = useRequest(onFetch, {
    onSuccess: (value: Record<string, unknown>) => {
      form?.setFieldsValue(value);
    },
    refreshDeps: [onFetch]
  })

  return (
    <Spin spinning={loading}>
      <IForm
        {...rest}
        form={form}
        className="ask-drink-form-box"
      >
        {children}
      </IForm>
    </Spin>
  )
};

Form.displayName = 'Form';
Form.Input = ProFormText;
Form.TextArea = ProFormTextArea;
Form.Select = ProFormSelect;
Form.useForm = IForm.useForm;
Form.useWatch = IForm.useWatch;