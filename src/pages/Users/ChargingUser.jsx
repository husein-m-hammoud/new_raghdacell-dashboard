import { BiShow } from "react-icons/bi";
import { Link, useLocation, useParams } from "react-router-dom";
import { fileUrl, useFETCH } from "../../APIs/useMyAPI";
import { Col, Row } from "../../Grid-system";
import Pagination from "../../Tools/Pagination";
import {
  AcceptBtn,
  CancelBtn,
  DeleteTable,
  FilterOrderStataus,
  FilterProcess,
  FilterSearch,
  Title,
} from "../../components";
const ChargingUser = () => {
  const { search } = useLocation();
  const { id } = useParams();
  const { data, isLoading, deleteItem } = useFETCH(
    `admin/charging-processes?user_id=${id}${
      search ? "&" + search.substring(1) : ""
    }`,
    "admin/charging-processes"
  );
  const { data: user } = useFETCH(`admin/users/${id}`);
  return (
    <div>
      <Row className="items-center">
        <Col md={6}>
          <Title title="Charging-User" />
          <div className="flex gap-2 ">
            <div className="font-semibold text-Pink">User Name : </div>
            <div>{user?.data.data.username}</div>
          </div>
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
                    <td>ID</td>
                    <td>Value</td>
                    <td>Shipping Value</td>
                    <td className="max-md:hidden">Process name</td>
                    <td className="max-md:hidden">Date</td>
                    <td className="max-md:hidden">Time</td>
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
                            src={fileUrl + e.image}
                            alt=""
                            className="w-full h-full rounded-full"
                          />
                        </div>
                      </td>
                      <td className="">{e.id}</td>
                      <td className="text-green-600 font-semibold py-7">
                        {e.value}
                      </td>{" "}
                      <td className="text-green-600 font-semibold py-7">
                        {e.shipping_value}
                      </td>
                      <td className="text-green-600 font-semibold py-7 max-md:hidden">
                        {e.name}
                      </td>
                      <td className="max-md:hidden">{e.date}</td>
                      <td className="max-md:hidden">{e.time}</td>
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
    </div>
  );
};

export default ChargingUser;
