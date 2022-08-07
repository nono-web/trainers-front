import { Outlet, Navigate } from "react-router-dom";
import { useApp } from "../../context/AppProvider";


const AdminRoute = () => {
    const { coach } = useApp();

    return coach.isAdmin
      ? (
        <>
          <Outlet />
        </>
      )
      : <Navigate to="/" />;
  };
  
  
  export default AdminRoute;