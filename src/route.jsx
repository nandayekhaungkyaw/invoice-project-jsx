


import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";
import Invoice from "./pages/Invoice";
import Sale from "./pages/Sale";
import Login from "./Auth/Login";
import PrivateRoute from './components/PrivateRoute';
import ProfilePage from "./pages/ProfilePage";
import Signup from "./Auth/Signup";
import ProductCreate from "./pages/ProductCreate";
import ProductEdit from "./pages/ProductEdit";
import InvoiceView from "./pages/InvoiceView";


const router=createBrowserRouter([
    {

       path:"/login",
        element:<Login/>,
    },{
        path:"/register",
        element:<Signup/>
    },
    {
        path:"/",
        element:<PrivateRoute/>,
        children:[
            { 
        path:"/",
        element:<App/>,
        children:[
            {
               index:true,
                element:<Dashboard/>,
            },
            {
                path:"/product",
                element:<Product/>,
            },
            {
                path:"/product_create",
                element:<ProductCreate/>,
            },
            {
                path:"/product/:id",
                element:<ProductEdit/>
            },
            {
                path:"/invoice",
                element:<Invoice/>,
            },
            {
                path:"/invoice/:id",
                element:<InvoiceView/>
            },
            {
                path:"/sale",
                element:<Sale/>,
            },
            {
                path:"/user-profile",
                element:<ProfilePage/>,
            }
        ]}
            
        ]}
])

export default router;