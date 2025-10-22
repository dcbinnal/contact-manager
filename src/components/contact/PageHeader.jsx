// src/components/common/PageHeader.jsx
import React from "react";

const PageHeader = ({ title, description, buttonLabel, onButtonClick }) => {
  return (
    <header className="mb-6 rounded-lg p-4 bg-gradient-to-r from-blue-50 to-purple-100 shadow-sm">
      <div className="flex items-center justify-start gap-5">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        {buttonLabel && (
          <button
            onClick={onButtonClick}
            className="font-light text-sm px-4 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {buttonLabel}
          </button>
        )}
      </div>

      {description && (
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      )}
    </header>
  );
};

export default PageHeader;
