import { useEffect, useState } from "react";
import { fileUrl, useFETCH, usePOST } from "../../APIs/useMyAPI";
import { Col, Row } from "../../Grid-system";
import AddImage from "../../Tools/AddFile";
import {
  Back,
  ButtonRed,
  CardBox,
  DropdownWithSearch,
  Input,
  Title,
} from "../../components";
import { useParams } from "react-router-dom";
import Loading from "../../Tools/Loading";

const AddProductFour = () => {
  const { id } = useParams();
  const {
    handleChangeInput,
    handleSubmit,
    viewFile,
    setViewFile,
    setFormData,
    formData,
    loading,
    handleChangeObject,
    dat,
    setDat,
    handleAddObject,
    obj,
    setObj,
    error,
    err,
  } = usePOST({ number: 4 });
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
        category_id: dataOld?.category_id,
        is_parent_category: dataOld?.is_parent_category,
        product_type_id: dataOld?.product_type_id,
        available: dataOld?.available,
        force_unavailable: dataOld?.force_unavailable,
        p_order: dataOld?.p_order,
        [viewFile ? "images_to_delete[]" : ""]: viewFile
          ? dataOld?.images[0].id
          : "",
      });
    id !== "add" &&
      setDat(
        dataOld?.additional_services.map((e) => {
          return {
            user_price: e.user_price,
            company_price: e.company_price,
            user_percentage: e.user_percentage,
            company_percentage: e.company_percentage,
            minimum_qut_note_en: e.minimum_qut_note.en,
            minimum_qut_note_ar: e.minimum_qut_note.ar,
            note_en: e.note.en,
            note_ar: e.note.ar,
            minimum_qut: e.minimum_qut,
            type: e.type,
          };
        })
      );
  }, [dataOld, viewFile]);

  return (
    <div>
      <Title title="Add Product Four" />
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
        </Row>
        <Row className="p-4">
          <Input
            type="number"
            name="user_price"
            onChange={handleChangeObject}
            placeholder={"User Price "}
            value={obj?.user_price}
          />
          <Input
            type="number"
            name="user_percentage"
            onChange={handleChangeInput}
            placeholder={"User percentage % "}
            value={obj?.user_percentage}
          />
          <Input
            type="number"
            name="company_price"
            onChange={handleChangeObject}
            placeholder={"Company Price "}
            value={obj?.company_price}
          />
          <Input
            type="number"
            name="company_percentage"
            onChange={handleChangeInput}
            placeholder={"Company percentage % "}
            value={obj?.company_percentage}
          />
          
          <Input
            name="minimum_qut_note_en"
            onChange={handleChangeObject}
            placeholder={"Add a note to the minimum quantity"}
            value={obj?.minimum_qut_note_en}
          />
          <Input
            name="minimum_qut_note_ar"
            onChange={handleChangeObject}
            placeholder={"أضف ملاحظة للحد الأدنى من الكمية"}
            value={obj?.minimum_qut_note_ar}
          />
          <Input
            name="note_en"
            onChange={handleChangeObject}
            placeholder={"Note(optional)"}
            value={obj?.note_en}
          />
          <Input
            name="note_ar"
            onChange={handleChangeObject}
            placeholder={"(اختياري)ملاحظة"}
            value={obj?.note_ar}
          />
          <Input
            type="number"
            name="minimum_qut"
            onChange={handleChangeObject}
            placeholder={"minimum quantity"}
            value={obj?.minimum_qut}
          />{" "}
          <Input
            col={3}
            name="p_order"
            type="number"
            onChange={handleChangeInput}
            placeholder={"Product order"}
            value={formData?.p_order}
          />
          <Col md={6}>
            <h1>Type</h1>
            <select
              name="type"
              onChange={handleChangeObject}
              value={obj?.type}
              id=""
              className="border border-Purple m-1 py-3 rounded-xl w-full text-center"
            >
              <option disabled selected hidden>
                Type
              </option>
              <option value=""></option>
              {["LIKES", "VIEWS", "COMMENTS", "FOLLOWERS"]
                .filter((e) => !dat?.some((y) => y.type === e))
                ?.map((p, i) => (
                  <option key={i} value={p}>
                    {p}
                  </option>
                ))}
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
        <div className="text-red-500 font-semibold text-center">{err}</div>
        <ButtonRed
          name="Add"
          onClick={handleAddObject}
          className="w-fit px-5 py-2 mb-2 mx-auto"
        />
        <Row className="px-5">
          {dat?.map((e, i) => (
            <Col lg={3} sm={6} key={i}>
              <CardBox
                onClick={() => {
                  let thisData = [...dat];
                  let x = thisData.splice(i, 1);
                  setDat(thisData);
                  setFormData({
                    ...formData,
                    product_additional_services: JSON.stringify(thisData),
                  });
                  setObj({
                    user_price: x[0].user_price,
                    company_price: x[0].company_price,
                    user_percentage: x[0].user_percentage,
                    company_percentage: x[0].company_percentage,
                    minimum_qut_note_en: x[0].minimum_qut_note_en,
                    minimum_qut_note_ar: x[0].minimum_qut_note_ar,
                    note_en: x[0].note_en,
                    note_ar: x[0].note_ar,
                    minimum_qut: x[0].minimum_qut,
                    type: x[0].type,
                  });
                }}
                deleteClick={() => {
                  let total = [...dat];
                  total.splice(i, 1);
                  setDat(total);
                  setFormData({
                    ...formData,
                    product_additional_services: JSON.stringify(total),
                  });
                }}
              >
                <Title title={e.type} />
                <div className="rounded-2xl p-3">
                  <div className="flex gap-2 ">
                    <div className="font-semibold text-Pink">User Price : </div>
                    <div>{e.user_price}</div>
                  </div>
                  <div className="flex gap-2 ">
                    <div className="font-semibold text-Pink">User Percentage : </div>
                    <div>{e.user_percentage} </div>
                  </div>
                  <div className="flex gap-2 ">
                    <div className="font-semibold text-Pink">
                      Company Percentage :
                    </div>
                    <div>{e.company_percentage} </div>
                  </div>
                  <div className="flex gap-2 ">
                    <div className="font-semibold text-Pink">
                      Company Price :
                    </div>
                    <div> {e.company_price} </div>
                  </div>
                  <div className=" gap-2 ">
                    <div className="font-semibold text-Pink">
                      English minimum note :
                    </div>
                    <div>{e.minimum_qut_note_en} </div>
                  </div>
                  <div className=" gap-2 ">
                    <div className="font-semibold text-Pink">
                      Arabic minimum note :
                    </div>
                    <div>{e.minimum_qut_note_ar} </div>
                  </div>
                  <div className=" gap-2 ">
                    <div className="font-semibold text-Pink">
                      English Note :
                    </div>
                    <div>{e.note_en} </div>
                  </div>
                  <div className=" gap-2 ">
                    <div className="font-semibold text-Pink">Arabic Note :</div>
                    <div>{e.note_ar} </div>
                  </div>
                  <div className="flex gap-2 ">
                    <div className="font-semibold text-Pink">minimum qut :</div>
                    <div>{e.minimum_qut} </div>
                  </div>
                </div>
              </CardBox>
            </Col>
          ))}
        </Row>

        <div className="text-red-500 font-semibold">{error}</div>
      </div>
      {loading ? <Loading /> : ""}
      <Back name="Save" onClick={handleSubmitMain} />
    </div>
  );
};

export default AddProductFour;
