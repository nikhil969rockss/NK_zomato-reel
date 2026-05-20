import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2Icon,
  MapPin,
  Phone,
  Store,
  UtensilsCrossed,
  UserRound,
} from "lucide-react";
import axiosInstance from "@/lib/axios";
import { useAppDispatch } from "@/redux/hooks";
import { toast } from "react-toastify";

import { cn } from "@/lib/utils";
import { setFoodPartner } from "@/redux/slices/foodPartnerSlice";

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.35 + i * 0.06,
      duration: 0.45,
      ease: "easeOut" as const,
    },
  }),
};

const RegisterFoodPartnerPage = () => {
  //states
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  //hooks
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //functions
  async function handleSubmitRegister(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const registerInputBody = {
      name: formData.get("businessName") as string,
      contactName: formData.get("contactName") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/auth/food-partner/register",
        registerInputBody,
      );
      toast.success("Partner account created successfully");
      dispatch(setFoodPartner(response.data?.data));
      navigate("/create-food", { replace: true });
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      dispatch(setFoodPartner(null));
      toast.error(
        err?.response?.data?.message || "Failed to register partner account",
      );
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
      {/* Partner-tinted background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-linear-to-br from-amber-50 via-white to-orange-50"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(245,158,11,0.12),transparent_45%)]" />
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.06, 0.1, 0.06] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-amber-400/20 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.05, 0.09, 0.05] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-primary/15 blur-3xl"
      />

      {/* Floating decor */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 right-[12%] hidden lg:flex w-12 h-12 rounded-2xl bg-amber-100/80 border border-amber-200/60 items-center justify-center text-amber-700 shadow-sm"
      >
        <UtensilsCrossed className="w-6 h-6" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 12, 0], rotate: [0, -5, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute bottom-40 left-[10%] hidden lg:flex w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 items-center justify-center text-primary shadow-sm"
      >
        <MapPin className="w-5 h-5" />
      </motion.div>

      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative z-10"
      >
        <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Back to home
              </span>
            </Link>
            <Link
              to="/register"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Register as foodie →
            </Link>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="relative z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-16 pt-2">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="w-full max-w-lg"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-4"
            >
              <Badge
                variant="secondary"
                className="bg-amber-100 text-amber-800 hover:bg-amber-100/90 px-4 py-1.5 text-sm font-semibold rounded-full border border-amber-200/80"
              >
                <Store className="w-4 h-4 mr-1.5" />
                Food Partner Program
              </Badge>
            </motion.div>

            <motion.div
              className="relative inline-flex mb-4"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-amber-400 to-primary blur-md opacity-40 scale-110" />
              <motion.div
                className="relative w-16 h-16 bg-linear-to-br from-amber-500 to-primary rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25"
                whileHover={{ rotate: -4 }}
              >
                <Store className="w-9 h-9 text-white" />
              </motion.div>
              <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-white border-2 border-amber-200 flex items-center justify-center shadow-sm"
              >
                <UtensilsCrossed className="w-3.5 h-3.5 text-amber-600" />
              </motion.span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Grow your{" "}
              <span className="bg-linear-to-r from-amber-600 to-primary bg-clip-text text-transparent">
                kitchen brand
              </span>
            </h1>
            <p className="mt-2 text-muted-foreground max-w-md mx-auto">
              List your business, share food reels, and reach hungry customers
              near you
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.55 }}
            className="relative bg-card/85 backdrop-blur-xl rounded-3xl border border-amber-200/40 p-6 sm:p-8 shadow-xl shadow-amber-900/5 overflow-hidden"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-amber-400 via-primary to-amber-500 origin-left"
            />

            <form onSubmit={handleSubmitRegister} className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-700/90 mb-4 flex items-center gap-2">
                  <Store className="w-3.5 h-3.5" />
                  Business details
                </p>
                <motion.div
                  className="space-y-4"
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div custom={0} variants={fieldVariants}>
                    <label
                      htmlFor="businessName"
                      className="text-sm font-medium text-foreground"
                    >
                      Business name
                    </label>
                    <Input
                      id="businessName"
                      name="businessName"
                      type="text"
                      required
                      placeholder="Spice Garden Kitchen"
                      className="h-12 rounded-xl text-base mt-2 border-amber-100/80 focus-visible:border-amber-300"
                    />
                  </motion.div>

                  <motion.div custom={1} variants={fieldVariants}>
                    <label
                      htmlFor="contactName"
                      className="text-sm font-medium text-foreground flex items-center gap-1.5"
                    >
                      <UserRound className="w-3.5 h-3.5 text-muted-foreground" />
                      Contact name
                    </label>
                    <Input
                      id="contactName"
                      name="contactName"
                      type="text"
                      required
                      placeholder="Priya Sharma"
                      className="h-12 rounded-xl text-base mt-2"
                    />
                  </motion.div>

                  <motion.div className="grid sm:grid-cols-2 gap-4">
                    <motion.div custom={2} variants={fieldVariants}>
                      <label
                        htmlFor="phone"
                        className="text-sm font-medium text-foreground flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                        Phone
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        className="h-12 rounded-xl text-base mt-2"
                      />
                    </motion.div>

                    <motion.div custom={3} variants={fieldVariants}>
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-foreground"
                      >
                        Business email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="hello@yourkitchen.com"
                        autoComplete="email"
                        className="h-12 rounded-xl text-base mt-2"
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div custom={4} variants={fieldVariants}>
                    <label
                      htmlFor="address"
                      className="text-sm font-medium text-foreground flex items-center gap-1.5"
                    >
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                      Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      required
                      rows={3}
                      placeholder="Shop 12, Food Street, Bandra West, Mumbai"
                      className={cn(
                        "flex w-full min-w-0 rounded-xl border border-input bg-transparent px-3 py-3 text-base mt-2 transition-colors outline-none resize-none",
                        "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                        "md:text-sm",
                      )}
                    />
                  </motion.div>
                </motion.div>
              </div>

              <div className="border-t border-border/60 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  Account security
                </p>
                <motion.div
                  custom={5}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-foreground"
                  >
                    Password
                  </label>
                  <motion.div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={6}
                      placeholder="Min. 6 characters"
                      autoComplete="new-password"
                      className="h-12 rounded-xl text-base pr-12 mt-2"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 translate-y-0.5 text-muted-foreground hover:text-foreground transition-colors"
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
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.45 }}
              >
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 flex items-center justify-center gap-2 rounded-xl text-base font-semibold bg-linear-to-r from-amber-500 to-primary hover:from-amber-600 hover:to-primary/90 shadow-lg shadow-amber-500/20 border-0"
                >
                  {loading ? (
                    <Loader2Icon className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Store className="w-4 h-4" />
                      Join as Partner
                    </>
                  )}
                </Button>
              </motion.div>
            </form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="mt-6 text-center text-sm text-muted-foreground"
            >
              Already a partner?{" "}
              <Link
                to="/food-partner/login"
                className="font-semibold text-amber-700 hover:text-amber-800 transition-colors"
              >
                Partner log in
              </Link>
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default RegisterFoodPartnerPage;
