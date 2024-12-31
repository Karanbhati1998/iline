import React from "react";
import Modal from "../Modal";
import { useDispatch } from "react-redux";
import {
  deleteFaq,
  getFaq,
} from "../../features/slices/staticContentManagement";
import { toastService } from "../../utils/toastify";

const DeleteFaq = ({ handleCloseFaq, id }) => {
  const dispatch = useDispatch();
  
  const handleDeleteFaq = () => {
    dispatch(deleteFaq({ faqId: id })).then((res) => {
      if (res?.payload?.code == 200) {
        toastService.success("FAQ deleted successfully");
        dispatch(getFaq());
        handleCloseFaq();
      } else {
        toastService.error(res?.payload?.message);
      }
    });
    handleCloseFaq();
    toastService.success("FAQ deleted successfully");
  };
  return (
    <Modal>
      <div className="modal-body">
        <div className="Decline">
          <a
            href="javascript:void(0);"
            className="CloseModal"
            onClick={handleCloseFaq}
          >
            ×
          </a>
          <h3>Delete</h3>
          <p>Are you sure you want to delete this FAQ?</p>
          <h4>
            <a onClick={handleCloseFaq}>Close</a>
            <a onClick={handleDeleteFaq}>Delete</a>
          </h4>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteFaq;
