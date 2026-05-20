import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bookmark,
  Heart,
  MapPin,
  Share2,
  UserRound,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatReelCount } from "@/lib/foodReelsData";
import type { FoodReel } from "@/lib/foodReelsData";
import { cn } from "@/lib/utils";

type ReelSlideProps = {
  reel: FoodReel;
};

const ReelSlide = ({ reel }: ReelSlideProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(reel.likes);
  const [showHeartBurst, setShowHeartBurst] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const mostlyVisible = entry.intersectionRatio >= 0.55;
        setIsActive(mostlyVisible);

        if (mostlyVisible) {
          video.play().catch(() => {
            video.muted = true;
            setIsMuted(true);
            video.play().catch(() => {});
          });
        } else {
          video.pause();
          video.currentTime = 0;
        }
      },
      { threshold: [0, 0.25, 0.55, 0.75, 1] },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
    if (isActive) {
      video.play().catch(() => {});
    }
  }, [isMuted, isActive]);

  function handleLike() {
    setLiked((prev) => {
      const next = !prev;
      setLikeCount((c) => (next ? c + 1 : c - 1));
      if (next) {
        setShowHeartBurst(true);
        window.setTimeout(() => setShowHeartBurst(false), 700);
      }
      return next;
    });
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-full w-full shrink-0 snap-start snap-always overflow-hidden bg-black"
    >
      <video
        ref={videoRef}
        src={reel.video}
        className="absolute inset-0 h-full w-full object-cover"
        loop
        playsInline
        muted={isMuted}
        preload="metadata"
        // poster={reel.partnerAvatar}
      />

      <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-black/80 pointer-events-none" />
      <motion.div
        className="absolute inset-0 bg-linear-to-r from-black/20 via-transparent to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0.6 }}
        transition={{ duration: 0.4 }}
      />

      <AnimatePresence>
        {showHeartBurst && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          >
            <Heart className="w-24 h-24 text-primary fill-primary drop-shadow-lg" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: isActive ? 0 : -20, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-2"
      >
        <span className="text-sm font-bold tracking-tight text-white drop-shadow-md">
          Zomato <span className="text-primary">Reels</span>
        </span>
        <button
          type="button"
          onClick={() => setIsMuted((m) => !m)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-black/55 transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>
      </motion.div>

      {/* Right action rail */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: isActive ? 0 : 20, opacity: isActive ? 1 : 0.5 }}
        transition={{ delay: 0.1, duration: 0.35 }}
        className="absolute right-3 sm:right-4 bottom-28 sm:bottom-32 z-10 flex flex-col items-center gap-5"
      >
        <button
          type="button"
          onClick={handleLike}
          className="flex flex-col items-center gap-1 group"
          aria-label="Like"
        >
          <motion.span
            whileTap={{ scale: 0.85 }}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-md border transition-colors",
              liked
                ? "bg-primary/90 border-primary text-white"
                : "bg-black/40 border-white/20 text-white group-hover:bg-black/55",
            )}
          >
            <Heart className={cn("w-6 h-6", liked && "fill-current")} />
          </motion.span>
          <span className="text-xs font-semibold text-white drop-shadow">
            {formatReelCount(likeCount)}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setSaved((s) => !s)}
          className="flex flex-col items-center gap-1 group"
          aria-label="Save"
        >
          <motion.span
            whileTap={{ scale: 0.85 }}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-md border transition-colors",
              saved
                ? "bg-amber-500/90 border-amber-400 text-white"
                : "bg-black/40 border-white/20 text-white group-hover:bg-black/55",
            )}
          >
            <Bookmark className={cn("w-6 h-6", saved && "fill-current")} />
          </motion.span>
          <span className="text-xs font-semibold text-white drop-shadow">
            Save
          </span>
        </button>

        <button
          type="button"
          className="flex flex-col items-center gap-1 group"
          aria-label="Share"
        >
          <motion.span
            whileTap={{ scale: 0.85 }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white group-hover:bg-black/55 transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </motion.span>
          <span className="text-xs font-semibold text-white drop-shadow">
            Share
          </span>
        </button>
      </motion.div>

      {/* Bottom overlay */}
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: isActive ? 0 : 24, opacity: isActive ? 1 : 0.6 }}
        transition={{ delay: 0.05, duration: 0.4 }}
        className="absolute left-0 right-14 sm:right-16 bottom-0 z-10 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-16"
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.img
            src={reel.foodPartnerId.avatar}
            alt={"avatar-image"}
            className="h-11 w-11 rounded-full object-cover ring-2 ring-primary/80 ring-offset-2 ring-offset-black/30"
            whileHover={{ scale: 1.05 }}
          />
          <motion.div className="min-w-0 flex-1">
            <p className="font-bold text-white text-sm sm:text-base truncate drop-shadow">
              {reel.foodPartnerId.name}
            </p>
            <p className="text-xs text-white/80 truncate">
              {reel.foodPartnerId.contactName}
            </p>
          </motion.div>
          <Button
            type="button"
            size="sm"
            className="shrink-0 rounded-full h-9 px-4 text-xs sm:text-sm font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30 border-0 gap-1.5"
          >
            <UserRound className="w-3.5 h-3.5" />
            View profile
          </Button>
        </div>

        <p className="text-sm sm:text-base text-white/95 leading-relaxed line-clamp-3 drop-shadow-md mb-2">
          {reel.description}
        </p>

        {reel.foodPartnerId.address && (
          <motion.div
            className="flex items-center gap-1.5 text-xs text-white/75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="truncate">{reel.foodPartnerId.address}</span>
          </motion.div>
        )}
      </motion.div>

      {!isActive && (
        <div className="absolute inset-0 z-5 bg-black/20 pointer-events-none" />
      )}
    </section>
  );
};

export default ReelSlide;
