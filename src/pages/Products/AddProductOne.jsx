import { useParams } from "react-router-dom";
import { fileUrl, useFETCH, usePOST } from "../../APIs/useMyAPI";
import { Col, Row } from "../../Grid-system";
import AddImage from "../../Tools/AddFile";
import {
  Back,
  Check,
  DropdownWithSearch,
  Input,
  Title,
} from "../../components";
import { useEffect, useState } from "react";
import Loading from "../../Tools/Loading";
import { useContextHook } from "../../Context/ContextOPen";

const AddProductOne = () => {
  const { id } = useParams();
  const { data: categories } = useFETCH("admin/categories");
  const [categoryOptions, setCategoryOptions] = useState(null);
  
  const { data: product_types } = useFETCH("admin/product-types");
  const [productTypeOptions, setProductTypeOptions] = useState(null);

  const { setCheckId, checkId } = useContextHook();
  const {
    handleChangeInput,
    handleSubmit,
    viewFile,
    setViewFile,
    setFormData,
    formData,
    loading,
    error,
  } = usePOST({ number: 1 });
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
          category_id: dataOld?.category_id,
          is_parent_category: dataOld?.is_parent_category,
          product_type_id: dataOld?.product_type_id,
          note_en: dataOld?.note.en ? dataOld?.note.en : "",
          note_ar: dataOld?.note.ar ? dataOld?.note.ar : "",
          available: dataOld?.available,
          force_unavailable: dataOld?.force_unavailable,
          is_tiktok: dataOld?.is_tiktok,
          p_order: dataOld?.p_order,
          require_player_number: dataOld?.require_player_number,
          th_party_api_id: checkId ? checkId : "",
          [viewFile ? "images_to_delete[]" : ""]: viewFile
            ? dataOld?.images[0].id
            : "",
        })
      : setFormData({
          ...formData,
          th_party_api_id: checkId ? checkId : "",
        });
  }, [dataOld, viewFile, checkId]);
  useEffect(() => {
    id !== "add" && setCheckId(dataOld?.th_party_api_id);
  }, [dataOld]);

  useEffect(() => {
    if (categories?.data) {
      const formattedCategories = categories.data.map((category) => ({
        value: category.id,
        label: category.name,
      }));
      setCategoryOptions(formattedCategories);
    }
  }, [categories]);

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
          <Input
            name="note_en"
            onChange={handleChangeInput}
            placeholder={"Note(optional)"}
            value={formData?.note_en}
          />
          <Input
            name="note_ar"
            onChange={handleChangeInput}
            placeholder={"(اختياري)ملاحظة"}
            value={formData?.note_ar}
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
            <div className="flex items-center justify-end gap-3">
              <input
                type="checkbox"
                name="is_tiktok"
                checked={formData?.is_tiktok}
                onChange={handleChangeInput}
                className="w-5 h-5"
              />
              <h1 className="">Tiktok تفعيل</h1>
            </div>
          </Col>
          <Col md={6}>
            <Check />
          </Col>
          <Col md={6}>
            <div className="flex items-center justify-end gap-3">
              <input
                type="checkbox"
                name="require_player_number"
                checked={formData?.require_player_number}
                value="1"
                onChange={handleChangeInput}
                className="w-5 h-5"
              />
              <h1 className="">api تفعيل رقم اللاعب بلا </h1>
            </div>
          </Col>
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
            <h1 className="mt-2">Select Category</h1>
            <DropdownWithSearch
              options={categoryOptions}
              label=""
              // onSelect={handleChangeInput}
              onSelect={(e) =>
                setFormData({ ...formData, category_id: e.value })
              }
              selectedValue={formData?.category_id}
            />
          </Col>
          <Col col={6}>
            <div className="flex items-center justify-center gap-3">
              <input
                type="checkbox"
                name="is_parent_category"
                checked={formData?.is_parent_category}
                onChange={handleChangeInput}
                className="w-5 h-5"
              />
              <h1 className="">Is Parent Category</h1>
            </div>
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

export default AddProductOne;
