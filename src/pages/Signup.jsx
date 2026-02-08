import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { validateEmail } from "../util/validation.js";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector.jsx";
import uploadProfileImage from "../util/uploadProfileImage.js";
import Input from "../components/Input.jsx";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";
    setIsLoading(true);

    if (!fullName.trim()) {
      setError("Please enter your fullname");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter valid email address");
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password");
      setIsLoading(false);
      return;
    }

    setError("");

    try {
      if (profilePhoto) {
        const imageUrl = await uploadProfileImage(profilePhoto);
        profileImageUrl = imageUrl || "";
      }

      const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });
      if (response.status === 201) {
        toast.success("Profile created successfully.");
        navigate("/login");
      }
    } catch (err) {
      console.error("Something went wrong", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-white">
      {/* 1. Header (Fixed at top) */}
      <header className="relative z-20 flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2">
          <img src={assets.logo} alt="logo" className="h-8 w-8" />
          <span className="text-lg font-bold text-black">Money Manager</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700">
          <Link to="/" className="hover:text-black">
            Home
          </Link>
          <Link to="/about" className="hover:text-black">
            About us
          </Link>
          <Link to="/contact" className="hover:text-black">
            Contact us
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-semibold text-gray-700">
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-purple-700 text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-purple-800 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* 2. Main Area (Scrollable container) */}
      <main className="relative flex-1 flex items-center justify-center px-6 py-8 md:py-12">
        <div className="absolute inset-0 w-full h-full">
          <img
            src={assets.login_bg}
            alt="Background"
            className="w-full h-full object-cover filter blur-sm"
          />
          <div className="absolute inset-0 bg-white/10"></div>
        </div>

        {/* 3. Signup Card with Custom Scrollbar */}
        <div
          className="relative z-10 bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 md:p-10 
          max-h-[calc(100vh-120px)] overflow-y-auto 
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-gray-200
          [&::-webkit-scrollbar-thumb]:rounded-full
          hover:[&::-webkit-scrollbar-thumb]:bg-gray-300"
        >
          <h3 className="text-2xl font-bold text-black text-center mb-1">
            Create An Account
          </h3>

          <p className="text-xs text-center text-gray-500 mb-8">
            Start tracking your spendings by joining with us.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex justify-center mb-6">
              <ProfilePhotoSelector
                image={profilePhoto}
                setImage={setProfilePhoto}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                label="Full Name"
                placeholder="John Doe"
                type="text"
              />

              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
                placeholder="name@example.com"
                type="text"
              />

              <div className="md:col-span-2">
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  placeholder="*********"
                  type="password"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-xs text-center bg-red-50 p-2 rounded border border-red-100">
                {error}
              </p>
            )}

            <button
              disabled={isLoading}
              className="w-full bg-purple-800 text-white py-3 rounded-md text-sm font-bold tracking-wide hover:bg-purple-900 transition-all flex items-center justify-center gap-2 mt-4"
              type="submit"
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin w-5 h-5" />
                  Signing Up...
                </>
              ) : (
                "SIGN UP"
              )}
            </button>

            <p className="text-xs text-gray-600 text-center mt-6">
              Already have an account?
              <Link to="/login" className="font-bold text-black underline ml-1">
                Login
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Signup;

