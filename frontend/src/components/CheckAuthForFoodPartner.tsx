import axiosInstance from "@/lib/axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { useEffect, useState } from "react";
import BackgroundTheme from "./BackgroundTheme";
import { LoaderCircle } from "lucide-react";
import { Navigate } from "react-router";
import { setFoodPartner } from "@/redux/slices/foodPartnerSlice";
import Loading from "./Loading";

const CheckAuthForFoodPartner = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //states
  const [loading, setloading] = useState(true);

  //hooks
  const dispatch = useAppDispatch();
  const foodPartner = useAppSelector((state) => state.foodPartner.foodPartner);

  useEffect(() => {
    async function checkAuthForFoodPartner() {
      try {
        const response = await axiosInstance.get("/auth/get-food-partner");
        dispatch(setFoodPartner(response.data?.data));
      } catch (error) {
        dispatch(setFoodPartner(null));
      } finally {
        setloading(false);
      }
    }
    checkAuthForFoodPartner();
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (!foodPartner && !loading)
    return <Navigate to={"/food-partner/login"} replace />;

  return children;
};

export default CheckAuthForFoodPartner;
