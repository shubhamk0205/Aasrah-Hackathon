
import { motion } from "framer-motion";
import { Bell, MapPin, Calendar, Heart, Shield, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Bell,
    title: "Real-time Alerts",
    description: "Instant SMS and email notifications sent to verified NGOs within seconds of reporting",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    icon: MapPin,
    title: "Location Tracking",
    description: "Precise GPS coordinates help NGOs locate emergencies quickly and efficiently",
    gradient: "from-green-500 to-green-600"
  },
  {
    icon: Calendar,
    title: "Progress Tracking",
    description: "Monitor case status, response times, and resolution progress in real-time",
    gradient: "from-purple-500 to-purple-600"
  },
  {
    icon: Heart,
    title: "Donation Platform",
    description: "Support NGOs with secure donations and track the impact of your contributions",
    gradient: "from-pink-500 to-pink-600"
  },
  {
    icon: Shield,
    title: "AI Image Filtering",
    description: "Advanced AI algorithms filter graphic content to protect user mental health",
    gradient: "from-orange-500 to-orange-600"
  },
  {
    icon: Phone,
    title: "NGO Ranking System",
    description: "Rate and review NGO performance to improve future emergency response quality",
    gradient: "from-teal-500 to-teal-600"
  }
];

const Features = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced technology meets compassionate care in our comprehensive emergency response platform
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
            <Phone className="w-5 h-5 mr-2" />
            Start Reporting Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
