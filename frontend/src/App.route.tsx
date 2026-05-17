import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import RegisterUserPage from "./pages/RegisterUserPage";
import LoginUserPage from "./pages/LoginUserPage";
import RegisterFoodPartnerPage from "./pages/RegisterFoodPartnerPage";
import LoginFoodPartnerPage from "./pages/LoginFoodPartnerPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },

  {
    path: "/register",
    element: <RegisterUserPage />,
  },
  {
    path: "/login",
    element: <LoginUserPage />,
  },
  {
    path: "/food-partner/register",
    element: <RegisterFoodPartnerPage />,
  },
  {
    path: "/food-partner/login",
    element: <LoginFoodPartnerPage />,
  },
]);

export default router;
