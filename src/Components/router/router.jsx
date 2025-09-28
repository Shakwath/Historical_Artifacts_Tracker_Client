import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home";


export const router = createBrowserRouter ([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>,
    children: [
      {
        path: "/",
        element:<Home></Home>,
      },
      //  {
      //   path: "/*",
      //   element: <ErrorPage></ErrorPage>,
      // },
    ],
  }
]);
