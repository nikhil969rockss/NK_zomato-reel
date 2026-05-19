import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Flame, Eye, EyeOff, ArrowLeft, Loader2Icon } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { useAppDispatch } from "@/redux/hooks";
import { toast } from "react-toastify";
import { setUser } from "@/redux/slices/userSlice";

const RegisterUserPage = () => {
  //states
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  //hooks
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //functions
  async function handleSubmitRegister(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const fullName = e.target.firstName.value + e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const registerInputBody = {
      fullName,
      email,
      password,
    };
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "auth/register",
        registerInputBody,
      );

      toast.success("User registered successfully");
      dispatch(setUser(response.data?.data));
      navigate("/food-reels");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to register");
      console.log(error?.response?.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-red-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(239,68,68,0.06),transparent_50%)]" />

      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
              <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Back to home
              </span>
            </Link>
            <Link
              to="/food-partner/register"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Register as food partner →
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex w-14 h-14 bg-primary rounded-2xl items-center justify-center mb-4"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Flame className="w-8 h-8 text-primary-foreground" />
            </motion.div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Create your account
            </h1>
            <p className="mt-2 text-muted-foreground">
              Join 50K+ foodies discovering their next favorite meal
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 p-6 sm:p-8 shadow-xl shadow-black/5"
          >
            <form onSubmit={handleSubmitRegister} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium text-foreground"
                  >
                    First Name
                  </label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    className="h-12 rounded-xl text-base mt-2"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-medium text-foreground"
                  >
                    Last Name
                  </label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    className="h-12 rounded-xl text-base mt-2"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="h-12 rounded-xl text-base mt-2"
                  autoComplete="current-password"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    className="h-12 rounded-xl text-base pr-1 mt-2"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 flex items-center justify-center rounded-xl text-base font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
              >
                {loading ? (
                  <Loader2Icon className="w-4 h-4 animate-spin" />
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Log in
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterUserPage;
