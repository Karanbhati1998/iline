import React from 'react'
import Modal from "./Modal"
const DeleteModal = ({handleClose,handleDelete,statement}) => {
  return (
    <Modal>
      <div className="modal-body">
        <div className="Decline">
          <a className="CloseModal" onClick={handleClose}>
            ×
          </a>
          <h3>Delete</h3>
          <p>Are you sure you want to delete this {statement}?</p>
          <h4>
            <a onClick={handleClose}>no</a>
            <a onClick={handleDelete}>Yes</a>
          </h4>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteModal