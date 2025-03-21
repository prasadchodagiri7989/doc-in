
import React, { useState } from 'react';
import { Upload, File, X, Image } from 'lucide-react';
import { FileAttachment } from '@/types';

interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
  existingFiles?: FileAttachment[];
  onRemoveFile?: (id: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  onFileUpload, 
  existingFiles = [],
  onRemoveFile
}) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      const filesArray = Array.from(e.dataTransfer.files);
      onFileUpload(filesArray);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      onFileUpload(filesArray);
    }
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
          isDragging 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-300 hover:border-primary/50 hover:bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="p-3 bg-primary/10 rounded-full">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm font-medium">Drag and drop files here</p>
          <p className="text-xs text-gray-500">Supports images and PDFs (max 10MB)</p>
          <label className="mt-2">
            <span className="px-4 py-2 text-sm text-white bg-primary rounded-md hover:bg-primary/90 transition-colors duration-200 cursor-pointer">
              Browse Files
            </span>
            <input
              type="file"
              className="hidden"
              accept="image/*,.pdf"
              multiple
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
      
      {/* Display existing files */}
      {existingFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium">Attached files</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {existingFiles.map((file) => (
              <div 
                key={file.id} 
                className="relative group p-3 border rounded-lg bg-gray-50 flex items-center space-x-2"
              >
                {file.type === 'image' ? (
                  <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded bg-red-100 flex items-center justify-center">
                    <File className="h-5 w-5 text-red-500" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.type}</p>
                </div>
                {onRemoveFile && (
                  <button 
                    onClick={() => onRemoveFile(file.id)}
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white rounded-full shadow-sm"
                  >
                    <X className="h-3 w-3 text-gray-500" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
