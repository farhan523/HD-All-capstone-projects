import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./app/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./page/Login/Login.jsx";
import Signup from "./page/signup/Signup.jsx";
import { ToastContainer } from "react-toastify";
import Home from "./page/Home/Home.jsx";
import LandingPage from "./page/index/LandinPage.jsx";
import Product from "./page/product/Product.jsx";
import CartDetails from "./components/cartDetails/CartDetails.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/product",
        element: <Product />
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}>
                <App />
            </RouterProvider>
            <ToastContainer />
        </Provider>
    </React.StrictMode>
);
