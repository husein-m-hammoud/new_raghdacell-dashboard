import React from "react";
import { Col, Row } from "../../Grid-system";
import { Back } from "../../components";
import { useParams } from "react-router-dom";
import { fileUrl, useFETCH } from "../../APIs/useMyAPI";
import Loading from "../../Tools/Loading";
const ViewProductTwo = () => {
  const { id } = useParams();
  const { data, isLoading } = useFETCH(`admin/products/${id}`);
  const dataAll = data?.data.data;
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
                  <div className="font-semibold text-Pink">Company Price: </div>
                  <div>{dataAll?.company_price}</div>$
                </div>
                <div className="flex gap-2 ">
                  <div className="font-semibold text-Pink">
                    English minimum note :
                  </div>
                  <div>
                    {dataAll?.minimum_qut_note?.en
                      ? dataAll?.minimum_qut_note?.en
                      : "لايوجد بيانات"}
                  </div>
                </div>
                <div className="flex gap-2 ">
                  <div className="font-semibold text-Pink">
                    Arabic minimum note :
                  </div>
                  <div>
                    {dataAll?.minimum_qut_note?.ar
                      ? dataAll?.minimum_qut_note?.ar
                      : "لايوجد بيانات"}
                  </div>
                </div>
                <div className="flex gap-2  ">
                  <div className="font-semibold text-Pink">Available:</div>
                  <div
                    className={
                      dataAll?.available ? "text-green-600" : "text-red-700"
                    }
                  >
                    {dataAll?.available ? "Yes" : "NO"}{" "}
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
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Back name="Edit" link={`/Products/Product-2/${id}`} />
    </>
  );
};

export default ViewProductTwo;
