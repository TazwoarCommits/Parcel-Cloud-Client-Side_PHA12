import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Layouts/Dashboard";
import BookAParcel from "../Pages/Dashboard/UserPage/BookAParcel";
import PrivateRoutes from "./PrivateRoutes";
import MyProfile from "../Pages/Dashboard/UserPage/MyProfile";
import MyParcels from "../Pages/Dashboard/UserPage/MyParcels";
import UpdateProfile from "../Pages/UpdateProfile/UpdateProfile";
import UpdateParcel from "../Pages/Dashboard/UserPage/UpdateParcel";
// import AddReview from "../Pages/Dashboard/UserPage/AddReview";
import MyDeliveryList from "../Pages/Dashboard/DeliveryMansPage/MyDeliveryList";
import MyReviews from "../Pages/Dashboard/DeliveryMansPage/MyReviews";
import Statistics from "../Pages/Dashboard/AdminPages/Statistics";
import Error from "../Pages/Error";
import AllUSers from "../Pages/Dashboard/AdminPages/AllUSers";
import AdminRoutes from "./AdminRoutes";
import AllDeliveryMan from "../Pages/Dashboard/AdminPages/AllDeliveryMan";
import AllParcels from "../Pages/Dashboard/AdminPages/AllParcels";
import Payment from "../Pages/Dashboard/UserPage/Payment";
import ContactUs from "../Pages/ContactUs";
import AboutUs from "../Pages/AboutUs";


const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error></Error>,
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path : "/contact-Us",
        element : <ContactUs></ContactUs>
      },
      {
        path : "/about-us",
        element : <AboutUs></AboutUs>
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children: [
          // users route
          {
            path : "/dashboard/updateProfile" ,
            element : <PrivateRoutes><UpdateProfile></UpdateProfile></PrivateRoutes>
          },
          {
            path: "/dashboard/myParcel",
            element: <PrivateRoutes><MyParcels></MyParcels></PrivateRoutes>,
          },
          // {
          //   path: "/dashboard/addReview/:id" ,
          //   element : <PrivateRoutes><AddReview></AddReview></PrivateRoutes> ,
          //   loader : ({params}) => fetch(`http://localhost:5000/parcels/${params.id}`) //
          // },
          {
            path : "/dashboard/payment/:id",
            element: <PrivateRoutes><Payment></Payment></PrivateRoutes>,
          },
          {
            path: "/dashboard/updateParcel/:id",
            element: <PrivateRoutes><UpdateParcel></UpdateParcel></PrivateRoutes>,
          },
          {
            path: "/dashboard/bookParcel",
            element: <PrivateRoutes><BookAParcel></BookAParcel></PrivateRoutes>,
          },
          {
            path: "/dashboard/profile",
            element: <PrivateRoutes><MyProfile></MyProfile></PrivateRoutes>,
          },

          //delivery mans routes 
          
          {
            path : "/dashboard/deliveryList",
            element : <PrivateRoutes><MyDeliveryList></MyDeliveryList></PrivateRoutes>
          },
          {
            path : "/dashboard/myReview",
            element: <PrivateRoutes><MyReviews></MyReviews></PrivateRoutes>
          },

          // Admin Routes

          {
            path : "/dashboard/stats" ,
            element : <Statistics></Statistics> ,
          },
          {
            path : "/dashboard/allParcels" ,
            element : <AdminRoutes><AllParcels></AllParcels></AdminRoutes> ,
          },
          {
            path : "/dashboard/allUsers" ,
            element : <AdminRoutes><AllUSers></AllUSers></AdminRoutes> ,
          },
          {
            path : "/dashboard/allDeliveryMan" ,
            element : <AdminRoutes><AllDeliveryMan></AllDeliveryMan></AdminRoutes> ,
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