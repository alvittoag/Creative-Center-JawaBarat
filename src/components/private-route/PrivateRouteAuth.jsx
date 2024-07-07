// ** Import Other
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouteAuth = () => {
  const user = localStorage.getItem("user");

  if (user) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRouteAuth;
