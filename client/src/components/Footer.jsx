import React from "react";

const Footer = () => {
  return (
    <footer className="mx-4 mb-4 mt-6 bg-white border border-gray-200 shadow-sm rounded-2xl px-6 py-5">
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            SG
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Skill<span className="text-blue-600">Gap</span>
            </h2>
            <p className="text-sm text-gray-500">
              Professional Growth Platform
            </p>
          </div>
        </div>

        <div className="text-sm text-gray-500 text-center md:text-right">
          © 2026 SkillGap. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;