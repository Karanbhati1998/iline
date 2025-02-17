import React, { useEffect, useRef, useState } from "react";
import Modal from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  addSubAdmin,
  getRoleList,
  getSubAdminList,
} from "../../features/slices/subAdmin";
import LoaderForImage from "../LoaderForImage";
import { toastService } from "../../utils/toastify";
import { imageUpload } from "../../features/slices/imageUpload";

const initialState = {
  gender: "",
  name: "",
  roleId: "",
  email: "",
  phoneNumber: "",
  username: "",
  password: "",
  profilePic: "",
  errors: {},
  imageLoader: false,
  loading: false
};

const AddSubAdmin = ({ handleShowAddSubAdminModal }) => {
  const [iState, setUpdateState] = useState(initialState);
  const {
    gender,
    name,
    roleId,
    email,
    phoneNumber,
    password,
    username,
    profilePic,
    errors,
    imageLoader,
    loading,
  } = iState;
  const fileInputRef = useRef(null);
  const { role } = useSelector((state) => state?.subAdmin);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateState((prev) => ({
      ...prev,
      [name]: value,
      errors: {
        ...prev.errors,
        [name]: "",
      },
    }));
  };

  const handleEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const uploadImage = (e) => {
    setUpdateState((prev) => ({
      ...prev,
      imageLoader: true,
      errors: {
        ...prev.errors,
        profilePic: "",
      },
    }));
    const file = e.target?.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("fileName", file);
      dispatch(imageUpload(formData)).then((res) => {
        if (res?.payload?.code === 200) {
          toastService.success("Image uploaded successfully");
          setUpdateState((prev) => ({
            ...prev,
            imageLoader: false,
            profilePic: res?.payload?.url,
          }));
        } else {
          toastService.error("Image upload failed");
          setUpdateState((prev) => ({
            ...prev,
            profilePic: "",
            imageLoader: false,
          }));
        }
      });
    } else {
      toastService.error("File not found");
      setUpdateState((prev) => ({ ...prev, imageLoader: false }));
    }
  };

  useEffect(() => {
    dispatch(getRoleList({ limit: 1000000 }));
  }, [dispatch]);

  const handleValidation = () => {
    let formErrors = {};
    let isValid = true;

    // Name Validation (Only alphabets, no numbers or special characters)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!name.trim()) {
      formErrors.name = "Name is required";
      isValid = false;
    } else if (!nameRegex.test(name)) {
      formErrors.name = "Name should only contain alphabets";
      isValid = false;
    }

    // Gender Validation
    if (!gender.trim()) {
      formErrors.gender = "Gender is required";
      isValid = false;
    }

    // Role ID Validation
    if (!roleId.trim()) {
      formErrors.roleId = "Role data is required";
      isValid = false;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      formErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      formErrors.email = "Invalid email format";
      isValid = false;
    }

    // Phone Number Validation (Exactly 10 digits, starts with 0-9)
    const phoneRegex = /^[0-9]\d{9}$/;
    if (!phoneNumber.trim()) {
      formErrors.phoneNumber = "Phone number is required";
      isValid = false;
    } else if (!phoneRegex.test(phoneNumber)) {
      formErrors.phoneNumber = "Invalid phone number format";
      isValid = false;
    }

    // Username Validation
    if (!username.trim()) {
      formErrors.username = "Username is required";
      isValid = false;
    }

    // Password Validation (1 uppercase, 1 lowercase, 1 special character, 8-16 characters)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,16}$/;
    if (!password.trim()) {
      formErrors.password = "Password is required";
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      formErrors.password =
        "Password must be 8-16 characters, include at least 1 uppercase letter, 1 lowercase letter, and 1 special character";
      isValid = false;
    }

    // Profile Picture Validation
    if (!profilePic.trim()) {
      formErrors.profilePic = "Profile picture is required";
      isValid = false;
    }

    setUpdateState((prev) => ({
      ...prev,
      errors: formErrors,
    }));

    return isValid;
  };


  const handleSubmit = () => {
    if (handleValidation()) {
      const data = {
        name,
        gender,
        roleId,
        email,
        phoneNumber,
        userName: username,
        password,
        profilePic,
      };
      setUpdateState((prev) => ({
       ...prev,
        loading: true,
      }));
      dispatch(addSubAdmin(data)).then((res) => {
        if (res?.payload?.code === 200) {
          toastService.success("Sub Admin added successfully");
          dispatch(getSubAdminList());
          handleShowAddSubAdminModal();
          setUpdateState(initialState);
        } else {
          toastService.error("Sub Admin addition failed");
          setUpdateState((prev) => ({
            ...prev,
            loading: false,
          }));
        }
      });
    }
  };
  return (
    <Modal>
      <div className="modal-body">
        <div className="Category">
          <a className="CloseModal" onClick={handleShowAddSubAdminModal}>
            ×
          </a>
          <h3>Add New Sub Admin</h3>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="d-flex justify-content-start text-danger mt-2 error">
                {errors.name}
              </p>
            )}
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select
              className="form-control"
              name="gender"
              value={gender}
              onChange={handleChange}
            >
              <option>Select Gender</option>
              <option value={"Male"}>Male</option>
              <option value={"Female"}>Female</option>
            </select>
            {errors.gender && (
              <p className="d-flex justify-content-start text-danger mt-2 error">
                {errors.gender}
              </p>
            )}
          </div>
          <div className="form-group">
            <label>Assign Role</label>
            <select
              className="form-control"
              name="roleId"
              value={roleId}
              onChange={handleChange}
            >
              <option>Select Role</option>
              {role?.result?.[0]?.paginationData?.map((res, i) => {
                return (
                  <option key={i} value={res._id}>
                    {res.title}
                  </option>
                );
              })}
            </select>
            {errors.roleId && (
              <p className="d-flex justify-content-start text-danger mt-2 error">
                {errors.roleId}
              </p>
            )}
          </div>
          <div className="form-group">
            <label>Enter Email ID</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="d-flex justify-content-start text-danger mt-2 error">
                {errors.email}
              </p>
            )}
          </div>
          <div className="form-group">
            <label>Enter Mobile Number</label>
            <input
              type="number"
              className="form-control"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleChange}
              maxLength={10}
            />
            {errors.phoneNumber && (
              <p className="d-flex justify-content-start text-danger mt-2 error">
                {errors.phoneNumber}
              </p>
            )}
          </div>
          <div className="form-group">
            <label>Enter Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={handleChange}
            />
            {errors.username && (
              <p className="d-flex justify-content-start text-danger mt-2 error">
                {errors.username}
              </p>
            )}
          </div>
          <div className="form-group">
            <label>Enter password</label>
            <input
              type="text"
              className="form-control"
              name="password"
              value={password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="d-flex justify-content-start text-danger mt-2 error">
                {errors.password}
              </p>
            )}
          </div>
          <div className="form-group">
            <label>Profile Images</label>
            {imageLoader ? (
              <LoaderForImage />
            ) : !profilePic ? (
              <div className="UploadBox">
                <div className="Upload">
                  <i className="fa fa-upload" /> <span>Upload Icon</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="profilePic"
                    onChange={uploadImage}
                    accept=".jpg,.png,.jpeg"
                  />
                </div>
              </div>
            ) : (
              <figure
                style={{
                  margin: "0",
                  width: "150px",
                  height: "150px",
                  borderRadius: "0",
                  overflow: "hidden",
                  border: "2px solid #979797",
                  position: "relative",
                }}
              >
                <img
                  src={profilePic}
                  alt="Uploaded Icon"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "5px",
                    transition: "transform 0.3s ease",
                  }}
                />
                <i
                  className="fa fa-edit"
                  style={{
                    position: "absolute",
                    top: "0px",
                    right: "0px",
                    color: "#fff",
                    background: "rgba(0, 0, 0, 0.6)",
                    borderRadius: "50%",
                    padding: "5px",
                    zIndex: 2, // Place icon above the image
                    cursor: "pointer",
                  }}
                  onClick={handleEditClick} // Trigger the file input click
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  name="profilePic"
                  onChange={uploadImage}
                  accept=".jpg,.png,.jpeg"
                  style={{ display: "none" }} // Hide the file input
                />
              </figure>
            )}
            {errors.profilePic && (
              <p className="d-flex justify-content-start text-danger mt-2 error">
                {errors.profilePic}
              </p>
            )}
          </div>
          <button className="Button" onClick={handleSubmit} disabled={loading}>
            {" "}
            Add Sub Admin
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddSubAdmin;
