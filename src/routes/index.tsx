import Layout from "@/layout";
import { createRouter } from "ask-router";

const router = createRouter([
  {
    path: '/',
    element: <div></div>,
  },
  {
    path: '/admin',
    element: <Layout />
  }
]);

export default router;