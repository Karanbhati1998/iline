import React from 'react'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
const CustomToastContainer = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default CustomToastContainer