import React from "react";
import { Col, Row } from "../../Grid-system";
import { useFilter } from "../../APIs/useMyAPI";

const FilterOrderStataus = () => {
  const { handleParamsClick, searchParams } = useFilter();
  return (
    <Row>
      <Col md={4}>
        <select
          name=""
          id=""
          value={searchParams.get("status")}
          onChange={(e) => handleParamsClick("status", e.target.value)}
          className="w-full py-2 text-center border-2 outline-none border-Pink rounded-xl"
        >
          <option value="">all</option>
          <option value="COMPLETED">Completed</option>
          <option value="WAITING">Waiting</option>
          <option value="CANCELED">Canceled</option>
          <option value="FAILED">Failed</option>

        </select>
      </Col>
    </Row>
  );
};

export default FilterOrderStataus;
