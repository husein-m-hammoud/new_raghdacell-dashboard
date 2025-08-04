import React from "react";
import { Col, Row } from "../../Grid-system";
import USDT from "../../images/886865-middle_clipdrop-background-removal.png";
import Money from "../../images/1200x630wa_clipdrop-background-removal.png";
import omt from "../../images/omt.webp";

import code from "../../images/istockphoto-1136155337-612x612.jpg";
import { useFilter } from "../../APIs/useMyAPI";

const FilterProcess = () => {
  const { handleParamsClick, searchParams } = useFilter();
  return (
    <Row justify={"start"} gap={3}>
      <Col
        col={2}
        onClick={() => handleParamsClick()}
        className={`border  items-center border-Purple cursor-pointer flex justify-center flex-col  p-1 text-center  rounded-2xl font-semibold ${
          !searchParams.get("process") ? "shadow-lg shadow-Pink" : ""
        }`}
      >
        <h1 className="text-[24px]">All</h1>
      </Col>
      <Col
        col={2}
        onClick={() => handleParamsClick("process", "USDT")}
        className={`border border-Purple cursor-pointer flex justify-between flex-col  p-1 text-center  rounded-2xl font-semibold ${
          searchParams.get("process") === "USDT" ? "shadow-lg shadow-Pink" : ""
        }`}
      >
        <div className="w-[80px] mx-auto">
          <img src={USDT} alt="" className="mx-auto" />
        </div>
        <h6 className="max-sm:text-[16px]">USDT-TRC20</h6>
      </Col>
      <Col
        onClick={() => handleParamsClick("process", "WHISH_MONEY")}
        col={2}
        className={`border border-Purple cursor-pointer flex justify-between flex-col  p-1 text-center  rounded-2xl font-semibold ${
          searchParams.get("process") === "WHISH_MONEY"
            ? "shadow-lg shadow-Pink"
            : ""
        }`}
      >
        <div className="w-[80px] mx-auto">
          <img src={Money} alt="" className="mx-auto" />
        </div>
        <h6 className="max-sm:text-[16px]">Whish Money</h6>
      </Col>

      <Col
        onClick={() => handleParamsClick("process", "OMT_PAY")}
        col={2}
        className={`border border-Purple cursor-pointer flex justify-between flex-col  p-1 text-center  rounded-2xl font-semibold ${
          searchParams.get("process") === "OMT_PAY"
            ? "shadow-lg shadow-Pink"
            : ""
        }`}
      >
        <div className="w-[80px] mx-auto">
          <img src={omt} alt="" className="mx-auto" />
        </div>
        <h6 className="max-sm:text-[16px]">OMT Pay</h6>
      </Col>
      <Col
        onClick={() => handleParamsClick("process", "PROMO_CODE")}
        col={2}
        className={`border flex justify-between cursor-pointer flex-col border-Purple  p-1 text-center  rounded-2xl font-semibold ${
          searchParams.get("process") === "PROMO_CODE"
            ? "shadow-lg shadow-Pink"
            : ""
        }
        `}
      >
        <div className=" mx-auto">
          <img src={code} alt="" className="mx-auto" />
        </div>
        <h6 className="max-sm:text-[16px]">Codes</h6>
      </Col>
    </Row>
  );
};

export default FilterProcess;
