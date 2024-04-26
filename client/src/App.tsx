import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./utils";

export function App() {
  return <RouterProvider router={router} />;
}
