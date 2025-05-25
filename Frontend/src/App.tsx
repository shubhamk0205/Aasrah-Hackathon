import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import UserRegistration from "./pages/UserRegistration";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import Report from "./pages/Report";
import Donate from "./pages/Donate";
import MyReports from "./pages/MyReports";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import KnowMore from "./pages/KnowMore";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-registration" element={<UserRegistration />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/report" element={<Report />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/my-reports" element={<MyReports />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/know-more" element={<KnowMore />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
