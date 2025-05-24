import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Camera, MapPin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const GEOAPIFY_API_KEY = "dcaea7ec4f5a47be8900cd8c7b627153";

// Default position is null
const DEFAULT_POSITION = null;

async function reverseGeocode(lat: number, lon: number): Promise<string> {
  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${GEOAPIFY_API_KEY}`
    );
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      return data.features[0].properties.formatted || "Unknown location";
    }
    return "Unknown location";
  } catch {
    return "Unknown location";
  }
}

const Report = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    description: "",
    image: null,
    location: "",
  });
  const [position, setPosition] = useState(DEFAULT_POSITION);
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (!mapInstanceRef.current && position) {
      // Fix marker icon issue
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      mapInstanceRef.current = L.map(mapContainerRef.current).setView(position, 16);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);

      markerRef.current = L.marker(position).addTo(mapInstanceRef.current);

      mapInstanceRef.current.on('click', (e) => {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
      });
    }
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [position]);

  // Update marker and view when position changes
  useEffect(() => {
    if (position && mapInstanceRef.current && markerRef.current) {
      markerRef.current.setLatLng(position);
      mapInstanceRef.current.setView(position);
    }
    if (position) {
      setCoords(position);
      setIsLoading(true);
      reverseGeocode(position[0], position[1]).then(addr => {
        setAddress(addr);
        setIsLoading(false);
      });
    }
  }, [position]);

  // Update formData when address changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      location: address
    }));
  }, [address]);

  // Handle manual input
  const handleLocationChange = (e) => {
    const [lat, lng] = e.target.value.split(',').map(Number);
    if (!isNaN(lat) && !isNaN(lng)) setPosition([lat, lng]);
  };

  // Use My Location
  const handleFetchLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store report in localStorage for demo purposes
    const existingReports = JSON.parse(localStorage.getItem('reports') || '[]');
    const newReport = {
      id: Date.now(),
      description: formData.description,
      location: formData.location,
      image: formData.image?.name || null,
      date: new Date().toISOString(),
      status: "Submitted"
    };
    existingReports.push(newReport);
    localStorage.setItem('reports', JSON.stringify(existingReports));
    toast({
      title: "Report Submitted Successfully!",
      description: "Your emergency report has been sent to nearby NGOs. Help is on the way.",
    });
    setTimeout(() => {
      navigate("/my-reports");
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'file') {
      setFormData({
        ...formData,
        image: e.target.files?.[0] || null
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
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
                    value={formData.description}
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
                      value={address}
                      onChange={handleLocationChange}
                      placeholder="Enter location or coordinates"
                      required
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      onClick={handleFetchLocation}
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

                <div className="w-full flex justify-center mt-2 mb-2">
                  <div className="w-full max-w-2xl rounded-xl overflow-hidden border border-gray-300 shadow-md bg-white relative">
                    {isLoading && (
                      <div className="flex items-center justify-center h-[350px] w-full bg-gray-50 absolute z-10 bg-opacity-80">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                      </div>
                    )}
                    <div
                      ref={mapContainerRef}
                      style={{ height: 350, width: "100%" }}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 text-lg font-semibold"
                >
                  Submit Emergency Report
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
