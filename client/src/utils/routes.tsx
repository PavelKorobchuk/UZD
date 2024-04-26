import React, { ReactElement } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Home, Login, Register, NotFound, Root } from "../pages";
import { ProtectedRoute } from "../components";

export type RouteType = {
  index?: boolean | null | undefined;
  name: string;
  to: string;
  protected: boolean;
  component?: JSX.Element | null | undefined;
};

export const routes: RouteType[] = [
  {
    index: true,
    name: "Home",
    to: "/",
    protected: true,
    component: <Home />,
  },
  {
    name: "Login",
    to: "/login",
    protected: false,
    component: <Login />,
  },
  {
    name: "Register",
    to: "/register",
    protected: false,
    component: <Register />,
  },
  {
    name: "Logout",
    to: "/logout",
    protected: true,
    component: null,
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: routes.map((route: RouteType) => ({
      path: route.to,
      index: route.index ?? false,
      element: route.protected ? (
        <ProtectedRoute>{route.component}</ProtectedRoute>
      ) : (
        route.component
      ),
    })),
  },
]);
