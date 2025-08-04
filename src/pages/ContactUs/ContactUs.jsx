import { MdOutlineMailOutline } from "react-icons/md";
import { AiOutlineWhatsApp, AiTwotonePhone } from "react-icons/ai";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { ButtonRed, Title } from "../../components";
import { Col, Row } from "../../Grid-system";
import { useFETCH } from "../../APIs/useMyAPI";
import Loading from "../../Tools/Loading";
import { ImLocation } from "react-icons/im";
const ContactUs = () => {
  const { data, isLoading } = useFETCH(`admin/contact-us/info`);
  const dataAll = data?.data.data;
  return (
    <div>
      <Title title="Contact Us " />
      {isLoading ? <Loading /> : ""}
      <Row gap={5} justify="center">
        <Col
          md={5}
          className="overflow-hidden flex-wrap flex items-center justify-between border-[3px] border-Brown rounded-xl shadow-md font-semibold text-xl py-5 px-3 w-[48%] max-lg:w-[100%] bg-white"
        >
          <FaInstagram size={60} className="" color="#CB3878" />
          <p className="font-semibold px-2 text-Gray text-xl">
            {dataAll?.instagram}
          </p>
        </Col>
        <Col
          md={5}
          className="overflow-hidden flex-wrap flex items-center justify-between border-[3px] border-Brown rounded-xl shadow-md font-semibold text-xl py-5 px-3 w-[48%] max-lg:w-[100%] bg-white"
        >
          <FaFacebook size={60} className="" color="#3B5998" />
          <p className="font-semibold px-2 text-Gray text-xl">
            {dataAll?.facebook}
          </p>
        </Col>

        <Col
          md={5}
          className="overflow-hidden flex-wrap flex items-center justify-between border-[3px] border-Brown rounded-xl shadow-md font-semibold text-xl py-5 px-3 w-[48%] max-lg:w-[100%] bg-white"
        >
          <AiOutlineWhatsApp size={60} className="" color="#0DC143" />
          <p className="font-semibold px-2 text-Gray text-xl">
            {dataAll?.whatsapp}
          </p>
        </Col>

        <Col
          md={5}
          className="overflow-hidden flex-wrap flex items-center justify-between border-[3px] border-Brown rounded-xl shadow-md font-semibold text-xl py-5 px-3 w-[48%] max-lg:w-[100%] bg-white"
        >
          <MdOutlineMailOutline size={60} className="" color="#707070" />
          <p className="font-semibold px-2 text-Gray text-xl">
            {dataAll?.email}
          </p>
        </Col>

        <Col
          md={5}
          className="overflow-hidden flex-wrap flex items-center justify-between border-[3px] border-Brown rounded-xl shadow-md font-semibold text-xl py-5 px-3 w-[48%] max-lg:w-[100%] bg-white"
        >
          <AiTwotonePhone size={60} className="" color="#FEDADA" />
          <p className="font-semibold px-2 text-Gray text-xl">
            {dataAll?.first_phone_number}
          </p>
        </Col>
        <Col
          md={5}
          className="overflow-hidden flex-wrap flex items-center justify-between border-[3px] border-Brown rounded-xl shadow-md font-semibold text-xl py-5 px-3 w-[48%] max-lg:w-[100%] bg-white"
        >
          <ImLocation size={60} className="" color="#9F7CC6" />
          <p className="font-semibold px-2 text-Gray text-xl">
            {dataAll?.second_phone_number}
          </p>
        </Col>
        <Col
          md={5}
          className="overflow-hidden flex-wrap flex items-center justify-between border-[3px] border-Brown rounded-xl shadow-md font-semibold text-xl py-5 px-3 w-[48%] max-lg:w-[100%] bg-white"
        >
          <FaTiktok size={60} className="" color="#D54069" />
          <p className="font-semibold px-2 text-Gray text-xl">
            {dataAll?.tiktok}
          </p>
        </Col>
      </Row>
      <div className="fixed bottom-10 right-10">
        <ButtonRed link="/Contact-Us/edit" name="Edit" className="px-7 py-2" />
      </div>
    </div>
  );
};

export default ContactUs;
