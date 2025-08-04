import React, { useState, useEffect } from "react";
import { CardBox, Title,AddChargingModal } from "../../components";
import { Col, Row } from "../../Grid-system";
import { useFETCH, useFilter, fileUrl } from "../../APIs/useMyAPI";
import Loading from "../../Tools/Loading";
import Pagination from "../../Tools/Pagination";
import { useContextHook } from "../../Context/ContextOPen";
import { useLocation } from "react-router-dom";

const Message = () => {
  const { search } = useLocation();
  const {  setAdminInfo } = useContextHook();

  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState({});


  const [image, setImage] = useState(false);

  
  const { data:dataInfoAdmin } = useFETCH(
    window.localStorage.getItem("token") ? `admin/admin-info` : ""
  ); 

  useEffect(() => {
    if (dataInfoAdmin?.data?.data) setAdminInfo(dataInfoAdmin?.data?.data);
  }, [dataInfoAdmin]);

  const { data, isLoading, deleteItem } = useFETCH(
    `admin/messages${search}`,
    "admin/messages"
  );
  return (
    <>
      <Title title="Messages" />
      {isLoading ? <Loading /> : ""}

      <Pagination
        pageCount={Math.ceil(data?.data.data.total / data?.data.data.per_page)}
      >
        <Row>
          {data?.data.data.data.map((e) => (
            <Col lg={4} md={6} key={e.id}>
              <CardBox showEdit={true} deleteClick={() => deleteItem(e)}>
                {e.image && (
                  <div className="w-[80px] h-[80px] mx-auto ">
                    <img
                      src={fileUrl + e.image}
                      onClick={() => {
                        setIsOpen(true);
                        setImage(fileUrl + e.image);
                      }}
                      alt=""
                      className="w-full h-full rounded-full cursor-pointer "
                    />
                  </div>
                )}

                <div className="text-xl text-start pb-3 ">
                  <span className="text-Brown font-bold text-xl pl-2 pr-3 text-Pink">
                    Name :
                  </span>
                  <span> {e.name}</span>
                </div>
                <div className="text-xl text-start pb-3">
                  <span className="text-Brown font-bold text-xl pl-2 pr-3 text-Pink">
                    Phone:
                  </span>
                  <span> {e.phone_number}</span>
                </div>
                <div className="text-xl text-start pb-3">
                  <span className="text-Brown font-bold text-xl pl-2 pr-3 text-Pink">
                    Message :
                  </span>
                  <span>{e.message}</span>
                </div>
                <div className="text-xl text-start pb-3">
                  <span className="text-Brown font-bold text-xl pl-2 pr-3 text-Pink">
                    Date :
                  </span>
                  <span>{e.created_at}</span>
                </div>
                {e.read == 0 &&
                  <div className="mt-2 text-right w-100">
                  <span onClick={() => {
                    setShowModal(true);
                    setMessage(e);
                  }} className="font-bold cursor-pointer">Create Deposit</span>
                </div>
                }
                
              </CardBox>
            </Col>
          ))}
        </Row>
      </Pagination>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-Pink text-2xl"
              onClick={() => setIsOpen(false)}
            >
              ✖
            </button>

            {/* Full-Size Image */}
            <img
              src={image}
              alt="Full Preview"
              className="max-w-[90vw] max-h-[90vh] rounded-2xl"
            />
          </div>
        </div>
      )}

<AddChargingModal
        show={showModal}
        onClose={() => setShowModal(false)}
        message = {message}
        type={"message"}
      />
    </>

  );
};

export default Message;
