import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import RegisterUserPage from "./pages/RegisterUserPage";
import LoginUserPage from "./pages/LoginUserPage";
import RegisterFoodPartnerPage from "./pages/RegisterFoodPartnerPage";
import LoginFoodPartnerPage from "./pages/LoginFoodPartnerPage";
import ProtectedRoute from "./components/ProtectedRoute";
import FoodReelsPage from "./pages/FoodReelsPage";
import RedirectRoute from "./components/RedirectRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RedirectRoute>
        <LandingPage />
      </RedirectRoute>
    ),
  },

  {
    path: "/register",
    element: (
      <RedirectRoute>
        <RegisterUserPage />
      </RedirectRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <RedirectRoute>
        <LoginUserPage />
      </RedirectRoute>
    ),
  },
  {
    path: "/food-partner/register",
    element: <RegisterFoodPartnerPage />,
  },
  {
    path: "/food-partner/login",
    element: <LoginFoodPartnerPage />,
  },
  {
    path: "/food-reels",
    element: (
      <ProtectedRoute>
        <FoodReelsPage />
      </ProtectedRoute>
    ),
  },
]);

export default router;
