import { Link, useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus, ArrowLeft, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, FormEvent, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginStart, loginSuccess, loginFailure } from "@/store/slices/userSlice";

const UserRegistration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated, currentUser } = useAppSelector((state) => state.user);
  const [isLogin, setIsLogin] = useState(false);

  // Form state variables
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [phone, setPhone] = useState("");

  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated && currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      if (isLogin) {
        // Handle login logic
        console.log("Login with:", { email, password });
        // For demo purposes, always allow login
        dispatch(loginSuccess({
          email,
          role: 'user'
        }));
        
        toast({
          title: "Login Successful!",
          description: "Welcome back! Redirecting to dashboard...",
        });
      } else {
        // Validate passwords match
        if (password !== retypePassword) {
          dispatch(loginFailure("Passwords do not match!"));
          toast({
            title: "Registration Failed",
            description: "Passwords do not match!",
            variant: "destructive",
          });
          return;
        }
        // Handle registration logic
        console.log("Register with:", { fullName, email, password, phone });
        dispatch(loginSuccess({
          fullName,
          email,
          phone,
          role: 'user'
        }));
        
        toast({
          title: "Registration Successful!",
          description: "Welcome to our platform! Redirecting to dashboard...",
        });
      }
      
      // Navigate after successful login/registration
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      dispatch(loginFailure(error instanceof Error ? error.message : "An error occurred"));
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 px-4 py-8">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center text-green-600 hover:text-green-700 font-medium mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Home
      </Link>

      <div className="container mx-auto max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              {isLogin ? (
                <LogIn className="w-10 h-10 text-white" />
              ) : (
                <UserPlus className="w-10 h-10 text-white" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? "User Login" : "User Registration"}
            </h1>
            <p className="text-gray-600">
              {isLogin
                ? "Welcome back! Please login to your account"
                : "Join our community to help save lives and support humanitarian efforts"}
            </p>
          </div>

          {/* Registration/Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-gray-700 font-medium">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full p-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                className="w-full p-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder={isLogin ? "Enter your password" : "Create your password"}
                className="w-full p-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label
                    htmlFor="retypePassword"
                    className="text-gray-700 font-medium"
                  >
                    Retype Password <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="retypePassword"
                    type="password"
                    placeholder="Retype your password"
                    className="w-full p-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    required
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700 font-medium">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="w-full p-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Processing..." : (isLogin ? "Log In" : "Register Now")}
            </Button>

            {error && (
              <div className="text-red-500 text-center text-sm">
                {error}
              </div>
            )}

            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  // Reset form fields when switching between login and register
                  setFullName("");
                  setEmail("");
                  setPassword("");
                  setRetypePassword("");
                  setPhone("");
                }}
                className="text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                {isLogin
                  ? "Don't have an account? Register"
                  : "Already have an account? Log In"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UserRegistration;
