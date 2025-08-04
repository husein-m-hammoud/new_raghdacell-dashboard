import React from "react";
import { Link } from "react-router-dom";
import { fileUrl } from "../../APIs/useMyAPI";
import { Col, Row } from "../../Grid-system";
import Loading from "../../Tools/Loading";
import Pagination from "../../Tools/Pagination";
import { Back, Buttons, CardBox, ApiLogo } from "../../components";

const ViewProductOne = ({ id, dataAll, isLoading }) => {
  console.log("dataAll", dataAll);
  let requirements = [];
  if (dataAll?.requirements) {
    try {
      requirements = JSON.parse(dataAll?.requirements);
    } catch (error) {
      console.error("Invalid JSON:", error);
    }
  }
  const calculatePrice = (price = null, percentage = null) => {
    if (percentage <= 0 || percentage == undefined) {
      return price;
    }
    const newPrice = price * (1 + percentage / 100);
    return newPrice;
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Row justify="center">
        {isLoading ? <Loading /> : ""}
        <Col md={9}>
          <div className="border border-Pink rounded-2xl p-5">
            <Row justify="" className="items-center">
              <Col lg={6} className="hf">
                <img
                  src={fileUrl + dataAll?.images[0]?.image}
                  alt=""
                  className="rounded-2xl mx-auto "
                />
              </Col>
              <Col lg={6} className="space-y-5">
                <ApiLogo data={dataAll?.automated} />
                <div className="flex gap-2 ">
                  <div className="font-semibold text-Pink">English Name :</div>
                  <div>
                    {dataAll?.name?.en ? dataAll?.name?.en : "لايوجد بيانات"}
                  </div>
                </div>
                <div className="flex gap-2 ">
                  <div className="font-semibold text-Pink">Arabic Name : </div>
                  <div>
                    {dataAll?.name?.ar ? dataAll?.name?.ar : "لايوجد بيانات"}
                  </div>
                </div>
                <div className="flex gap-2 ">
                  <div className="font-semibold text-Pink">User Price: </div>
                  <div>{dataAll?.user_price}</div>$
                </div>
                <div className="flex gap-2 ">
                  <div className="font-semibold text-Pink">
                    User Price Will Be:{" "}
                  </div>
                  <div>
                    {calculatePrice(
                      dataAll?.user_price,
                      dataAll?.user_percentage
                    )}
                  </div>
                  $
                </div>
                <div className="flex gap-2 ">
                  <div className="font-semibold text-Pink">
                    User percentage:{" "}
                  </div>
                  <div>{dataAll?.user_percentage || 0}</div>%
                </div>
                <div className="flex gap-2 ">
                  <div className="font-semibold text-Pink">Company Price: </div>
                  <div>{dataAll?.company_price}</div>$
                </div>
                <div className="flex gap-2 ">
                  <div className="font-semibold text-Pink">
                    Company Price Will Be:{" "}
                  </div>
                  <div>
                    {calculatePrice(
                      dataAll?.company_price,
                      dataAll?.company_percentage
                    )}
                  </div>
                  $
                </div>
                <div className="flex gap-2 ">
                  <div className="font-semibold text-Pink">
                    Company percentage:{" "}
                  </div>
                  <div>{dataAll?.company_percentage || 0}</div>%
                </div>
                <div className="flex gap-2 ">
                  <div className="font-semibold text-Pink">
                    Minimum quantity :
                  </div>
                  <div>
                    {dataAll?.minimum_qut
                      ? dataAll?.minimum_qut
                      : "لايوجد بيانات"}
                  </div>
                </div>
                <div className="flex gap-2 ">
                  <div className="font-semibold text-Pink">
                    Maximum quantity :
                  </div>
                  <div>
                    {dataAll?.maximum_qut
                      ? dataAll?.maximum_qut
                      : "لايوجد بيانات"}
                  </div>
                </div>

                <div className="flex gap-2  ">
                  <div className="font-semibold text-Pink">Available:</div>
                  <div
                    className={
                      dataAll?.is_available ? "text-green-600" : "text-red-700"
                    }
                  >
                    {dataAll?.is_available ? "Yes" : "NO"}{" "}
                  </div>
                </div>
                <div className="flex gap-2  ">
                  <div className="font-semibold text-Pink">
                    Force Available:
                  </div>
                  <div
                    className={
                      dataAll?.force_unavailable
                        ? "text-red-700"
                        : "text-green-600"
                    }
                  >
                    {dataAll?.force_unavailable ? "NO" : "Yes"}{" "}
                  </div>
                </div>

                {requirements &&
                     <pre style={{ background: "#f4f4f4", padding: "10px", borderRadius: "5px" }}>
                     {JSON.stringify(requirements, null, 2)}
                   </pre>
                  }
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Back name="Edit" link={`/Products/Product-6/${id}`} />
    </>
  );
};

export default ViewProductOne;
