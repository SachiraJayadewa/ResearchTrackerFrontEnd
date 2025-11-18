import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      {/* Hero Section */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-4 text-white"
      >
        ResearchTracker
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-gray-300 max-w-2xl mb-8 text-lg"
      >
        A modern research management platform for teams, universities, and labs.
        Track project progress, manage milestones, and collaborate efficiently — 
        all from a powerful unified dashboard.
      </motion.p>

      {/* Login Button */}
      <motion.button
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        onClick={() => navigate("/login")}
        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg 
        transition font-semibold"
      >
        Login to Continue
      </motion.button>

      {/* Dashboard Preview Cards */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-5xl"
      >
        <div className="bg-gray-800 rounded-xl p-6 shadow-xl hover:shadow-2xl transition">
          <h3 className="text-xl text-white font-bold mb-2">📁 Projects</h3>
          <p className="text-gray-400">Create and manage research projects with timelines, teams, and status tracking.</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-xl hover:shadow-2xl transition">
          <h3 className="text-xl text-white font-bold mb-2">📌 Milestones</h3>
          <p className="text-gray-400">Track deadlines, completion dates, and milestone progress visually.</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-xl hover:shadow-2xl transition">
          <h3 className="text-xl text-white font-bold mb-2">📄 Documents</h3>
          <p className="text-gray-400">Upload important PDFs, reports, and documents — securely stored and accessible.</p>
        </div>
      </motion.div>

      {/* Footer Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mt-16 text-gray-500 text-sm"
      >
        Built for CMJD111 — Research Management System
      </motion.p>
    </div>
  );
};

export default Home;

