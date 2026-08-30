import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home";
import Login from "../Authentication/Login";
import AllArtifacts from "../Pages/AllArtifacts";
import AddArtifact from "../Pages/AddArtifact";
import MyArtifacts from "../Pages/MyArtifacts";
import LikedArtifacts from "../Pages/LikedArtifacts";
import ArtifactDetails from "../Pages/ArtifactDetails";
import Register from "../Authentication/Register";
import MyProfile from "../Pages/MyProfile";
import ErrorPage from "../Pages/ErrorPage";
import PrivateRoute from "../Provider/PrivateRoute";

export const router = createBrowserRouter ([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/allartifacts",
        element: <AllArtifacts></AllArtifacts>
      },
      {
        path: "/addartifacts",
        element: (
          <PrivateRoute>
            <AddArtifact></AddArtifact>
          </PrivateRoute>
        )
      },
      {
        path: "/myartifacts",
        element: (
          <PrivateRoute>
            <MyArtifacts></MyArtifacts>
          </PrivateRoute>
        )
      },
      {
        path: "/liked-artifacts",
        element: (
          <PrivateRoute>
            <LikedArtifacts></LikedArtifacts>
          </PrivateRoute>
        )
      },
      {
        path: "/artifacts/:id",
        element: (
          <PrivateRoute>
            <ArtifactDetails></ArtifactDetails>
          </PrivateRoute>
        )
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/Register",
        element: <Register></Register>,
      },
      {
        path: "/updateprofile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/*",
        element: <ErrorPage></ErrorPage>,
      },
    ],
  }
]);
