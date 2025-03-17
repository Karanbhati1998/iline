import React from "react";
import Modal from "./Modal";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
const ZoomEffect = ({ image, handleClose }) => {
  return (
    <Modal>
      <div className="modal-body">
        <div className="Decline ZoomImageBox ">
          <a className="CloseModal" onClick={handleClose}>
            ×
          </a>
          {/* <img src={image} alt="" style={{
            width: "50vw",
            objectFit: "contain",
            cursor: "zoom-in"
          }}/> */}
          {/* <InnerImageZoom
            src={image}
            zoomSrc={image}
            zoomType="hover"
            zoomPreload={true}
            zoomScale={1.4}
            style={{
              height: "100%",
              width: "100%",
            }}
          /> */}
          <TransformWrapper>
            <TransformComponent>
              <img src={image} alt="test" />
            </TransformComponent>
          </TransformWrapper>
        </div>
      </div>
    </Modal>
  );
};

export default ZoomEffect;
