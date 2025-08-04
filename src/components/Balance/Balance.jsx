import React, { useState } from "react";
import { Col, Row } from "../../Grid-system";
import Buttons from "../Buttons/Buttons";
import { usePOST } from "../../APIs/useMyAPI";
import Loading from "../../Tools/Loading";

const Balance = ({ current, shipping, total, id }) => {
  const [showPop, setShowPop] = useState(false);
  const { handleChangeInput, handleSubmit, loading, error, formData } = usePOST(
    { currency: "USD" }
  );
  const handleSubmitMain = (e) => {
    e.preventDefault();
    handleSubmit(`admin/users/${id}/balance`, "", true);
  };

  return (
    <>
      <div className={` ${showPop ? "" : "hidden"} `}>
        {loading ? <Loading /> : ""}
        <div
          onClick={() => setShowPop(false)}
          className={` fixed w-full h-full top-0 left-0 popup z-40 `}
        ></div>
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
          <Row>
            <Col className="bg-white py-3 px-5 rounded-2xl m-1 space-y-3">
              <div className="text-2xl flex justify-center items-center gap-4">
                <div className="flex gap-2">
                  <input
                    type="radio"
                    name="process"
                    id=""
                    value="DISCOUNT"
                    onChange={handleChangeInput}
                  />
                  <span>Discounted</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    name="process"
                    id=""
                    value="ADD"
                    onChange={handleChangeInput}
                  />
                  <span>Addition</span>
                </div>
              </div>
              <div>
                {formData?.amount &&
                  parseInt(formData?.amount).toLocaleString()}
              </div>
              <input
                placeholder="amount..."
                type="text"
                name="amount"
                onChange={handleChangeInput}
                className="border  px-4 py-2 rounded-xl border-Pink"
              />
              <input
                placeholder="because of..."
                type="text"
                name="reason"
                onChange={handleChangeInput}
                className="border px-4 py-2 rounded-xl border-Pink"
              />
              <div className="text-2xl flex justify-center items-center gap-4">
                <div className="flex gap-2">
                  <input
                    type="radio"
                    name="currency"
                    id=""
                    value="USD"
                    checked={formData?.currency === "USD"}
                    onChange={handleChangeInput}
                  />
                  <span>USD</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    name="currency"
                    id=""
                    value="LBP"
                    checked={formData?.currency === "LBP"}
                    onChange={handleChangeInput}
                  />
                  <span>LBP</span>
                </div>
              </div>
              <div className="text-red-500 font-semibold">{error}</div>
              <div className="flex gap-4 items-end m-5">
                <Buttons
                  onClick={handleSubmitMain}
                  name="Confirm "
                  className="py-3 px-16 border hover:text-white  hover:bg-green-700 "
                />
                <Buttons
                  onClick={() => setShowPop(false)}
                  name="Cancel"
                  className="py-3 px-16 border hover:text-white  hover:bg-red-700"
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Row className="py-5 gap-2 text-center" justify="center">
        <Col
          md={1}
          onClick={() => setShowPop(true)}
          className="p-1 flex items-center justify-center text-white rounded-2xl cursor-pointer hover:bg-opacity-90 bg-Purple font-semibold"
        >
          Edit
        </Col>
        <Col
          md={3}
          className="p-1 text-white rounded-2xl cursor-pointer hover:bg-opacity-90 bg-Pink  font-semibold"
        >
          <h6>{current}</h6>
          <h6 className="max-sm:text-[16px]">Current Balance</h6>
        </Col>
        <Col
          md={3}
          className="p-1 text-white rounded-2xl cursor-pointer hover:bg-opacity-90 bg-green-700 font-semibold"
        >
          <h6>{shipping}</h6>
          <h6 className="max-sm:text-[16px]">Shipping Total</h6>
        </Col>
        <Col
          md={3}
          className="p-1 text-white rounded-2xl cursor-pointer hover:bg-opacity-90 bg-Purple font-semibold"
        >
          <h6>{total}</h6>
          <h6 className="max-sm:text-[16px]">Total Payment</h6>
        </Col>
      </Row>
    </>
  );
};

export default Balance;
