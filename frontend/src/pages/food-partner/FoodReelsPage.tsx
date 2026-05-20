import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import ReelSlide from "@/components/food-reels/ReelSlide";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toast } from "react-toastify";
import Loading from "@/components/Loading";
import { setFoodPosts } from "@/redux/slices/foodPostSlice";

const FoodReelsPage = () => {
  //states
  const [loading, setloading] = useState(false);

  //hooks
  const dispatch = useAppDispatch();
  const foodPosts = useAppSelector((state) => state.foodPost.foodPosts);

  useEffect(() => {
    async function fetchAllFoodReels() {
      setloading(true);
      try {
        const response = await axiosInstance.get("/food");
        dispatch(setFoodPosts(response.data?.data));
      } catch (error: unknown) {
        const err = error as { response: { data?: { message?: string } } };
        toast.error(
          err?.response?.data?.message || "Failed to fetch food reels",
        );
      } finally {
        setloading(false);
      }
    }
    fetchAllFoodReels();
  }, []);

  if (loading) return <Loading />;

  console.log(foodPosts);

  return (
    <motion.div className="relative min-h-dvh w-full bg-black md:bg-linear-to-br md:from-orange-50 md:via-background md:to-red-50">
      <motion.div className="absolute inset-0 hidden md:block bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.08),transparent_50%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative mx-auto h-dvh w-full max-w-[430px] md:my-4 md:h-[calc(100dvh-2rem)] md:max-h-[900px] md:rounded-2xl md:border md:border-border/60 md:shadow-2xl md:shadow-black/20 md:overflow-hidden bg-black"
      >
        <motion.div
          className="h-full w-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory overscroll-y-contain scroll-smooth [-webkit-overflow-scrolling:touch]"
          style={{ scrollSnapType: "y mandatory" }}
        >
          {foodPosts.map((reel) => (
            <ReelSlide key={reel._id} reel={reel} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 3, duration: 1 }}
          className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/70"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronUp className="w-6 h-6 rotate-180" />
          </motion.div>
          <span className="text-xs font-medium tracking-wide">Swipe up</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FoodReelsPage;
