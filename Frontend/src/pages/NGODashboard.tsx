import { useState, useEffect, useRef } from "react";
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
import { auth, db } from "../database/FirebaseConfig";
import { collection, query, where, getDocs, orderBy, doc, updateDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

interface Report {
  id: string;
  description: string;
  animalType: string;
  location: string;
  createdAt: string;
  status: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const NGODashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [newReports, setNewReports] = useState<Report[]>([]);
  const [inProgressReports, setInProgressReports] = useState<Report[]>([]);
  const [completedReports, setCompletedReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);

  // References to store previous report states
  const prevNewReports = useRef<Report[]>([]);
  const prevInProgressReports = useRef<Report[]>([]);
  const prevCompletedReports = useRef<Report[]>([]);

  // Function to check if reports have changed
  const haveReportsChanged = (oldReports: Report[], newReports: Report[]) => {
    if (oldReports.length !== newReports.length) return true;
    
    const oldIds = new Set(oldReports.map(r => r.id));
    const newIds = new Set(newReports.map(r => r.id));
    
    // Check if any IDs are different
    for (const id of oldIds) {
      if (!newIds.has(id)) return true;
    }
    for (const id of newIds) {
      if (!oldIds.has(id)) return true;
    }
    
    return false;
  };

  // Function to fetch reports by status
  const fetchReportsByStatus = async (status: string) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("No user logged in");
        return [];
      }

      console.log(`Fetching reports with status: ${status}`);
      const reportsRef = collection(db, "reports");
      
      // First check if there are any reports at all
      const allReportsQuery = query(reportsRef);
      const allReportsSnapshot = await getDocs(allReportsQuery);
      console.log(`Total reports in database: ${allReportsSnapshot.size}`);
      
      // Log all reports for debugging
      allReportsSnapshot.forEach((doc) => {
        const data = doc.data();
        console.log('All report data:', {
          id: doc.id,
          status: data.status,
          animalType: data.animalType,
          createdAt: data.createdAt,
          userEmail: data.userEmail
        });
      });

      // Then query for specific status
      const statusQuery = query(
        reportsRef,
        where("status", "==", status)
      );

      const statusSnapshot = await getDocs(statusQuery);
      console.log(`Found ${statusSnapshot.size} reports with status: ${status}`);

      const reports: Report[] = [];
      statusSnapshot.forEach((doc) => {
        const data = doc.data();
        reports.push({
          id: doc.id,
          description: data.description || "",
          animalType: data.animalType || "",
          location: data.location || "",
          createdAt: data.createdAt || new Date().toISOString(),
          status: data.status || status,
          coordinates: data.coordinates || null
        });
      });

      return reports;
    } catch (error) {
      console.error(`Error in fetchReportsByStatus for ${status}:`, error);
      toast({
        title: "Error Fetching Reports",
        description: `Failed to fetch ${status.toLowerCase()} reports: ${error.message}`,
        variant: "destructive",
      });
      return [];
    }
  };

  // Function to fetch all reports
  const fetchAllReports = async () => {
    setLoading(true);
    try {
      console.log("Fetching all reports...");
      
      const [newReports, inProgress, completed] = await Promise.all([
        fetchReportsByStatus("Submitted"),
        fetchReportsByStatus("In Progress"),
        fetchReportsByStatus("Completed")
      ]);

      console.log("Reports fetched:", {
        submitted: newReports.length,
        inProgress: inProgress.length,
        completed: completed.length
      });

      // Only update states if there are changes
      if (haveReportsChanged(newReports, prevNewReports.current)) {
        console.log("New reports changed:", {
          old: prevNewReports.current.length,
          new: newReports.length
        });
        setNewReports(newReports);
        if (newReports.length > prevNewReports.current.length) {
          toast({
            title: "New Reports Available",
            description: `${newReports.length - prevNewReports.current.length} new reports need your attention.`,
          });
        }
        prevNewReports.current = newReports;
      }

      if (haveReportsChanged(inProgress, prevInProgressReports.current)) {
        console.log("In progress reports changed");
        setInProgressReports(inProgress);
        prevInProgressReports.current = inProgress;
      }

      if (haveReportsChanged(completed, prevCompletedReports.current)) {
        console.log("Completed reports changed");
        setCompletedReports(completed);
        prevCompletedReports.current = completed;
      }

    } catch (error) {
      console.error("Error in fetchAllReports:", error);
      toast({
        title: "Error",
        description: "Failed to fetch reports. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Set up polling interval with immediate first fetch
  useEffect(() => {
    console.log("Setting up report polling...");
    fetchAllReports(); // Initial fetch

    const interval = setInterval(() => {
      console.log("Polling for new reports...");
      fetchAllReports();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleAccept = async (reportId: string) => {
    try {
      const reportRef = doc(db, "reports", reportId);
      await updateDoc(reportRef, {
        status: "In Progress",
        acceptedAt: new Date().toISOString(),
        acceptedBy: auth.currentUser?.uid
      });

      toast({
        title: "Report Accepted",
        description: "You have accepted this emergency report.",
      });

      // Refresh reports
      fetchAllReports();
    } catch (error) {
      console.error("Error accepting report:", error);
      toast({
        title: "Error",
        description: "Failed to accept report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDecline = async (reportId: string) => {
    try {
      const reportRef = doc(db, "reports", reportId);
      await updateDoc(reportRef, {
        status: "Declined",
        declinedAt: new Date().toISOString(),
        declinedBy: auth.currentUser?.uid
      });

      toast({
        title: "Report Declined",
        description: "You have declined this emergency report.",
      });

      // Refresh reports
      fetchAllReports();
    } catch (error) {
      console.error("Error declining report:", error);
      toast({
        title: "Error",
        description: "Failed to decline report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleMarkAsComplete = async (reportId: string) => {
    try {
      const reportRef = doc(db, "reports", reportId);
      await updateDoc(reportRef, {
        status: "Completed",
        completedAt: new Date().toISOString(),
        completedBy: auth.currentUser?.uid
      });

      toast({
        title: "Report Completed",
        description: "The emergency has been marked as completed.",
      });

      // Refresh reports
      fetchAllReports();
    } catch (error) {
      console.error("Error completing report:", error);
      toast({
        title: "Error",
        description: "Failed to mark report as completed. Please try again.",
        variant: "destructive",
      });
    }
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
                <CardTitle className="text-xl font-bold text-gray-900">
                  New Reports {newReports.length > 0 && `(${newReports.length})`}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                  </div>
                ) : newReports.length === 0 ? (
                  <p className="text-center text-gray-500">No new reports</p>
                ) : (
                  newReports.map((report) => (
                    <motion.div
                      key={report.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-50 rounded-lg border border-red-200"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">{report.animalType}</p>
                            <p className="text-sm text-gray-700">{report.description}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{report.location}</p>
                        <div className="flex gap-2 mt-2">
                          <Button
                            onClick={() => handleAccept(report.id)}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Accept
                          </Button>
                          <Button
                            onClick={() => handleDecline(report.id)}
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:bg-red-50"
                          >
                            Decline
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
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
                <CardTitle className="text-xl font-bold text-gray-900">
                  In Progress {inProgressReports.length > 0 && `(${inProgressReports.length})`}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
                  </div>
                ) : inProgressReports.length === 0 ? (
                  <p className="text-center text-gray-500">No reports in progress</p>
                ) : (
                  inProgressReports.map((report) => (
                    <motion.div
                      key={report.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-yellow-50 rounded-lg border border-yellow-200"
                    >
                      <div className="flex flex-col gap-2">
                        <div>
                          <p className="font-medium text-gray-900">{report.animalType}</p>
                          <p className="text-sm text-gray-700">{report.description}</p>
                          <p className="text-sm text-gray-600 mt-1">{report.location}</p>
                        </div>
                        <div className="flex justify-end mt-2">
                          <Button
                            onClick={() => handleMarkAsComplete(report.id)}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark as Complete
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
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
                <CardTitle className="text-xl font-bold text-gray-900">
                  Completed {completedReports.length > 0 && `(${completedReports.length})`}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                  </div>
                ) : completedReports.length === 0 ? (
                  <p className="text-center text-gray-500">No completed reports</p>
                ) : (
                  completedReports.map((report) => (
                    <motion.div
                      key={report.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-50 rounded-lg border border-green-200"
                    >
                      <div className="flex flex-col gap-2">
                        <div>
                          <p className="font-medium text-gray-900">{report.animalType}</p>
                          <p className="text-sm text-gray-700">{report.description}</p>
                          <p className="text-sm text-gray-600 mt-1">{report.location}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
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