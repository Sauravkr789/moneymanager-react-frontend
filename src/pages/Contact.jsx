import React, { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets.js";
import Input from "../components/Input.jsx";
import { Mail, Phone, MapPin, LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      return toast.error("Please fill in all fields");
    }

    setIsLoading(true);

    // Create the payload for Web3Forms
    const submissionData = {
      ...formData,
      access_key: "c359e55a-339c-44fa-8dcd-fc39cf7ff3c8", // Paste your key here
      subject: `New Contact Form Submission from ${formData.name}`,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Message sent! We'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Mail Error:", error);
      toast.error("Failed to connect to the mail server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-white">
      <header className="relative z-20 flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2">
          <img src={assets.logo} alt="logo" className="h-8 w-8" />
          <span className="text-lg font-bold text-black">Money Manager</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700">
          <Link to="/" className="hover:text-black">Home</Link>
          <Link to="/about" className="hover:text-black">About us</Link>
          <Link to="/contact" className="text-black font-bold">Contact us</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-semibold text-gray-700">Login</Link>
          <Link to="/signup" className="bg-purple-700 text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-purple-800 transition-colors">
            Get Started
          </Link>
        </div>
      </header>

      <main className="relative flex-1 flex items-center justify-center px-6">
        <div className="absolute inset-0 w-full h-full">
          <img src={assets.login_bg} alt="Background" className="w-full h-full object-cover filter blur-sm" />
          <div className="absolute inset-0 bg-white/20"></div>
        </div>

        <div className="relative z-10 bg-white rounded-xl shadow-2xl w-full max-w-4xl grid md:grid-cols-2 overflow-hidden">
          {/* Left Side: Contact Info */}
          <div className="bg-purple-800 p-10 text-white flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Mail size={20} /> <span>sauravkr81.93@gmail.com</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={20} /> <span>+91 62007 43220</span>
              </div>
              <div className="flex items-center gap-4 text-sm opacity-90">
                <MapPin size={24} /> 
                <span>123 Finance Street, Tech Park, Bengaluru, India</span>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="p-10">
            <h3 className="text-xl font-bold text-black mb-4">Send us a message</h3>
            <form onSubmit={handleSendMessage} className="space-y-4">
              <Input
                label="Full Name"
                placeholder="John Doe"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <Input
                label="Email Address"
                placeholder="john@example.com"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-700 uppercase">Message</label>
                <textarea
                  className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-800"
                  rows="4"
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple-800 text-white py-3 rounded-md text-sm font-bold hover:bg-purple-900 transition-all flex justify-center items-center gap-2"
              >
                {isLoading ? <LoaderCircle className="animate-spin" size={20} /> : "SEND MESSAGE"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;

