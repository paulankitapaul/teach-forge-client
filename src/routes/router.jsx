import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../MainLayout/Dashboard";
import AllUsers from "../dashboard/admin/AllUsers";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../components/ErrorPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            // {
            //     path: '/',
            //     element: <Home></Home>

            // },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    },

    // dashboard
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'users',
                element: <AllUsers></AllUsers>
            }
        ]
    },
    {
        path:'/*',
        element: <ErrorPage></ErrorPage>
    }
]);

export default router