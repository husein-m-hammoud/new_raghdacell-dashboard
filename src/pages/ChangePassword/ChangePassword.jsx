import React, { useState } from "react";
import { Col, Row } from "../../Grid-system";
import { Title } from "../../components";
import { usePOST } from "../../APIs/useMyAPI";
import Loading from "../../Tools/Loading";

const ChangePassword = () => {
  const [biShow, setBiShow] = useState(false);
    const { handleSubmit, error, loading, handleChangeInput } = usePOST({});
    const handleSubmitBlue = () => {
      handleSubmit("admin/change-password", true);
    };
  return (
    <div>
      <Title title="Change Password" />
      <Row justify="center">
        <Col md={7}>
          <div className="border-2 border-Purple rounded-2xl  py-10 md:px-16 bgimg">
            <input
              name="old_password"
              type={biShow ? "text" : "password"}
              className="border border-Purple py-4 rounded-2xl my-3"
              placeholder="Old Password"
              onChange={handleChangeInput}
            />
            <input
              name="password"
              type={biShow ? "text" : "password"}
              className="border border-Purple py-4 rounded-2xl my-3"
              placeholder="New Password"
              onChange={handleChangeInput}
            />
            <input
              name="password_confirmation"
              type={biShow ? "text" : "password"}
              className="border border-Purple py-4 rounded-2xl my-3"
              placeholder="Retype new Password"
              onChange={handleChangeInput}
            />
            <div className="text-end text-l text-Brown flex items-center justify-start space-x-2">
              <input
                type="checkbox"
                className="relative w-5 h-5"
                onChange={(e) => setBiShow(e.target.checked)}
              />
              <span>Show Password</span>
              {loading ? <Loading /> : ""}
              <div className="text-red-600">{error}</div>
            </div>
            <div
              onClick={handleSubmitBlue}
              className="cursor-pointer w-full border border-Purple py-3 mt-10 rounded-2xl text-white font-semibold text-xl  text-center bg-gradient-to-l to-Pink from-Purple"
            >
              Save Change
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ChangePassword;
