import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Building2, Shield, Bell, MapPin, BarChart3, Heart, Monitor, Users, FileText, TrendingUp, Clock, UserPlus, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <Hero />
      </section>
      
      {/* Main Action Cards Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get Started Today
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our network as an NGO, user, or administrator to make a difference
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* NGO Registration Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">NGO Registration</CardTitle>
                  <CardDescription className="text-gray-600">
                    Register your organization to start receiving emergency alerts and managing cases
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-blue-500" />
                      <span className="text-gray-700">Instant emergency notifications</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-blue-500" />
                      <span className="text-gray-700">GPS-based case assignments</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BarChart3 className="w-5 h-5 text-blue-500" />
                      <span className="text-gray-700">Performance tracking dashboard</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Heart className="w-5 h-5 text-blue-500" />
                      <span className="text-gray-700">Donation management tools</span>
                    </div>
                  </div>
                  <Link to="/register" className="block mt-6">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 text-lg font-semibold">
                      Register Your NGO
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* User Registration Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-2 border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-xl">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <UserPlus className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">User Registration</CardTitle>
                  <CardDescription className="text-gray-600">
                    Sign up to receive alerts, report emergencies, and support efforts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Real-time emergency alerts</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Emergency reporting tools</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Donation tracking</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Community support network</span>
                    </div>
                  </div>
                  <Link to="/user-registration" className="block mt-6">
                    <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 text-lg font-semibold">
                      Register as User
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Admin Portal Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-2 border-orange-100 hover:border-orange-300 transition-all duration-300 hover:shadow-xl">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">Admin Portal</CardTitle>
                  <CardDescription className="text-gray-600">
                    Access administrative tools for system monitoring and management
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Monitor className="w-5 h-5 text-orange-500" />
                      <span className="text-gray-700">Real-time system monitoring</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-orange-500" />
                      <span className="text-gray-700">NGO verification management</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-orange-500" />
                      <span className="text-gray-700">Analytics and reporting</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-orange-500" />
                      <span className="text-gray-700">Content moderation tools</span>
                    </div>
                  </div>
                  <Link to="/admin" className="block mt-6">
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 text-lg font-semibold">
                      Admin Login
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-blue-50/30 to-white">
        <HowItWorks />
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-orange-50/30">
        <Features />
      </section>

      {/* Partners Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-orange-50/30 to-white">
        <Partners />
      </section>

      {/* Footer Section */}
      <section className="bg-gradient-to-b from-white to-gray-50">
        <Footer />
      </section>
    </div>
  );
};

export default Index;
