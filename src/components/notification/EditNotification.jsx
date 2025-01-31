import React, { useEffect, useState } from "react";
import { toastService } from "../../utils/toastify";
import { imageUpload } from "../../features/slices/imageUpload";
import { useDispatch, useSelector } from "react-redux";
import LoaderForImage from "../LoaderForImage";
import BackButton from "../BackButton";
import Select, { InputActionMeta } from "react-select";
import { userList } from "../../features/slices/userManagementReducer";
import { addNotification } from "../../features/slices/notification";
import { useLocation, useNavigate } from "react-router-dom";
import { editNotification } from "../../features/slices/notification";
import { fetchAllDriverList } from "../../features/slices/DriverManagement/allDriver/allDriverReducer";
const initialState = {
  userType: "",
  userSelect: "",
  userIdArr: [],
  title: "",
  content: "",
  contentUrl: "",
  isMultiple: true,
  selectedValue: "",
  error: {},
  imageLoader: false,
};
const EditNotification = () => {
  const [iState, setUpdateState] = useState(initialState);
  const {
    content,
    contentUrl,
    title,
    userSelect,
    selectedValue,
    userIdArr,
    userType,
    isMultiple,
    error,
    imageLoader,
  } = iState;
  const [options, setOptions] = useState([{ value: "All", label: "All" }]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    setUpdateState((prev) => ({
      ...prev,
      title: state?.title || "",
      content: state?.content || "",
      userSelect:
        state?.userSelect == "All" ? { value: "All", label: "All" } : [],
      selectedValue:
        state?.userSelect == "All" ? { value: "All", label: "All" } : [],
      isMultiple: state?.userSelect == "All" ? false : true,
      userType: state?.userType || "",
      contentUrl: state?.contentUrl || "",
    }));
    if (state?.userSelect=="All"){
       setUpdateState((prev) => ({
         ...prev,
         selectedValue: [{ value: "All", label: "All" }],
         isMultiple: false,
       }));
    }else if (state?.userType === "USER") {
        dispatch(userList({ limit: 999999 })).then((res) => {
          if (res?.payload?.code == 200) {
            const mappedOptions =
              res?.payload?.result?.[0]?.paginationData?.map((item) => ({
                value: item._id,
                label: item.fullName,
              })) || [];
            const mapData = mappedOptions.filter((val) => {
              return state?.users?.includes(val?.value);
            });
            setUpdateState((prev) => ({
              ...prev,
              selectedValue: mapData,
              isMultiple: true,
            }));
          }
        });
      } else if (state?.userType === "DRIVER") {
        dispatch(fetchAllDriverList({ limit: 999999 })).then((res) => {
          console.log({res});
          
          if (res?.payload?.code == 200) {
            const mappedOptions =
              res?.payload?.result?.map((item) => ({
                value: item._id,
                label: item.fullName,
              })) || [];
  console.log({ mappedOptions });
            const mapData = mappedOptions.filter((val) => {
              return state?.users?.includes(val?.value);
            });
            console.log({ mapData });
            
            setUpdateState((prev) => ({
              ...prev,
              selectedValue: mapData,
              isMultiple: true,
            }));
          }
        });
      }
  }, [state]);

  const { users } = useSelector((state) => state.userManagement);
  const { allDriverData } = useSelector((state) => {
    return state?.driverManagementAllDrivers;
  });

  console.log({ state });
  useEffect(() => {
    if (userType === "USER") {
      const mappedOptions =
        users?.payload?.result?.[0]?.paginationData?.map((item) => ({
          value: item._id,
          label: item.fullName,
        })) || [];

      setOptions([{ value: "All", label: "All" }, ...mappedOptions]);
   
    } else if (userType === "DRIVER" ) {
      const mappedOptions =
        allDriverData?.result?.map((item) => ({
          value: item._id,
          label: item.fullName,
        })) || [];

      setOptions([{ value: "All", label: "All" }, ...mappedOptions]);
    }
  }, [users, allDriverData, userType]);


  // useEffect(() => {
  //   if (userType == "USER" ) {
  //     dispatch(userList({ limit: 999999 }));
  //     setUpdateState((prev) => ({
  //       ...prev,
  //       userSelect: "",
  //       selectedValue: [],
  //     }));
  //   } else if (userType == "DRIVER" ) {
  //     dispatch(fetchAllDriverList({ limit: 999999 }));
  //     setUpdateState((prev) => ({
  //       ...prev,
  //       userSelect: "",
  //       selectedValue: [],
  //     }));
  //   }
  // }, [userType]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateState((prev) => ({
      ...prev,
      [name]: value,
      error: {
        ...prev.error,
        [name]: false,
      },
    }));
  };
  const handleChangeType=(e)=>{
     const { name, value } = e.target;
    setUpdateState((prev) => ({
     ...prev,
      userType: value,
      error: {
       ...prev.error,
        userType: false,
      },
    }));
     if (value == "USER") {
       dispatch(userList({ limit: 999999 }));
       setUpdateState((prev) => ({
         ...prev,
         userSelect: "",
         selectedValue: [],
       }));
     } else if (value == "DRIVER") {
       dispatch(fetchAllDriverList({ limit: 999999 }));
       setUpdateState((prev) => ({
         ...prev,
         userSelect: "",
         selectedValue: [],
       }));
     }

  }
  const handleSelectChange = (selectedOptions) => {
    console.log({ selectedOptions });

    if (
      selectedOptions?.[selectedOptions?.length - 1]?.value === "All" ||
      selectedOptions?.value === "All"
    ) {
      // If "All" is selected
      setUpdateState((prev) => ({
        ...prev,
        userSelect: "All",
        userIdArr: [],
        selectedValue: [{ value: "All", label: "All" }],
        isMultiple: false,
        error: {
          ...prev.error,
          userSelect: "",
        },
      }));
    } else {
      // For any other selection
      const selectedValues = Array.isArray(selectedOptions)
        ? selectedOptions.map((opt) => opt?.value)
        : [selectedOptions?.value];

      setUpdateState((prev) => ({
        ...prev,
        userIdArr: selectedValues,
        userSelect: "",
        selectedValue: selectedOptions,
        isMultiple: true,
        error: {
          ...prev.error,
          userSelect: "",
        },
      }));
    }
  };
  const uploadImage = (e) => {
    const file = e.target?.files[0];
    const fieldName = e.target.name;

    if (!file) {
      toastService.error("File not found");
      return;
    }

    setUpdateState((prev) => ({
      ...prev,
      imageLoader: true,
      error: { ...prev.error, [fieldName]: "" },
    }));

    const formData = new FormData();
    formData.append("fileName", file);

    dispatch(imageUpload(formData)).then((res) => {
      if (res?.payload?.code === 200) {
        toastService.success("Image uploaded successfully");
        setUpdateState((prev) => ({
          ...prev,
          [fieldName]: res.payload.url,
          imageLoader: false,
        }));
      } else {
        toastService.error("Image upload failed");
        setUpdateState((prev) => ({
          ...prev,
          [fieldName]: "",
          imageLoader: false,
        }));
      }
    });
  };

  const handleValidation = () => {
    const formErrors = {};
    let isValid = true;

    if (!userType.trim()) {
      formErrors.userType = "User type is required";
      isValid = false;
    }
    // if (!userSelect.trim()) {
    //   formErrors.userSelect = "User select is required";
    //   isValid = false;
    // }
    if (!title.trim()) {
      formErrors.title = "Title is required";
      isValid = false;
    }
    if (!content.trim()) {
      formErrors.content = "Content is required";
      isValid = false;
    }
    if (!contentUrl.trim()) {
      formErrors.contentUrl = "Content URL is required";
      isValid = false;
    }

    setUpdateState((prev) => ({ ...prev, error: formErrors }));
    return isValid;
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      console.log(iState);
      const data = {
        id:state?._id,
        userType,
        title,
        content,
        contentUrl,
        ...(userSelect === "All"
          ? { userSelect }
          : userIdArr?.length
          ? { userIdArr }
          : {}),
      };
      dispatch(editNotification(data)).then((res) => {
        if (res?.payload?.code === 200) {
          setUpdateState(initialState);
          toastService.success("Notification submitted successfully!");
          navigate("/pushNotification");
        } else {
          toastService.error("Notification submission failed!");
        }
      });
    }
  };
  console.log({ iState });

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <h4 className="Title">Edit Notification</h4>
          <a className="TitleLink">
            <BackButton />
          </a>
        </div>
        <div className="Small-Wrapper">
          <div className="InformationBoxDetails mb-4">
            <div className="Informations">
              <div className="ProfileInfo">
                <div className="row">
                  <div className="col-4">
                    <div className="form-group">
                      <label>Select User Group*</label>
                      <select
                        style={{ border: "1px solid #ddd" }}
                        className="form-control"
                        name="userType"
                        value={userType}
                        onChange={handleChangeType}
                        disabled
                      >
                        <option value="">Select User Group</option>
                        <option value="DRIVER">Driver</option>
                        <option value="USER">User</option>
                      </select>
                      {error.userType && (
                        <p className="text-danger mt-2">{error.userType}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-4 offset-2">
                    <div className="form-group">
                      <label>Select *</label>
                      <Select
                        key={userType || isMultiple}
                        isMulti={isMultiple}
                        isClearable
                        isSearchable
                        name="userSelect"
                        value={selectedValue}
                        isDisabled
                      />
                      {error.userSelect && (
                        <p className="text-danger mt-2">{error.userSelect}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <div className="form-group">
                      <label>Notification Title*</label>
                      <input
                        style={{ border: "1px solid #ddd" }}
                        type="text"
                        className="form-control"
                        name="title"
                        value={title}
                        onChange={handleChange}
                      />
                      {error.title && (
                        <p className="text-danger mt-2">{error.title}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label>Upload Image*</label>
                    {imageLoader ? (
                      <LoaderForImage />
                    ) : !contentUrl ? (
                      <div className="UploadBox">
                        <div className="Upload">
                          <i className="fa fa-upload" />{" "}
                          <span>Upload Icon</span>
                          <input
                            id="inputId"
                            type="file"
                            name="contentUrl"
                            onChange={uploadImage}
                            accept=".jpg,.png,.jpeg"
                          />
                        </div>
                      </div>
                    ) : (
                      <figure
                        style={{
                          margin: "0",
                          width: "120px",
                          borderRadius: "0",
                          overflow: "hidden",
                          border: "2px solid #979797",
                          position: "relative",
                        }}
                      >
                        <img src={contentUrl} alt="Uploaded Icon" />
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
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            document.getElementById("inputId").click();
                          }}
                        />
                      </figure>
                    )}
                    {error.contentUrl && (
                      <p className="text-danger mt-2">{error.contentUrl}</p>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label>Notification Content*</label>
                      <textarea
                        rows={6}
                        cols="50"
                        style={{ border: "1px solid #ddd" }}
                        type="text"
                        className="form-control"
                        name="content"
                        value={content}
                        onChange={handleChange}
                      />
                      {error.content && (
                        <p className="text-danger mt-2">{error.content}</p>
                      )}
                    </div>
                  </div>
                </div>
                <button className="Button" onClick={handleSubmit}>
                  Edit Notification
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNotification;
