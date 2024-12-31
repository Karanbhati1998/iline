import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getToken } from "../../utils/getToken";
import { toastService } from "../../utils/toastify";
import { adminLogin } from "../../features/slices/authReducer";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

const initialState = {
  email: "",
  password: "",
  errors: {},
  isVisible: false,
  rememberMe: false,
};
const Login = () => {
  const [iState, setUpdateState] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const url = location?.state || "/dashboard";
  const { email, password, rememberMe, isVisible, errors } = iState;
   useEffect(() => {
     if (getToken("ilineLogin", "token")) {
       navigate(url, { replace: true });
     }
      
     const savedEmail = Cookies.get("ilineEmail", email);
     const savedPassword = Cookies.get("ilinePassword", password);
     const savedRememberMe = Cookies.get("ilineRememberMe", rememberMe);
     if (savedEmail) {
       setUpdateState((prev) => ({
         ...prev,
         email: savedEmail,
       }));
     }
     if (savedPassword) {
       setUpdateState((prev) => ({
         ...prev,
         password: savedPassword,
       }));
     }
     if (savedEmail) {
       setUpdateState((prev) => ({
         ...prev,
         email: savedEmail,
         rememberMe: true,
       }));
     }
     if (savedRememberMe) {
       setUpdateState((prev) => ({
         ...prev,
         rememberMe: savedRememberMe,
       }));
     }
   }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateState((prevState) => ({
      ...prevState,
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: "", 
      },
    }));
  };
const handleChecked=(e)=>{
  const {name,checked}=e.target;
   setUpdateState((prevState) => ({
     ...prevState,
     [name]: checked,
   }));
}
  const handleValidation = () => {
    let formErrors = {};
    let isValidation = true;
    if (!email && !email.trim()) {
      formErrors.email = "Email is required";
      isValidation = false;
    }
    if (!password && !password.trim()) {
      formErrors.password = "Password is required";
      isValidation = false;
    }
    setUpdateState((prev) => ({
      ...prev,
      errors: formErrors,
    }));
    return isValidation;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
       if (rememberMe) {
         Cookies.set("ilineEmail", email);
         Cookies.set("ilinePassword", password);
         Cookies.set("ilineRememberMe", rememberMe);
       } else {
         Cookies.remove("rememberedEmail");
         Cookies.remove("ilinePassword");
         Cookies.remove("ilineRememberMe");
       }
      const data = { email: email?.trim(), password: password?.trim() };
      dispatch(adminLogin(data)).then(res=>{
        if(res?.payload?.code==200){
          return navigate(url, { replace: true });
        }else{
          toastService.error(data?.payload?.message);
          console.log({res});
          
        }
      })
    }
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
            <span>Login your account</span>
          </h3>
          <h4>
            Enter your email address and password <br />
            to access admin panel.
          </h4>
          <form>
            <div className="form-group">
              <label>Enter your email ID / Mobile Number</label>
              <input
                type="text"
                placeholder="Enter Email ID / Mobile Number"
                className="form-control"
                name="email"
                value={email}
                onChange={handleChange}
              />
              <span className="Icon">
                <i className="fa fa-envelope" />
              </span>
              {errors.email && (
                <p className="d-flex justify-content-start text-danger mt-2 small">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="form-group">
              <label>Enter your password </label>
              <input
                type={!isVisible ? "password" : "text"}
                placeholder="Enter Password"
                className="form-control"
                name="password"
                value={password}
                onChange={handleChange}
              />
              <span
                className="Icon"
                onClick={() => {
                  setUpdateState((prev) => ({
                    ...prev,
                    isVisible: !isVisible,
                  }));
                }}
              >
                {isVisible ? (
                  <i className="fa fa-unlock-alt" />
                ) : (
                  <i className="fa fa-lock" />
                )}
              </span>
              {errors.password && (
                <p className="d-flex justify-content-start text-danger mt-2 small">
                  {errors.password}
                </p>
              )}
            </div>
            <div className="Checkboxs">
              <label className="CheckBox">
                Remember Me
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={rememberMe}
                  onChange={handleChecked}
                />
                <span className="checkmark" />
              </label>
              <Link to="/forgotPassword">Forgot password?</Link>
            </div>
            <button className="Login" onClick={handleSubmit}>
              Log In <i className="fa fa-sign-in" />
            </button>
            {/* <button>Log In <i class="fa fa-sign-in"></i></button> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
