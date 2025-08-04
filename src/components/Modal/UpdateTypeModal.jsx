import React, { useState, useEffect } from "react";
import axios from "axios";
import { ButtonRed, DropdownWithSearch } from "../../components";
import { fileUrl, useFETCH, usePOST } from "../../APIs/useMyAPI";

const UpdateTypeModal = ({ show, onClose, productTypeOptions, categoryId }) => {
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
    handleSubmit(`admin/update-product-type`, "", true);
  };

  useEffect(() => {
    setFormData({ ...formData, category_id: categoryId });
  }, [categoryId]);

  if (!show) return null;

  return (
    <div id="addCategory" className="modal">
      <div className="addCategory_modal-content update_type_Category ">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Select Type</h2>
        <div className=" mt-5">
          <DropdownWithSearch
            options={productTypeOptions}
            label=""
            // onSelect={handleChangeInput}
            onSelect={(e) =>
              setFormData({ ...formData, product_type_id: e.value })
            }
            selectedValue={formData?.product_type_id}
          />

          <div className="flex gap-1 mt-3">
            <ButtonRed
              className="py-2 px-5"
              name={`Update`}
              onClick={handleSubmitMain}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTypeModal;
