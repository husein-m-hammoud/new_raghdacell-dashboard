import { useParams } from "react-router-dom";
import { fileUrl, useFETCH, usePOST } from "../../APIs/useMyAPI";
import { Col, Row } from "../../Grid-system";
import AddImage from "../../Tools/AddFile";
import { Back, DropdownWithSearch, Input, Title } from "../../components";
import { useEffect, useState } from "react";
import Loading from "../../Tools/Loading";

const AddProductFive = () => {
  const { id } = useParams();
  const {
    handleChangeInput,
    handleSubmit,
    viewFile,
    setViewFile,
    setFormData,
    formData,
    loading,
    error,
  } = usePOST({ number: 5 });
  const { data } = useFETCH(`admin/products/${id}`);

  const { data: categories } = useFETCH("admin/categories");
  const [categoryOptions, setCategoryOptions] = useState(null);

  const { data: product_types } = useFETCH("admin/product-types");
  const [productTypeOptions, setProductTypeOptions] = useState(null);

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

  const handleSubmitMain = (e) => {
    e.preventDefault();
    handleSubmit(id === "add" ? "admin/products" : `admin/products/${id}`);
  };
  let dataOld = data?.data.data;
  useEffect(() => {
    id !== "add" &&
      setFormData({
        ...formData,
        name_en: dataOld?.name.en,
        name_ar: dataOld?.name.ar,
        minimum_qut_note_en: dataOld?.minimum_qut_note.en
          ? dataOld?.minimum_qut_note.en
          : "",
        minimum_qut_note_ar: dataOld?.minimum_qut_note.ar
          ? dataOld?.minimum_qut_note.ar
          : "",
        note_en: dataOld?.note.en ? dataOld?.note.en : "",
        note_ar: dataOld?.note.ar ? dataOld?.note.ar : "",
        user_price: dataOld?.user_price,
        category_id: dataOld?.category_id,
        is_parent_category: dataOld?.is_parent_category,
        product_type_id: dataOld?.product_type_id,

        company_percentage: dataOld?.company_percentage,
        user_percentage: dataOld?.user_percentage,
        company_price: dataOld?.company_price,
        p_order: dataOld?.p_order,
        sec_user_price: dataOld?.sec_user_price,
        sec_company_price: dataOld?.sec_company_price,
        available: dataOld?.available,
        force_unavailable: dataOld?.force_unavailable,
        minimum_qut: dataOld?.minimum_qut,
        [viewFile ? "images_to_delete[]" : ""]: viewFile
          ? dataOld?.images[0].id
          : "",
      });
  }, [dataOld, viewFile]);
  return (
    <div>
      <Title title="Add Product Five" />
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
            name="user_price"
            onChange={handleChangeInput}
            placeholder={"User Price "}
            value={formData?.user_price}
          />
          <Input
            type="number"
            name="user_percentage"
            onChange={handleChangeInput}
            placeholder={"User percentage % "}
            value={formData?.user_percentage}
          />
          <Input
            name="company_price"
            onChange={handleChangeInput}
            placeholder={"Company Price "}
            value={formData?.company_price}
          />
          <Input
            type="number"
            name="company_percentage"
            onChange={handleChangeInput}
            placeholder={"Company percentage % "}
            value={formData?.company_percentage}
          />

          <Input
            name="sec_user_price"
            onChange={handleChangeInput}
            placeholder={"Price per user quantity greater than 100 "}
            value={formData?.sec_user_price}
          />
          <Input
            name="sec_company_price"
            onChange={handleChangeInput}
            placeholder={"Price per company quantity greater than 100 "}
            value={formData?.sec_company_price}
          />
          <Input
            name="minimum_qut_note_en"
            onChange={handleChangeInput}
            placeholder={"Add a note to the  minimum quantity"}
            value={formData?.minimum_qut_note_en}
          />
          <Input
            name="minimum_qut_note_ar"
            onChange={handleChangeInput}
            placeholder={"أضف ملاحظة للحد الأدنى من الكمية"}
            value={formData?.minimum_qut_note_ar}
          />
          <Input
            type="number"
            name="minimum_qut"
            onChange={handleChangeInput}
            placeholder={"minimum quantity"}
            value={formData?.minimum_qut}
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
          <Input
            col={3}
            name="p_order"
            type="number"
            onChange={handleChangeInput}
            placeholder={"Product order"}
            value={formData?.p_order}
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
            <h1> Available</h1>
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

export default AddProductFive;
