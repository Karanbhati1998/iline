import React from 'react'
import Modal from '../../Modal'
import { useDispatch } from 'react-redux';
import { pendingVehicleStatus } from '../../../features/slices/vechileManagement/vechileManagement';
import { toastService } from '../../../utils/toastify';

const DisApprovedModal = ({ handleClose,id }) => {
  const dispatch=useDispatch()
  const handleDisApprove=()=>{
    dispatch(
      pendingVehicleStatus({
        id,
        status: "DISAPPROVED",
      })
    ).then(res=>{
      if(res.payload.code===200){
        toastService.success("Disappeared successfully")
        handleClose()
      }else{
        toastService.error("Failed to disapprove");
      }
    })
  }
  return (
    <Modal>
      <div className="modal-body">
        <div className="Category">
          <a className="CloseModal" onClick={handleClose}>
            ×
          </a>
          <h3>If Disapproved</h3>
          <div className="RequestBox">
            <div className="form-group">
              <label>Select Reason to disapprove</label>
              <select type="text" className="form-control" >
                <option>Blurred Image </option>
                <option>Non -valid document</option>
                <option>Blurred Image of document</option>
                <option>Lorem Ipsum </option>
                <option>Others</option>
              </select>
            </div>
            <div className="form-group">
              <label>Enter Text</label>
              <textarea className="form-control" rows={5} defaultValue={""} />
            </div>
            <div className="Buttons">
              <button className="Reject" onClick={handleDisApprove}>Disapprove</button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DisApprovedModal