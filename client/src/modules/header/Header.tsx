import React, { useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { routes } from "../../utils/routes";
import type { RouteType } from "../../utils/routes";

export function Header() {
  const isAuthenticated = useSelector(
    (state) => (state as any).auth?.access_token
  );

  const filteredRoutes = useMemo(() => {
    return routes.filter((route) => {
      return isAuthenticated ? route.protected : !route.protected;
    });
  }, [isAuthenticated]);

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
