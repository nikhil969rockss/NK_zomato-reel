import axiosInstance from "@/lib/axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/slices/userSlice";
import { useEffect, useState } from "react";
import BackgroundTheme from "./BackgroundTheme";
import { LoaderCircle } from "lucide-react";
import { Navigate } from "react-router";
import Loading from "./Loading";

const RedirectRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await axiosInstance.get("/auth/get-user");
        dispatch(setUser(response.data?.data));
      } catch (error) {
        dispatch(setUser(null));
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (user && !loading) {
    return <Navigate to={"/food-reels"} />;
  }

  return children;
};

export default RedirectRoute;
