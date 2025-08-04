import React, { useEffect, useState } from "react";
import { Col, Row } from "../../Grid-system";
import { useFETCH } from "../../APIs/useMyAPI";
import { useContextHook } from "../../Context/ContextOPen";

const CheckAs7ab = ({ formData, handleChangeInput }) => {
  const data = ["pubg", "pubglite", "freefire", "likee", "bigo", "lightchat", "oohla", "yalla", "ligo"];

  const arrayOfObjects = data.map(item => ({
    label: item.charAt(0).toUpperCase() + item.slice(1),
    value: item
  }));
  const [check, setCheck ] = useState(formData.th_party_as7ab_api != undefined ? true : false);

useEffect(()=> {
  if(formData?.th_party_as7ab_api ) {
    setCheck(true)
  }
  else {
    setCheck(false)
  }
},[formData.th_party_as7ab_api]);
  return (
    // <Row justify="start">
      <Col md={12}>
        <div className="flex items-center justify-end gap-3">
          <input
            type="checkbox"
            id="ss"
            checked={check ? 'checked' : ''}
            
            className="w-5 h-5"
          />
          <h1 className=" w-"> (As7ab)تفعيل اسم اللاعب ورقم اللاعب </h1>
        </div>
        <select
          name="th_party_as7ab_api"
          value={formData?.th_party_as7ab_api}
          className="w-full text-center outline-none border py-3 rounded-xl  "
          onChange={handleChangeInput}
        >
          <option value=""  selected >
            تفعيل اسم اللاعب ورقم اللاعب
          </option>
          {arrayOfObjects.map((e, i) => (
            <option value={e.vlaue} key={i}>
              {e.label}
            </option>
          ))}
        </select>
      </Col>
    // </Row>
  );
};

export default CheckAs7ab;
