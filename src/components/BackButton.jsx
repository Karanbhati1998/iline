import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const handleNaviagte = () => {
    navigate(-1);
  };
  return (
    <div className="backarrow">
      <a onClick={handleNaviagte}>
        <i className="fa fa-long-arrow-left" aria-hidden="true" /> Back
      </a>
    </div>
  );
};

export default BackButton;
