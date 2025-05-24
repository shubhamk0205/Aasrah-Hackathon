
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Heart, CreditCard, User, Mail, Phone, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Donate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [donationData, setDonationData] = useState({
    amount: "",
    name: "",
    email: "",
    phone: ""
  });

  const predefinedAmounts = [500, 1000, 2000, 5000];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Donation Data:", donationData);
    
    // Store donation in localStorage for demo purposes
    const existingDonations = JSON.parse(localStorage.getItem('donations') || '[]');
    const newDonation = {
      id: Date.now(),
      amount: parseInt(donationData.amount),
      name: donationData.name,
      email: donationData.email,
      phone: donationData.phone,
      date: new Date().toISOString(),
      status: "Completed"
    };
    
    existingDonations.push(newDonation);
    localStorage.setItem('donations', JSON.stringify(existingDonations));
    
    toast({
      title: "Donation Successful!",
      description: `Thank you for your generous donation of ₹${donationData.amount}. Your contribution will help save lives.`,
    });
    
    setTimeout(() => {
      navigate("/dashboard");
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonationData({
      ...donationData,
      [e.target.name]: e.target.value
    });
  };

  const selectAmount = (amount: number) => {
    setDonationData({
      ...donationData,
      amount: amount.toString()
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="border-2 border-green-100 shadow-xl">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900">Make a Donation</CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                Support NGOs in their emergency response efforts and help save lives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <Label className="flex items-center gap-2 text-lg font-semibold">
                    <DollarSign className="w-5 h-5" />
                    Donation Amount *
                  </Label>
                  
                  {/* Predefined Amount Buttons */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {predefinedAmounts.map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant={donationData.amount === amount.toString() ? "default" : "outline"}
                        onClick={() => selectAmount(amount)}
                        className="h-12 text-lg font-semibold"
                      >
                        ₹{amount}
                      </Button>
                    ))}
                  </div>
                  
                  {/* Custom Amount Input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 text-lg">₹</span>
                    </div>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      value={donationData.amount}
                      onChange={handleChange}
                      placeholder="Enter custom amount"
                      className="pl-8 text-lg py-3"
                      min="100"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={donationData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={donationData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={donationData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    required
                  />
                </div>

                {/* Mock Payment Section */}
                <div className="border-t pt-6">
                  <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                    <CreditCard className="w-5 h-5" />
                    Payment Information
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800 text-center">
                      🔒 This is a demo payment interface. 
                      <br />
                      In a real application, this would integrate with a secure payment gateway.
                    </p>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 text-lg font-semibold"
                >
                  Donate ₹{donationData.amount || '0'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Donate;
