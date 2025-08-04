import React, { useEffect, useState } from "react";
import { Col, Row } from "../../Grid-system";
import { Back, Input, Title } from "../../components";
import { useFETCH, useFilter, usePOST } from "../../APIs/useMyAPI";
import { useParams } from "react-router-dom";
import Loading from "../../Tools/Loading";

const EditApiPackage = () => {

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

  
  const { data ,isLoading  } = useFETCH(`admin/products/packages/${uid}`);
  const handleSubmitMain = (e) => {
    e.preventDefault();
    handleSubmit(
      uid === "add"
        ? `admin/products/${id}/packages`
        : `admin/products/packages/${uid}`
    );
  };
  let dataOld = data?.data.data;
  
  const checkPkey = searchParams.get("pkey");
  useEffect(() => {
    uid !== "add" &&
      setFormData({
        ...formData,
        name_en: dataOld?.name?.en ?  dataOld?.name.en : "",
        name_ar: dataOld?.name?.ar ?  dataOld?.name.ar : "",
        is_available: dataOld?.is_available,
        category_id: dataOld?.category_id,
        force_unavailable: dataOld?.force_unavailable,
        minimum_qut: dataOld?.minimum_qut,
        maximum_qut: dataOld?.maximum_qut,
        p_order: dataOld?.p_order,
        link_id: dataOld?.link_id,
        user_price: dataOld?.user_price,
        company_price: dataOld?.company_price,
        company_percentage: dataOld?.company_percentage,
        user_percentage: dataOld?.user_percentage,
      });
  }, [dataOld]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Title title="Edit Packages" />
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
          value={formData?.minimum_qut}
        />       
        <Input
          type="number"
          name="maximum_qut"
           onChange={handleChangeInput}
          placeholder={"maximum quantity"}
          value={formData?.maximum_qut}
        />
        
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
      </Row>
      <div className="text-red-500 font-semibold">{error}</div>
      {loading ? <Loading /> : ""}
      <Back name="Save" onClick={handleSubmitMain} />
    </div>
  );
};

export default EditApiPackage;
