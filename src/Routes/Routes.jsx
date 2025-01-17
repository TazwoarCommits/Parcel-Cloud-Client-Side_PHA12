import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Layouts/Dashboard";
import BookAParcel from "../Pages/Dashboard/UserPage/BookAParcel";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
    {
      path: "/",
      errorElement : <h1>Error</h1> ,
      element: <MainLayout></MainLayout>,
      children : [
        {
            path : "/",
            element : <Home></Home>
        },
        {
          path : "/dashboard" ,
          element : <Dashboard></Dashboard> ,
          children : [
           {
            path: "/dashboard/bookParcel" ,
            element : <PrivateRoutes><BookAParcel></BookAParcel></PrivateRoutes>,
           },
           {
            path: "/dashboard/myParcel" ,
            element : <p>myParcel</p>,
           },
           {
            path: "/dashboard/profile" ,
            element : <p>profile</p>,
           },
          ]
        },
      ]
    },
    {
      path : "/login",
      element : <Login></Login>
    },
    {
      path : "/register" ,
      element : <Register></Register>
    }
  ]);

  export default router