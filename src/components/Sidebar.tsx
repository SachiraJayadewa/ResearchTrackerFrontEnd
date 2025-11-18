import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-800 p-6 space-y-4">
      <h2 className="text-xl font-bold mb-6">ResearchTracker</h2>

      <NavLink className="block py-2 px-3 rounded hover:bg-gray-700" to="/dashboard">
        Dashboard
      </NavLink>

      <NavLink className="block py-2 px-3 rounded hover:bg-gray-700" to="/projects">
        Projects
      </NavLink>

      <NavLink className="block py-2 px-3 rounded hover:bg-gray-700" to="/milestones">
        Milestones
      </NavLink>

      <NavLink className="block py-2 px-3 rounded hover:bg-gray-700" to="/documents">
        Documents
      </NavLink>

      <NavLink className="block py-2 px-3 rounded hover:bg-gray-700" to="/home">
        Home
      </NavLink>
    </div>
  );
};

export default Sidebar;
