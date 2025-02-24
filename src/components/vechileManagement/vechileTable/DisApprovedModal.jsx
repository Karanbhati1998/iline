import React, { useState } from "react";
import Modal from "../../Modal";
import { useDispatch } from "react-redux";
import {
  getPendingVehicleList,
  pendingVehicleStatus,
} from "../../../features/slices/vechileManagement/vechileManagement";
import { toastService } from "../../../utils/toastify";

const DisApprovedModal = ({
  handleClose,
  id,
  handleMainModalClose,
  setapproveVechileStatus,
}) => {
  const [data, setData] = useState({
    rejectReason: "",
    rejectNote: "",
  });
  const [error, setError] = useState({}); // Fixed destructuring issue
  const { rejectNote, rejectReason } = data;

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    let formErrors = {};
    let isValid = true;

    if (!rejectReason.trim()) {
      formErrors.rejectReason = "Reject reason is required.";
      isValid = false;
    }
    if (!rejectNote.trim()) {
      formErrors.rejectNote = "Reject note is required.";
      isValid = false;
    }

    setError(formErrors);
    return isValid;
  };

  const handleDisApprove = () => {
    if (handleValidation()) {
      dispatch(
        pendingVehicleStatus({
          id,
          status: "REJECT",
          rejectReason,
          rejectNote,
        })
      ).then((res) => {
        if (res?.payload?.code === 200) {
          console.log({ res });
          setapproveVechileStatus("REJECT");
          toastService.success("Disapproved successfully.");
          handleClose();
          handleMainModalClose();
          dispatch(getPendingVehicleList({ page: 1 }));
        } else {
          toastService.error("Failed to disapprove.");
        }
      });
    }
  };

  return (
    <Modal>
      <div className="modal-body">
        <div className="Category">
          <button className="CloseModal" onClick={handleClose}>
            ×
          </button>
          <h3>If Disapproved</h3>
          <div className="RequestBox">
            {/* Reject Reason Dropdown */}
            <div className="form-group">
              <label>Select Reason to Disapprove</label>
              <select
                className="form-control"
                name="rejectReason"
                onChange={handleChange}
                value={rejectReason}
              >
                <option value="" disabled>
                  -- Select Reason --
                </option>
                <option value="Blurred Image">Blurred Image</option>
                <option value="Non-valid document">Non-valid document</option>
                <option value="Blurred Image of document">
                  Blurred Image of document
                </option>
                <option value="Lorem Ipsum">Lorem Ipsum</option>
                <option value="Others">Others</option>
              </select>
              {error.rejectReason && (
                <p className="text-danger mt-2 error">{error.rejectReason}</p>
              )}
            </div>

            {/* Reject Note Textarea */}
            <div className="form-group">
              <label>Enter Text</label>
              <textarea
                className="form-control"
                rows={5}
                name="rejectNote"
                onChange={handleChange}
                value={rejectNote}
              />
              {error.rejectNote && (
                <p className="text-danger mt-2 error">{error.rejectNote}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="Buttons">
              <button className="Reject" onClick={handleDisApprove}>
                Disapprove
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DisApprovedModal;
