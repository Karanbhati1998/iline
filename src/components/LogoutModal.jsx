import React from 'react'
import Modal from "./Modal"
import { useNavigate } from 'react-router-dom';
import { toastService } from '../utils/toastify';
const LogoutModal = ({ handleClose }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("ilineLogin");
    navigate("/login");
    toastService.success("Logged Out Successfully");
  };

  return (
    <Modal>
      <div className="modal-body">
        <div className="Decline">
          <a className="CloseModal" onClick={handleClose}>
            ×
          </a>
          <h3>Logout</h3>
          <p>Are you sure you want to log out?</p>
          <h4>
            <a onClick={handleClose}>no</a>
            <a onClick={handleLogout}>Yes</a>
          </h4>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal