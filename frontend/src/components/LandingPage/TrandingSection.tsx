import { motion } from "framer-motion";
import { ArrowRight, Flame, Heart, MapPin, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { REELS } from "@/lib/constants";
import { Link } from "react-router";
const TrendingSection = () => {
  return (
    <section id="explore" className="py-20 sm:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 sm:mb-16"
        >
          <div>
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20 px-4 py-1.5 text-sm font-medium rounded-full mb-4"
            >
              <Flame className="w-4 h-4 mr-2" />
              Trending Now
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              What's hot right now
            </h2>
          </div>
          <Button
            variant="ghost"
            className="mt-4 sm:mt-0 text-primary hover:text-primary/80 cursor-pointer"
          >
            View all
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {REELS.map((reel, i) => (
            <motion.div
              key={reel.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
            >
              <Link to={"/register"}>
                <div className="aspect-[3/4] relative">
                  <img
                    src={reel.image}
                    alt={reel.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play className="w-7 h-7 text-white fill-white ml-1" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-base sm:text-lg">
                      {reel.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-white/80 text-sm">
                        {reel.creator}
                      </span>
                      <span className="text-white/60 text-sm flex items-center gap-1">
                        <Heart className="w-3 h-3 fill-current" />
                        {reel.likes}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-white/60 text-xs">
                      <MapPin className="w-3 h-3" />
                      {reel.location}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TrendingSection;
