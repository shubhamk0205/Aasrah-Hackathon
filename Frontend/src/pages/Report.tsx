import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Camera, MapPin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { db, auth } from "@/database/FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Report = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportData, setReportData] = useState({
    description: "",
    location: "",
    image: null as File | null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.log("No user logged in during report submission");
        toast({
          title: "Authentication Error",
          description: "Please log in to submit a report.",
          variant: "destructive",
        });
        navigate("/user-registration");
        return;
      }

      console.log("Submitting report for user:", currentUser.email);

      let imageUrl = null;
      if (reportData.image) {
        console.log("Uploading image...");
        const storage = getStorage();
        const imageRef = ref(storage, `report-images/${Date.now()}_${reportData.image.name}`);
        await uploadBytes(imageRef, reportData.image);
        imageUrl = await getDownloadURL(imageRef);
        console.log("Image uploaded successfully:", imageUrl);
      }

      const newReport = {
        description: reportData.description,
        location: reportData.location,
        image: imageUrl,
        date: new Date().toISOString(),
        status: "Submitted",
        userId: currentUser.uid,
        userEmail: currentUser.email,
        createdAt: new Date(),
      };

      console.log("Saving report to Firestore:", newReport);
      const docRef = await addDoc(collection(db, "reports"), newReport);
      console.log("Report saved successfully with ID:", docRef.id);

      toast({
        title: "Report Submitted Successfully!",
        description: "Your emergency report has been sent to nearby NGOs. Help is on the way.",
      });

      setTimeout(() => {
        navigate("/my-reports");
      }, 2000);
    } catch (error) {
      console.error("Error submitting report:", error);
      toast({
        title: "Error",
        description: "Failed to submit report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'file') {
      setReportData({
        ...reportData,
        image: e.target.files?.[0] || null
      });
    } else {
      setReportData({
        ...reportData,
        [e.target.name]: e.target.value
      });
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setReportData({
            ...reportData,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          });
          toast({
            title: "Location Detected",
            description: "Your current location has been added to the report.",
          });
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please enter it manually.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Geolocation Not Supported",
        description: "Please enter your location manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="border-2 border-red-100 shadow-xl">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900">Report an Emergency</CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                Submit details about the emergency situation to get immediate help
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Emergency Description *
                  </Label>
                  <Input
                    id="description"
                    name="description"
                    value={reportData.description}
                    onChange={handleChange}
                    placeholder="Describe the emergency situation in detail..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image" className="flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Upload Image (Optional)
                  </Label>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location *
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="location"
                      name="location"
                      value={reportData.location}
                      onChange={handleChange}
                      placeholder="Enter location or coordinates"
                      required
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      onClick={getCurrentLocation}
                      variant="outline"
                      className="px-3"
                    >
                      <MapPin className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">
                    Click the location icon to auto-detect your current location
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 text-lg font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Submitting...
                    </>
                  ) : (
                    "Submit Emergency Report"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Report;
