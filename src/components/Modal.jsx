import React from "react";

const Modal = ({ children }) => {
  return (
    <div className="ModalBox modal-open">
      <div
        id="NotificationAddModal"
        className="  modal fade show "
        style={{ display: "block" }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog">
          <div className="modal-content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
