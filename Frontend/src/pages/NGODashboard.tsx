import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  DollarSign,
  ClipboardCheck,
  Users,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { auth } from "../database/FirebaseConfig";

// Static data for reports
const reportsData = {
  new: [
    { id: "REP001", category: "Stray Animal Feeding", date: "2024-03-20" },
    { id: "REP002", category: "Injured Animal Report", date: "2024-03-20" },
  ],
  inProgress: [
    { id: "REP004", category: "Animal Cruelty Investigation", date: "2024-03-18" },
    { id: "REP005", category: "Wildlife Rescue in Progress", date: "2024-03-17" },
    { id: "REP006", category: "Vaccination Drive Scheduled", date: "2024-03-16" },
  ],
  completed: [
    { id: "REP007", category: "Animal Shelter Construction", date: "2024-03-15" },
    { id: "REP008", category: "Adoption Camp Successful", date: "2024-03-14" },
    { id: "REP009", category: "Sterilization Program Completed", date: "2024-03-13" },
  ],
};

const NGODashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleAccept = (reportId: string) => {
    console.log(`Accepted report: ${reportId}`);
    // TODO: Implement accept logic
  };

  const handleDecline = (reportId: string) => {
    console.log(`Declined report: ${reportId}`);
    // TODO: Implement decline logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header with Logout Button */}
        <div className="flex justify-between items-center mb-12">
          {/* Centered Header Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              Hello Saviours ! 👋
            </h1>
            <p className="text-xl text-gray-700">
              Your dedication saves lives every day
            </p>
          </motion.div>

          {/* Logout Button */}
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

        {/* Reports Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* New Reports */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full border border-red-300 hover:border-red-500 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                    <AlertTriangle className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">New Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reportsData.new.map((report) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 rounded-lg border border-red-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{report.id}</p>
                        <p className="text-sm text-gray-700">{report.category}</p>
                      </div>
                      <p className="text-sm text-gray-600">{report.date}</p>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleAccept(report.id)}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDecline(report.id)}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Decline
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* In Progress Reports */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="h-full border border-yellow-300 hover:border-yellow-500 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">In Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reportsData.inProgress.map((report) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-yellow-50 rounded-lg border border-yellow-200"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{report.id}</p>
                        <p className="text-sm text-gray-700">{report.category}</p>
                      </div>
                      <p className="text-sm text-gray-600">{report.date}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Completed Reports */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="h-full border border-green-300 hover:border-green-500 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">Completed</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reportsData.completed.map((report) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 rounded-lg border border-green-200"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{report.id}</p>
                        <p className="text-sm text-gray-700">{report.category}</p>
                      </div>
                      <p className="text-sm text-gray-600">{report.date}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="border border-blue-300 hover:border-blue-500 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-800">Total Donations Received</CardTitle>
                <DollarSign className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">₹25,000</div>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  +15% from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="border border-blue-300 hover:border-blue-500 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-800">Total Reports Completed</CardTitle>
                <ClipboardCheck className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">156</div>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  +8% from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* NGO Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Reported Issue Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Card className="h-full border border-red-200 hover:border-red-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Reported Issue</CardTitle>
                <CardDescription className="text-gray-600">
                  View and manage reported incidents and emergencies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3">
                  View Issues
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Donation Received Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="h-full border border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Donation Received</CardTitle>
                <CardDescription className="text-gray-600">
                  Track and manage donations received by your organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                 <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3">
                   View Donations
                 </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* See the Management Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Card className="h-full border border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                  <ClipboardCheck className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Manage Organization</CardTitle>
                <CardDescription className="text-gray-600">
                  Access tools for managing your NGO's profile and settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3">
                  Manage
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NGODashboard; 