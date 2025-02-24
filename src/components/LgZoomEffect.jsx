
import React from "react";
import Modal from "./Modal";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import LgModal from "./LgModal";

const LgZoomEffect = ({ image, image2, handleClose }) => {
  return (
    <LgModal>
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
          <div
            className="d-flex "
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              height: "450px",
            }}
          >
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
            {image2 && (
              <InnerImageZoom
                src={image2}
                zoomSrc={image2}
                zoomType="hover"
                zoomPreload={true}
                zoomScale={1}
              />
            )}
          </div>
        </div>
      </div>
    </LgModal>
  );
};

export default LgZoomEffect;
