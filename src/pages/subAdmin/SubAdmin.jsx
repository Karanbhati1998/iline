import React, { useState } from "react";
import { Link } from "react-router-dom";
import SubAminComponent from "../../components/subAdmin/SubAminComponent";
import RoleComponent from "../../components/subAdmin/RoleComponent";
import AddSubAdmin from "../../components/subAdmin/AddSubAdmin";
import { canPerformAction } from "../../utils/deniedAccess";
import { useDispatch, useSelector } from "react-redux";
import { activeSubadminTabFunc } from "../../features/slices/subAdmin";

const SubAdmin = () => {
  const [showRole, setShowRole] = useState(false);
  const [showAddSubAdminModal, setShowAddSubAdminModal] = useState(false);
  const dispatch = useDispatch();
  const { activeSubadminTab } = useSelector((state) => {
    return state?.subAdmin;
  });
  const handleShowRole = () => {
    // setShowRole(!showRole);
    dispatch(activeSubadminTabFunc(!activeSubadminTab));
  };
  const handleShowAddSubAdminModal = () => {
    setShowAddSubAdminModal(!showAddSubAdminModal);
  };
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="TitleBox">
            <h4 className="Title">Sub Admin Management</h4>
            {canPerformAction("Sub-Admin Management") && !showRole ? (
              <a
                className="TitleLink"
                onClick={() => {
                  setShowAddSubAdminModal(true);
                }}
              >
                Add Sub Admin
              </a>
            ) : (
              <Link className="TitleLink" to="createRole">
                Create Role
              </Link>
            )}
          </div>
          <div className="CommonLinks">
            <ul>
              <li className={!activeSubadminTab && "active"}>
                <a onClick={handleShowRole}>Sub Admins</a>
              </li>
              <li className={activeSubadminTab && "active"}>
                <a onClick={handleShowRole}>Roles</a>
              </li>
            </ul>
          </div>
          {!activeSubadminTab ? <SubAminComponent /> : <RoleComponent />}
        </div>
      </div>
      {showAddSubAdminModal && (
        <AddSubAdmin handleShowAddSubAdminModal={handleShowAddSubAdminModal} />
      )}
    </>
  );
};

export default SubAdmin;
