import { createElement } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { MainLayout, RootError } from "../components";

export const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    errorElement: <RootError />,
    children: [
      { path: "login", lazy: () => import("./login.tsx") },
      { path: "register", lazy: () => import("./register.tsx") },
      { path: "salir", lazy: () => import("./salir.tsx") },
    ],
  },
  {
    path: "",
    element: <MainLayout />,
    errorElement: <RootError />,
    children: [
      { index: true, element: <Navigate to="/contents" replace /> },
      { path: "contents", lazy: () => import("./contents.tsx") },
      { path: "contents/:contentId", lazy: () => import("./content.tsx") }
  ],
  },
]);

export function Router(): JSX.Element {
  return createElement(RouterProvider, { router });
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
