import React, { useState } from "react";
import BackButton from "../BackButton";
import { addRole } from "../../features/slices/subAdmin";
import { toastService } from "../../utils/toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const initialState = {
  title: "",
  permission: [
    {
      name: "Dashboard",
      read: false,
      fullAccess: false,
    },
    {
      name: "User Management",
      read: false,
      fullAccess: false,
    },
    {
      name: "Driver Management",
      read: false,
      fullAccess: false,
    },
    {
      name: "Cab Partner Management",
      read: false,
      fullAccess: false,
    },
    {
      name: "Business Partner Management",
      read: false,
      fullAccess: false,
    },
    {
      name: "Booking Management",
      read: false,
      fullAccess: false,
    },
    {
      name: "Payment & Revenue Management",
      read: false,
      fullAccess: false,
    },
    {
      name: "City Management",
      read: false,
      fullAccess: false,
    },
    {
      name: "Vehicle Management",
      read: false,
      fullAccess: false,
    },
    {
      name: "Banner Management",
      read: false,
      fullAccess: false,
    },
    {
      name: "Ad & Package Management",
      read: false,
      fullAccess: false,
    },
    {
      name: "Device Management",
      read: false,
      fullAccess: false,
    },
    {
      name: "Sub-Admin Management",
      read: false,
      fullAccess: false,
    },
    {
      name: "Content Management",
      read: false,
      fullAccess: false,
    },
    {
      name: "Support Ticket Management",
      read: false,
      fullAccess: false,
    },
    {
      name: "Push Notifications",
      read: false,
      fullAccess: false,
    },
    {
      name: "Reports",
      read: false,
      fullAccess: false,
    },
    {
      name: "Settings",
      read: false,
      fullAccess: false,
    },
  ],
};
const CreateRole = () => {
  const [iState, setUpdateState] = useState(initialState);
  const [error, setErrors] = useState("");
  const { title, permission } = iState;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlePermission = (moduleName, type) => {
    setUpdateState((prevState) => ({
      ...prevState,
      permission: prevState.permission.map((module) =>
        module.name === moduleName
          ? {
              ...module,
              [type]: !module[type],
              ...(type === "fullAccess" && { read: !module[type] }),
            }
          : module
      ),
    }));
  };
  console.log({ permission });
  const handleSubmit = () => {
    if (title.trim()) {
      dispatch(addRole(iState)).then((res) => {
        if (res?.payload?.code == 200) {
          toastService.success("Role added successfully");
          navigate("/subAdmin");
        } else {
          toastService.error(res?.payload?.message);
          console.log({ res });
        }
      });
    } else {
      setErrors("Role name is required");
    }
  };
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <a className="TitleLink">
            <BackButton />
          </a>
        </div>
        <div className="TitleBox">
          <h4 className="Title">Sub Admin Management</h4>
        </div>

        <div className="Small-Wrapper">
          <div className="TitleBox">
            <h4 className="Title">Create Role</h4>
          </div>
          <div className="CommonForm">
            <div className="form-group">
              <label>Role Name</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={title}
                onChange={(e) =>
                  setUpdateState({ ...iState, title: e.target.value })
                }
              />
              <p className="d-flex justify-content-start text-danger mt-2 error">
                {error}
              </p>
            </div>
            <h4>Sub Admin Rights Access</h4>
            <div className="AdminAccess">
              <table className="table">
                <thead>
                  <tr>
                    <th>Module</th>
                    <th width="150px">Read</th>
                    <th width="150px">Full Access</th>
                  </tr>
                </thead>
                <tbody>
                  {permission?.map((module) => (
                    <tr key={module.name}>
                      <td>
                        <strong>{module.name}</strong>
                      </td>
                      <td>
                        <div className="Read">
                          <input
                            type="checkbox"
                            checked={module.read}
                            onChange={() =>
                              handlePermission(module.name, "read")
                            }
                          />
                          <span>
                            {/* <i className="fa fa-eye-slash" aria-hidden="true" /> */}
                            {module.read ? (
                              <i className="fa fa-eye" aria-hidden="true" />
                            ) : (
                              <i
                                className="fa fa-eye-slash"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div className="Access">
                          <input
                            type="checkbox"
                            checked={module.fullAccess}
                            onChange={() =>
                              handlePermission(module.name, "fullAccess")
                            }
                          />
                          <span>
                            {module?.fullAccess ? (
                              <i className="fa fa-lock" />
                            ) : (
                              <i className="fa fa-unlock"></i>
                            )}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="Button" onClick={handleSubmit}>
              Create Role
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRole;
