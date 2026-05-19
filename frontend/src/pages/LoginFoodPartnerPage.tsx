import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FOOD_IMAGES } from "@/lib/constants";
import {
  ArrowLeft,
  ArrowRight,
  ChefHat,
  Eye,
  EyeOff,
  Loader2Icon,
  Lock,
  Mail,
  MapPin,
  Store,
  UtensilsCrossed,
} from "lucide-react";
import axiosInstance from "@/lib/axios";
import { useAppDispatch } from "@/redux/hooks";
import { toast } from "react-toastify";
import { setUser } from "@/redux/slices/userSlice";

const fieldVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.4 + i * 0.1,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
};

const LoginFoodPartnerPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const loginInput = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/auth/food-partner/login",
        loginInput,
      );
      dispatch(setUser(response.data?.data));
      toast.success("Partner login successful");
      navigate("/food-reels", { replace: true });
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-linear-to-br from-amber-50 via-white to-orange-50"
      />
      <motion.div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(245,158,11,0.12),transparent_45%)]" />
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.06, 0.1, 0.06] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-amber-400/20 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.05, 0.09, 0.05] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-primary/15 blur-3xl pointer-events-none"
      />

      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 right-[10%] hidden lg:flex w-12 h-12 rounded-2xl bg-amber-100/80 border border-amber-200/60 items-center justify-center text-amber-700 shadow-sm"
      >
        <UtensilsCrossed className="w-6 h-6" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 12, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-40 left-[8%] hidden lg:flex w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 items-center justify-center text-primary shadow-sm"
      >
        <MapPin className="w-5 h-5" />
      </motion.div>

      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Back to home
              </span>
            </Link>
            <Link
              to="/food-partner/register"
              className="text-sm text-muted-foreground hover:text-amber-700 transition-colors hidden sm:inline"
            >
              New partner? Join program →
            </Link>
            <Link
              to="/login"
              className="text-sm text-muted-foreground hover:text-primary transition-colors sm:hidden"
            >
              Foodie login →
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-16 pt-4">
        <motion.div className="w-full max-w-5xl grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Visual panel — desktop */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="hidden lg:block relative order-2 lg:order-1"
          >
            <div className="relative h-[520px]">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-44 h-56 rounded-3xl overflow-hidden shadow-2xl shadow-amber-900/10 border-4 border-white/80 rotate-6 z-10"
              >
                <img
                  src={FOOD_IMAGES[1]}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="absolute bottom-3 left-3 right-3 bg-black/50 backdrop-blur-md rounded-xl px-3 py-2 flex items-center gap-2"
                >
                  <ChefHat className="w-4 h-4 text-amber-300" />
                  <span className="text-xs font-medium text-white">
                    12K+ kitchens on reels
                  </span>
                </motion.div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 14, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute top-16 left-4 w-40 h-52 rounded-3xl overflow-hidden shadow-xl border-4 border-white/80 -rotate-8 z-20"
              >
                <img
                  src={FOOD_IMAGES[3]}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute bottom-8 right-20 w-36 h-44 rounded-3xl overflow-hidden shadow-lg border-4 border-white/80 -rotate-4 z-0"
              >
                <img
                  src={FOOD_IMAGES[4]}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="absolute bottom-24 left-0 bg-card/90 backdrop-blur-xl rounded-2xl border border-amber-200/50 p-4 shadow-lg z-30"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 8, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center"
                  >
                    <Store className="w-5 h-5 text-amber-700" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-bold">Your dashboard awaits</p>
                    <p className="text-xs text-muted-foreground">
                      Post reels · track orders
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Form panel */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="w-full max-w-md mx-auto lg:max-w-none order-1 lg:order-2"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="text-center lg:text-left mb-8"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="flex justify-center lg:justify-start mb-4"
              >
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-800 hover:bg-amber-100/90 px-4 py-1.5 text-sm font-semibold rounded-full border border-amber-200/80"
                >
                  <Store className="w-4 h-4 mr-1.5" />
                  Partner portal
                </Badge>
              </motion.div>

              <motion.div
                className="relative inline-flex mb-4"
                whileHover={{ scale: 1.04 }}
              >
                <motion.div
                  animate={{ opacity: [0.35, 0.65, 0.35] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 rounded-2xl bg-linear-to-br from-amber-400 to-primary blur-lg scale-125"
                />
                <motion.div
                  className="relative w-14 h-14 bg-linear-to-br from-amber-500 to-primary rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25"
                  whileHover={{ rotate: -6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Store className="w-8 h-8 text-white" />
                </motion.div>
              </motion.div>

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                Log in to your{" "}
                <span className="bg-linear-to-r from-amber-600 to-primary bg-clip-text text-transparent">
                  kitchen
                </span>
              </h1>
              <p className="mt-2 text-muted-foreground">
                Manage reels, reach customers, and grow your food brand
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.55 }}
              className="relative bg-card/85 backdrop-blur-xl rounded-3xl border border-amber-200/40 p-6 sm:p-8 shadow-xl shadow-amber-900/5 overflow-hidden"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-amber-500 to-primary origin-left"
              />
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.45, duration: 0.5, ease: "easeOut" }}
                className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-amber-400 via-primary to-amber-500 origin-top"
              />

              <form className="space-y-5" onSubmit={handleLogin}>
                <motion.div
                  custom={0}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                    Business email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="hello@yourkitchen.com"
                    autoComplete="email"
                    className="h-12 rounded-xl text-base mt-2 border-amber-100/80 focus-visible:border-amber-300"
                  />
                </motion.div>

                <motion.div
                  custom={1}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-foreground flex items-center gap-1.5"
                    >
                      <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                      Password
                    </label>
                    <button
                      type="button"
                      className="text-xs font-medium text-amber-700 hover:text-amber-800 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative mt-2">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="h-12 rounded-xl text-base pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.45 }}
                >
                  <Button
                    type="submit"
                    disabled={loading}
                    className="group w-full h-12 flex items-center justify-center gap-2 rounded-xl text-base font-semibold bg-linear-to-r from-amber-500 to-primary hover:from-amber-600 hover:to-primary/90 shadow-lg shadow-amber-500/20 border-0"
                  >
                    {loading ? (
                      <Loader2Icon className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Partner log in
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="relative my-6"
              >
                <motion.div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/60" />
                </motion.div>
                <motion.div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card/85 px-3 text-muted-foreground tracking-wider">
                    or
                  </span>
                </motion.div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.85 }}
                className="text-center text-sm text-muted-foreground"
              >
                Not a partner yet?{" "}
                <Link
                  to="/food-partner/register"
                  className="font-semibold text-amber-700 hover:text-amber-800 transition-colors"
                >
                  Register your kitchen
                </Link>
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-4 text-center text-xs text-muted-foreground"
              >
                Ordering food instead?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Log in as foodie →
                </Link>
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoginFoodPartnerPage;
