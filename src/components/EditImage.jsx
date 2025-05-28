import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

import useUserStore from "../store/userStore.js";

import { uploadImage } from "./../services/profile";

const EditImage = () => {
  const { acceptedFiles, isDragActive, getRootProps, getInputProps } =
    useDropzone();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { setProfile, profile } = useUserStore();

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, [acceptedFiles]);

  const updatingImageHandler = () => {
    uploadImage(file, setUploading, setProfile);
  };

  return (
    <section className="container p-8 max-w-md mx-auto  bg-white shadow-lg rounded-lg">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-8 rounded-lg text-center transition duration-200 cursor-pointer ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-700">
          {isDragActive
            ? "Drop the image here..."
            : "Drag & drop an image here, or click to select one"}
        </p>
        {file && (
          <p className="mt-4 text-sm text-green-600">
            Selected file: {file.name}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={updatingImageHandler}
        disabled={uploading}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
    </section>
  );
};

export default EditImage;
