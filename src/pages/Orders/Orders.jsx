import { Col, Row } from "../../Grid-system";
import {
  AcceptBtn,
  ReorderBtn,
  Buttons,
  CancelBtn,
  Currency,
  DeleteTable,
  FilterOrderStataus,
  FilterProducts,
  FilterSearch,
  Title,
  ApiLogo,
} from "../../components";
import { Link, useLocation } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import {
  fileUrl,
  useFETCH,
  useFilter,
  checkOrderStatus,
} from "../../APIs/useMyAPI";
import Pagination from "../../Tools/Pagination";
import { CurrencyFilter } from "../Users/WalletUser";
import React, { useEffect } from "react";

const Orders = () => {
  const { handleParamsClick, searchParams } = useFilter();

  const { search } = useLocation();
  const { data, isLoading, deleteItem, reCallUrl, prevUrl } = useFETCH(
    `admin/orders${search}`,
    "admin/orders"
  );
  console.log({ prevUrl });

  useEffect(() => {
    const fetchDataInterval = setInterval(async () => {
      try {
        // Call your asynchronous function here
        const data = await checkOrderStatus();
        if (prevUrl) {
          reCallUrl(prevUrl);
          console.log("reCallUrl");
        }
        console.log("not reCallUrl");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }, 30000); // 1 minutes in milliseconds

    // Clear the interval on component unmount to avoid memory leaks
    return () => clearInterval(fetchDataInterval);
  }, [prevUrl]); // Empty dependency array ensures useEffect runs only once

  return (
    <div>
      <Row className="" justify={"between"}>
        <Col md={4}>
          <Title title="Orders" />
        </Col>

        <Col md={6} className={"flex justify-end"}>
          <FilterSearch>
            <option value="">الكل</option>
            <option value="id">id</option>
            <option value="item_codes">code</option>
            <option value="player_number">رقم اللاعب</option>
          </FilterSearch>
        </Col>
      </Row>
      <FilterOrderStataus />
      <FilterProducts />
      <CurrencyFilter />
      <Pagination
        loading={isLoading}
        pageCount={Math.ceil(data?.data.data.total / data?.data.data.per_page)}
      >
        <Row>
          <Col>
            <div className=" ">
              <table className="w-full  mx-auto my-5 text-center rounded-2xl overflow-hidden border-2 border-Pink">
                <thead className="bg-Pink text-white h-[70px]">
                  <tr>
                    <td>products</td>
                    <td className="max-md:hidden">ID</td>
                    <td className="max-md:hidden">API</td>
                    <td className="max-md:hidden">Player Number</td>
                    <td className=" max-w-44">Order status</td>
                    <td className="max-md:hidden">Date</td>
                    <td className="max-md:hidden">Time</td>
                    <td>Price</td>
                    <td>Actoin</td>
                  </tr>
                </thead>
                <tbody className="">
                  {data?.data.data.data.map((e, i) => (
                    <tr key={i} className="border border-Pink ">
                      <td>
                        <div className="w-[60px] h-[60px] mx-auto ">
                          <img
                            src={fileUrl + e.product_image}
                            alt=""
                            className="w-full h-full rounded-full"
                          />
                        </div>
                      </td>
                      <td className="max-md:hidden">{e.id}</td>
                      <td className="max-md:hidden">
                        <ApiLogo data={e?.automated} className="w-6" />
                      </td>
                      <td className="max-md:hidden truncate max-w-[100px] overflow-hidden whitespace-nowrap">
                        {e.player_number || "__"}
                      </td>
                      <td
                        className={`${
                          e.status === "WAITING"
                            ? "text-blue-500"
                            : e.status === "COMPLETED"
                            ? "text-green-600"
                            : e.status === "CANCELED"
                            ? "text-red-600 "
                            : e.status === "FAILED"
                            ? "text-red-600 "
                            : ""
                        }  font-semibold py-7 max-w-40`}
                      >
                        {e.status}
                        <br />
                        <span className="text-Pink">
                          {e.status == "FAILED" && e?.error_response
                            ? e.error_response
                            : ""}
                        </span>
                        <span className="text-Pink">
                          {e.refuse_reason ? e.refuse_reason : ""}
                        </span>
                        <span className="text-Purple">
                          {e.accept_note ? e.accept_note : ""}
                        </span>
                      </td>
                      <td className="max-md:hidden">{e.date}</td>
                      <td className="max-md:hidden">{e.time}</td>
                      <td className="text-green-600 font-semibold  ">
                        <Currency
                          number={e.total_price}
                          currency={e.currency}
                        />
                      </td>
                      <td className="text-red-600 font-semibold ">
                        <div className="flex h-full justify-center gap-3 items-center">
                          {e.status === "FAILED" ? (
                            <div>
                              <AcceptBtn
                                url={`admin/orders/${e.id}?status=COMPLETED`}
                                acceptNote={true}
                              />
                              <ReorderBtn
                                url={`admin/automated/retry/order/${e.id}`}
                                acceptNote={true}
                              />
                              <CancelBtn
                                url={`admin/orders/${e.id}?status=CANCELED`}
                              />
                            </div>
                          ) : e.status === "WAITING" ? (
                            <div>
                              <CancelBtn
                                url={`admin/orders/${e.id}?status=CANCELED`}
                              />
                              <AcceptBtn
                                url={`admin/orders/${e.id}?status=COMPLETED`}
                                acceptNote={true}
                              />
                            </div>
                          ) : e.status === "COMPLETED" ? (
                            <div>
                              <CancelBtn
                                url={`admin/orders/${e.id}?status=CANCELED`}
                              />
                            </div>
                          ) : e.status === "CANCELED" ? (
                            <>
                              <div>
                                <AcceptBtn
                                  url={`admin/orders/${e.id}?status=COMPLETED`}
                                  acceptNote={true}
                                />
                              </div>

                              <DeleteTable deleteClick={() => deleteItem(e)} />
                            </>
                          ) : (
                            <DeleteTable deleteClick={() => deleteItem(e)} />
                          )}
                          <Link to={`/Orders/${e.id}`}>
                            <BiShow
                              className="mx-auto cursor-pointer"
                              size={25}
                            />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </Pagination>
    </div>
  );
};

export default Orders;
