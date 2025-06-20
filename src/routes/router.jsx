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
import AddClass from "../dashboard/teacher/AddClass";
import MyClasses from "../dashboard/teacher/MyClasses";
import AllClassesAdmin from "../dashboard/admin/AllClassesAdmin";
import AllClasses from "../pages/AllClasses";
import MyEnrollClass from "../dashboard/student/MyEnrollClass";
import Home from "../pages/home/home";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>

            },
            {
                path: '/classes',
                element: <AllClasses></AllClasses>

            },
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
                path: 'all-classes',
                element: <AllClassesAdmin></AllClassesAdmin>
            },
            {
                path: 'users',
                element: <AllUsers></AllUsers>
            },
            
            // for teacher only
            {
                path: 'add-class',
                element: <AddClass></AddClass>
            },
            {
                path: 'my-classes',
                element: <MyClasses></MyClasses>
            },
            
            // for student only
            {
                path: 'enrollments',
                element: <MyEnrollClass></MyEnrollClass>
            },

            // for all roles
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