import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FileText, MapPin, Calendar, Image, Plus, Mail, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/database/FirebaseConfig";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { auth } from "@/database/FirebaseConfig";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

interface Report {
  id: string;
  description: string;
  location: string;
  image: string | null;
  date: string;
  status: string;
  userId: string;
  userEmail: string;
  createdAt: string | Date;
}

const MyReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Admin emails list - you can modify this as needed
  const adminEmails = ["admin@aasrah.com", "admin2@aasrah.com"];

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      console.log("Current user:", currentUser.email);
      if (adminEmails.includes(currentUser.email || "")) {
        setIsAdmin(true);
      }
    }
  }, []);

  const fetchReportsByEmail = async (email: string) => {
    setLoading(true);
    try {
      console.log("Fetching reports for email:", email);
      const reportsRef = collection(db, "reports");
      const q = query(
        reportsRef,
        where("userEmail", "==", email)
      );

      console.log("Executing Firestore query...");
      const querySnapshot = await getDocs(q);
      console.log("Query complete. Number of docs:", querySnapshot.size);

      const fetchedReports: Report[] = [];
      querySnapshot.forEach((doc) => {
        console.log("Document data:", doc.data());
        fetchedReports.push({
          id: doc.id,
          ...doc.data() as Omit<Report, 'id'>
        });
      });

      // Sort the reports client-side temporarily
      fetchedReports.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });

      console.log("Processed reports:", fetchedReports);
      setReports(fetchedReports);

      if (fetchedReports.length === 0) {
        toast({
          title: "No Reports Found",
          description: `No reports found for email: ${email}`,
          variant: "default",
        });
      } else {
        toast({
          title: "Reports Found",
          description: `Found ${fetchedReports.length} reports for ${email}`,
          variant: "default",
        });

        // Show index creation instructions if there are reports
        toast({
          title: "Performance Improvement Needed",
          description: "Admin: Please create the required index in Firebase Console",
          variant: "default",
          duration: 10000,
        });
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast({
        title: "Error",
        description: "Failed to fetch reports. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserReports = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          console.log("No user logged in");
          toast({
            title: "Authentication Required",
            description: "Please log in to view reports.",
            variant: "destructive",
          });
          navigate("/user-registration");
          return;
        }

        console.log("Current user email:", currentUser.email);
        console.log("Is admin:", isAdmin);
        console.log("Search email:", searchEmail);

        // If admin and search email is provided, fetch those reports
        if (isAdmin && searchEmail) {
          await fetchReportsByEmail(searchEmail);
        } else {
          // Otherwise fetch current user's reports
          await fetchReportsByEmail(currentUser.email || "");
        }
      } catch (error) {
        console.error("Error in fetchUserReports:", error);
        toast({
          title: "Error",
          description: "Failed to fetch reports. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchUserReports();
  }, [navigate, toast, isAdmin, searchEmail]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchEmail) {
      toast({
        title: "Email Required",
        description: "Please enter an email to search",
        variant: "destructive",
      });
      return;
    }
    fetchReportsByEmail(searchEmail);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {isAdmin ? "Reports Dashboard" : "My Reports"}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {isAdmin ? "View and manage all user reports" : "Track all your submitted emergency reports and their status"}
          </p>
          
          {auth.currentUser && (
            <div className="flex items-center justify-center gap-2 text-blue-600 mb-6">
              <Mail className="w-4 h-4" />
              <span>{auth.currentUser.email}</span>
              {isAdmin && <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">Admin</span>}
            </div>
          )}

          {isAdmin && (
            <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Search reports by email..."
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button type="submit" variant="secondary">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </form>
          )}

          <Link to="/report">
            <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Submit New Report
            </Button>
          </Link>
        </motion.div>

        {loading ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="text-center py-12">
              <CardContent>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-700">Loading Reports...</h3>
              </CardContent>
            </Card>
          </motion.div>
        ) : reports.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="text-center py-12">
              <CardContent>
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Reports Found</h3>
                <p className="text-gray-500 mb-6">
                  {isAdmin && searchEmail 
                    ? `No reports found for email: ${searchEmail}`
                    : "No emergency reports found. Start by submitting a new report."}
                </p>
                <Link to="/report">
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                    Submit New Report
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {reports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                          Report #{report.id.slice(0, 8)}
                        </CardTitle>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(report.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {report.location}
                          </span>
                          {isAdmin && (
                            <span className="flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              {report.userEmail}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(report.status)}`}>
                        {report.status}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Description</h4>
                        <p className="text-gray-600 leading-relaxed">{report.description}</p>
                      </div>
                      
                      {report.image && (
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <Image className="w-4 h-4" />
                            Attached Image
                          </h4>
                          <img 
                            src={report.image} 
                            alt="Report" 
                            className="rounded-lg max-h-48 object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReports;
