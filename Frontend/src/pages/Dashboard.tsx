import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { AlertTriangle, Heart, FileText, TrendingUp, DollarSign, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/userSlice";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { currentUser } = useAppSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    toast({
      title: "Logged Out Successfully",
      description: "You have been logged out. Redirecting...",
    });
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header with Logout Button */}
        <div className="flex justify-between items-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              Welcome, {currentUser?.fullName || 'User'}! 👋
            </h1>
            <p className="text-xl text-gray-600">
              Your Dashboard - Manage emergencies, track donations, and make a difference
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-2 border-blue-100 hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                <FileText className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +12% from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="border-2 border-green-100 hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
                <DollarSign className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹45,230</div>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +8% from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="h-full border-2 border-red-100 hover:border-red-300 transition-all duration-300 hover:shadow-xl group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">Report an Issue</CardTitle>
                <CardDescription className="text-gray-600">
                  Submit emergency reports with photos and location details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/report" className="block">
                  <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 text-lg font-semibold">
                    Report Emergency
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="h-full border-2 border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-xl group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">Make a Donation</CardTitle>
                <CardDescription className="text-gray-600">
                  Support NGOs with secure donations and track your impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/donate" className="block">
                  <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 text-lg font-semibold">
                    Donate Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="h-full border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-xl group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">My Reports</CardTitle>
                <CardDescription className="text-gray-600">
                  View and track all your submitted emergency reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/my-reports" className="block">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 text-lg font-semibold">
                    View Reports
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
