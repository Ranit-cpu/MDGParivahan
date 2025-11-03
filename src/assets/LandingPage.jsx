import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spline from "@splinetool/react-spline";

const LandingLoader = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Wait for 4 seconds before redirecting to home page
    const timer = setTimeout(() => {
      navigate("/home"); // change to your actual home route if needed
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-screen h-screen overflow-hidden bg-black">
      <Spline scene="https://prod.spline.design/OdDLRiLNPsFEPFhL/scene.splinecode" />
    </div>
  );
};

export default LandingLoader;
