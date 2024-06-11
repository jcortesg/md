import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

export const Component = function Login(): JSX.Element {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  setToken("");
  navigate("/login", { replace: true });
  return (<></>);
};