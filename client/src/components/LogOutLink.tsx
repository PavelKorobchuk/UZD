import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices";
import { useAuth } from "../hooks/useAuth";

export function LogOutLink(props: any) {
  const dispatch = useDispatch();
  const { removeLocalStorage }: any = useAuth();

  function onLogOutClickHandler() {
    removeLocalStorage();
    dispatch(logout());
  }

  return (
    <NavLink {...props} onClick={onLogOutClickHandler}>
      {props.children}
    </NavLink>
  );
}
