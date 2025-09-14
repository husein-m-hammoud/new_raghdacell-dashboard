import React, { useEffect } from "react";
import { Title } from "../../components";
import { Col, Row } from "../../Grid-system";
import { useParams } from "react-router-dom";
import { useFETCH, usePOST } from "../../APIs/useMyAPI";
import Loading from "../../Tools/Loading";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const AddUser = () => {
  const { id } = useParams();
  const {
    handleChangeInput,
    handleSubmit,
    setFormData,
    formData,
    loading,
    error,
  } = usePOST({});
  const { data } = useFETCH(`admin/users/${id}`);
  const handleSubmitMain = (e) => {
    e.preventDefault();
    handleSubmit(id === "add" ? "admin/users" : `admin/users/${id}`);
  };
  let dataOld = data?.data.data;
  useEffect(() => {
    id !== "add" &&
      setFormData({
        username: dataOld?.username,
        phone_number: dataOld?.phone_number,
        email: dataOld?.email,
        type: dataOld?.type,
      });
  }, [dataOld]);
  return (
    <div className="">
      <Row>
        <Col md={7} className="mx-auto ">
          <div className="border-2  border-Purple rounded-2xl p-10 ">
            <Title
              title={id !== "add" ? "Update User" : "Add User"}
              className="mb-14 mt-5"
            />
            <input
              type="text"
              name="username"
              value={formData?.username}
              placeholder="User Name"
              className="border py-4 rounded-xl mb-4 "
              onChange={handleChangeInput}
            />
            <input
              type="text"
              name="email"
              value={formData?.email}
              placeholder="E-mail (Optional)"
              className="border py-4 rounded-xl mb-4 "
              onChange={handleChangeInput}
            />
            <PhoneInput
              country={"lb"}
              alwaysDefaultMask
              value={formData?.phone_number}
              onChange={(phone) => {
                setFormData({ ...formData, phone_number: "+" + phone });
              }}
              inputClass="!w-full !h-[50px]   !border-[#94A3B8] !rounded-lg "
              buttonClass="!border !border-[#94A3B8] "
              containerClass="!mb-2"
            />
            <input
              type="text"
              name="password"
              placeholder="Password"
              className="border py-4 rounded-xl mb-4 "
              onChange={handleChangeInput}
            />
       
            {loading ? <Loading /> : ""}
            <div className="text-red-600">{error}</div>
            <input
              type="submit"
              name=""
              onClick={handleSubmitMain}
              className="border py-4 rounded-xl mb-4 text-white cursor-pointer bg-gradient-to-l to-Pink from-Purple "
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AddUser;
