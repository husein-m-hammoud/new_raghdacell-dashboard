import { Col, Row } from "../../Grid-system";
import { Balance, Buttons, Currency, Title } from "../../components";
import impo from "../../images/Group 20.png";
import expo from "../../images/Group.png";
import { Link, useLocation, useParams } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import { useFETCH, useFilter } from "../../APIs/useMyAPI";
import Pagination from "../../Tools/Pagination";
import Loading from "../../Tools/Loading";

const WalletUser = () => {
  const { id } = useParams();
  const { handleParamsClick, searchParams, handleParamsDeleteAll } =
    useFilter();
  const { search } = useLocation();
  const { data, isLoading } = useFETCH(
    `admin/payment-logs?user_id=${id}${search ? "&" + search.substring(1) : ""}`
  );
  const { data: user } = useFETCH(`admin/users/${id}`);
  return (
    <div>
      {isLoading ? <Loading /> : ""}
      <Row className="">
        <Col md={6}>
          <Title title="Wallet-User" />
          <div className="flex gap-2 ">
            <div className="font-semibold text-Pink">User Name : </div>
            <div>{user?.data.data.username}</div>
          </div>
        </Col>
      </Row>
      <Balance
        id={id}
        current={
          <Currency
            number={data?.data.user.current_balance}
            currency={data?.data.user.currency}
          />
        }
        shipping={
          <Currency
            number={data?.data.user.total_shipped}
            currency={data?.data.user.currency}
          />
        }
        total={
          <Currency
            number={data?.data.user.total_spent}
            currency={data?.data.user.currency}
          />
        }
      />
      <Row>
        <Col sm={6} lg={2}>
          <Buttons
            onClick={() => handleParamsDeleteAll()}
            className={!search ? "bg-Pink text-white" : ""}
            name="All"
          />
        </Col>
        <Col sm={6} lg={2}>
          <Buttons
            onClick={() => handleParamsClick("status", "Discounted")}
            className={`${
              searchParams.get("status") === "Discounted"
                ? "bg-Pink text-white"
                : ""
            } `}
            name="Exports"
          />
        </Col>
        <Col sm={6} lg={2}>
          <Buttons
            onClick={() => handleParamsClick("status", "Charged")}
            className={`${
              searchParams.get("status") === "Charged"
                ? "bg-Pink text-white"
                : ""
            } `}
            name="Imports"
          />
        </Col>
      </Row>
      <CurrencyFilter all={true} />
      <Pagination
        pageCount={Math.ceil(data?.data.data.total / data?.data.data.per_page)}
      >
        <div className="">
          <table className="w-full  mx-auto my-5 text-center rounded-2xl overflow-hidden border-2 border-Pink">
            <thead className="bg-Pink text-white h-[70px]">
              <tr>
                <td className="">Event</td>
                <td className="max-md:hidden">Order Status</td>
                <td className="max-md:hidden">Process Name</td>
                <td className="max-md:hidden">Date</td>
                <td className="max-md:hidden">Time</td>
                <td>Previous Value</td>
                <td>Value</td>
                <td>Crrent Value</td>
                <td className="">Actoin</td>
              </tr>
            </thead>
            {data?.data.data.data.map((e, i) => (
              <tbody key={i} className="">
                <tr className="border border-Pink ">
                  <td>
                    <div className="w-[60px] h-[60px] mx-auto ">
                      {e.status === "Discounted" ? (
                        <img
                          src={expo}
                          alt=""
                          className="w-full h-full rounded-full"
                        />
                      ) : (
                        <img
                          src={impo}
                          alt=""
                          className="w-full h-full rounded-full"
                        />
                      )}
                    </div>
                  </td>
                  <td
                    className={`${
                      e.status === "Discounted"
                        ? "text-red-600"
                        : "text-green-600"
                    } font-semibold py-7 max-md:hidden`}
                  >
                    {e.status}
                  </td>
                  <td className="text-green-600 font-semibold py-7 max-md:hidden">
                    {e.name}
                  </td>
                  <td className="max-md:hidden">{e.date}</td>
                  <td className="max-md:hidden">{e.time}</td>
                  <td className="text-xl line-through text-Pink">
                    <Currency
                      number={e.previous_balance}
                      currency={data?.data.user.currency}
                    />
                  </td>
                  <td className="text-xl">
                    <Currency
                      number={e.value}
                      currency={data?.data.user.currency}
                    />
                  </td>
                  <td className="text-xl  text-green-600">
                    <Currency
                      number={e.current_balance}
                      currency={data?.data.user.currency}
                    />
                  </td>
                  <td className="text-red-600 font-semibold ">
                    <Link to={`/users/Wallet-user/show/${e.id}`}>
                      <BiShow className="mx-auto cursor-pointer" size={25} />
                    </Link>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </Pagination>
    </div>
  );
};

export default WalletUser;

export const CurrencyFilter = ({ all }) => {
  const { handleParamsClick, searchParams, handleParamsDelete } = useFilter();
  return (
    <Row>
      {!all && (
        <Col sm={6} lg={2}>
          <Buttons
            onClick={() => handleParamsDelete("currency")}
            className={`${
              !searchParams.get("currency") ? "bg-Pink text-white" : ""
            } `}
            name="All"
          />
        </Col>
      )}

      <Col sm={6} lg={2}>
        <Buttons
          onClick={() => handleParamsClick("currency", "USD")}
          className={`${
            searchParams.get("currency") === "USD" ? "bg-Pink text-white" : ""
          } `}
          name="USD"
        />
      </Col>
      <Col sm={6} lg={2}>
        <Buttons
          onClick={() => handleParamsClick("currency", "LBP")}
          className={`${
            searchParams.get("currency") === "LBP" ? "bg-Pink text-white" : ""
          } `}
          name="LBP"
        />
      </Col>
    </Row>
  );
};
