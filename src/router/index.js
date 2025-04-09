//路由配置
import Layout from "@/pages/Layout"; 
import Login from "@/pages/Login"; 

import { createBrowserRouter } from "react-router-dom";
import AuthRoute from "@/components/AuthRoute";
import Article from "@/pages/Article";
import Home from "@/pages/Home";
import Publish from "@/pages/Pulish";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthRoute><Layout /></AuthRoute>,
        children:[
            {
                path: "/",
                element:<Home/>,
            },
            {
                path: "Home",
                element:<Home/>,
            },
            {
                path:'Article',
                element:<Article/>,
            },
            {
                path:'Publish',
                element:<Publish/>,
            }
        ]
    },
    {
        path: "/login",
        element: <Login />,
    }
])

export default router;