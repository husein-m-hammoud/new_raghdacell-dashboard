import React, { useState } from "react";
import axios from "axios";
import { Input, ButtonRed } from "../../components";
import { fileUrl, useFETCH, usePOST } from "../../APIs/useMyAPI";

const AddCategoryModal = ({ show, onClose, type }) => {
  const [name, setName] = useState("");
  const {
    handleChangeInput,
    handleSubmit,
    viewFile,
    setViewFile,
    setFormData,
    formData,
    loading,
    error,
  } = usePOST();

  const handleSubmitMain = async (e) => {
    {type == 'category' 
    ? handleSubmit(`admin/categories`, "", true)
    : handleSubmit(`admin/product-types`, "", true)
  }
  };

  if (!show) return null;

  return (
    <div id="addCategory" className="modal">
      <div className="addCategory_modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Add {type == 'category'  ? 'Category' : 'Product Type'}</h2>
        <div className=" mt-5" >
          <div>
            <Input
              name="name"
              onChange={handleChangeInput}
              value={formData?.name}
              col="12"
              placeholder = "Name"
            />
          </div>

          <div className="flex gap-1 mt-3">
            <ButtonRed
              className="py-2 px-5"
              name={`Add ${type === 'category' ? 'Category' : 'Product Type'}`}
              onClick={handleSubmitMain}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
