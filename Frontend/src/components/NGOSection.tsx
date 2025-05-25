import { motion } from "framer-motion";
import { Users, UserCheck, Shield, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const NGOSection = () => {
  return (
    <section className="py-20 px-4 bg-white">
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
            Join our platform to make a difference - whether you're a user reporting emergencies, an NGO providing help, or an admin managing the system
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {/* User Registration */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex"
          >
            <Card className="w-full bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <UserPlus className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-900">User Registration</CardTitle>
                <CardDescription className="text-gray-600">
                  Join our community to report emergencies and help save lives
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-gray-700">Quick emergency reporting</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-gray-700">Track report status</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-gray-700">Real-time notifications</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-gray-700">Support NGO activities</span>
                  </div>
                </div>
                <Link to="/user-registration">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Register as User
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* NGO Registration */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex"
          >
            <Card className="w-full bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-900">NGO Registration</CardTitle>
                <CardDescription className="text-gray-600">
                  Join our network of verified NGOs and start receiving emergency alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-gray-700">Instant emergency notifications</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-gray-700">GPS-based case assignments</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-gray-700">Performance tracking dashboard</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-gray-700">Donation management tools</span>
                  </div>
                </div>
                <Link to="/register">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3">
                    <Users className="w-4 h-4 mr-2" />
                    Register Your NGO
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Admin Login */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex"
          >
            <Card className="w-full bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Admin Portal</CardTitle>
                <CardDescription className="text-gray-600">
                  Comprehensive management tools for administrators and platform operators
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span className="text-gray-700">Real-time system monitoring</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span className="text-gray-700">NGO verification management</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span className="text-gray-700">Analytics and reporting</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span className="text-gray-700">Content moderation tools</span>
                  </div>
                </div>
                <Link to="/admin">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3">
                    <UserCheck className="w-4 h-4 mr-2" />
                    Admin Login
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NGOSection;
