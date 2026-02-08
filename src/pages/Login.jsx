import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import Input from "../components/Input.jsx";
import axiosConfig from "../util/axiosConfig.jsx";
import { validateEmail } from "../util/validation.js";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import { AppContext } from "../context/AppContext.jsx";
import { LoaderCircle } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        setUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-white">
      {/* 1. Header with Solid Background */}
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
            className="bg-purple-700 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-purple-800 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* 2. Main Area with Background Image */}
      <main className="relative flex-1 flex items-center justify-center px-6">
        {/* Background image constrained to this container only */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={assets.login_bg}
            alt="Background"
            className="w-full h-full object-cover filter blur-sm"
          />
          {/* Optional overlay to soften the image like the screenshot */}
          <div className="absolute inset-0 bg-white/10"></div>
        </div>

        {/* 3. Login Card */}
        <div className="relative z-10 bg-white rounded-xl shadow-2xl w-full max-w-[440px] p-10">
          <h3 className="text-2xl font-bold text-black text-center mb-1">
            Welcome Back
          </h3>

          <p className="text-xs text-center text-gray-500 mb-8">
            Please enter your details to login.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="name@example.com"
              type="text"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="*********"
              type="password"
            />

            {error && (
              <p className="text-red-600 text-xs text-center bg-red-50 p-2 rounded border border-red-100">
                {error}
              </p>
            )}

            <button
              disabled={isLoading}
              className="w-full bg-purple-800 text-white py-3 rounded-md text-sm font-bold tracking-wide hover:bg-purple-900 transition-all flex items-center justify-center gap-2"
              type="submit"
            >
              {isLoading ? (
                <LoaderCircle className="animate-spin w-5 h-5" />
              ) : (
                "LOGIN"
              )}
            </button>

            <p className="text-xs text-gray-600 text-center mt-6">
              Don't have an account?
              <Link
                to="/signup"
                className="font-bold text-black underline ml-1"
              >
                Signup
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;

