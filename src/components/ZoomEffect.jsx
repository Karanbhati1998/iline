import React from "react";
import Modal from "./Modal";
const ZoomEffect = ({ image, handleClose }) => {
  return (
    <Modal>
      <div className="modal-body">
        <div className="Decline">
          <a className="CloseModal" onClick={handleClose}>
            ×
          </a>
          <img src={image} alt="" style={{
            width: "50vw",
            objectFit: "contain",
            cursor: "zoom-in"
          }}/>
        </div>
      </div>
    </Modal>
  );
};

export default ZoomEffect;
