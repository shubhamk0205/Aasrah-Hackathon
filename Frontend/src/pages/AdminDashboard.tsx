import { motion } from "framer-motion";
import { Shield, Users, FileText, TrendingUp, Monitor, Settings, LogOut } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { auth } from "../database/FirebaseConfig";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/userSlice";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(logout());
      toast({
        title: "Logged Out Successfully",
        description: "You have been logged out. Redirecting...",
      });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Logout Button */}
        <div className="flex justify-end mb-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-blue-700 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </motion.div>
        </div>

        {/* Header Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            System monitoring and management tools for platform administration
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="border-2 border-blue-100 hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total NGOs</CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +5 this week
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-2 border-green-100 hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Reports</CardTitle>
                <FileText className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89</div>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +12 today
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="border-2 border-orange-100 hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
                <Monitor className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">99.9%</div>
                <p className="text-xs text-green-600">
                  Excellent performance
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="border-2 border-purple-100 hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Response Time</CardTitle>
                <TrendingUp className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.3min</div>
                <p className="text-xs text-green-600">
                  Average response time
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Admin Tools Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="h-full border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="text-center pb-4">
                <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <CardTitle className="text-xl font-bold text-gray-900">NGO Management</CardTitle>
                <CardDescription className="text-gray-600">
                  Verify and manage registered NGOs
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="h-full border-2 border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="text-center pb-4">
                <FileText className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-xl font-bold text-gray-900">Report Analytics</CardTitle>
                <CardDescription className="text-gray-600">
                  View detailed reports and analytics
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Card className="h-full border-2 border-orange-100 hover:border-orange-300 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="text-center pb-4">
                <Monitor className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <CardTitle className="text-xl font-bold text-gray-900">System Monitor</CardTitle>
                <CardDescription className="text-gray-600">
                  Real-time system performance monitoring
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="h-full border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="text-center pb-4">
                <Settings className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <CardTitle className="text-xl font-bold text-gray-900">System Settings</CardTitle>
                <CardDescription className="text-gray-600">
                  Configure platform settings and preferences
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Card className="h-full border-2 border-red-100 hover:border-red-300 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="text-center pb-4">
                <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <CardTitle className="text-xl font-bold text-gray-900">Content Moderation</CardTitle>
                <CardDescription className="text-gray-600">
                  Review and moderate user-generated content
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Card className="h-full border-2 border-teal-100 hover:border-teal-300 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="text-center pb-4">
                <TrendingUp className="w-12 h-12 text-teal-500 mx-auto mb-4" />
                <CardTitle className="text-xl font-bold text-gray-900">Performance Reports</CardTitle>
                <CardDescription className="text-gray-600">
                  Generate detailed performance reports
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
