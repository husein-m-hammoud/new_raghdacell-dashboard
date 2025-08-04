import React, { useEffect } from "react";
import { Back, Title } from "../../components";
import { Col, Row } from "../../Grid-system";
import { useParams } from "react-router-dom";
import { useFETCH, usePOST } from "../../APIs/useMyAPI";
import Loading from "../../Tools/Loading";

const AddCodes = () => {
  const { id } = useParams();
  const {
    handleChangeInput,
    handleSubmit,
    setFormData,
    formData,
    loading,
    error,
  } = usePOST({ number: 1 });
  const { data } = useFETCH(`admin/promo-codes/${id}`);
  const handleSubmitMain = (e) => {
    e.preventDefault();
    handleSubmit(
      id === "add" ? "admin/promo-codes" : `admin/promo-codes/${id}`
    );
  };
  let dataOld = data?.data.data;
  useEffect(() => {
    id !== "add" &&
      setFormData({
        ...formData,
        code: dataOld?.code,
        value: dataOld?.value,
        expiry_date: dataOld?.expiry_date,
        currency: dataOld?.currency,
        number_of_uses: dataOld?.number_of_uses,
      });
  }, [dataOld]);
  return (
    <div>
      <Title title=" Code" />
      <Row justify="center">
        <Col md={6}>
          <div className="border border-Purple p-8 space-y-3">
            <Title title="Add Code" />
            <input
              type="text"
              name="code"
              onChange={handleChangeInput}
              value={formData?.code}
              placeholder="code"
              className="border border-Purple m-1 py-3 rounded-xl"
            />
            <input
              type="text"
              name="value"
              onChange={handleChangeInput}
              value={formData?.value}
              placeholder="value"
              className="border border-Purple m-1 py-3 rounded-xl"
            />
            <input
              type="datetime-local"
              name="expiry_date"
              onChange={handleChangeInput}
              value={formData?.expiry_date}
              placeholder="Expiry date"
              className="border border-Purple m-1 py-3 rounded-xl"
            />
            <input
              type="text"
              name="number_of_uses"
              onChange={handleChangeInput}
              value={formData?.number_of_uses}
              placeholder="number of uses"
              className="border border-Purple m-1 py-3 rounded-xl"
            />
            <Col md={6}>
              <h1> Currency</h1>
              <select
                name="currency"
                value={formData?.currency}
                className="w-full text-center outline-none border py-2 rounded-xl mb-4"
                onChange={handleChangeInput}
              >
                <option value="" disabled selected hidden>
                  Currency
                </option>
                <option value="USD">USD</option>
                <option value="LBP">LBP</option>
              </select>
            </Col>
          </div>
        </Col>
      </Row>
      <div className="text-red-500 font-semibold">{error}</div>

      {loading ? <Loading /> : ""}
      <Back name="Save" onClick={handleSubmitMain} />
    </div>
  );
};

export default AddCodes;
