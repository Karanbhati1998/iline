import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CkEditorComponent = () => {
  const [editorData, setEditorData] = useState("");

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };

  return (
    <div>
      <h2>React CKEditor Example</h2>
      <CKEditor
        editor={ClassicEditor}
        data="<p>Type your content here...</p>"
        onChange={handleEditorChange}
      />
      <div>
       
      </div>
    </div>
  );
};

export default CkEditorComponent;
