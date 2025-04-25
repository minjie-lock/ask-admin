import { menus } from '@/global';
import {
  Breadcrumb as IBreadcrumb
} from 'antd';
import { Link, useLocation } from 'ask-router';
import { useMemo } from 'react';

export default function Breadcrumb() {

  const location = useLocation();

  const items = useMemo(() => {
    const pathname = location.pathname;

    const item = menus?.find(item => {
      return item?.key === pathname;
    });

    const children = item?.children?.find(item => {
      return pathname.includes(item?.key as string);
    });

    const list = [
      item,
      children
    ]?.map((item, index) => {
      const to = item?.key as string;
      const title = index === 0 ?
        item?.label :
        <Link to={to}>{item?.label}</Link>
      return {
        title
      }
    })

    return list;

  }, [location.pathname]);

  return (
    <IBreadcrumb
      items={items}
    />
  )
}