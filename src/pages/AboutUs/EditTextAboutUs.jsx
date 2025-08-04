import React, { useEffect } from "react";
import { Col, Row } from "../../Grid-system";
import { Back } from "../../components";
import { useFETCH, usePOST } from "../../APIs/useMyAPI";
import Loading from "../../Tools/Loading";
const EditTextAboutUs = () => {
  const { handleChangeInput, handleSubmit, setFormData, formData, loading } =
    usePOST({});
  const { data } = useFETCH(`admin/about-us/info?local=en`);
  const { data: dataAR } = useFETCH(`admin/about-us/info?local=ar`);
  const handleSubmitMain = (e) => {
    e.preventDefault();
    handleSubmit("admin/about-us/text");
  };
  let dataOld = data?.data.data;
  let dataOldAR = dataAR?.data.data;

  useEffect(() => {
    setFormData({
      text_ar: dataOldAR?.about_us_text,
      text_en: dataOld?.about_us_text,
    });
  }, [dataOld]);
  return (
    <div>
      <Row>
        <Col md={7} className="mx-auto">
          <textarea
            type="text"
            name="text_ar"
            value={formData?.text_ar}
            onChange={handleChangeInput}
            placeholder="الوصف بالعربي"
            className="border border-Purple m-1 py-3 rounded-xl h-[200px] w-full px-2 outline-none"
          />
        </Col>
        <Col md={7} className="mx-auto">
          <textarea
            type="text"
            name="text_en"
            value={formData?.text_en}
            onChange={handleChangeInput}
            placeholder="description in english"
            className="border border-Purple m-1 py-3 rounded-xl h-[200px] w-full px-2 outline-none"
          />
        </Col>
        {loading ? <Loading /> : ""}
      </Row>
      <Back onClick={handleSubmitMain} name="Save" />
    </div>
  );
};

export default EditTextAboutUs;
