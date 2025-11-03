import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Spline from "@splinetool/react-spline";

const AuthPage = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden font-sans">
      {/* Spline Background */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Spline scene="https://prod.spline.design/j8WcwU38h3l18RWG/scene.splinecode" />
      </div>

      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      {/* Auth Container */}
      <div
        className={`relative w-[900px] max-w-full min-h-[450px] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_8px_32px_rgba(31,38,135,0.3)] overflow-hidden transition-all duration-700 ease-in-out`}
      >
        {/* SIGN UP */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center transition-all duration-700 ${
            isActive ? "translate-x-full opacity-100 z-20" : "opacity-0 z-10"
          }`}
        >
          <form className="flex flex-col items-center gap-3 w-3/4 text-white">
            <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-lg">
              Create Account
            </h1>
            <div className="flex gap-3 mb-2">
              {[
                ["fab fa-google-plus-g", "hover:text-red-400 hover:shadow-[0_0_10px_rgba(255,0,0,0.6)]"],
                ["fab fa-facebook-f", "hover:text-blue-500 hover:shadow-[0_0_10px_rgba(59,130,246,0.6)]"],
                ["fab fa-github", "hover:text-gray-400 hover:shadow-[0_0_10px_rgba(156,163,175,0.6)]"],
                ["fab fa-linkedin-in", "hover:text-blue-600 hover:shadow-[0_0_10px_rgba(37,99,235,0.6)]"],
              ].map(([icon, hover], i) => (
                <a
                  key={i}
                  href="#"
                  className={`w-10 h-10 flex items-center justify-center border border-white/40 rounded-full text-white ${hover} transition-all duration-300`}
                >
                  <i className={icon}></i>
                </a>
              ))}
            </div>

            <span className="text-sm text-white/80 mb-2">
              or use your email for registration
            </span>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 placeholder-white/70"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 placeholder-white/70"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 placeholder-white/70"
            />
            <button
              type="button"
              className="mt-3 px-10 py-2 bg-indigo-600/80 text-white rounded-full shadow-md hover:bg-indigo-700 hover:shadow-[0_0_15px_rgba(99,102,241,0.6)] transition-all duration-300"
            >
              Sign Up
            </button>
          </form>
        </div>

        {/* SIGN IN */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center transition-all duration-700 ${
            isActive ? "translate-x-full opacity-0 z-10" : "opacity-100 z-20"
          }`}
        >
          <form className="flex flex-col items-center gap-3 w-3/4 text-white">
            <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-lg">
              Sign In
            </h1>
            <div className="flex gap-3 mb-2">
              {[
                ["fab fa-google-plus-g", "hover:text-red-400 hover:shadow-[0_0_10px_rgba(255,0,0,0.6)]"],
                ["fab fa-facebook-f", "hover:text-blue-500 hover:shadow-[0_0_10px_rgba(59,130,246,0.6)]"],
                ["fab fa-github", "hover:text-gray-400 hover:shadow-[0_0_10px_rgba(156,163,175,0.6)]"],
                ["fab fa-linkedin-in", "hover:text-blue-600 hover:shadow-[0_0_10px_rgba(37,99,235,0.6)]"],
              ].map(([icon, hover], i) => (
                <a
                  key={i}
                  href="#"
                  className={`w-10 h-10 flex items-center justify-center border border-white/40 rounded-full text-white ${hover} transition-all duration-300`}
                >
                  <i className={icon}></i>
                </a>
              ))}
            </div>
            <span className="text-sm text-white/80 mb-2">
              or use your email password
            </span>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 placeholder-white/70"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 text-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 placeholder-white/70"
            />
            <a href="#" className="text-sm text-white/80 hover:text-indigo-300">
              Forget Your Password?
            </a>
            <button
              type="button"
              className="mt-2 px-10 py-2 bg-indigo-600/80 text-white rounded-full shadow-md hover:bg-indigo-700 hover:shadow-[0_0_15px_rgba(99,102,241,0.6)] transition-all duration-300"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* TOGGLE PANEL */}
        <div
          className={`absolute top-0 h-full w-1/2 bg-gradient-to-r from-purple-700/70 to-indigo-600/70 text-white flex flex-col items-center justify-center text-center px-10 transition-all duration-700 ease-in-out ${
            isActive
              ? "left-0 translate-x-0 rounded-r-[120px] rounded-l-none"
              : "right-0 rounded-l-[120px] rounded-r-none"
          } shadow-lg`}
        >
          {isActive ? (
            <>
              <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
              <p className="text-sm mb-5 text-white/90">
                Enter your personal details to use all of site features
              </p>
              <button
                className="bg-transparent border border-white/60 px-8 py-2 rounded-full hover:bg-white hover:text-indigo-700 hover:shadow-[0_0_15px_rgba(255,255,255,0.6)] transition-all duration-300"
                onClick={() => setIsActive(false)}
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-2">Hello, Friend!</h1>
              <p className="text-sm mb-5 text-white/90">
                Register with your personal details to use all of site features
              </p>
              <button
                className="bg-transparent border border-white/60 px-8 py-2 rounded-full hover:bg-white hover:text-indigo-700 hover:shadow-[0_0_15px_rgba(255,255,255,0.6)] transition-all duration-300"
                onClick={() => setIsActive(true)}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
