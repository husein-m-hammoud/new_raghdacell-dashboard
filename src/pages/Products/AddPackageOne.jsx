import React, { useEffect, useState } from "react";
import { Col, Row } from "../../Grid-system";
import { Back, Input, Title } from "../../components";
import { useFETCH, useFilter, usePOST } from "../../APIs/useMyAPI";
import { useParams } from "react-router-dom";
import Loading from "../../Tools/Loading";

const AddPackageOne = () => {
  const { id, uid } = useParams();
  const {
    handleChangeInput,
    handleSubmit,
    setFormData,
    formData,
    loading,
    error,
  } = usePOST();

  const { searchParams } = useFilter();
  const [isChecked, setIsChecked] = useState(false);

  // Function to handle checkbox change
  const handleCheckboxChange = () => {
    setFormData({
      ...formData,
      is_code: !isChecked ? 1 : 0,
    });
    setIsChecked(!isChecked);
  };
  console.log("formData", formData);

  const { data } = useFETCH(`admin/products/packages/${uid}`);
  const handleSubmitMain = (e) => {
    e.preventDefault();
    handleSubmit(
      uid === "add"
        ? `admin/products/${id}/packages`
        : `admin/products/packages/${uid}`
    );
  };
  const [textareaValue, setTextareaValue] = useState("");

  const handleTextareaChange = (event) => {
    setFormData({
      ...formData,
      codes: event.target.value,
    });
    setTextareaValue(event.target.value);
  };
  let dataOld = data?.data.data;
  const checkPkey = searchParams.get("pkey");
  useEffect(() => {
    uid !== "add" &&
      setFormData({
        ...formData,
        name_en: checkPkey ? "" : dataOld?.name.en,
        name_ar: checkPkey ? "" : dataOld?.name.ar,
        api_product_id: checkPkey ? dataOld?.api_product_id : "",
        is_available: dataOld?.is_available,
        force_unavailable: dataOld?.force_unavailable,
        user_price: dataOld?.user_price,
        user_percentage: dataOld?.user_percentage,
        company_percentage: dataOld?.company_percentage,
        is_code: dataOld?.is_code,
        maximum_qut: dataOld?.maximum_qut,
        minimum_qut: dataOld?.minimum_qut,
        p_order: dataOld?.p_order,
        link_id: dataOld?.link_id,
        codes: dataOld?.codes,
        company_price: dataOld?.company_price,
      });

    setIsChecked(dataOld?.is_code ? true : false);
    setTextareaValue(dataOld?.codes);
  }, [dataOld]);

  // Function to split the textarea content into lines and render them
  const renderLines = () => {
    if (textareaValue) {
      return textareaValue.split("\n").map((line, index) => (
        <div key={index}>
          {index + 1}- <span dangerouslySetInnerHTML={{ __html: line }}></span>
        </div>
      ));
    } else {
      return null;
    }
  };
  return (
    <div>
      <Title title="Add Packages" />
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
          placeholder={"اسم الباقة"}
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
          type="number"
          name="minimum_qut"
          onChange={handleChangeInput}
          placeholder={"minimum quantity"}
          value={formData?.minimum_qut ?? 1}
        />       
        <Input
          type="number"
          name="maximum_qut"
          onChange={handleChangeInput}
          placeholder={"maximum quantity"}
          value={formData?.maximum_qut}
        />
        <Col md={6}>
          <h1>Available</h1>
          <select
            name="is_available"
            value={formData?.is_available}
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
          <Input
            name="p_order"
            type="number"
            onChange={handleChangeInput}
            placeholder={"Product order"}
            value={formData?.p_order}
          />
        </Col>
        <Col md={6}>
        <Input
            name="link_id"
            type="number"
            onChange={handleChangeInput}
            placeholder={"Link Id"}
            value={formData?.link_id}
          />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <div className="flex items-center justify-start ml-4 gap-3">
            <input
              type="checkbox"
              name="is_code"
              checked={formData?.is_code}
              onChange={handleCheckboxChange}
              className="w-5 h-5"
            />
            <h1 className="">Is Code</h1>
          </div>
          {isChecked && (
            <div>
              <textarea
                value={formData?.codes}
                name="codes"
                className="w-full  outline-none border p-4 rounded-xl mt-4"
                onChange={handleTextareaChange}
                rows={5}
              />
            </div>
          )}
        </Col>
        <Col md={6}>
          <div className="mt-10 ml-2">{renderLines()}</div>
        </Col>
      </Row>
      <div className="text-red-500 font-semibold">{error}</div>
      {loading ? <Loading /> : ""}
      <Back name="Save" onClick={handleSubmitMain} />
    </div>
  );
};

export default AddPackageOne;
