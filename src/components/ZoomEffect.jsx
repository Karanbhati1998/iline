import React from "react";
import Modal from "./Modal";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
const ZoomEffect = ({ image, handleClose }) => {
  return (
    <Modal>
      <div className="modal-body">
        <div className="Decline">
          <a className="CloseModal" onClick={handleClose}>
            ×
          </a>
          {/* <img src={image} alt="" style={{
            width: "50vw",
            objectFit: "contain",
            cursor: "zoom-in"
          }}/> */}
          <InnerImageZoom
            src={image}
            zoomSrc={image}
            zoomType="hover"
            zoomPreload={true}
            zoomScale={1}
            style={{
              height: "100%",
              width: "100%",
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ZoomEffect;
