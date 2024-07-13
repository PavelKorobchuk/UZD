import { useMemo } from "react";
import { NavLink } from "react-router-dom";

import { routes } from "../../utils/routes";

import type { RouteType } from "../../utils/routes";

// import logo from "../img/logo.png";

export function Header() {
  const userAuthData = localStorage.getItem("userAuthData");
  const user = JSON.parse(userAuthData || "");

  const filteredRoutes = useMemo(() => {
    return routes
      .filter((route) => {
        return user?.access_token ? route.protected : !route.protected;
      })
      .filter((route) => route.isAdmin);
  }, [user?.access_token]);

  return (
    <ul>
      {filteredRoutes.map((route: RouteType) => {
        return (
          <li key={route.name}>
            {<NavLink to={route.to}>{route.name}</NavLink>}
          </li>
        );
      })}
    </ul>
  );
}
