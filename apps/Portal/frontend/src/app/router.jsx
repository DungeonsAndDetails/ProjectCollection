import { createBrowserRouter } from "react-router-dom";
import ShellLayout from "./layouts/ShellLayout";
import HomePage from "../pages/HomePage";
import Project1Page from "../pages/Project1Page";
import Project2Page from "../pages/Project2Page";
import SettingsPage from "../pages/SettingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ShellLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "apps/project1",
        element: <Project1Page />,
      },
      {
        path: "apps/project2",
        element: <Project2Page />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
]);
