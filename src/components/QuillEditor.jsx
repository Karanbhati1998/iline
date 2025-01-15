import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuillEditor = ({
  name,
  value,
  onChange,
  error,
  height = "200px",
  disabled = false,
}) => {
  const handleChange = (content) => {
    if (!disabled) {
      onChange(name, content);
    }
  };
  return (
    <div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange} 
        style={{
          height,
          marginBottom: "60px",
          pointerEvents: disabled ? "none" : "auto",
          opacity: disabled ? 0.5 : 1, 
        }}
      />
      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
};

export default QuillEditor;
