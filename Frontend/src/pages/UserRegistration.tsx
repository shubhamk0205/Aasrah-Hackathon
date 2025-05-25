import { Link, useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, FormEvent } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginStart, loginSuccess, loginFailure } from "@/store/slices/userSlice";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../database/FirebaseConfig";

const UserRegistration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated, currentUser } = useAppSelector((state) => state.user);

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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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
      
      // Navigate after successful registration
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
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
              <UserPlus className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              User Registration
            </h1>
            <p className="text-gray-600">
              Join our community to help save lives and support humanitarian efforts
            </p>
          </div>

          {/* Registration Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                placeholder="Create your password"
                className="w-full p-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

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

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Processing..." : "Register Now"}
            </Button>

            {error && (
              <div className="text-red-500 text-center text-sm">
                {error}
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UserRegistration;
