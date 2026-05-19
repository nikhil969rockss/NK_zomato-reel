import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import BackgroundTheme from "@/components/BackgroundTheme";
import { FOOD_IMAGES } from "@/lib/constants";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Flame,
  Lock,
  Mail,
  Play,
  Sparkles,
  Loader2Icon,
} from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import axiosInstance from "@/lib/axios";
import { setUser } from "@/redux/slices/userSlice";
import { toast } from "react-toastify";

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

const LoginUserPage = () => {
  //states
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  //hooks
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //functions
  async function handleLogin(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const loginInput = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/login", loginInput);
      dispatch(setUser(response.data?.data));
      toast.success("Login successful");
      navigate("/food-reels", { replace: true });
    } catch (error: unknown) {
      const err = error as { response: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to login");
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
      <BackgroundTheme />

      <motion.div
        animate={{ scale: [1, 1.06, 1], opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute bottom-1/4 -right-24 w-80 h-80 rounded-full bg-red-400/15 blur-3xl pointer-events-none"
      />

      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative z-10"
      >
        <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="flex items-center justify-between h-16 sm:h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Back to home
              </span>
            </Link>
            <Link
              to="/register"
              className="text-sm text-muted-foreground hover:text-primary transition-colors hidden sm:inline"
            >
              New here? Create account →
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="relative z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-16 pt-4">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Visual panel — desktop */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="hidden lg:block relative"
          >
            <div className="relative h-[520px]">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-0 left-0 w-44 h-56 rounded-3xl overflow-hidden shadow-2xl shadow-black/10 border-4 border-white/80 -rotate-6 z-10"
              >
                <img
                  src={FOOD_IMAGES[0]}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="absolute bottom-3 left-3 right-3 bg-black/50 backdrop-blur-md rounded-xl px-3 py-2 flex items-center gap-2"
                >
                  <Play className="w-4 h-4 text-white fill-white" />
                  <span className="text-xs font-medium text-white">
                    2.4M reels watched today
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
                className="absolute top-16 right-4 w-40 h-52 rounded-3xl overflow-hidden shadow-xl border-4 border-white/80 rotate-8 z-20"
              >
                <img
                  src={FOOD_IMAGES[2]}
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
                className="absolute bottom-8 left-20 w-36 h-44 rounded-3xl overflow-hidden shadow-lg border-4 border-white/80 rotate-4 z-0"
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
                className="absolute bottom-24 right-0 bg-card/90 backdrop-blur-xl rounded-2xl border border-border/50 p-4 shadow-lg z-30"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"
                  >
                    <Flame className="w-5 h-5 text-primary" />
                  </motion.div>
                  <motion.div>
                    <p className="text-sm font-bold">Your feed awaits</p>
                    <p className="text-xs text-muted-foreground">
                      Pick up where you left off
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Form panel */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="w-full max-w-md mx-auto lg:max-w-none"
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
                  className="bg-primary/10 text-primary hover:bg-primary/15 px-4 py-1.5 text-sm font-semibold rounded-full border-0"
                >
                  <Sparkles className="w-4 h-4 mr-1.5" />
                  Welcome back, foodie
                </Badge>
              </motion.div>

              <motion.div
                className="relative inline-flex mb-4"
                whileHover={{ scale: 1.04 }}
              >
                <motion.div
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 rounded-2xl bg-primary blur-lg scale-125"
                />
                <motion.div
                  className="relative w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30"
                  whileHover={{ rotate: 6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Flame className="w-8 h-8 text-primary-foreground" />
                </motion.div>
              </motion.div>

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                Log in to your{" "}
                <span className="bg-linear-to-r from-primary to-red-500 bg-clip-text text-transparent">
                  cravings
                </span>
              </h1>
              <p className="mt-2 text-muted-foreground">
                Scroll reels, save spots, and order what makes you hungry
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.55 }}
              className="relative bg-card/85 backdrop-blur-xl rounded-3xl border border-border/50 p-6 sm:p-8 shadow-xl shadow-black/5 overflow-hidden"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary to-transparent origin-left"
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
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="h-12 rounded-xl text-base mt-2"
                  />
                </motion.div>

                <motion.div
                  custom={1}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-foreground flex items-center gap-1.5"
                    >
                      <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                      Password
                    </label>
                  </motion.div>
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
                    className="group w-full h-12 flex items-center cursor-pointer  justify-center gap-2 rounded-xl text-base font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
                  >
                    {loading ? (
                      <Loader2Icon className="size-5 animate-spin" />
                    ) : (
                      "Login"
                    )}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-primary cursor-pointer  hover:text-primary/80 transition-colors"
                >
                  Sign up free
                </Link>
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-4 text-center text-xs text-muted-foreground sm:hidden"
              >
                <Link
                  to="/food-partner/login"
                  className="hover:text-primary cursor-pointer transition-colors"
                >
                  Log in as food partner →
                </Link>
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginUserPage;
