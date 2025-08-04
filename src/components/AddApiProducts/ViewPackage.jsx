import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { fileUrl, fetchData } from "../../APIs/useMyAPI";
import { Col, Row } from "../../Grid-system";
import Loading from "../../Tools/Loading";
import Pagination from "../../Tools/Pagination";
import { Back, Buttons, CardBox, ApiLogo } from "../../components";
import { useContextHook } from "../../Context/ContextOPen";


const ViewPackage = ({ id, dataAll, dataPackages, deleteItem, isLoading }) => {
  
  const { setMessage } = useContextHook();
  const [loading, setLoading] = useState(false);

  const calculatePrice = (price = null, percentage = null) => {
    if (percentage <= 0 || percentage == undefined) {
      return price;
    }
    const newPrice = price * (1 + percentage / 100);
    return newPrice;
  };

  const updateProductFromAPI = async (id) => {
    setLoading(true);
    try {
    const fetchedData = await fetchData(
      `admin/automated/update-product/${id}`,
      null,
      "GET"
    ).then((response) =>{ 
      setMessage(response.message?.message || response.message);
      setLoading(false);
    });
    } catch (error) {
      setLoading(false);
      console.error(error);
    }

  }

  return (
    <>
      <Row justify="center">
        {isLoading || loading ? <Loading /> : ""}
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
                <ApiLogo data={dataAll?.automated} />
                <div className="flex gap-2 ">
                  <div className="font-semibold text-Pink">English Name :</div>
                  <div>{dataAll?.name.en}</div>
                </div>
                <div className="flex gap-2 ">
                  <div className="font-semibold text-Pink">Arabic Name :</div>
                  <div>{dataAll?.name.ar}</div>
                </div>
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
                <div className="mt-6">
                 
                 <Buttons
                   name="Update Packages"
                   className="bg-green-600 text-white w-fit ml-auto mr-4 -mt-4 mb-2 px-3"
                   onClick={() => updateProductFromAPI(id)}
                 />
               
             </div>
              </Col>
            </Row>

            <Pagination
              loading={isLoading}
              pageCount={Math.ceil(
                dataPackages?.data.data.total / dataPackages?.data.data.per_page
              )}
            >
              <Row className="items-center">
                {dataPackages?.data.data.data.map((e, i) => (
                  <Col key={i} md={6}>
                    <CardBox
                      deleteClick={() => deleteItem(e)}
                      edit={`/Products/Product-6/package/${id}/${e.id}`}
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
                        <div>{e.user_price}</div>$
                      </div>

                      <div className="flex gap-2 ">
                        <div className="font-semibold text-Pink">
                          User percentage:
                        </div>
                        <div>{e.user_percentage}</div>%
                      </div>
                      <div className="flex gap-2 ">
                        <div className="font-semibold text-Pink">
                          User Price Will Be:
                        </div>
                        <div>
                          {calculatePrice(e.user_price, e.user_percentage)}
                        </div>
                        $
                      </div>

                      <div className="flex gap-2 ">
                        <div className="font-semibold text-Pink">
                          Company Price:
                        </div>
                        <div>{e.company_price} </div>$
                      </div>
                      <div className="flex gap-2 ">
                        <div className="font-semibold text-Pink">
                          Company percentage:
                        </div>
                        <div>{e.company_percentage} </div>%
                      </div>
                      <div className="flex gap-2 ">
                        <div className="font-semibold text-Pink">
                          Company Price Will Be:
                        </div>
                        <div>
                          {calculatePrice(
                            e.company_price,
                            e.company_percentage
                          )}
                        </div>
                        $
                      </div>
                      <div className="flex gap-2 ">
                        <div className="font-semibold text-Pink">
                          Minimum quantity :
                        </div>
                        <div>
                          {e?.minimum_qut ? e?.minimum_qut : "لايوجد بيانات"}
                        </div>
                      </div>
                      <div className="flex gap-2 ">
                        <div className="font-semibold text-Pink">
                          Maximum quantity :
                        </div>
                        <div>
                          {e?.maximum_qut ? e?.maximum_qut : "لايوجد بيانات"}
                        </div>
                      </div>
                      <div className="flex gap-2 ">
                        <div className="font-semibold text-Pink">
                          Order :
                        </div>
                        <div>
                          {e?.p_order}
                        </div>
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

                      {e?.requirements &&
                     <pre style={{ background: "#f4f4f4", padding: "10px", borderRadius: "5px" }}>
                     {JSON.stringify(JSON.parse(e?.requirements), null, 2)}
                   </pre>
                  }
                    </CardBox>
                  </Col>
                ))}
              </Row>
            </Pagination>
          </div>
        </Col>
      </Row>
      <Back name="Edit" link={`/Products/Product-6/${id}`} />
    </>
  );
};

export default ViewPackage;
