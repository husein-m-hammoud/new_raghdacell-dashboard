import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { fileUrl, useFETCH } from "../../APIs/useMyAPI";
import { Col, Row } from "../../Grid-system";
import Loading from "../../Tools/Loading";
import Pagination from "../../Tools/Pagination";
import { Back, Buttons, CardBox } from "../../components";

const ViewProductOne = () => {
  const { search } = useLocation();
  const { id } = useParams();
  const { data, isLoading } = useFETCH(`admin/products/${id}`);
  const { data: dataPackages, deleteItem } = useFETCH(
    `admin/products/${id}/packages${search}`,
    "admin/products/packages"
  );
  const dataAll = data?.data.data;
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
            <Link to={`/Products/Product-1/package/${id}/add`}>
              <Buttons
                name="Add Package"
                className="bg-green-600 text-white w-fit ml-auto mr-4 -mt-4 mb-2 px-3"
              />
            </Link>
            <div className="mt-6">
            <Link to={`/products/merge/${id}`}>
              <Buttons
                name="Add Merge counter"
                className="bg-green-600 text-white w-fit ml-auto mr-4 -mt-4 mb-2 px-3"
              />
            </Link>
            </div>
            <div className="mt-6">
            <Link to={`/products/merge/${id}/pk`}>
              <Buttons
                name="Add Merge Package"
                className="bg-green-600 text-white w-fit ml-auto mr-4 -mt-4 mb-2 px-3"
              />
            </Link>
            </div>
           
            <Pagination
              loading={isLoading}
              pageCount={Math.ceil(
                dataPackages?.data.data.total / dataPackages?.data.data.per_page
              )}
            >
              <Row className="items-center">
                {dataPackages?.data.data.data.map((e, i) => (
                  <Col key={i} lg={4}>
                    <CardBox
                      deleteClick={() => deleteItem(e)}
                      edit={`/Products/Product-1/package/${id}/${e.id}`}
                    >
                      <div className="flex gap-2 ">
                        <div className="font-semibold text-Pink">
                          English Title :
                        </div>
                        <div>{e.name.en}</div>
                      </div>
                      <div className="flex gap-2 ">
                        <div className="font-semibold text-Pink">
                          Arabic Title :
                        </div>
                        <div>{e.name.ar}</div>
                      </div>
                      <div className="flex gap-2 ">
                        <div className="font-semibold text-Pink">
                          User Price:
                        </div>
                        <div>{e.user_price}</div>
                      </div>
                      <div className="flex gap-2 ">
                        <div className="font-semibold text-Pink">
                          Company Price:
                        </div>
                        <div>{e.company_price} </div>
                      </div>
                      <div className="flex gap-2 ">
                        <div className="font-semibold text-Pink">
                          Order:
                        </div>
                        <div>{e?.p_order}</div>
                      </div>
                      <div className="flex gap-2 ">
                        <div className="font-semibold text-Pink">
                        link_id:
                        </div>
                        <div>{e?.link_id}</div>
                      </div>
                      <div className="flex gap-2  ">
                        <div className="font-semibold text-Pink">
                          Available:
                        </div>
                        <div
                          className={
                            e?.is_available ? "text-green-600" : "text-red-700"
                          }
                        >
                          {e?.is_available ? "Yes" : "NO"}{" "}
                        </div>
                      </div>
                      <div className="flex gap-2  ">
                        <div className="font-semibold text-Pink">
                          Force Available:
                        </div>
                        <div
                          className={
                            e?.force_unavailable
                              ? "text-red-700"
                              : "text-green-600"
                          }
                        >
                          {e?.force_unavailable ? "NO" : "Yes"}{" "}
                        </div>
                      </div>
                    </CardBox>
                  </Col>
                ))}
              </Row>
            </Pagination>
          </div>
        </Col>
      </Row>
      <Back name="Edit" link={`/Products/Product-1/${id}`} />
    </>
  );
};

export default ViewProductOne;
