import React from "react";
import Modal from "../../components/Modal";

const CloseChat = ({ handlecloseChatClose }) => {
  return (
    <Modal>
      <div className="modal-body">
        <div className="Decline">
          <a
            href="javascript:void(0);"
            className="CloseModal"
            onClick={handlecloseChatClose}
          >
            ×
          </a>
          <h3>Close Chat</h3>
          <p>Are you sure you want to delete this Close Chat?</p>
          <h4>
            <a onClick={handlecloseChatClose}>no</a>
            <a href="javascript:void(0);" data-dismiss="modal">
              Yes
            </a>
          </h4>
        </div>
      </div>
    </Modal>
  );
};

export default CloseChat;
