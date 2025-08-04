import React from "react";

import { Col, Row } from "../../Grid-system";
import { clickZoomInImage, fileUrl, useFETCH } from "../../APIs/useMyAPI";
import { useParams } from "react-router-dom";
import Loading from "../../Tools/Loading";
import Back from "../../components/Buttons/Back";
import { Currency } from "../../components";

const ShippingPayments2 = () => {
  const { id } = useParams();
  const { data, isLoading } = useFETCH(`admin/charging-processes/${id}`);
  let dataAll = data?.data.data;
  return (
    <section className="py-4">
      {isLoading ? <Loading /> : ""}
      <div>
        <Row justify="center">
          <Col
            className="border border-Pink rounded-2xl p-5 flex items-center justify-center max-md:flex-col gap-10"
            lg={12}
          >
            <div className="w-1/2 max-md:w-full ">
              <img
                src={fileUrl + dataAll?.image}
                onClick={clickZoomInImage}
                alt=""
                className="rounded-2xl h-full mx-auto cursor-pointer "
              />
            </div>
            <div className="w-1/2  max-md:w-full">
              <div className="flex gap-2 mb-2">
                <div className="font-semibold text-Pink">User Name : </div>
                <div>{dataAll?.username}</div>
              </div>
              <div className="flex gap-2 mb-2">
                <div className="font-semibold text-Pink">Phone : </div>
                <div>{dataAll?.phone_number}</div>
              </div>
              <div className="flex gap-2 mb-2">
                <div className="font-semibold text-Pink">Value : </div>
                <div>
                  <Currency
                    number={dataAll?.value}
                    currency={dataAll?.currency}
                  />
                </div>
              </div>
              <div className="flex gap-2 mb-2">
                <div className="font-semibold text-Pink">Shipping Value : </div>
                <div>
                  <Currency
                    number={dataAll?.shipping_value}
                    currency={dataAll?.currency}
                  />
                </div>
              </div>
              <div className="flex gap-2 mb-2">
                <div className="font-semibold text-Pink">Date : </div>
                <div>{dataAll?.date}</div>
              </div>
              <div className="flex gap-2 mb-2">
                <div className="font-semibold text-Pink">Time : </div>
                <div>{dataAll?.time}</div>
              </div>
              <div className="flex gap-2 mb-2">
                <div className="font-semibold text-Pink">Order status:</div>
                <div
                  className={`${
                    dataAll?.status === "WAITING"
                      ? "text-blue-500"
                      : dataAll?.status === "COMPLETED"
                      ? "text-green-600"
                      : dataAll?.status === "CANCELED"
                      ? "text-red-600 "
                      : ""
                  } font-semibold`}
                >
                  {dataAll?.status}
                </div>
              </div>
              {dataAll?.refuse_reason && (
                <div className="flex gap-2 mb-2">
                  <div className="font-semibold text-Pink">Refuse Reason:</div>
                  <div className={` text-red-600 font-semibold`}>
                    {dataAll?.refuse_reason}
                  </div>
                </div>
              )}
              <div className="flex gap-2 mb-2">
                <div className="font-semibold text-Pink">Process name:</div>
                <div className=" font-semibold">{dataAll?.name}</div>
              </div>
              {dataAll?.walletPayment && (
                <div className="grid gap-2 mb-2 mt-5">
                  <div className="flex gap-2">
                    <div className="font-semibold text-Pink">Network:</div>
                    <div>{dataAll?.walletPayment.network}</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="font-semibold text-Pink">
                      Unique amount:
                    </div>
                    <div>{dataAll?.walletPayment.unique_amount}</div>
                  </div>

                  <div className="flex gap-2">
                    <div className="font-semibold text-Pink">
                      Wallet address:
                    </div>
                    <div>{dataAll?.walletPayment.wallet_address}</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="font-semibold text-Pink">From address:</div>
                    <div>{dataAll?.walletPayment?.from_address}</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="font-semibold text-Pink">tx_hash:</div>
                    <div>{dataAll?.walletPayment.tx_hash}</div>
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
      <Back />
    </section>
  );
};

export default ShippingPayments2;
