import React from "react";
import { Col, Row } from "../../Grid-system";
import { useFETCH } from "../../APIs/useMyAPI";
import { useContextHook } from "../../Context/ContextOPen";

const Check = ({ checkInput }) => {
  const { data } = useFETCH(`admin/th-p-apis`);
  const { setCheckId, checkId } = useContextHook();

  return (
    // <Row justify="start">
    <Col md={12}>
      <div className="flex items-center justify-end gap-3">
        <input
          type="checkbox"
          checked={checkId != "-1" && checkId != null}
          onChange={(e) => {
            if (e.target.checked) {
              setCheckId(checkId);
            } else {
              setCheckId("-1");
            }
          }}
          className="w-5 h-5"
        />
        <h1 className=" w-"> تفعيل اسم اللاعب ورقم اللاعب </h1>
      </div>
      <select
        name="is_available"
        value={checkId}
        className="w-full text-center outline-none border py-3 rounded-xl  "
        onChange={(e) => setCheckId(e.target.value)}
      >
        <option value={-1} key={-1} selected>
          غير محدد
        </option>
        {data?.data.data.map((e, i) => (
          <option value={e.id} key={i}>
            {e.game_name}
          </option>
        ))}
      </select>
    </Col>
    // </Row>
  );
};

export default Check;
