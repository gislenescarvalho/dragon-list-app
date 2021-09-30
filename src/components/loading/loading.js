import React from "react";
import "./loading.css";

const Loading = () => {
  
  return (
    <div className="spinner-container">
        <svg className="spinner" role="alert" aria-live="assertive">
          <circle cx="30" cy="30" r="20" className="circle" />
        </svg>
    </div>
  );
};

export default Loading;
