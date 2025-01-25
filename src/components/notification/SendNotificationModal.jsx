import React from 'react'
import Modal from '../Modal'
import { resendNotification } from '../../features/slices/notification';
import { toastService } from '../../utils/toastify';
import { useDispatch } from 'react-redux';

const SendNotificationModal = ({ handleClose,id }) => {
  const dispatch = useDispatch();
  const handleResend = () => {
  dispatch(resendNotification({ id })).then((res) => {
    if (res?.payload?.code == 200) {
      toastService.success("Notification resent successfully");
      handleClose();
    } else {
      toastService.error("Failed to resend notification");
    }
  });
  };
  return (
    <Modal>
      <div className="modal-body">
        <div className="SendNotification">
          <a className="CloseModal" onClick={handleClose}>
            ×
          </a>
          <h3>Send Notification</h3>
          <p>Are you sure you want to send the notification? </p>
          
          <div className="TwoButton">
            <a className="Button" onClick={handleResend}>
              Yes, Send &amp; Notify
            </a>
            <button className="Button Cancel" onClick={handleClose}>
              Review Details
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SendNotificationModal