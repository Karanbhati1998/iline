import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toastService } from "../../utils/toastify";
import { useDispatch } from "react-redux";
import { setPassword } from "../../features/slices/userManagementReducer";
const initialState={
  password: '',
  confirmPassword: '',
  passwordVisible: false,
  confirmPasswordVisible: false,
  errors:{}
}
const CreatePassword = () => {
  const [iState, setUpdateState] = useState(initialState);
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {state}=useLocation()
  console.log({state});
  
  const {
    password,
    confirmPassword,
    passwordVisible,
    confirmPasswordVisible,
    errors,
  } = iState;
  const handleInputChange = (e) => {
    setUpdateState({ ...iState, [e.target.name]: e.target.value ,errors:{
      ...iState.errors,
      [e.target.name]:''
    }});
  };
  const handlePasswordVisibility = (name) => {
    setUpdateState({...iState, [name]:!iState[name] });
  };
  const handleValidForm=()=>{
    let formErrors={};
    let isValidation=true;
    if(!password && !password.trim()){
      formErrors.password="Password is required";
      isValidation=false;
    }
    if(!confirmPassword && !confirmPassword.trim()){
      formErrors.confirmPassword="Confirm password is required";
      isValidation=false;
    }
      setUpdateState(prev=>({
        ...prev,
        errors:formErrors
      }))
      return isValidation
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email: state, password: password };
    if(handleValidForm()){
      if(password===confirmPassword){
        dispatch(setPassword(data)).then(res=>{
          if(res?.payload?.code==200){
            toastService.success("Your password has been successfully changed")
            navigate("/loginSucess");
          }else{
            toastService.error(res?.payload?.message);
            console.log({res});
          }
        })
      }else{
        toastService.error("Passwords do not match");
      }
      // form validation passed
      // perform password reset
    }
  }
  return (
    <div className="LoginArea">
      <div className="LoginBox">
        <div className="LoginLeft">
          <figure>
            <img src={require("../../assets/images/Logo.png")} />
          </figure>
          <h3>
            <span>Create New Password</span>
          </h3>
          <h4>No Problem! Enter your new password</h4>
          <form>
            <div className="form-group">
              <label>Enter New Password</label>
              <input
                type={!passwordVisible ? "password" : "text"}
                className="form-control"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
              <span
                className="Icon"
                onClick={() => handlePasswordVisibility("passwordVisible")}
              >
                {passwordVisible ? (
                  <i className="fa fa-eye" />
                ) : (
                  <i className="fa fa-eye-slash" />
                )}
              </span>
              {errors.password && (
                <p className="d-flex justify-content-start text-danger mt-2 small ">
                  {errors.password}
                </p>
              )}
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type={!confirmPasswordVisible ? "password" : "text"}
                className="form-control"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleInputChange}
              />
              <span
                className="Icon"
                onClick={() =>
                  handlePasswordVisibility("confirmPasswordVisible")
                }
              >
                {confirmPasswordVisible ? (
                  <i className="fa fa-eye" />
                ) : (
                  <i className="fa fa-eye-slash" />
                )}
              </span>
              {errors.confirmPassword && (
                <p className="d-flex justify-content-start text-danger mt-2 small">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            {/* <button class="Login">Submit</button>  */}
            <button className="Login" onClick={handleSubmit}>
              Create Password
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

export default CreatePassword;
