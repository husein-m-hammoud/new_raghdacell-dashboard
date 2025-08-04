import React from "react";
import { Col, Row } from "../../Grid-system";
import { Back, Title } from "../../components";
import { useParams } from "react-router-dom";
import { fileUrl, useFETCH } from "../../APIs/useMyAPI";
import Loading from "../../Tools/Loading";
const ViewProductFour = () => {
  const { id } = useParams();
  const { data, isLoading, deleteItem } = useFETCH(`admin/products/${id}`);
  const dataAll = data?.data.data;
  console.log({dataAll});
 if(isLoading){
  return <Loading />
 }
  return (
    <>
      <Row justify="center">
        {isLoading ? <Loading /> : ""}
        <Col md={9}>
          <div className="border border-Pink rounded-2xl p-5">
            <Row justify="center" className="items-center">
              <Col lg={6}>
                <img
                  src={fileUrl + dataAll?.images[0]?.image}
                  alt=""
                  className="rounded-2xl mx-auto "
                />
              </Col>
              <Col lg={6}>
                <div className="flex gap-2 ">
                  <div className="font-semibold text-Pink">English Name :</div>
                  <div>{dataAll?.name.en}</div>
                </div>
                <div className="flex gap-2 ">
                  <div className="font-semibold text-Pink">Arabic Name :</div>
                  <div>{dataAll?.name.ar}</div>
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
            <Row>
              {dataAll?.additional_services.map((e, i) => (
                <Col lg={6} key={i} className="space-y-5">
                  <div className="border border-Pink rounded-2xl p-3">
                    <Title title={e.type} />

                    <div className="flex gap-2 ">
                      <div className="font-semibold text-Pink">User Price:</div>
                      <div>{e.user_price}</div>$
                    </div>
                    <div className="flex gap-2 ">
                      <div className="font-semibold text-Pink">
                        Company Price:
                      </div>
                      <div> {e.company_price} </div>$
                    </div>
                    <div className="flex gap-2 ">
                      <div className="font-semibold text-Pink">
                        English minimum note :
                      </div>
                      <div>
                        {e.minimum_qut_note.en
                          ? e.minimum_qut_note.en
                          : "لايوجد بيانات"}
                      </div>
                    </div>
                    <div className="flex gap-2 ">
                      <div className="font-semibold text-Pink">
                        Arabic minimum note :
                      </div>
                      <div>
                        {e.minimum_qut_note.ar
                          ? e.minimum_qut_note.ar
                          : "لايوجد بيانات"}
                      </div>
                    </div>
                    <div className="flex gap-2 ">
                      <div className="font-semibold text-Pink">
                        English Note:
                      </div>
                      <div>{e.note.en ? e.note.en : "لايوجد بيانات"} </div>
                    </div>
                    <div className="flex gap-2 ">
                      <div className="font-semibold text-Pink">
                        Arabic Note:
                      </div>
                      <div>{e.note.ar ? e.note.ar : "لايوجد بيانات"} </div>
                    </div>
                  </div>
                  
                </Col>
              ))}
              
            </Row>
          </div>
        </Col>
      </Row>
      <Back name="Edit" link={`/Products/Product-4/${id}`} />
    </>
  );
};

export default ViewProductFour;
