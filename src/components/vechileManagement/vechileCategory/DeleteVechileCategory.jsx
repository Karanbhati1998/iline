import React from "react";
import { useDispatch } from "react-redux";
import {
  getVechileCategory,
  vehicleCategoryStatus,
} from "../../../features/slices/vechileManagement/vechileCategory";
import { toastService } from "../../../utils/toastify";
import Modal from "../../Modal";

const DeleteVechileCategory = ({ handleDeleteModalClose, id }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    const data = { id, status: "DELETED" };
    dispatch(vehicleCategoryStatus(data)).then((res) => {
      if (res?.payload?.code == 200) {
        toastService.success(" Vechile category  deleted successfully");
        dispatch(getVechileCategory());
        handleDeleteModalClose();
      } else {
        toastService.error("Vechile category deleted failed");
      }
    });
  };
  return (
    <Modal>
      <div className="modal-body">
        <div className="Decline">
          <a className="CloseModal" onClick={handleDeleteModalClose}>
            ×
          </a>
          <h3>Delete</h3>
          <p>Are you sure you want to delete this Vechile category?</p>
          <h4>
            <a onClick={handleDeleteModalClose}>no</a>
            <a onClick={handleDelete}>Yes</a>
          </h4>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteVechileCategory;
