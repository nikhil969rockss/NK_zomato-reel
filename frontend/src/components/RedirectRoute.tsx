import axiosInstance from "@/lib/axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/slices/userSlice";
import { useEffect, useState } from "react";
import BackgroundTheme from "./BackgroundTheme";
import { LoaderCircle } from "lucide-react";
import { Navigate } from "react-router";

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
    return (
      <>
        <BackgroundTheme />
        <div className="relative flex justify-center items-center h-screen">
          <LoaderCircle className="animate-spin" size={32} />
        </div>
      </>
    );
  }

  if (user) {
    return <Navigate to={"/food-reels"} />;
  }

  return children;
};

export default RedirectRoute;
