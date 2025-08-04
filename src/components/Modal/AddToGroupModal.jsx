import React, { useEffect, useState } from "react";
import { Input, ButtonRed } from "..";
import { usePOST, fetchData,useFETCH } from "../../APIs/useMyAPI";

const AddToGroupModal = ({ show, onClose, productId }) => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const { handleSubmit, formData, setFormData, } = usePOST();
  const { data, isLoading } = useFETCH(`admin/products/group-list/${productId}`);

  useEffect(() => {
   
     setProducts(data?.data?.data?.products);
     console.log(data?.data?.data?.products);
  }, [show, data]);

  const handleToggleProduct = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };



  const handleAssignGroup = async () => {
    var url = `admin/products/assign-group/${productId}`;
    var res = await fetchData(
      url,
      {
        product_group_id: productId,
        product_ids: selected,
      }
    );
    if (res) {
      window.location.reload();
    }
  };

  if (!show|| isLoading) return null;

  return (
    <div className="modal" id="addCategory">
      <div className="addCategory_modal-content relative ">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Select Products to Add to Group</h2>

        <div className="mt-5 max-h-[300px] overflow-y-auto pb-24">
          {products && products.map((prod) => (
            <label key={prod.id} className="flex mb-2 items-center">
              <div>
              <input
                type="checkbox"
                checked={selected.includes(prod.id)}
                onChange={() => handleToggleProduct(prod.id)}
              />
              </div>
              <span className="ml-2">
                {prod.name?.en|| 'NO name'} (#{prod.number})
              </span>
            </label>
          ))}
        </div>

        <div className=" bg-white absolute bottom-0 left-0 right-0 p-4 mt-8">
          <ButtonRed
            className="py-2 px-5"
            name="Assign to Group"
            onClick={handleAssignGroup}
          />
        </div>
      </div>
    </div>
  );
};

export default AddToGroupModal;
