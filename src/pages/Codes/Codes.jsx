import React from "react";
import { Add, Buttons, CardBox, Currency, Title } from "../../components";
import { Col, Row } from "../../Grid-system";
import { Link, useLocation } from "react-router-dom";
import { useFETCH, useFilter } from "../../APIs/useMyAPI";
import Pagination from "../../Tools/Pagination";

const Codes = () => {
  const { handleParamsClick, searchParams, handleParamsDeleteAll } =
    useFilter();
  const { search } = useLocation();
  const { data, isLoading, deleteItem } = useFETCH(
    `admin/promo-codes${search}`,
    "admin/promo-codes"
  );
  return (
    <div>
      <Row className="" justify={"between"}>
        <Col md={4}>
          <Title title="Codes" />
        </Col>
      </Row>
      <Row>
        <Col sm={6} lg={2}>
          <Buttons
            onClick={() => handleParamsDeleteAll("")}
            className={search ? "" : "bg-Pink text-white"}
            name="All"
          />
        </Col>
        <Col sm={6} lg={2}>
          <Buttons
            onClick={() => {
              handleParamsClick("finished", "1");
            }}
            className={` ${
              searchParams.get("finished") === "1" ? "bg-Pink text-white" : ""
            } `}
            name="Finished"
          />
        </Col>
        <Col sm={6} lg={2}>
          <Buttons
            onClick={() => {
              handleParamsClick("finished", "0");
            }}
            className={` ${
              searchParams.get("finished") === "0" ? "bg-Pink text-white" : ""
            }`}
            name="Not Finished"
          />
        </Col>
      </Row>
      <Row>
        <Col sm={6} lg={2}></Col>
        <Col sm={6} lg={2}>
          <Buttons
            onClick={() => handleParamsClick("used", "1")}
            className={` ${
              searchParams.get("used") === "1" ? "bg-Pink text-white" : ""
            } `}
            name="Used"
          />
        </Col>
        <Col sm={6} lg={2}>
          <Buttons
            onClick={() => handleParamsClick("used", "0")}
            className={` ${
              searchParams.get("used") === "0" ? "bg-Pink text-white" : ""
            } `}
            name="Not used"
          />
        </Col>
      </Row>
      <Pagination
        loading={isLoading}
        pageCount={Math.ceil(data?.data.data.total / data?.data.data.per_page)}
      >
        <Row>
          {data?.data.data.data.map((e, i) => (
            <Col lg={3} xs={6} key={i}>
              <CardBox
                deleteClick={() => deleteItem(e)}
                edit={`/codes/${e.id}`}
              >
                <div className="flex gap-2 mb-2">
                  <div className="font-semibold text-Pink">code : </div>
                  <div>{e.code}</div>
                </div>
                <div className="flex gap-2 mb-2">
                  <div className="font-semibold text-Pink">value : </div>
                  <div>
                    <Currency number={e.value} currency={e.currency} />
                  </div>
                </div>
                <div className="flex gap-2 mb-2">
                  <div className="font-semibold text-Pink">Expiry date : </div>
                  <div>{e.expiry_date}</div>
                </div>
                <div className="flex gap-2 mb-2">
                  <div className="font-semibold text-Pink">
                    number of uses :{" "}
                  </div>
                  <div>{e.number_of_uses}</div>
                </div>
                <div className="flex gap-2 mb-2">
                  <div className="font-semibold text-Pink">
                    number of used :{" "}
                  </div>
                  <div>{e.number_of_used}</div>
                </div>
              </CardBox>
            </Col>
          ))}
        </Row>
      </Pagination>
      <Link to="/codes/add">
        <Add />
      </Link>
    </div>
  );
};

export default Codes;
