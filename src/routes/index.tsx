import Layout from "@/layout";
import { createRouter } from "ask-router";
import { ComponentType, lazy } from "react";


/**
 * 获取所有路由
 * 转换成烂加载的路由对象
*/
const views = import.meta.glob('@/views/**/*.tsx') as Record<string, () => Promise<{
  default: ComponentType<unknown>
}>>;

const routes = Object.entries(views)?.map(
  ([key, element]) => {
    const [, path] = key.match(/\/views\/([^/]+)/) ?? []

    return {
      path,
      element: lazy(element)
    }
  }
)


const router = createRouter([
  {
    path: '/',
    element: <div></div>,
  },
  {
    path: '/admin',
    element: <Layout />,
    meta: {

    },
    children: [
      ...routes,
    ]
  }
] as const);

export default router;