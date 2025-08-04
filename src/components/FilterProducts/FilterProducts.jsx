import React from "react";
import { useFilter } from "../../APIs/useMyAPI";
import { Col, Row } from "../../Grid-system";

const FilterProducts = () => {
  const { handleParamsClick, searchParams } = useFilter();
  return (
    <Row className="">
      <Col md={4}>
        <select
          name=""
          id=""
          value={searchParams.get("product_number")}
          onChange={(e) => handleParamsClick("product_number", e.target.value)}
          className="w-full py-2 text-center border-2 outline-none border-Pink rounded-xl"
        >
          <option value="">all</option>
          <option value="1">Product one</option>
          <option value="2">Product two</option>
          <option value="3">Product three</option>
          <option value="4">Product four</option>
          <option value="5">Product five</option>
          <option value="6">API Products</option>
        </select>
      </Col>
    </Row>
  );
};

export default FilterProducts;
