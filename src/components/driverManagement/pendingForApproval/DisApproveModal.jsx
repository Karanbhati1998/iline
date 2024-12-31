import React from "react";
import Modal from "../../Modal";

const DisApproveModal = ({
  handleCloseDisApproveModal,
  handleApproveOrDisApprove,
}) => {
  return (
    <Modal>
      <div className="modal-body">
        <div className="Category">
          <a className="CloseModal" onClick={handleCloseDisApproveModal}>
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
              <textarea className="form-control" rows={5} defaultValue={""} />
            </div>
            <div className="Buttons">
              <button
                className="Reject"
                onClick={() => handleApproveOrDisApprove("REJECT")}
              >
                Disapprove
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DisApproveModal;
