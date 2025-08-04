import { useParams } from "react-router-dom";
import { fileUrl, useFETCH, usePOST } from "../../APIs/useMyAPI";
import { Col, Row } from "../../Grid-system";
import AddImage from "../../Tools/AddFile";
import {
  Back,
  DropdownWithSearch,
  Input,
  Title,
} from "../../components";
import { useEffect, useState } from "react";
import Loading from "../../Tools/Loading";

const AddGroupProduct = () => {
  const { id } = useParams();
  
  const { data: product_types } = useFETCH("admin/product-types");
  const [productTypeOptions, setProductTypeOptions] = useState(null);

  const {
    handleChangeInput,
    handleSubmit,
    viewFile,
    setViewFile,
    setFormData,
    formData,
    loading,
    error,
  } = usePOST({ number: 7 });
  const { data } = useFETCH(`admin/products/${id}`);
  const handleSubmitMain = (e) => {
    e.preventDefault();
    handleSubmit(id === "add" ? "admin/products" : `admin/products/${id}`);
  };
  let dataOld = data?.data.data;
  console.log(dataOld);
  useEffect(() => {
    id !== "add"
      ? setFormData({
          ...formData,
          name_en: dataOld?.name.en,
          name_ar: dataOld?.name.ar,
          product_type_id: dataOld?.product_type_id,
          available: dataOld?.available,
          force_unavailable: dataOld?.force_unavailable,
          p_order: dataOld?.p_order,
          [viewFile ? "images_to_delete[]" : ""]: viewFile
            ? dataOld?.images[0].id
            : "",
        })
      : setFormData({
          ...formData,
        });
  }, [dataOld, viewFile]);

  useEffect(() => {
    if (product_types?.data) {
      const formattedProductType = product_types.data.map((productType) => ({
        value: productType.id,
        label: productType.name,
      }));
      setProductTypeOptions(formattedProductType);
    }
  }, [product_types]);


  return (
    <div>
      <Title title="Add Product One" />
      <div className="border-2 border-Purple rounded-2xl">
        <Row className="p-4">
          <Input
            name="name_en"
            onChange={handleChangeInput}
            placeholder={"Product Name"}
            value={formData?.name_en}
          />
          <Input
            name="name_ar"
            onChange={handleChangeInput}
            placeholder={"اسم المنتج"}
            value={formData?.name_ar}
          />
  

          <Col md={6}>
            <AddImage
              id="image"
              name="images[]"
              onChange={handleChangeInput}
              oldImage={
                dataOld?.images[0]?.image
                  ? fileUrl + dataOld?.images[0]?.image
                  : ""
              }
              newImage={viewFile}
              clickDeleteImage={() => {
                setViewFile("");
                setFormData({ ...formData, "images[]": "" });
              }}
            />
          </Col>
          <Col md={6}>
            <h1> is available</h1>
            <select
              name="available"
              value={formData?.available}
              className="w-full text-center outline-none border py-4 rounded-xl mb-4"
              onChange={handleChangeInput}
            >
              <option value="" disabled selected hidden>
                is available
              </option>
              <option value="1">Available</option>
              <option value="0">Unavailable</option>
            </select>
          </Col>

          <Input
            col={3}
            name="p_order"
            type="number"
            onChange={handleChangeInput}
            placeholder={"Product order"}
            value={formData?.p_order}
          />
          
          
          <Col md={6}>
            <h1> Force unavailable</h1>
            <select
              name="force_unavailable"
              value={formData?.force_unavailable}
              className="w-full text-center outline-none border py-4 rounded-xl mb-4"
              onChange={handleChangeInput}
            >
              <option value="" disabled selected hidden>
                is available
              </option>
              <option value="0">Available</option>
              <option value="1">Unavailable</option>
            </select>
          </Col>
         
          <Col md={6}>
            <h1 className="mt-2">Select Type</h1>
            <DropdownWithSearch
              options={productTypeOptions}
              label=""
              // onSelect={handleChangeInput}
              onSelect={(e) =>
                setFormData({ ...formData, product_type_id: e.value })
              }
              selectedValue={formData?.product_type_id}
            />
          </Col>
        </Row>
        <div className="text-red-500 font-semibold">{error}</div>
      </div>
      {loading ? <Loading /> : ""}
      <Back name="Save" onClick={handleSubmitMain} />
    </div>
  );
};

export default AddGroupProduct;
