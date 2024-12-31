import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {  sentEmail } from "../../features/slices/authReducer";
import { toastService } from "../../utils/toastify";
const initialState={
  email:"",
  error:""
}
const ForgotPassword = () => {
  const [iState, setUpdateState] = useState(initialState);
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {email,error}=iState
  const handleChange=(e)=>{
    setUpdateState({...iState,[e.target.name]:e.target.value,error:""})
  }
  const handleValidation=()=>{
    let formError=""
    let isValidation=true;
    if(!email && !email.trim()){
      formError="Email is required"
      isValidation=false
    }
    setUpdateState(prev=>({
       ...prev,error:formError
    }))
    return isValidation
  }
  const handleSubmit=(e)=>{
      e.preventDefault();
    if(handleValidation()){
      dispatch(sentEmail({ email })).then((res) => {
        if (res?.payload?.code == 200) {
          toastService.success("Otp send successfully ,please check your email address");
          navigate("/otp",{state:email});
        } else {
          toastService.error("Otp send to email failed");
          console.log({ res });
        }
      });
    }
  }
  return (
    <div className="LoginArea">
      <div className="LoginBox">
        <div className="LoginLeft">
          {/* <h2>Huk N <span>Buk</span></h2> */}
          <figure>
            <img src={require("../../assets/images/Logo.png")} />
          </figure>
          <h3>
            <span>Forgot Password</span>
          </h3>
          <h4>
            No Problem! Just provide your e-mail address and we’ll <br /> send
            you a reset OTP.
          </h4>
          <form>
            <div className="form-group">
              <label>Enter your email ID/ Mobile Number</label>
              <input
                type="email"
                placeholder="Enter your email ID/ Mobile Number"
                className="form-control"
                name="email"
                value={email}
                onChange={handleChange}
              />
              <span className="Icon">
                <i className="fa fa-envelope" />
              </span>
              {error && (
                <p className="d-flex justify-content-start text-danger mt-2 small">
                  {error}
                </p>
              )}
            </div>
            <button className="Login" onClick={handleSubmit}>
              SEND OTP
            </button>
            <Link className="Login Back aa" to="/login">
              Back to Login
            </Link>
            {/* <button>Log In <i class="fa fa-sign-in"></i></button> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
