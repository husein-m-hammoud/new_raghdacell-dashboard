import React, { useEffect, useState } from "react";
import { useFETCH, usePOST, fetchData } from "../../APIs/useMyAPI";
import { Col, Row } from "../../Grid-system";
import Loading from "../../Tools/Loading";
import { Buttons, Input, Title } from "../../components";

const ExchangeRate = () => {
  const [sure, setSure] = useState(false);
  const [value, setValue] = useState();
  const [newPlayerNumber, setNewPlayerNumber] = useState();
  const [newPlayerNumbers, setNewPlayersNumbers] = useState([]);

  const { handleSubmit, setFormData, formData, loading, error } = usePOST();
  const { data } = useFETCH(`admin/exchange-rate/info`);



  const handleSubmitMain = (e) => {
    e.preventDefault();
    handleSubmit("admin/exchange-rate/info", "", true);
  };
  let dataOld = data?.data.data;
  useEffect(() => {
    setFormData({
      exchange_rate: dataOld?.exchange_rate,
    });
    setValue((1 / dataOld?.exchange_rate).toFixed());
  }, [dataOld]);

  return (
    <div>
      <Title title="Exchange Rate" />
      <div className="border-2 border-Purple rounded-2xl">
        <Row className="p-4 justify-center">
       
          <div className="text-center my-2">
            Each 1$ is equal to ( {value}) pound
          </div>
      
        </Row>
        <div className="text-red-500 font-semibold">{error}</div>
      </div>
      {sure && (
        <>
          <div
            onClick={() => setSure(false)}
            className={`fixed w-full h-full top-0 left-0 popup z-30 flex justify-center items-center`}
          ></div>
          <div className="bg-white z-40 fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-3xl w-[500px] max-w-[500px] min-h-[200px] ">
            <p className="font-semibold text-3xl text-center py-7">
              The exchange rate will be adjusted and every 1 LBP equals to (
              {formData?.exchange_rate})$
            </p>
            <div className="flex items-end m-5 space-x-2">
              <Buttons
                onClick={handleSubmitMain}
                name="Yes"
                className="py-3 px-16  hover:text-white  hover:bg-green-700"
              />
              <Buttons
                onClick={() => setSure(false)}
                name="Cancel"
                className="py-3 px-16  hover:text-white  hover:bg-red-700"
              />
            </div>
          </div>
        </>
      )}
     
    </div>
  );
};

export default ExchangeRate;
