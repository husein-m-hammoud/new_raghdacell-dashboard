import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "../../Grid-system";
import { Back, Currency, Title, ApiLogo, CopyableText } from "../../components";
import { fileUrl, useFETCH, fetchData } from "../../APIs/useMyAPI";
import { json, useParams } from "react-router-dom";
import Loading from "../../Tools/Loading";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";

const Order = () => {
  const { id } = useParams();
  const { data, isLoading } = useFETCH(`admin/orders/${id}`);
  let dataAll = data?.data.data;
  const [copys, setCopy] = useState(false);
  const text = useRef();
  const text2 = useRef();
  const text3 = useRef();
  useEffect(() => {
    setTimeout(() => setCopy(false), 2000);
  }, [copys]);
  console.log(dataAll);
  useEffect(() => {
    if (dataAll?.status != "COMPLETED" && dataAll?.order_reference) {
      checkStatus();
    }
  }, [dataAll]);

  const printOrderDetailsOLD = (details) => {
    // Fallback to an empty array if details is not an array
    const validDetails = Array.isArray(details) ? details : JSON.parse(details);

    console.log(validDetails);  // For debugging purposes

    return (
      <div>
        {validDetails.map((item, index) => (
          <div key={index}>
            {Object.entries(item).map(([key, value]) => (
              <p key={key}>
                <strong>{key}</strong>: {value !== null ? value.toString() : "N/A"}
              </p>
            ))}
            <hr />
          </div>
        ))}
      </div>
    );
  };
  const printOrderDetails = (details) => {
    let validDetails;

    try {
        // Check if details is already an array
        if (Array.isArray(details)) {
            validDetails = details;
        } else {
            const parsed = JSON.parse(details);
            // If parsed is an object, wrap it in an array
            validDetails = Array.isArray(parsed) ? parsed : [parsed];
        }
    } catch (error) {
        console.error("Invalid JSON format:", error);
        return <p>Error: Invalid data format</p>;
    }

    return (
      <div>
        {validDetails.map((item, index) => (
          <div key={index}>
            {Object.entries(item).map(([key, value]) => (
              <p key={key}>
                <strong>{key}</strong>: {value !== null ? value.toString() : "N/A"}
              </p>
            ))}
            <hr />
          </div>
        ))}
      </div>
    );
};



  const checkStatus = async () => {
    var order_reference = dataAll?.order_reference;
    console.log("getPackegesofProduct");
    const fetchedData = await fetchData(
      `admin/automated/get/order/status/${order_reference}`,
      null,
      "GET"
    );
    console.log({ fetchedData });
    if (fetchedData?.data?.products) {
    }
  };

  const renderCodes = () => {
    console.log("getPackegesofProduct");
    var codes = dataAll?.item_codes;
    console.log({ codes });
    if (codes) {
      codes = JSON.parse(codes);
    }
    console.log({ codes });
    return codes.map((item, index) => <CopyableText text={item?.code} />);
  };
  return (
    <section className="py-4">
      <Title title="Order" />
      {isLoading ? <Loading /> : ""}
      <Row justify="center">
        <Col
          className="border border-Pink rounded-2xl p-5 flex max-md:flex-col gap-10"
          lg={12}
        >
          <Row className="p-5">
            <Col md={4}>
              <img
                src={fileUrl + dataAll?.product_image}
                alt=""
                className="rounded-2xl h-[260px] object-contain mx-auto"
              />
            </Col>

            <Col md={8}>
              <Row>
                <Col md={6}>
                  <Row>
                    <Col>
                      <div className="flex gap-2 mb-2">
                        <div className="font-semibold text-Pink">ID : </div>
                        <div>{dataAll?.id}</div>
                      </div>
                    </Col>
                    <Col>
                      <div className="flex gap-2 mb-2">
                        <div className="font-semibold text-Pink">
                          Price products :
                        </div>
                        {dataAll?.price_per_item} {dataAll?.currency}
                      </div>
                    </Col>
                    {dataAll?.user.username && (
                      <Col>
                        <div className="flex gap-2 mb-2">
                          <div className="font-semibold text-Pink">
                            User Name :
                          </div>
                          <div className={`  font-semibold`}>
                            {dataAll?.user.username}
                          </div>
                        </div>
                      </Col>
                    )}
                    {dataAll?.user.phone_number && (
                      <Col>
                        <div className="flex gap-2 mb-2">
                          <div className="font-semibold text-Pink">Phone :</div>
                          <div className={`  font-semibold`}>
                            {dataAll?.user.phone_number}
                          </div>
                        </div>
                      </Col>
                    )}
                    {dataAll?.service_type && (
                      <Col>
                        <div className="flex gap-2 mb-2">
                          <div className="font-semibold text-Pink">
                            Service Type :
                          </div>
                          <div className={`  font-semibold`}>
                            {dataAll?.service_type}
                          </div>
                        </div>
                      </Col>
                    )}

                    {dataAll?.social_link && (
                      <Col>
                        <div className="flex gap-2 mb-2">
                          <div className="font-semibold text-Pink">
                            Social Link :
                          </div>
                          <div ref={text3} className={`  font-semibold`}>
                            {dataAll?.social_link.substring(0, 15) + "..."}
                          </div>
                          {copys ? (
                            <FaRegCheckCircle size={15} />
                          ) : (
                            <FaRegCopy
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  dataAll?.social_link
                                );
                                setCopy(true);
                              }}
                              size={15}
                              className="cursor-pointer "
                            />
                          )}
                        </div>
                      </Col>
                    )}
                    {dataAll?.wallet_address && (
                      <Col>
                        <div className="flex gap-2 mb-2">
                          <div className="font-semibold text-Pink">
                            Wallet Address:
                          </div>
                          <div
                            ref={text2}
                            className={`font-semibold break-all`}
                          >
                            {dataAll?.wallet_address}
                          </div>
                          {copys ? (
                            <FaRegCheckCircle size={15} />
                          ) : (
                            <FaRegCopy
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  text2.current.innerHTML
                                );
                                setCopy(true);
                              }}
                              size={15}
                              className="cursor-pointer "
                            />
                          )}
                        </div>
                      </Col>
                    )}
                    {dataAll?.email_or_phone_number && (
                      <Col>
                        <div className="flex gap-2 mb-2">
                          <div className="font-semibold text-Pink">
                            Email or Phone Number:
                          </div>
                          <div className={`  font-semibold`}>
                            {dataAll?.email_or_phone_number}
                          </div>
                        </div>
                      </Col>
                    )}
                    {dataAll?.password && (
                      <Col>
                        <div className="flex gap-2 mb-2">
                          <div className="font-semibold text-Pink">
                            Password :
                          </div>
                          <div className={`font-semibold`}>
                            {dataAll?.password}
                          </div>
                        </div>
                      </Col>
                    )}
                    {dataAll?.contact_number && (
                      <Col>
                        <div className="flex gap-2 mb-2">
                          <div className="font-semibold text-Pink">
                            Contact Number :
                          </div>
                          <div className={`  font-semibold`}>
                            {dataAll?.contact_number}
                          </div>
                        </div>
                      </Col>
                    )}
                    {dataAll?.refuse_reason && (
                      <Col>
                        <div className="flex gap-2 mb-2">
                          <div className="font-semibold text-Pink">
                            Refuse Reason :
                          </div>
                          <div className={`  font-semibold`}>
                            {dataAll?.refuse_reason}
                          </div>
                        </div>
                      </Col>
                    )}
                    {dataAll?.accept_note && (
                      <Col>
                        <div className="flex gap-2 mb-2">
                          <div className="font-semibold text-Pink">
                            Accept Note :
                          </div>
                          <div className={`  font-semibold`}>
                            {dataAll?.accept_note}
                          </div>
                        </div>
                      </Col>
                    )}
                    <Col>
                      <div className="flex gap-2 mb-2">
                        <div className="font-semibold text-Pink">Date : </div>
                        <div>{dataAll?.date}</div>
                      </div>
                    </Col>
                    <Col>
                      <div className="flex gap-2 mb-2">
                        <div className="font-semibold text-Pink">Time : </div>
                        <div>{dataAll?.time}</div>
                      </div>
                    </Col>
                    <Col>
                      <div className="flex gap-2 mb-2">
                        <div className="font-semibold text-Pink"> Ordered From : </div>
                        <div>{dataAll?.ordered_from}</div>
                      </div>
                    </Col>
                    <Col>
                      <div className="flex gap-2 mb-2">
                        <div className="font-semibold text-Pink"> Device Info : </div>
                        <div>{dataAll?.device_info ? printOrderDetails(dataAll?.device_info) : ''}</div>
                      </div>
                    </Col>

                  </Row>



                </Col>
                <Col md={6}>
                  <Col>
                    <div className="flex gap-2 mb-2">
                      <div className="font-semibold text-Pink">
                        Order status :
                      </div>
                      <div
                        className={`${
                          dataAll?.status === "WAITING"
                            ? "text-blue-500"
                            : dataAll?.status === "COMPLETED"
                            ? "text-green-600"
                            : dataAll?.status === "CANCELED"
                            ? "text-red-600 "
                            : dataAll?.status === "FAILED"
                            ? "text-red-600 "
                            : ""
                        } font-semibold`}
                      >
                        {dataAll?.status}
                      </div>
                    </div>
                  </Col>
                  {dataAll?.status == "FAILED" && (
                    <Col>
                      <div className="flex gap-2 mb-2">
                        <div className="font-semibold text-Pink">Error :</div>
                        <div className="text-red-600 font-semibold">
                          {dataAll?.error_response}
                        </div>
                      </div>
                    </Col>
                  )}
                  {dataAll?.item_codes && dataAll.status === "COMPLETED" && (
                    <Col>
                      <div className="flex gap-2 mb-2">
                        <div className="font-semibold text-Pink">Codes :</div>
                        <div className={`font-semibold`}>{renderCodes()}</div>
                      </div>
                    </Col>
                  )}
                  {dataAll?.item_codes && dataAll.status === "FAILED" && (
                    <Col>
                      <div className="flex gap-2 mb-2">
                        <div className="font-semibold text-Pink">Error :</div>
                        <div className={`font-semibold`}>{renderCodes()}</div>
                      </div>
                    </Col>
                  )}

                  {dataAll?.expiry_date && (
                    <Col>
                      <div className="flex gap-2 mb-2">
                        <div className="font-semibold text-Pink">
                        Expiry Date :
                        </div>
                        <div className={`  font-semibold`}>
                          {dataAll?.expiry_date}
                        </div>
                      </div>
                    </Col>
                  )}
                  {dataAll?.player_name && (
                    <Col>
                      <div className="flex gap-2 mb-2">
                        <div className="font-semibold text-Pink">
                          Player Name :
                        </div>
                        <div className={`  font-semibold`}>
                          {dataAll?.player_name}
                        </div>
                      </div>
                    </Col>
                  )}
                  {dataAll?.player_number && (
                    <Col>
                      <div className="flex gap-2 mb-2">
                        <div className="font-semibold text-Pink">
                          Player Number :
                        </div>
                        <div
                          ref={text}
                          onCopy={() => setCopy(true)}
                          className={`font-semibold inline-block truncate max-w-[200px] align-middle`}
                        >
                          {dataAll?.player_number}
                        </div>
                        {copys ? (
                          <FaRegCheckCircle size={15} />
                        ) : (
                          <FaRegCopy
                            onClick={() => {
                              navigator.clipboard.writeText(
                                dataAll?.player_number
                              );
                              setCopy(true);
                            }}
                            size={15}
                            className="cursor-pointer "
                          />
                        )}
                      </div>
                    </Col>
                  )}
                  <Col>
                    <div className="flex gap-2 mb-2">
                      <div className="font-semibold text-Pink">Products :</div>
                      <div>{dataAll?.product_name}</div>
                    </div>
                  </Col>
                  {dataAll?.package_name &&
                    dataAll?.product_name !== dataAll?.package_name && (
                      <Col>
                        <div className="flex gap-2 mb-2">
                          <div className="font-semibold text-Pink">
                            Package name :
                          </div>
                          <div>{dataAll?.package_name}</div>
                        </div>
                      </Col>
                    )}
                  <Col>
                    <div className="flex gap-2 mb-2">
                      <div className="font-semibold text-Pink"> Quantity :</div>
                      <div>{dataAll?.quantity}</div>
                    </div>
                  </Col>
                  {dataAll?.details &&
                   <Col>
                   <div className="flex gap-2 mb-2">
                     <div className="font-semibold text-Pink"> Details :</div>
                     <div>{printOrderDetails(dataAll?.details)}</div>
                   </div>
                 </Col>
                  }

                  <Col>
                    <div className="flex gap-2 mb-2">
                      <div className="font-semibold text-Pink">
                        total Price :
                      </div>
                      <div>
                        <Currency
                          number={dataAll?.total_price}
                          currency={dataAll?.currency}
                        />
                      </div>
                    </div>

                  </Col>
                  <Col>
                    <div className="flex gap-2 mb-2">
                      <div className="font-semibold text-Pink">
                        Net Price :
                      </div>
                      <div>
                        <Currency
                          number={dataAll?.net}
                          currency={dataAll?.currency}
                        />
                      </div>
                    </div>
                    <div className="">
                      <ApiLogo data={dataAll?.automated} />
                    </div>
                  </Col>
                  {dataAll?.order_reference && (
                    <Col>
                      <div className="flex gap-2 mb-2">
                        <div className="font-semibold text-Pink">
                        Order Reference Id:
                        </div>
                        <div
                          ref={text}
                          onCopy={() => setCopy(true)}
                          className={`font-semibold`}
                        >
                          {dataAll?.order_reference}
                        </div>
                        {copys ? (
                          <FaRegCheckCircle size={15} />
                        ) : (
                          <FaRegCopy
                            onClick={() => {
                              navigator.clipboard.writeText(
                                dataAll?.order_reference
                              );
                              setCopy(true);
                            }}
                            size={15}
                            className="cursor-pointer "
                          />
                        )}
                      </div>
                    </Col>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Back />
    </section>
  );
};

export default Order;
