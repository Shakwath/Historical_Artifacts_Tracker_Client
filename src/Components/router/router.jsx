import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home";
import Login from "../Authentication/Login";
import AllArtifacts from "../Pages/AddArtifact"
import AddArtifact from "../Pages/AddArtifact";
import MyArtifacts from "../Pages/MyArtifacts";

export const router = createBrowserRouter ([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>,
    children: [
      {
        path: "/",
        element:<Home></Home>,
      },
      {
        path: "/allartifacts",
        element:<AllArtifacts></AllArtifacts>
      },
      {
        path: "/addartifacts",
        element:<AddArtifact></AddArtifact>
      },
      {
        path: "/myartifacts",
        element:<MyArtifacts></MyArtifacts>
      },
      {
        path: "/login",
        element:<Login></Login>
      },
      //  {
      //   path: "/*",
      //   element: <ErrorPage></ErrorPage>,
      // },
    ],
  }
]);
