import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../modules/header";

export function Root() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
