import { useEffect, useState } from "react";

import { BiShow } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import {
  clickZoomInImage,
  fileUrl,
  useFETCH,
  useFilter,
} from "../../APIs/useMyAPI";
import { Col, Row } from "../../Grid-system";

import Pagination from "../../Tools/Pagination";
import {
  AcceptBtn,
  Buttons,
  CancelBtn,
  Currency,
  DeleteTable,
  FilterOrderStataus,
  FilterProcess,
  FilterSearch,
  AddChargingModal,
  Title,
} from "../../components";
import code from "../../images/istockphoto-1136155337-612x612.jpg";
import { CurrencyFilter } from "../Users/WalletUser";


const Requests = () => {
  const [showModal, setShowModal] = useState(false);

  const { handleParamsClick, searchParams } = useFilter();
  const { search } = useLocation();
  const { data, isLoading, deleteItem } = useFETCH(
    `admin/charging-processes${search}`,
    "admin/charging-processes"
  );

  return (
    <div>
      <Row className="" justify={"between"}>
        <Col md={4}>
          <Title title="Charging" />
        </Col>
        <Col md={6} className={"flex justify-end"}>
          <FilterSearch>
            <option value="">الكل</option>
            <option value="id">id</option>
            <option value="username"> اسم المستخدم</option>
            <option value="phone_number">رقم المستخدم</option>
          </FilterSearch>
        </Col>
      </Row>
      <FilterProcess />
      <FilterOrderStataus />
      <CurrencyFilter />
      <Pagination
        loading={isLoading}
        pageCount={Math.ceil(data?.data.data.total / data?.data.data.per_page)}
      >
        <Row>
          <Col>
            <div className=" ">
              <table className=" w-full  mx-auto my-5 text-center rounded-2xl overflow-hidden border-2 border-Pink">
                <thead className="bg-Pink text-white h-[70px]">
                  <tr>
                    <td>Notice</td>
                    <td>User</td>
                    <td>ID</td>
                    <td className="w-16">Value</td>
                    <td>Shipping Value</td>
                    <td className="max-md:hidden w-16">Process name</td>
                    <td className="max-md:hidden">Date</td>
                    <td>Order status</td>
                    <td className="">Actoin</td>
                  </tr>
                </thead>
                <tbody className="">
                  {data?.data.data.data.map((e, i) => (
                    <tr key={i} className="border border-Pink ">
                      <td>
                        <div className="w-[60px] h-[60px] mx-auto ">
                          <img
                            src={
                              e.name === "PROMO_CODE" ? code : fileUrl + e.image
                            }
                            alt=""
                            onClick={clickZoomInImage}
                            className="w-full h-full rounded-full cursor-pointer"
                          />
                        </div>
                      </td>
                      <td className="">
                        {e.username} <br />
                        {e.phone_number}
                      </td>
                      <td className="">{e.id}</td>
                      <td className="text-green-600 font-semibold py-7">
                        <Currency number={e.value} currency={e.currency} />
                      </td>
                      <td className="text-green-600 font-semibold py-7">
                        <Currency
                          number={e.shipping_value}
                          currency={e.currency}
                        />
                      </td>
                      <td className="text-green-600 font-semibold py-7 max-md:hidden">
                        {e.name}
                      </td>
                      <td className="max-md:hidden">
                        {e.date} <br />
                        {e.time}
                      </td>

                      <td
                        className={`${
                          e.status === "WAITING"
                            ? "text-blue-500"
                            : e.status === "COMPLETED"
                            ? "text-green-600"
                            : e.status === "CANCELED"
                            ? "text-red-600 "
                            : ""
                        }  font-semibold py-7`}
                      >
                        {e.status}
                        <br />
                        <span className="text-Pink">{e.refuse_reason}</span>
                      </td>
                      <td className="text-red-600 font-semibold ">
                        <div className="flex h-full justify-center gap-3 items-center">
                          {e.status === "WAITING" ? (
                            <div>
                              <CancelBtn
                                url={`admin/charging-processes/${e.id}/cancel`}
                              />
                              <AcceptBtn
                                url={`admin/charging-processes/${e.id}/approve`}
                              />
                            </div>
                          ) : (
                            <DeleteTable deleteClick={() => deleteItem(e)} />
                          )}

                          <Link to={`/Requests/${e.id}`}>
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
      <div
        onClick={() => setShowModal(true)}
        className={`flex z-10 active:-rotate-45  justify-center transition  fixed bottom-10 right-5 font-bold  text-5xl text-white cursor-pointer w-14 h-14 rounded-full bg-Purple`}
      >
        +
      </div>

      <AddChargingModal
        show={showModal}
        onClose={() => setShowModal(false)}
        type={"Charging"}
      />
    </div>
  );
};

export default Requests;
