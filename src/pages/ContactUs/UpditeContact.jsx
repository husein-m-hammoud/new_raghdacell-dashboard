import { MdOutlineMailOutline } from "react-icons/md";
import { BiSave } from "react-icons/bi";
import { AiOutlineWhatsApp, AiTwotonePhone } from "react-icons/ai";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { Col, Row } from "../../Grid-system";
import { Back } from "../../components";
import { useContactUs, useFETCH } from "../../APIs/useMyAPI";
import { useEffect, useState } from "react";
import Loading from "../../Tools/Loading";
import { ImLocation } from "react-icons/im";
const UpditeContact = () => {
  const [formDataContact, setFormDataContact] = useState({});
  const { updateContactUs, loading } = useContactUs("admin/contact-us/info");
  const { data } = useFETCH(`admin/contact-us/info`);
  let dataOld = data?.data.data;
  useEffect(() => {
    setFormDataContact({
      instagram: dataOld?.instagram,
      facebook: dataOld?.facebook,
      whatsapp: dataOld?.whatsapp,
      email: dataOld?.email,
      first_phone_number: dataOld?.first_phone_number,
      second_phone_number: dataOld?.second_phone_number,
      tiktok: dataOld?.tiktok,
    });
  }, [dataOld]);
  return (
    <>
      <Row justify="center" gap={5}>
        <Col
          md={5}
          className="border-4 border-Pink rounded-xl flex flex-between p-4 items-center relative bg-white"
        >
          <FaInstagram size={60} color="#CB3878" />
          <input
            type="text"
            name="instagram"
            value={formDataContact?.instagram}
            onChange={(e) =>
              setFormDataContact({
                ...formDataContact,
                instagram: e.target.value,
              })
            }
            placeholder="https://url...."
            className="text-xl font-semibold px-2 outline-none py-5 w-[100%]"
          />
          {loading ? <Loading /> : ""}
          <div className="">
            <BiSave
              onClick={() =>
                updateContactUs("instagram", formDataContact.instagram)
              }
              color="#3B5998 "
              className="mx-1 cursor-pointer"
              size={35}
            />
          </div>
        </Col>
        <Col
          md={5}
          className="border-4 border-Pink rounded-xl flex flex-between p-4 items-center relative bg-white"
        >
          <FaFacebook size={60} color="#3B5998" />
          <input
            type="text"
            name="facebook"
            value={formDataContact?.facebook}
            onChange={(e) =>
              setFormDataContact({
                ...formDataContact,
                facebook: e.target.value,
              })
            }
            placeholder="https://url...."
            className="text-xl font-semibold px-2 outline-none py-5 w-[100%]"
          />
          <div className="">
            <BiSave
              onClick={() =>
                updateContactUs("facebook", formDataContact.facebook)
              }
              color="#3B5998 "
              className="mx-1 cursor-pointer"
              size={35}
            />
          </div>
        </Col>
        <Col
          md={5}
          className="border-4 border-Pink rounded-xl flex flex-between p-4 items-center relative bg-white"
        >
          <AiOutlineWhatsApp size={60} color="#0DC143" />
          <input
            type="text"
            name="whatsapp"
            value={formDataContact?.whatsapp}
            placeholder="https://url...."
            onChange={(e) =>
              setFormDataContact({
                ...formDataContact,
                whatsapp: e.target.value,
              })
            }
            className="text-xl font-semibold px-2 outline-none py-5 w-[100%]"
          />
          <div className="">
            <BiSave
              onClick={() =>
                updateContactUs("whatsapp", formDataContact.whatsapp)
              }
              color="#3B5998 "
              className="mx-1 cursor-pointer"
              size={35}
            />
          </div>
        </Col>
        <Col
          md={5}
          className="border-4 border-Pink rounded-xl flex flex-between p-4 items-center relative bg-white"
        >
          <MdOutlineMailOutline size={60} color="#707070" />
          <input
            type="text"
            name="email"
            value={formDataContact?.email}
            placeholder="https://url...."
            onChange={(e) =>
              setFormDataContact({
                ...formDataContact,
                email: e.target.value,
              })
            }
            className="text-xl font-semibold px-2 outline-none py-5 w-[100%]"
          />
          <div className="">
            <BiSave
              onClick={() => updateContactUs("email", formDataContact.email)}
              color="#3B5998 "
              className="mx-1 cursor-pointer"
              size={35}
            />
          </div>
        </Col>
        <Col
          md={5}
          className="border-4 border-Pink rounded-xl flex flex-between p-4 items-center relative bg-white"
        >
          <AiTwotonePhone size={60} color="#FEDADA" />
          <input
            type="text"
            name="first_phone_number"
            value={formDataContact?.first_phone_number}
            placeholder="https://url...."
            onChange={(e) =>
              setFormDataContact({
                ...formDataContact,
                first_phone_number: e.target.value,
              })
            }
            className="text-xl font-semibold px-2 outline-none py-5 w-[100%]"
          />
          <div className="">
            <BiSave
              onClick={() =>
                updateContactUs(
                  "first_phone_number",
                  formDataContact.first_phone_number
                )
              }
              color="#3B5998 "
              className="mx-1 cursor-pointer"
              size={35}
            />
          </div>
        </Col>
        <Col
          md={5}
          className="border-4 border-Pink rounded-xl flex flex-between p-4 items-center relative bg-white"
        >
          <ImLocation size={60} className="" color="#9F7CC6" />
          <input
            type="text"
            name="second_phone_number"
            value={formDataContact?.second_phone_number}
            placeholder="https://url...."
            onChange={(e) =>
              setFormDataContact({
                ...formDataContact,
                second_phone_number: e.target.value,
              })
            }
            className="text-xl font-semibold px-2 outline-none py-5 w-[100%]"
          />
          <div className="">
            <BiSave
              onClick={() =>
                updateContactUs(
                  "second_phone_number",
                  formDataContact.second_phone_number
                )
              }
              color="#3B5998 "
              className="mx-1 cursor-pointer"
              size={35}
            />
          </div>
        </Col>
        <Col
          md={5}
          className="border-4 border-Pink rounded-xl flex flex-between p-4 items-center relative bg-white"
        >
          <FaTiktok size={60} color="#D54069" />
          <input
            type="text"
            name="tiktok"
            value={formDataContact?.tiktok}
            placeholder="https://url...."
            onChange={(e) =>
              setFormDataContact({
                ...formDataContact,
                tiktok: e.target.value,
              })
            }
            className="text-xl font-semibold px-2 outline-none py-5 w-[100%]"
          />
          <div className="">
            <BiSave
              onClick={() => updateContactUs("tiktok", formDataContact.tiktok)}
              color="#3B5998 "
              className="mx-1 cursor-pointer"
              size={35}
            />
          </div>
        </Col>
      </Row>
      <Back />
    </>
  );
};

export default UpditeContact;
