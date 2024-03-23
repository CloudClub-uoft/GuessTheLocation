import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet
} from "react-router-dom";

import React from "react";
import Login from "./pages/Login"
import Register from "./pages/Register"
import WritePost from "./pages/WritePost"
import SinglePost from "./pages/SinglePost"
import Home from "./pages/Home"
import Guess from "./pages/Guess"


import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import "./style.scss"


const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      {/*<Footer />*/}
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/guess",
        element: <Guess />
      },
      {
        path: "/post/:id",
        element: <SinglePost />
      },
      {
        path: "/post",
        element: <WritePost />
      }
    ]
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  },


])

function App() {

  return (
    <div className="app">
      <div className="conatiner">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;