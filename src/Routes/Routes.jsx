import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Layouts/Dashboard";
import BookAParcel from "../Pages/Dashboard/UserPage/BookAParcel";
import PrivateRoutes from "./PrivateRoutes";
import MyProfile from "../Pages/Dashboard/UserPage/MyProfile";
import MyParcels from "../Pages/Dashboard/UserPage/MyParcels";
import UpdateProfile from "../Pages/UpdateProfile/UpdateProfile";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <h1>Error</h1>,
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children: [
          {
            path : "/dashboard/updateProfile" ,
            element : <PrivateRoutes><UpdateProfile></UpdateProfile></PrivateRoutes>
          },
          {
            path: "/dashboard/myParcel",
            element: <PrivateRoutes><MyParcels></MyParcels></PrivateRoutes>,
          },
          {
            path: "/dashboard/bookParcel",
            element: <PrivateRoutes><BookAParcel></BookAParcel></PrivateRoutes>,
          },
          {
            path: "/dashboard/profile",
            element: <PrivateRoutes><MyProfile></MyProfile></PrivateRoutes>,
          },
        ]
      },
    ]
  },
  {
    path: "/login",
    element: <Login></Login>
  },
  {
    path: "/register",
    element: <Register></Register>
  }
]);

export default router