import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import { addSetCommision, getViewCommision } from "../../features/slices/payment";
import { toastService } from "../../utils/toastify";
const CommisionModal = ({ handleClose }) => {
  const [commision, setCommision] = useState(0);
  const dispatch=useDispatch()
    useEffect(() => {
      dispatch(getViewCommision());
    },[]);
     const { viewCommision } = useSelector((state) => {
       return state?.payment;
     });
     console.log({ viewCommision });
     
  const handleSave=()=>{
    dispatch(addSetCommision({ commision: commision })).then((res) => {
      if (res?.payload?.code === 200) {
        toastService.success("Commission value updated successfully");
        handleClose();
      } else {
        toastService.error("Failed to update commission value");
        handleClose();
      }
    });
  }
useEffect(()=>{
  if(viewCommision){
    setCommision(viewCommision?.askedCommision?.commision);
  }
},[viewCommision])
  return (
    <Modal>
      <div className="modal-body">
        <div className="Category">
          <a className="CloseModal" onClick={handleClose}>
            ×
          </a>
          <h3>Commission value</h3>
          <div className="form-group">
            <label>Enter % value of Total fare </label>
            <input
              type="text"
              className="form-control"
              value={commision}
              name="commision"
              onChange={(e) => setCommision(e.target.value)}
            />
          </div>
          <button className="Button" onClick={handleSave}>Save</button>
        </div>
      </div>
    </Modal>
  );
};

export default CommisionModal;
