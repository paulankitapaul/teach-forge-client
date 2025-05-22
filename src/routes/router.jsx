import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            // {
            //     path: '/',
            //     element: <Home></Home>

            // }
        ]
    },
    // {
    //     path:'/*',
    //     element: <ErrorPage></ErrorPage>
    // }
]);

export default router