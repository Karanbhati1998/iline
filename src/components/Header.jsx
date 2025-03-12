import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toastService } from "../utils/toastify";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("ilineLogin");
    toastService.success("Logged Out Successfully");
    navigate("/login");
  };
  return (
    <div className="Header">
      <div className="Logo">
        <img src={require("../assets/images/Logo.png")} />
      </div>
      <div className="Navigation">
        <div className="Avater">
          <a href="javascript:void(0);">
            <figure>
              <img src={require("../assets/images/Avatar-1.png")} />
            </figure>
            Admin
          </a>
          <ul>
            <li>
              <figure>
                <img src={require("../assets/images/Avatar-1.png")} />
              </figure>
              <h4>
                Admin <span>Administrator</span>
              </h4>
            </li>
            <li>
              <a
                onClick={handleLogout}
                style={{
                  cursor: "pointer",
                }}
              >
                <span>
                  <i className="fa fa-sign-out" />
                </span>
                Logout
              </a>
            </li>
          </ul>
        </div>
        <div className="clear" />
      </div>
    </div>
  );
};

export default Header;
