import { Outlet, useLocation } from "react-router-dom";

import { Header } from "../modules/header";

export function Root() {
  const userAuthData = localStorage.getItem("userAuthData");
  const user = JSON.parse(userAuthData || "");
  let location = useLocation();
  console.log(location);

  return (
    <div>
      {location.pathname.startsWith("/admin") ? <Header /> : null}
      <Outlet />
    </div>
  );
}
