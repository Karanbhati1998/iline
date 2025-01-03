import React from "react";
import { useDispatch } from "react-redux";
import {
  getVechileCategory,
  vehicleCategoryStatus,
} from "../../features/slices/vechileManagement/vechileCategory";
import { toastService } from "../../utils/toastify";
import Modal from "../Modal";
import { bannerStatus, getBannerList } from "../../features/slices/bannerSlice";
const DeleteBannerModal = ({ handleCloseDeleteModal,id }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    const data = { id, status: "DELETED" };
    dispatch(bannerStatus(data)).then((res) => {
      if (res?.payload?.code == 200) {
        toastService.success(" Banner  deleted successfully");
        dispatch(getBannerList());
        handleCloseDeleteModal();
      } else {
        toastService.error("Banner deleted failed");
      }
    });
  };
  return (
    <Modal>
      <div className="modal-body">
        <div className="Decline">
          <a className="CloseModal" onClick={handleCloseDeleteModal}>
            ×
          </a>
          <h3>Delete</h3>
          <p>Are you sure you want to delete this Vechile category?</p>
          <h4>
            <a onClick={handleCloseDeleteModal}>no</a>
            <a onClick={handleDelete}>Yes</a>
          </h4>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteBannerModal;
