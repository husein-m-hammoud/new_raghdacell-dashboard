import { useParams } from "react-router-dom";
import { fileUrl, useFETCH, usePOST } from "../../APIs/useMyAPI";
import { Col, Row } from "../../Grid-system";
import AddImage from "../../Tools/AddFile";
import {
  Back,
  Check,
  Input,
  Title,
  CheckAs7ab,
  DropdownWithSearch,
} from "../../components";
import React, { useEffect, useState } from "react";
import Loading from "../../Tools/Loading";
import { useContextHook } from "../../Context/ContextOPen";

const EditApiProducts = () => {
  const { setCheckId, checkId } = useContextHook();
  const [dataOld, setDataOld] = useState(null);
  const [package_id, setPackage_id] = useState(null);

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
  } = usePOST({ number: 6 });
  const { data, isLoading } = useFETCH(`admin/products/${id}`);
  
  const { data: categories } = useFETCH("admin/categories");
  const [categoryOptions, setCategoryOptions] = useState(null);
  
  const { data: product_types } = useFETCH("admin/product-types");
  const [productTypeOptions, setProductTypeOptions] = useState(null);

  
  let mergedData;

  const handleSubmitMain = async (e) => {
    e.preventDefault();
    if (package_id) {
      const retrun_product = await handleSubmit(
        `admin/products/${id}`,
        false,
        false,
        true
      );
      handleSubmit(`admin/products/packages/${package_id}`);
    } else {
      handleSubmit(`admin/products/${id}`);
    }
  };

  useEffect(() => {
    setFormData({
      ...formData,
      is_available: formData.available,
    });
  }, [formData.available]);

  const { data: dataPackages, isLoading: isLoadingp } = useFETCH(
    `admin/products/${id}/packages`
  );
  let dataAll = data?.data?.data;

  useEffect(() => {
    if (dataAll != undefined && dataPackages != undefined) {
      if (
        dataPackages?.data?.data?.total == 1 &&
        dataPackages?.data?.data?.data[0].type !== "package"
      ) {
        mergedData = dataPackages?.data.data?.data[0];
        setPackage_id(mergedData.id);
        mergedData["images"] = dataAll?.images;
        mergedData["name"] = dataAll?.name;

        mergedData["available"] = dataAll?.available;
        mergedData["category_id"] = dataAll?.category_id;
        mergedData["is_parent_category"] = dataAll?.is_parent_category;
        mergedData["product_type_id"] = dataAll?.product_type_id;


        mergedData["note"] = dataAll?.note ? dataAll.note : "";

        mergedData["p_order"] = dataAll?.p_order;
        mergedData["th_party_api_id"] = dataAll?.th_party_api_id;
        mergedData["th_party_as7ab_api"] = dataAll?.th_party_as7ab_api;
        mergedData["require_player_number"] = dataAll?.require_player_number;
        setDataOld(mergedData);
      } else {
        setDataOld(dataAll);
      }
    }
  }, [dataAll, dataPackages]);

  useEffect(() => {
    if (dataOld != null) {
      setFormData({
        ...formData,
        name_en: dataOld?.name?.en,
        name_ar: dataOld?.name?.ar,
        category_id: dataOld?.category_id,
        is_parent_category: dataOld?.is_parent_category,
        product_type_id: dataOld?.product_type_id,

        note_en: dataOld?.note?.en ? dataOld?.note?.en : "",
        note_ar: dataOld?.note?.ar ? dataOld?.note?.ar : "",
        minimum_qut: dataOld?.minimum_qut,
        maximum_qut: dataOld?.maximum_qut,
        p_order: dataOld?.p_order,
        user_price: dataOld?.user_price,
        available: dataOld?.available,
        require_player_number: dataOld?.require_player_number,
        company_price: dataOld?.company_price,
        th_party_api_id: checkId ? checkId : "",
        th_party_as7ab_api: dataOld?.th_party_as7ab_api,
        is_available: dataOld?.is_available,
        force_unavailable: dataOld?.force_unavailable,
        company_percentage: dataOld?.company_percentage,
        user_percentage: dataOld?.user_percentage,

        [viewFile ? "images_to_delete[]" : ""]: viewFile
          ? dataOld?.images[0].id
          : "",
      });
    }
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

  if (isLoading || isLoadingp) {
    return <Loading />;
  }

  console.log("categoryOptions: ", categoryOptions);

  return (
    <div>
      <Title title="Edit Api Product" />
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
          {package_id && (
            <>
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
                type="number"
                name="minimum_qut"
                onChange={handleChangeInput}
                placeholder={"minimum quantity"}
                value={formData?.minimum_qut}
              />

              <Input
                type="number"
                name="maximum_qut"
                onChange={handleChangeInput}
                placeholder={"maximum quantity"}
                value={formData?.maximum_qut || data?.max_amount}
              />
            </>
          )}
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

          <Row>
            <Col md={6}>
              <AddImage
                id="image"
                name="images[]"
                onChange={handleChangeInput}
                oldImage={
                  dataOld?.images ? fileUrl + dataOld?.images[0]?.image : ""
                }
                newImage={viewFile}
                clickDeleteImage={() => {
                  setViewFile("");
                  setFormData({ ...formData, "images[]": "" });
                }}
              />
            </Col>
            <Input
              col={3}
              name="p_order"
              type="number"
              onChange={handleChangeInput}
              placeholder={"Product order"}
              value={formData?.p_order}
            />
          </Row>

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
          <Col col={5}>
            <Check />
          </Col>
          <Col col={4}>
            <CheckAs7ab
              formData={formData}
              handleChangeInput={handleChangeInput}
            />
          </Col>
          <Col col={3}>
            <div className="flex items-center justify-end gap-3">
              <input
                type="checkbox"
                name="require_player_number"
                checked={formData?.require_player_number}
                onChange={handleChangeInput}
                className="w-5 h-5"
              />
              <h1 className="">api تفعيل رقم اللاعب بلا </h1>
            </div>
          </Col>
        </Row>
        <div className="text-red-500 font-semibold">{error}</div>
      </div>
      {loading ? <Loading /> : ""}
      <Back name="Save" onClick={handleSubmitMain} />
    </div>
  );
};

export default EditApiProducts;
