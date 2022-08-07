import { Outlet, Navigate } from "react-router-dom";
import { useApp } from "../context/AppProvider";


const PageOutlet = () => {
    const { coach } = useApp();

    return coach._id
      ? (
        <>
          <Outlet />
        </>
      )
      : <Navigate to="/" />;
  };
  
  
  export default PageOutlet;