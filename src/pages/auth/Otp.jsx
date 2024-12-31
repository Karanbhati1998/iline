import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toastService } from "../../utils/toastify";
import OTPInput from "react-otp-input";
import { useDispatch } from "react-redux";
import { otpVerify, sentEmail } from "../../features/slices/authReducer";
const initialState={
  otp:"",
error:"",
time:30
}
const Otp = () => {
  const [iState, updateState] = useState(initialState);
  const { otp, errors, time } = iState;
   const navigate = useNavigate();
   const dispatch=useDispatch()
   const { state } = useLocation();
   console.log({ state });
   
    const handleChange = (otp) => {
      if(!isNaN(otp)){
         updateState({
           ...iState,
           otp: otp.replace(/\D/g, ""),
           errors: "",
         });
      }
    };
      const validateOtp = () => {
        if (otp.length === 4) {
          updateState({ ...iState, errors: false });
          return true;
        } else {
          toastService.error("Invalid OTP", {
            position: "top-right",
          });
          updateState({ ...iState, errors: "OTP is required" });
          return false;
        }
      };
      useEffect(() => {
        if (time > 0) {
          setTimeout(() => {
            updateState((prev) => ({
              ...prev,
              time: prev.time - 1,
            }));
          }, 1000);
        }
      }, [time]);
       const handleConfirm = (e) => {
          e.preventDefault();
           if (validateOtp()) {
             const data = { email: state?.trim(), otp };
            dispatch(otpVerify(data)).then(res=>{
              if(res?.payload?.code==200){
                toastService.success("OTP verified successfully");
                updateState(initialState);
                navigate("/createPassword",{state:state});
              }else{
                toastService.error(res?.payload?.message);
              }
            })
           
         }
       };
        const handleResend = () => {
           dispatch(sentEmail({ email: state })).then(res=>{
            if(res?.payload?.code==200){
              toastService.success("Otp resend successfully, please check your email address");
            }else{
              toastService.error(res?.payload?.message);
            }
           })
        
        };
  return (
    <div className="LoginArea">
      <div className="LoginBox">
        <div className="LoginLeft">
          <figure>
            <img src={require("../../assets/images/Logo.png")} />
          </figure>
          {/* <h2>Huk N <span>Buk</span></h2> */}
          <h3>
            <span>OTP Verification</span>
          </h3>
          <h4>
            Please enter 4 digit OTP Verification code recieved <br /> on your
            email address/ contact number.
          </h4>
          <form>
            <div className="form-group">
              <div className="OTPBox" style={{
                justifyContent: 'center',
              }}>
                <OTPInput
                  className="otp-form-control"
                  value={otp}
                  onChange={handleChange}
                  numInputs={4}
                  renderInput={(props) => <input {...props} />}
                  inputStyle={{
                    width: "60px",
                    height: "55px",
                    lineHeight: "30px",
                    margin: "0 1rem",
                    fontSize: "22px",
                    borderRadius: "4px",
                    border: "1px solid #d4d4d4",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <p className="text-danger text-start mt-2 small">
                {errors && "OTP is required"}
              </p>
              <p className="text-right">
                {time > 0 ? (
                  <p className=" text-right mr-3">00:{time}sec</p>
                ) : (
                  <a
                    role="button"
                    onClick={handleResend}
                    style={{
                      fontSize: "13px",
                    }}
                  >
                    Resend
                  </a>
                )}
              </p>
            </div>
            {/* <button class="Login">Submit</button>  */}
            <button className="Login" onClick={handleConfirm}>
              VERIFY OTP
            </button>
            <Link className="Login Back aa" to="/login">
              Back to Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Otp;
