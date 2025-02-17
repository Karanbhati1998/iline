import moment from 'moment';
import React from 'react'
import { useLocation } from 'react-router-dom';

const SubAdminDetail = () => {
  const {state}=useLocation()
  console.log({state});
  
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <h4 className="Title">Sub Admin Details</h4>
        </div>
        <div className="Small-Wrapper">
          <div className="SubAdminBox">
            <figure>
              <img
                src={
                  state?.profilePic ||
                  require("../../assets/images/Avatar-1.png")
                }
              />
            </figure>
            <figcaption>
              <p>
                <strong>Sub Admin Name</strong>
                <span>{state?.name}</span>
              </p>
              <p>
                <strong>Sub Admin ID</strong>
                <span>{state?.subadmin_number}</span>
              </p>
              <p>
                <strong>Created On</strong>
                <span>{moment(state?.createdAt).format("DD-MM-YYYY")}</span>
              </p>
              <p>
                <strong>Role</strong>
                <span>{state?.roleId?.[0]?.title}</span>
              </p>
              <p>
                <strong> Email ID</strong>
                <span>{state?.email}</span>
              </p>
              <p>
                <strong> Contact No.</strong>
                <span>{state?.phoneNumber}</span>
              </p>
              <p>
                <strong> User Name</strong>
                <span>{state?.userName}</span>
              </p>
              {/* <p>
                <strong>Password</strong>
                <span>Kim123</span>
              </p> */}
            </figcaption>
          </div>
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
                {state?.roleId?.[0]?.permission?.map((perm, index) => (
                  <tr key={index}>
                    <td>
                      <strong>{perm.name}</strong>
                    </td>
                    <td>
                      <div className="Read">
                        <input type="checkbox" checked={perm?.read} disabled />
                        <span>
                          {perm?.read ? (
                            <i className="fa fa-eye" aria-hidden="true" />
                          ) : (
                            <i className="fa fa-eye-slash" aria-hidden="true" />
                          )}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="Access">
                        <input
                          type="checkbox"
                          checked={perm?.fullAccess}
                          disabled
                        />
                        <span>
                          {perm?.fullAccess ? (
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
        </div>
      </div>
    </div>
  );
}

export default SubAdminDetail