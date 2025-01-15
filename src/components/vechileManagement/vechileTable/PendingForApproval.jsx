import React from "react";
import Modal from "../../Modal";
import moment from "moment";

const PendingForApproval = ({ handleClose,data }) => {
    console.log({data});
    
  return (
    <div className="modal-open">
      <div className="ModalBox">
        <div
          id="PendingModal"
          className="modal fade BigModal show"
          style={{ display: "block" }}
          aria-modal="true"
          role="dialog"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <div className="Category">
                  <a className="CloseModal" onClick={handleClose}>
                    ×
                  </a>
                  <h3>Pending For Approval</h3>
                  <figure>
                    <img src="images/user.png" alt="" />
                  </figure>
                  <h3>
                    {data?.driverData?.fullName} <br />
                    <span>Driver ID: {data?.driverData?.driver_number}</span>
                  </h3>
                  <br />
                  <div className="RequestBox">
                    <div className="form-group">
                      <p>
                        <strong>Request ID </strong>
                        <span> #2346590</span>
                      </p>
                      <p>
                        <strong>Driver ID </strong>
                        <span>#{data?.driverData?.driver_number}</span>
                      </p>
                      <p>
                        <strong>Driver Name </strong>
                        <span>{data?.driverData?.fullName}</span>
                      </p>
                      <p>
                        <strong>Created on </strong>
                        <span>
                          {moment(data?.driverData?.createdAt).format(
                            "DD-MM-YYYY"
                          )}
                        </span>
                      </p>
                      <p>
                        <strong>Created By </strong>
                        <span>Self Signup </span>
                      </p>
                    </div>
                    <div className="form-group">
                      <div className="ModalTable">
                        <table>
                          <thead>
                            <tr>
                              <th />
                              <th>Approve</th>
                              <th>Disapprove</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <div className="VehicleDocument">
                                  <h4>RC Details</h4>
                                  <aside>
                                    <p>
                                      <strong>
                                        Registration Certificate Number
                                      </strong>
                                      <span>{data?.rcNumber}</span>
                                    </p>
                                    <p>
                                      <strong>Expiry</strong>
                                      <span>
                                        {moment(data?.rcExpiryDate).format(
                                          "DD-MM-YYYY"
                                        )}
                                      </span>
                                    </p>
                                  </aside>
                                  <ul>
                                    <li>
                                      <span>Document</span>
                                      <figure>
                                        <img src="https://mobulous.co.in/just-clubbing/assets/images/driving.png" />
                                      </figure>
                                    </li>
                                  </ul>
                                </div>
                              </td>
                              <td>
                                <label className="CheckBox">
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </td>
                              <td>
                                <label className="CheckBox">
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="VehicleDocument">
                                  <h4>Insurance Details</h4>
                                  <aside>
                                    <p>
                                      <strong>
                                        Insurance Certificate Number
                                      </strong>
                                      <span>65465165165FSA54</span>
                                    </p>
                                    <p>
                                      <strong>Expiry</strong>
                                      <span>
                                        {" "}
                                        {moment(
                                          data?.insurenceExpiryDate
                                        ).format("DD-MM-YYYY")}
                                      </span>
                                    </p>
                                  </aside>
                                  <ul>
                                    <li>
                                      <span>Document</span>
                                      <figure>
                                        <img src="https://mobulous.co.in/just-clubbing/assets/images/driving.png" />
                                      </figure>
                                    </li>
                                  </ul>
                                </div>
                              </td>
                              <td>
                                <label className="CheckBox">
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </td>
                              <td>
                                <label className="CheckBox">
                                  <input type="checkbox" />
                                  <span className="checkmark" />
                                </label>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="Buttons">
                      <button className="Approve">Approve</button>
                      <button className="Reject">Disapprove</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="DisapprovedModal" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <div className="Category">
                  <a
                    href="javascript:void(0);"
                    className="CloseModal"
                    data-dismiss="modal"
                  >
                    ×
                  </a>
                  <h3>If Disapproved</h3>
                  <div className="RequestBox">
                    <div className="form-group">
                      <label>Select Reason to disapprove</label>
                      <select type="text" className="form-control">
                        <option>Blurred Image </option>
                        <option>Non -valid document</option>
                        <option>Blurred Image of document</option>
                        <option>Lorem Ipsum </option>
                        <option>Others</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Enter Text</label>
                      <textarea
                        className="form-control"
                        rows={5}
                        defaultValue={""}
                      />
                    </div>
                    <div className="Buttons">
                      <button className="Reject">Disapprove</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingForApproval;
