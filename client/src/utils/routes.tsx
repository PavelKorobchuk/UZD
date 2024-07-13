import React, { ReactElement } from "react";
import { createBrowserRouter } from "react-router-dom";
import { NotFound, Root } from "../pages";
import { Login, Register, User } from "../pages/admin";
import { Home } from "../pages/landing";
import { ProtectedRoute, LogOutLink } from "../components";

export type RouteType = {
  index?: boolean | null | undefined;
  name: string;
  to: string;
  protected: boolean;
  component?: JSX.Element | null | undefined;
  navLinkComponent?: (props: any) => ReactElement;
  isAdmin?: boolean | undefined;
};

export const routes: Array<RouteType> = [
  // landing page routes
  {
    index: true,
    name: "Home",
    to: "/",
    protected: false,
    component: <Home />,
  },

  // admin panel routes
  {
    name: "Logout",
    to: "/admin/logout",
    protected: true,
    component: null,
    navLinkComponent: LogOutLink,
    isAdmin: true,
  },
  {
    name: "Main",
    to: "/admin/",
    index: true,
    protected: true,
    component: <User />,
    isAdmin: true,
  },
  {
    name: "User",
    to: "/admin/user/",
    protected: true,
    component: <User />,
    isAdmin: true,
  },
  {
    name: "Login",
    to: "/admin/login",
    protected: false,
    component: <Login />,
    isAdmin: true,
  },
  {
    name: "Register",
    to: "/admin/register",
    protected: false,
    component: <Register />,
    isAdmin: true,
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
