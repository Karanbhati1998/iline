import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoaderForImage = ({ length }) => {
  return (
    <>
      <Skeleton
        height={120} // Set desired height of the skeleton to match video
        width="200px" // Skeleton width covers the video container area
        style={{ borderRadius: "10px", marginRight: "10px" }} // Rounded corners for styling
      />
    </>
  );
};

export default LoaderForImage;
