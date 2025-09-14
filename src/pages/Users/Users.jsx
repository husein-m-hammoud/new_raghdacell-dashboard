import React, { useState } from "react";
import { Add, ButtonRed, Buttons, CardBox, Title, Currency } from "../../components";
import { Col, Row } from "../../Grid-system";
import { useFETCH, useFilter, fetchData } from "../../APIs/useMyAPI";
import Loading from "../../Tools/Loading";
import Pagination from "../../Tools/Pagination";
import { Link, useLocation } from "react-router-dom";
import { FaTh, FaThList } from "react-icons/fa";
import DataTable from "react-data-table-component";

const Users = () => {
  const [viewType, setViewType] = useState("grid");
  const { handleParamsClick, searchParams, handleParamsDeleteAll } =
    useFilter();
  const { search } = useLocation();
  const { data, isLoading, deleteItem, reCallUrl } = useFETCH(
    `admin/users${search}`,
    "admin/users"
  );
  const { data: AllUsers } = useFETCH(`admin/users/all-users`);
  const updateLockStatus = async (user_id) => {
    const fetchedData = await fetchData(`admin/users/${user_id}/toggle-lock`);
    console.log({ fetchedData });
    if (fetchedData?.message) {
      reCallUrl(`admin/users${search}`);
    }
  };
  const lockAllUsers = async () => {
    const fetchedData = await fetchData(`admin/users/lock-all`);
    console.log({ fetchedData });
    if (fetchedData?.message) {
      reCallUrl(`admin/users${search}`);
    }
  };

  const unlockAllUsers = async () => {
    const fetchedData = await fetchData(`admin/users/unlock-all`);
    console.log({ fetchedData });
    if (fetchedData?.message) {
      reCallUrl(`admin/users${search}`);
    }
  };

  const columns = [
    {
      name: "User Name",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone_number,
      sortable: true,
    },
    {
      name: "Balance (USD)",
      selector: (row) => row.balance,
      sortable: true,
      format: (row) => <Currency number={row.balance} currency={"$"} />,
    },

    {
      name: "Balance (LBP)",
      selector: (row) => row.lbp_balance,
      sortable: true,
      format: (row) => <Currency number={row.lbp_balance} currency={"LBP"} />,
    }
  ];

  console.log("data: ", data?.data?.data);

  return (
    <div>
      <Row className="" justify={"between"}>
        <Col md={4}>
          <div className="flex justify-between">
            <Title title="Users" />
            <Buttons
              onClick={() => lockAllUsers()}
              className="bg-Pink text-white px-4"
              name="Lock All"
            />
            <Buttons
              onClick={() => unlockAllUsers()}
              className="bg-Pink text-white px-4"
              name="Unlock All"
            />
          </div>
        </Col>
        <Col md={6} className={"flex justify-end"}>
          <div className="flex flex-wrap gap-3">
            <div className="border border-Pink flex space-x-2 p-2 rounded-xl">
              <span>
                <img src={search} alt="" />
              </span>
              <input
                placeholder="Search"
                type="search"
                value={searchParams.get("search")}
                onChange={(e) => handleParamsClick("search", e.target.value)}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row>

        <Col className="self-center" sm={12} lg={12}>
          {"grid" === viewType ? (
            <FaTh
              className="text-Pink float-right cursor-pointer"
              size={24}
              onClick={() => setViewType("table")}
            />
          ) : (
            <FaThList
              className="text-Pink float-right cursor-pointer"
              size={24}
              onClick={() => setViewType("grid")}
            />
          )}
        </Col>
      </Row>
      {isLoading ? <Loading /> : ""}

      {"grid" === viewType ? (
        <Pagination
          pageCount={Math.ceil(
            data?.data.data.total / data?.data.data.per_page
          )}
        >
          <Row className={"pt-5"}>
            {data?.data.data.data.map((e, i) => (
              <Col lg={4} key={i} md={6} className="mb-2">
                <CardBox
                  className={"relative"}
                  edit={`/users/${e.id}`}
                  deleteClick={() => deleteItem(e)}
                >
                  <div className="flex justify-start gap-2 mb-2">
                    <div className="font-semibold text-Pink">User Name : </div>
                    <div>{e.username}</div>
                  </div>
                  <div className="flex justify-start gap-2 mb-2">
                    <div className="font-semibold text-Pink">E-mail :</div>
                    <div>{e.email}</div>
                  </div>
                  <div className="flex justify-start gap-2 mb-2">
                    <div className="font-semibold text-Pink">Phone :</div>
                    <div>{e.phone_number}</div>
                  </div>
               
                  <Row className=" pt-3">
                    <Col col={6}>
                      <ButtonRed
                        className="py-2"
                        link={`/users/Orders-user/${e.id}`}
                        name="Orders"
                      />
                    </Col>
                    <Col col={6}>
                      <ButtonRed
                        className="py-2"
                        link={`/users/Wallet-user/${e.id}?currency=USD`}
                        name="Wallet"
                      />
                    </Col>
                    <Col col={6}>
                      <ButtonRed
                        className="py-2"
                        link={`/users/Charging-user/${e.id}`}
                        name="Charging"
                      />
                    </Col>
                    <Col col={6}>
                      <ButtonRed
                        className="py-2"
                        onClick={() => updateLockStatus(e.id)}
                        name={e.lock == 1 ? "Unlock" : "Lock"}
                      />
                    </Col>
                  </Row>
                </CardBox>
              </Col>
            ))}
          </Row>
        </Pagination>
      ) : (
        <DataTable
          columns={columns}
          data={AllUsers?.data?.data}
          pagination={false}
          highlightOnHover
          striped
        />
      )}

      <Link to="/users/add">
        <Add />
      </Link>
    </div>
  );
};

export default Users;
