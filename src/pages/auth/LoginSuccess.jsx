import React from "react";
import { Link } from "react-router-dom";

const LoginSuccess = () => {
  return (
    <div className="LoginArea">
      <div className="LoginBox">
        <div className="SuccessBox">
          <aside>
            <span>
              <img src={require("../../assets/images/Success.png")} />
            </span>
            <h3>Congratulation! </h3>
            <h5>Your password has been changed successfully!</h5>
            <Link className="Login" to="/login">
              Continue to Login
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default LoginSuccess;
