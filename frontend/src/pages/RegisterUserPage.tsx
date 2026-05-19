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
  Heart,
  Loader2Icon,
  Lock,
  Mail,
  Sparkles,
  UserRound,
  Users,
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
      delay: 0.4 + i * 0.08,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
};

const RegisterUserPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function handleSubmitRegister(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const registerInputBody = {
      fullName: `${formData.get("firstName")} ${formData.get("lastName")}`,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    setLoading(true);

    try {
      const response = await axiosInstance.post(
        "auth/register",
        registerInputBody,
      );

      toast.success("User registered successfully");
      dispatch(setUser(response.data?.data));
      navigate("/food-reels", { replace: true });
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Failed to register");
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
        className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute bottom-1/4 -left-24 w-80 h-80 rounded-full bg-red-400/15 blur-3xl pointer-events-none"
      />

      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="flex items-center justify-between h-16 sm:h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Back to home
              </span>
            </Link>
            <Link
              to="/login"
              className="text-sm text-muted-foreground hover:text-primary transition-colors hidden sm:inline"
            >
              Already have an account? Log in →
            </Link>
            <Link
              to="/food-partner/register"
              className="text-sm text-muted-foreground hover:text-primary transition-colors sm:hidden"
            >
              Food partner →
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div className="relative z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-16 pt-4">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Visual panel — desktop */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="hidden lg:block relative order-2 lg:order-1"
          >
            <div className="relative h-[540px]">
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-4 right-0 w-44 h-56 rounded-3xl overflow-hidden shadow-2xl shadow-black/10 border-4 border-white/80 rotate-6 z-10"
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
                  <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                  <span className="text-xs font-medium text-white">
                    50K+ foodies joined
                  </span>
                </motion.div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute top-20 left-0 w-40 h-52 rounded-3xl overflow-hidden shadow-xl border-4 border-white/80 -rotate-8 z-20"
              >
                <img
                  src={FOOD_IMAGES[3]}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute bottom-6 right-16 w-36 h-44 rounded-3xl overflow-hidden shadow-lg border-4 border-white/80 -rotate-4 z-0"
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
                className="absolute bottom-28 left-4 bg-card/90 backdrop-blur-xl rounded-2xl border border-border/50 p-4 shadow-lg z-30"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"
                  >
                    <Users className="w-5 h-5 text-primary" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-bold">
                      Your journey starts here
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Reels · saves · orders
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-8 left-24 w-12 h-12 rounded-2xl bg-white/90 shadow-md border border-border/40 flex items-center justify-center z-30"
              >
                <Sparkles className="w-5 h-5 text-primary" />
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
                  className="bg-primary/10 text-primary hover:bg-primary/15 px-4 py-1.5 text-sm font-semibold rounded-full border-0"
                >
                  <Sparkles className="w-4 h-4 mr-1.5" />
                  Join the foodie community
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
                Create your{" "}
                <span className="bg-linear-to-r from-primary to-red-500 bg-clip-text text-transparent">
                  food story
                </span>
              </h1>
              <p className="mt-2 text-muted-foreground">
                Join 50K+ foodies discovering their next favorite meal
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

              <form onSubmit={handleSubmitRegister} className="space-y-5">
                <motion.div
                  custom={0}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="text-sm font-medium text-foreground flex items-center gap-1.5"
                    >
                      <UserRound className="w-3.5 h-3.5 text-muted-foreground" />
                      First name
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      placeholder="John"
                      className="h-12 rounded-xl text-base mt-2"
                    />
                  </div>
                  <motion.div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="text-sm font-medium text-foreground"
                    >
                      Last name
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      placeholder="Doe"
                      className="h-12 rounded-xl text-base mt-2"
                    />
                  </motion.div>
                </motion.div>

                <motion.div
                  custom={1}
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
                    placeholder="john@example.com"
                    autoComplete="email"
                    className="h-12 rounded-xl text-base mt-2"
                  />
                </motion.div>

                <motion.div
                  custom={2}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-foreground flex items-center gap-1.5"
                  >
                    <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                    Password
                  </label>
                  <div className="relative mt-2">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={6}
                      placeholder="Min. 6 characters"
                      autoComplete="new-password"
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
                  transition={{ delay: 0.7, duration: 0.45 }}
                >
                  <Button
                    type="submit"
                    disabled={loading}
                    className="group w-full h-12 flex items-center justify-center gap-2 rounded-xl text-base font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 cursor-pointer "
                  >
                    {loading ? (
                      <Loader2Icon className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Create account
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.85 }}
                className="relative my-6"
              >
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/60" />
                </div>
                <motion.div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card/85 px-3 text-muted-foreground tracking-wider">
                    or
                  </span>
                </motion.div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-center text-sm text-muted-foreground"
              >
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Log in
                </Link>
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.95 }}
                className="mt-4 text-center text-xs text-muted-foreground hidden sm:block"
              >
                Running a kitchen?{" "}
                <Link
                  to="/food-partner/register"
                  className="font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Register as food partner →
                </Link>
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RegisterUserPage;
