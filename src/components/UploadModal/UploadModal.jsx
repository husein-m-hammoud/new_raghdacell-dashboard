import React, { useState, useRef } from "react";
import { MdOutlineClose, MdUploadFile } from "react-icons/md";
import Buttons from "../Buttons/Buttons";

const UploadModal = ({ isOpen, onClose, onFileChange, onSubmit }) => {
  const [fileName, setFileName] = useState("");
  const formRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  const handleAccept = () => {
    formRef.current.submit();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg relative">
        <MdOutlineClose
          className="absolute top-2 right-2 cursor-pointer"
          size={20}
          color="#A2081F"
          onClick={onClose}
        />
        <div className="text-center">
          <label className="cursor-pointer inline-block">
            <MdUploadFile size={100} />
            <input
              name="file"
              type="file"
              onChange={(e) => {
                onFileChange(e);
                handleFileChange(e);
              }}
              className="hidden"
            />
          </label>
          {fileName ? (
            <p className="mt-2">{fileName}</p>
          ) : (
            <p className="mt-2">Select a file</p>
          )}
          <div className="mt-2 flex justify-center gap-2">
            <button type="submit" className="hidden">
              Submit
            </button>
            <Buttons
              onClick={onSubmit}
              name="Submit"
              className="py-3 px-16 border hover:text-white hover:bg-green-700"
            />
            <Buttons
              onClick={onClose}
              name="Cancel"
              className="py-3 px-16 hover:text-white  hover:bg-red-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
