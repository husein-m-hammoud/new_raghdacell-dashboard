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
  const { data: player_number } = useFETCH(`admin/player_number/info`);

  useEffect(() => {
    console.log("player_number?.data", player_number?.data);
    if (player_number && player_number?.data && player_number?.data?.data?.player_number != "undefined") {
      try {
        console.log(player_number.data.data, 'player');
        setNewPlayersNumbers(JSON.parse(player_number.data.data.player_number));
      } catch (error) {
        console.error("Invalid JSON format:", error);
      }
    }
  }, [player_number]);

  const updatePlayerNumber = async () => {
    if (!newPlayerNumber) {
      return;
    }
    const fetchedData = await fetchData(
      `admin/player_number/info`,
      {
        player_number: newPlayerNumber,
      },
      "POST"
    );
    console.log(fetchedData);
    if (fetchedData) {
      window.location.reload();
    }
  };

  console.log({ player_number });
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
          <Input
            name="exchange_rate"
            type="number"
            onChange={(e) => {
              setValue(e.target.value);
              setFormData({
                exchange_rate: 1 / e.target.value,
              });
            }}
            placeholder={"Exchange rate"}
            value={value}
          />
          <div className="text-center my-2">
            Each 1$ is equal to ( {value}) pound
          </div>
          <Col md={4}>
            <div onClick={() => setSure(true)}>
              <div
                className={`bg-Pink rounded-xl hover:bg-opacity-70  text-center font-semibold text-white cursor-pointer py-2`}
              >
                Save
              </div>
            </div>
          </Col>
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
      {loading ? <Loading /> : ""}

      <Title title="Player numbers" />
      <div className="border-2 border-Purple rounded-2xl">
        {newPlayerNumbers &&
        <div
          style={{
            padding:10,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
            borderBottom: "1px solid ",
          }}
        >
          {newPlayerNumbers.map((number, index) => (
            <div
              key={index}
              style={{
                padding: "2px",
               
                textAlign: "center",
              }}
            >
              {number}
            </div>
          ))}
        
        </div>
        }
        <Row className="p-4 justify-center text-center">
          <Input
            name="Player_number"
            type="text"
            onChange={(e) => {
              setNewPlayerNumber(e.target.value);
            }}
            placeholder={"Enter player number..."}
            value={newPlayerNumber}
          />

          <Col md={12}>
            <div
              onClick={() => updatePlayerNumber(true)}
              className="w-auto text-center justify-center d-flex m-auto"
            >
              <div
                className={`bg-Pink d-flex m-auto w-28 rounded-xl hover:bg-opacity-70  text-center font-semibold text-white cursor-pointer py-2`}
              >
                Save
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ExchangeRate;
