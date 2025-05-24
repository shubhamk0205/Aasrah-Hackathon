
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Wildlife Rescue NGO Director",
    content: "This platform has revolutionized our emergency response times. We've saved 40% more animals since joining.",
    rating: 5
  },
  {
    name: "Dr. Michael Chen",
    role: "Emergency Medical Services",
    content: "The real-time alerts and precise location data have been game-changers for our rapid response team.",
    rating: 5
  },
  {
    name: "Lisa Rodriguez",
    role: "Community Volunteer",
    content: "Knowing that my reports immediately reach trained professionals gives me confidence to help in emergency situations.",
    rating: 5
  }
];

const Partners = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Trusted by Heroes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of NGOs, volunteers, and emergency responders who trust our platform to save lives every day
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <Quote className="w-8 h-8 text-blue-200 mb-4" />
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="border-t border-gray-100 pt-4">
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </div>
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
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Trusted Partner Organizations
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-lg font-semibold text-gray-600">Red Cross</div>
              <div className="text-lg font-semibold text-gray-600">WWF</div>
              <div className="text-lg font-semibold text-gray-600">UNICEF</div>
              <div className="text-lg font-semibold text-gray-600">Doctors Without Borders</div>
              <div className="text-lg font-semibold text-gray-600">Local Fire Departments</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
