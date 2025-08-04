import React, { useEffect } from "react";
import { useFETCH, usePOST } from "../../APIs/useMyAPI";
import { ButtonRed, Input, Title } from "../../components";
import { Col, Row } from "../../Grid-system";

import Loading from "../../Tools/Loading";

const Payment = () => {
  const {
    handleChangeInput,
    handleSubmit,
    setFormData,
    formData,
    loading,
    error,
  } = usePOST();
  const { data } = useFETCH(`admin/payments/info`);
  const handleSubmitMain = (e) => {
    e.preventDefault();
    handleSubmit("admin/payments/info", "", true);
  };
  let dataOld = data?.data.data;
  useEffect(() => {
    setFormData({
      ...formData,
      usdt_trc20: dataOld?.usdt_trc20,
      usdt_bep20: dataOld?.usdt_bep20,
      usdt_tax_percentage: dataOld?.usdt_tax_percentage,
      whish_money_text: dataOld?.whish_money_text,
      whish_money_tax_percentage: dataOld?.whish_money_tax_percentage,
      omt_pay_text: dataOld?.omt_pay_text,
      omt_pay_tax_percentage: dataOld?.omt_pay_tax_percentage,
    });
  }, [dataOld]);

  return (
    <div>
      <Title title="Payments" />
      <div className="border-2 border-Purple rounded-2xl">
        <Row className="p-4">
          <Input
            name="usdt_trc20"
            onChange={handleChangeInput}
            placeholder={"usdt trc20 "}
            value={formData?.usdt_trc20}
          />
         
          <Input
            name="usdt_bep20"
            onChange={handleChangeInput}
            placeholder={"usdt bep20"}
            value={formData?.usdt_bep20}
          />
   
          <Input
            name="usdt_tax_percentage"
            className="w-full"
            col={12}
            onChange={handleChangeInput}
            placeholder={"usdt percentage"}
            value={formData?.usdt_tax_percentage}
          />
      
          <Input
            name="whish_money_text"
            onChange={handleChangeInput}
            placeholder={"whish money"}
            value={formData?.whish_money_text}
          />
          <Input
            name="whish_money_tax_percentage"
            onChange={handleChangeInput}
            placeholder={"whish money percentage"}
            value={formData?.whish_money_tax_percentage}
          />
           <Input
            name="omt_pay_text"
            onChange={handleChangeInput}
            placeholder={"OMT Pay"}
            value={formData?.omt_pay_text}
          />
          <Input
            name="omt_pay_tax_percentage"
            onChange={handleChangeInput}
            placeholder={"OMT Pay percentage"}
            value={formData?.omt_pay_tax_percentage}
          />


          <Col md={4}>
            <ButtonRed
              name="Save"
              onClick={handleSubmitMain}
              className="py-2"
            />
          </Col>
        </Row>
        <div className="text-red-500 font-semibold">{error}</div>
      </div>
      {loading ? <Loading /> : ""}
    </div>
  );
};

export default Payment;
