import React from 'react'
import Modal from '../Modal'

const UploadBanner = ({ handleClose }) => {
  return (
    <Modal>
      <div className="modal-body">
        <div className="Category">
          <a className="CloseModal" onClick={handleClose}>
            ×
          </a>
          <h3>Upload Banner</h3>
          <div className="form-group">
            <label>Banner Id</label>
            <input
              type="password"
              className="form-control"
              placeholder="Auto fill "
            />
          </div>
          <div className="form-group">
            <label>Upload banner Image </label>
            <div className="UploadBox">
              <div className="Upload">
                <i className="fa fa-upload" /> <span>Upload </span>
                <input type="file" />
              </div>
            </div>
          </div>
          <button className="Button">Upload New banner</button>
        </div>
      </div>
    </Modal>
  );
};

export default UploadBanner