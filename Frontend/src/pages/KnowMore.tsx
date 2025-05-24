import { motion } from "framer-motion";
import { Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const KnowMore = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 px-4 py-8">
      {/* Back Button */}
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-8 transition-colors">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Home
      </Link>

      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
        >
          {/* Mission Badge */}
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-6 py-3 rounded-full text-lg font-medium"
            >
              <Heart className="w-5 h-5" />
              About Our Mission
            </motion.div>
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-center mb-8"
          >
            Building a{" "}
            <span className="text-blue-600">Safer</span>{" "}
            <span className="text-orange-600">World</span>
          </motion.h1>

          {/* Mission Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl md:text-2xl text-gray-700 text-center leading-relaxed mb-12"
          >
            We are committed to building a safer and more compassionate world by connecting verified NGOs, citizens, and authorities to act quickly during emergencies and contribute to humanity's well-being.
          </motion.p>

          {/* Additional Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Our Vision</h3>
              <p className="text-gray-700">
                To create a world where emergency response is immediate, efficient, and accessible to all, saving countless lives through technology and community collaboration.
              </p>
            </div>
            <div className="bg-orange-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">Our Impact</h3>
              <p className="text-gray-700">
                Through our platform, we've helped save over 10,000 lives, connected 500+ NGOs, and maintain a 24/7 emergency response system that continues to grow and improve.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default KnowMore; 