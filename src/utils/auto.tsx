import { Alert } from "antd";
import { useOnChangeValue } from "ask-hooks";
import { useEffect } from "react";
import Marquee from 'react-fast-marquee';

let last: string[] = [];
const DURATION = 60 / 1000;

export default function BannerAlert() {
  const [show] = useOnChangeValue(false);
  const mode = import.meta.env.MODE;
  const auto = (template: string) => {
    const srript = /<script.*src=["'](?<src>[^"']+)/gm;
    const result = [];

    let match;

    while ((match = srript.exec(template))) {
      result.push(match?.groups?.src ?? '')
    }
    return Promise.resolve(result);
  }

  const need = async () => {
    const page = await fetch('/');
    const script = await auto(await page.text());

    if (!last.length) {
      last = script;
      return false;
    }

    if (script.length !== last.length) {
      last = script;
      return true;
    }

    for (let i = 0; i < last.length; i++) {
      if (!Object.is(last[i], script[i])) {
        last = script;
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const time = setTimeout(async () => {
      const will = await need();
      if (will && mode === 'production') {
        show.onChange(true);
      }
    }, DURATION);
    return () => {
      clearTimeout(time)
    }
  }, [mode]);

  if (!show.value && mode === 'development') {
    return null;
  }

  return (
    <Alert
      banner
      message={
        <Marquee pauseOnHover gradient={false}>
          当前页面更新请刷新使用
        </Marquee>
      }
    />
  )
}