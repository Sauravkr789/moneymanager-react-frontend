
import { Link } from "react-router-dom";
import { assets } from "../assets/assets.js";

const About = () => {
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-white">
      {/* 1. Header (Consistent with Login/Signup) */}
      <header className="relative z-20 flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-2">
          <img src={assets.logo} alt="logo" className="h-8 w-8" />
          <span className="text-lg font-bold text-black">Money Manager</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700">
          <Link to="/" className="hover:text-black">
            Home
          </Link>
          <Link to="/about" className="text-black font-bold">
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
      <main className="relative flex-1 flex items-center justify-center px-6 py-12">
        <div className="absolute inset-0 w-full h-full">
          <img
            src={assets.login_bg}
            alt="Background"
            className="w-full h-full object-cover filter blur-sm"
          />
          {/* Subtle overlay to make text pop */}
          <div className="absolute inset-0 bg-white/20"></div>
        </div>

        {/* 3. About Content Card with Scrollbar */}
        <div
          className="relative z-10 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl w-full max-w-4xl p-10 max-h-full overflow-y-auto 
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-thumb]:bg-purple-200
          [&::-webkit-scrollbar-thumb]:rounded-full"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            Take Control of Your Finances
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed text-center mb-12">
            Money Manager was built to simplify how you track, analyze, and grow
            your wealth. We believe that financial clarity should be accessible
            to everyone.
          </p>

          <div className="grid md:grid-cols-2 gap-10 mt-12 mb-4">
            <div className="bg-purple-50/50 rounded-xl border border-purple-100 p-6 hover:bg-purple-50 transition-colors">
              <h3 className="text-xl font-bold text-purple-800 mb-3">
                Our Mission
              </h3>
              <p className="text-gray-600 italic">
                "To empower individuals with real-time financial insights that
                drive smarter spending and saving habits."
              </p>
            </div>

            <div className="bg-purple-50/50 rounded-xl border border-purple-100 p-6 hover:bg-purple-50 transition-colors">
              <h3 className="text-xl font-bold text-purple-800 mb-3">
                Why Us?
              </h3>
              <p className="text-gray-600">
                Secure, intuitive, and designed with the user in mind. No
                complex jargon—just clear data.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;