import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { useLocalStorage } from "./hooks";
import { login } from "./redux/slices";
import { router } from "./utils";
import { AuthProvider } from "./hooks";
import "normalize.css";
import "./App.css";

export function App() {
  const [userAuthData] = useLocalStorage("userAuthData", null);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (userAuthData) {
  //     dispatch(login(userAuthData));
  //   }
  // }, [userAuthData]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
