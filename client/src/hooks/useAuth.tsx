import { createContext, useContext, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocalStorage } from "./useLocalStorage";
import { selectCurrentUser } from "../redux/slices";
const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useLocalStorage("userAuthData", null);
  // const userFromReduxStore = useSelector((state) => selectCurrentUser(state));

  // useEffect(() => {
  //   if (user.access_token) {
  //     setUser(userFromReduxStore);
  //   }
  // }, [userFromReduxStore?.access_token]);

  // call this function when you want to authenticate the user
  const setLocalStorage = async (data: any) => {
    setUser(data);
  };

  // call this function to sign out logged in user
  const removeLocalStorage = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      setLocalStorage,
      removeLocalStorage,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
