import React, { useState } from "react";
import axios from "axios";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) return alert("Please select a file");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFileUrl(data.url);
      alert("Upload Successful!");
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4">
      <input type="file" accept="image/*,.pdf" onChange={handleFileChange} className="mb-2" />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload File"}
      </button>

      {fileUrl && (
        <div className="mt-4">
          <p>Uploaded File:</p>
          {file?.type === "application/pdf" ? (
            <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              View PDF
            </a>
          ) : (
            <img src={fileUrl} alt="Uploaded" className="w-40 h-40 object-cover" />
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
