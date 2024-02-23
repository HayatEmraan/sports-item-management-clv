import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useAppSelector((state) => state.auth);

  if (!token) return <Navigate to="/auth" replace />;
  return children;
};

export default PrivateRoute;
