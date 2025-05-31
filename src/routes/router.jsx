import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../MainLayout/Dashboard";
import AllUsers from "../dashboard/admin/AllUsers";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../components/ErrorPage";
import ApplyTeacher from "../pages/ApplyTeacher";
import TeacherRequests from "../dashboard/admin/TeacherRequests";
import MyProfile from "../dashboard/shared/MyProfile";


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
                path: '/teach-on',
                element: <PrivateRoute><ApplyTeacher></ApplyTeacher></PrivateRoute>

            },
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
            //  for admin only
            {
                path: 'teacher-requests',
                element: <TeacherRequests></TeacherRequests>
            },
            {
                path: 'users',
                element: <AllUsers></AllUsers>
            },

            // for teacher only





            // for all users
            {
                path: 'profile',
                element: <MyProfile></MyProfile>
            },
        ]
    },
    {
        path: '/*',
        element: <ErrorPage></ErrorPage>
    }
]);

export default router