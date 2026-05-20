import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/general/LandingPage";
import RegisterUserPage from "./pages/auth/RegisterUserPage";
import LoginUserPage from "./pages/auth/LoginUserPage";
import RegisterFoodPartnerPage from "./pages/auth/RegisterFoodPartnerPage";
import LoginFoodPartnerPage from "./pages/auth/LoginFoodPartnerPage";
import ProtectedRoute from "./components/ProtectedRoute";
import FoodReelsPage from "./pages/food-partner/FoodReelsPage";
import RedirectRoute from "./components/RedirectRoute";
import CheckAuthForFoodPartner from "./components/CheckAuthForFoodPartner";
import CreateFoodPage from "./pages/food-partner/CreateFood";

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
  {
    path: "/create-food",
    element: (
      <CheckAuthForFoodPartner>
        <CreateFoodPage />
      </CheckAuthForFoodPartner>
    ),
  },
]);

export default router;
