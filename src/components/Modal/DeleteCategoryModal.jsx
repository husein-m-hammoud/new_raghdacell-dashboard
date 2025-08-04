import React, { useState } from "react";
import axios from "axios";
import { Input, ButtonRed } from "..";
import { fileUrl, useFETCH, fetchData, usePOST } from "../../APIs/useMyAPI";

const DeleteCategoryModal = ({ show, onClose,categories , type}) => {
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

  const handleDelete = async (id) => {
    
    var url  =  type === 'category'  ? `admin/categories/${id}` : `admin/product-types/${id}`;
    var res =  await fetchData(url);
    if(res) {
     window.location.reload();
    }
  };

  if (!show) return null;

  return (
    <div id="addCategory" className="modal">
      <div className="addCategory_modal-content">
      <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{type == 'category'  ? 'Categories' : 'Product Types'}</h2>
      <ul>
          {categories.map((category) => (
            <li key={category.id} className="flex justify-between mt-2">
              {category.name}
              
              <ButtonRed
              className="py-2 px-5"
              name="Delete"
              onClick={() => handleDelete(category.id)}
            />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DeleteCategoryModal;
