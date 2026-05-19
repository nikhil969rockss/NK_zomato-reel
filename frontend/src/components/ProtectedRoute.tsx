import axiosInstance from "@/lib/axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/slices/userSlice";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import BackgroundTheme from "./BackgroundTheme";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axiosInstance.get("/auth/get-user");
        dispatch(setUser(response.data?.data));
      } catch {
        dispatch(setUser(null));
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
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

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
