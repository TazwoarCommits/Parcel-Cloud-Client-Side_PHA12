import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/login";
import Register from "../Pages/Register/Register";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children : [
        {
            path : "/",
            element : <Home></Home>
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