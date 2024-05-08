import { useState } from "react";
import { useDropzone } from "react-dropzone";
import "./style.css";

export default function Attachments() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleDrop = (acceptedFiles: any) => {
    // Logic for handling the dropped files
    setUploadedFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: "image/*, .pdf, .doc, .docx",
    multiple: true,
  });
  return (
    <div>
      <h1>Attachments</h1>

      <div className="upload-container">
        <div
          {...getRootProps()}
          className={`dropzone ${isDragActive ? "active" : ""}`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the file here</p>
          ) : (
            <p>Drag and drop file here or click to browse</p>
          )}
        </div>

        <div className="file-list">
          <h3>Uploaded File:</h3>
          {uploadedFiles.length > 0 ? (
            <ul>
              {uploadedFiles.map((file, index) => (
                <li key={index}>
                  <span>{file.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No file uploaded</p>
          )}
        </div>
      </div>
    </div>
  );
}
