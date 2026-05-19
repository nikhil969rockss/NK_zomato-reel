import { useScroll, useTransform, motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Camera,
  Clock,
  Heart,
  MapPin,
  Play,
  Share2,
  Sparkles,
  Star,
} from "lucide-react";
import { FOOD_IMAGES } from "@/lib/constants";
import { Link } from "react-router";

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);

  return (
    <section className="relative min-h-screen pt-20 sm:pt-24 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-orange-50 via-white to-red-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(239,68,68,0.06),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16 sm:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center lg:justify-start mb-6"
            >
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary hover:bg-primary/20 px-4 py-1.5 text-sm font-medium rounded-full"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                The Future of Food Discovery
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.1]"
            >
              Discover Food{" "}
              <span className="bg-linear-to-r from-primary via-orange-500 to-red-500 bg-clip-text text-transparent">
                in Motion
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Swipe through mouth-watering food reels, find your next craving,
              and order instantly. The Instagram meets Zomato experience you've
              been waiting for.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to={"/register"}>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-base font-semibold rounded-full px-8 h-14 shadow-xl shadow-primary/25 cursor-pointer "
                >
                  <Play className="w-5 h-5 mr-2 fill-current" />
                  Start Exploring
                </Button>
              </Link>

              <Link to={"/food-partner/register"}>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base font-semibold rounded-full px-8 h-14 border-2  cursor-pointer"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Create Reels
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-10 sm:mt-12 flex items-center gap-6 justify-center lg:justify-start"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-background bg-linear-to-br from-primary to-orange-400 flex items-center justify-center text-white text-xs font-bold"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <span className="font-bold text-foreground">50K+</span>
                <span className="text-muted-foreground ml-1">
                  foodies already here
                </span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div style={{ y: y1 }} className="relative hidden lg:block">
            <div className="relative w-72 mx-auto">
              <motion.div
                className="relative bg-black rounded-[2.5rem] p-3 shadow-2xl shadow-black/20"
                initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              >
                <div className="relative rounded-[2rem] overflow-hidden aspect-9/16">
                  <img
                    src={FOOD_IMAGES[0]}
                    alt="Food reel"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 right-16">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm" />
                      <span className="text-white text-sm font-semibold">
                        @chefmaria
                      </span>
                    </div>
                    <p className="text-white/90 text-sm">
                      🍕 Best pizza in town! You NEED to try this...
                    </p>
                  </div>

                  <div className="absolute right-3 bottom-20 flex flex-col items-center gap-4">
                    {[
                      { icon: Heart, count: "12.4K" },
                      { icon: Share2, count: "892" },
                    ].map(({ icon: Icon, count }) => (
                      <div key={count} className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white text-xs mt-1">{count}</span>
                      </div>
                    ))}
                  </div>

                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -left-24 top-20 w-40"
                style={{ y: y2 }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="bg-white rounded-2xl p-3 shadow-xl shadow-black/10">
                  <img
                    src={FOOD_IMAGES[1]}
                    alt="Food"
                    className="w-full h-24 object-cover rounded-xl"
                  />
                  <div className="mt-2 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-primary" />
                    <span className="text-xs font-medium">Pizza Palace</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-bold">4.8</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -right-20 top-40 w-36"
                style={{ y: useTransform(scrollY, [0, 500], [0, -80]) }}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="bg-white rounded-2xl p-3 shadow-xl shadow-black/10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">25 min</p>
                      <p className="text-[10px] text-muted-foreground">
                        Delivery time
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      />
    </section>
  );
};
export default HeroSection;
