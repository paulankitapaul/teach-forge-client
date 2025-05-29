import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../MainLayout/Dashboard";


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
                path:'/login',
                element: <Login></Login>
            },
            {
                path:'/register',
                element: <Register></Register>
            }
        ]
    },
    
    // dashboard
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children:[
            {

            }
        ]
    }
    // {
    //     path:'/*',
    //     element: <ErrorPage></ErrorPage>
    // }
]);

export default router