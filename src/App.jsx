import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";
import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Paste from "./components/Paste";
import ViewPaste from "./components/Viewpaste";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/pastes",
    element: (
      <>
        <Navbar />
        <Paste />
      </>
    ),
  },
  {
    path: "/pastes/:id",
    element: (
      <>
        <Navbar />
        <ViewPaste />
      </>
    ),
  },
]);

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
