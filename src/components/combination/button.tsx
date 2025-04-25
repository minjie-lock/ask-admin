import { Button } from "antd";
import { ButtonProps } from "antd/lib";

enum Control {
  ctrl,
  alt,
  shift,
  command,
};


interface IButtonProps extends ButtonProps {
  key: {
    control: keyof typeof Control;
    alphanumeric: '';
  };
}

export default function button(props: IButtonProps) {
  return (
    <Button>

    </Button>
  )
}