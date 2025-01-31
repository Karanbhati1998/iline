import React from "react";
import Modal from "../../Modal";
import moment from "moment";

const DateList = ({ data,handleClose }) => {
  console.log({ data });

  return (
    <Modal>
      <div className="modal-body">
        <div className="Decline">
          <a className="CloseModal" onClick={handleClose}>
            ×
          </a>
          <h3>Date List</h3>
          <div className="Small-Wrapper">
            
            <div className="TableList mt-2">
              <table>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Day</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((date, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{moment(date).format("dddd")}</td>
                      <td>{moment(date).format("DD-MM-YYYY")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DateList;
