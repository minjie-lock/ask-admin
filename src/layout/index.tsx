import BannerAlert from '@/utils/auto';
import {
  Layout as ILayout
} from 'antd';
import { Outlet } from 'ask-router';

const {
  Content,
  Sider,
  Header,
} = ILayout;

export default function Layout() {
  return (
    <ILayout>
      <BannerAlert />
      <Sider>

      </Sider>
      <ILayout>
        <Header>

        </Header>
        <Content>
          <Outlet />
        </Content>
      </ILayout>
    </ILayout>
  )
}