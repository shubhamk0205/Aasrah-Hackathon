import { Link, useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, ArrowLeft, Users, UserPlus, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, FormEvent } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginStart, loginSuccess, loginFailure } from "@/store/slices/userSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../database/FirebaseConfig";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated, currentUser } = useAppSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<'user' | 'ngo' | 'admin'>('user');

  // If user is already authenticated, redirect to role-specific dashboard
  if (isAuthenticated && currentUser) {
    const dashboardPaths = {
      user: '/dashboard',
      admin: '/admin-dashboard',
      ngo: '/ngo-dashboard'
    };
    return <Navigate to={dashboardPaths[currentUser.role as keyof typeof dashboardPaths]} replace />;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login with:", { email, role });
      
      dispatch(loginSuccess({
        email,
        role: role === 'ngo' ? 'user' : role // Convert 'ngo' to 'user' for Redux store compatibility
      }));
      
      toast({
        title: "Login Successful!",
        description: "Welcome back! Redirecting to dashboard...",
      });
      
      // Navigate based on role
      const dashboardPaths = {
        user: '/dashboard',
        admin: '/admin-dashboard',
        ngo: '/ngo-dashboard'
      };
      
      setTimeout(() => {
        navigate(dashboardPaths[role]);
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

  const getRoleStyles = () => {
    switch (role) {
      case 'ngo':
        return {
          bg: 'from-blue-50 via-white to-blue-50',
          button: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
          icon: 'bg-blue-500',
          border: 'border-blue-200',
          focus: 'focus:border-blue-500 focus:ring-blue-500'
        };
      case 'admin':
        return {
          bg: 'from-orange-50 via-white to-orange-50',
          button: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
          icon: 'bg-orange-500',
          border: 'border-orange-200',
          focus: 'focus:border-orange-500 focus:ring-orange-500'
        };
      default:
        return {
          bg: 'from-green-50 via-white to-green-50',
          button: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
          icon: 'bg-green-500',
          border: 'border-green-200',
          focus: 'focus:border-green-500 focus:ring-green-500'
        };
    }
  };

  const styles = getRoleStyles();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${styles.bg} px-4 py-8`}>
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center text-gray-600 hover:text-gray-700 font-medium mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Home
      </Link>

      <div className="container mx-auto max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`bg-white rounded-2xl shadow-xl p-8 ${styles.border}`}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className={`w-20 h-20 ${styles.icon} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
              <LogIn className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Login
            </h1>
            <p className="text-gray-600">
              Sign in to access your account
            </p>
          </div>

          {/* Role Selection */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              type="button"
              variant={role === 'ngo' ? 'default' : 'outline'}
              className={`flex items-center gap-2 ${role === 'ngo' ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
              onClick={() => setRole('ngo')}
            >
              <div className={`w-6 h-6 ${role === 'ngo' ? 'bg-blue-600' : 'bg-blue-500'} rounded-lg flex items-center justify-center`}>
                <Users className="w-3 h-3 text-white" />
              </div>
              NGO
            </Button>
            <Button
              type="button"
              variant={role === 'user' ? 'default' : 'outline'}
              className={`flex items-center gap-2 ${role === 'user' ? 'bg-green-500 hover:bg-green-600' : ''}`}
              onClick={() => setRole('user')}
            >
              <div className={`w-6 h-6 ${role === 'user' ? 'bg-green-600' : 'bg-green-500'} rounded-lg flex items-center justify-center`}>
                <UserPlus className="w-3 h-3 text-white" />
              </div>
              User
            </Button>
            <Button
              type="button"
              variant={role === 'admin' ? 'default' : 'outline'}
              className={`flex items-center gap-2 ${role === 'admin' ? 'bg-orange-500 hover:bg-orange-600' : ''}`}
              onClick={() => setRole('admin')}
            >
              <div className={`w-6 h-6 ${role === 'admin' ? 'bg-orange-600' : 'bg-orange-500'} rounded-lg flex items-center justify-center`}>
                <Shield className="w-3 h-3 text-white" />
              </div>
              Admin
            </Button>
          </div>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                className={`w-full p-3 rounded-lg border ${styles.border} ${styles.focus}`}
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
                placeholder="Enter your password"
                className={`w-full p-3 rounded-lg border ${styles.border} ${styles.focus}`}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className={`w-full bg-gradient-to-r ${styles.button} text-white py-3 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
              disabled={loading}
            >
              {loading ? "Processing..." : "Log In"}
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

export default Login; 