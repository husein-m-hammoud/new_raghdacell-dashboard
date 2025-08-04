import React from "react";
import { Currency, Title } from "../../components";
import { Col, Row } from "../../Grid-system";
import { useClose, useFETCH, useFilter } from "../../APIs/useMyAPI";
import Loading from "../../Tools/Loading";
import { useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { CurrencyFilter } from "../Users/WalletUser";
import { DateTime } from 'luxon';

const Income = () => {
  const { handleParamsClick, searchParams, handleParamsDelete } = useFilter();
  const { search } = useLocation();
  const { data, isLoading } = useFETCH(`admin/income${search}`);
  let dataAll = data?.data.data;
  const { open, setOpen, mouse } = useClose();
  // const dey = `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
  //   .toString()
  //   .padStart(2, "0")}-${(new Date().getDate() - 1)
  //   .toString()
  //   .padStart(2, "0")} 00:00:00`;
  const now = DateTime.now();
  const dey = now.toFormat('yyyy-MM-dd')+' 00:00:00';

  const week = `${new Date().getFullYear()}-${(new Date().getDate() < 8
    ? new Date().getMonth()
    : new Date().getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${(new Date().getDate() < 8
    ? 30 - (7 - new Date().getDate())
    : new Date().getDate() - 7
  )
    .toString()
    .padStart(2, "0")} 00:00:00`;

  const month = `${new Date().getFullYear()}-${new Date()
    .getMonth()
    .toString()
    .padStart(2, "0")}-${new Date()
    .getDate()
    .toString()
    .padStart(2, "0")} 00:00:00`;
  return (
    <div>
      {isLoading ? <Loading /> : ""}
      <Title title="Income" />
      <Row className="" justify={"end"}>
        <Col lg={2}>
          <>
            <div ref={mouse} className="relative">
              <div
                className={`w-full bg-Purple rounded-xl flex justify-center gap-4 items-center py-3 px-2 text-white`}
                onClick={() => setOpen(!open)}
              >
                date
                <CiSearch size={20} />
              </div>

              <div
                className={`${
                  open
                    ? "absolute top-12 transition-all right-2 bg-Purple rounded-md text-center text-white  mt-1"
                    : "hidden"
                }`}
              >
                <Filter
                  onclick={() => {
                    handleParamsDelete("start_date");
                    handleParamsDelete("end_date");
                  }}
                  text="الكل"
                ></Filter>
                <Filter
                  classNameBut={
                    searchParams.get("start_date") === dey ? "bg-Pink" : ""
                  }
                  onclick={() => {
                    handleParamsClick("start_date", dey);
                    handleParamsDelete("end_date");
                  }}
                  text="اليوم"
                />
                <Filter
                  classNameBut={
                    searchParams.get("start_date") === week ? "bg-Pink" : ""
                  }
                  onclick={() => {
                    handleParamsClick("start_date", week);
                    handleParamsDelete("end_date");
                  }}
                  text="الاسبوع"
                />
                <Filter
                  classNameBut={
                    searchParams.get("start_date") === month ? "bg-Pink" : ""
                  }
                  onclick={() => {
                    handleParamsClick("start_date", month);
                    handleParamsDelete("end_date");
                  }}
                  text="الشهر"
                />
                <Filter
                  classNameBut={searchParams.get("end_date") ? "bg-Pink" : ""}
                  onclick={() => console.log()}
                  text="تاريخ محدد"
                >
                  <div
                    md={5}
                    className={`flex justify-end items-center flex-col gap-5 py-2 `}
                  >
                    <div className="border border-white p-2 rounded-xl relative flex items-center justify-center ">
                      <span className="absolute bg-Purple -top-3 px-2 left-3">
                        تاريخ البداية
                      </span>
                      <input
                        type="date"
                        className="bg-transparent text-white"
                        // value={searchParams.get("start_date")}
                        onChange={(e) => {
                          handleParamsClick(
                            "start_date",
                            e.target.value + " 00:00:00"
                          );
                        }}
                      />
                    </div>
                    <div className="border border-white p-2 rounded-xl relative flex items-center justify-center">
                      <span className="absolute -top-3 bg-Purple px-2 left-3">
                        تاريخ النهاية
                      </span>
                      <input
                        className="bg-transparent text-white"
                        type="date"
                        // value={searchParams.get("end_date")}
                        onChange={(e) => {
                          handleParamsClick(
                            "end_date",
                            e.target.value + " 00:00:00"
                          );
                        }}
                      />
                    </div>
                  </div>
                </Filter>
              </div>
            </div>
          </>
        </Col>
      </Row>
      <CurrencyFilter all={true} />
      <div className="w-1/2 h-[360px] max-sm:w-full mx-auto flex flex-col  bgimg border-2 border-Purple rounded-2xl p-10 ">
        <h1 className="text-2xl font-semibold mb-10">Total Income</h1>
        <div className="border border-Purple h-full rounded-2xl bg-white flex items-center justify-center">
          <h1 className="text-4xl">
            <Currency
              number={dataAll?.income}
              currency={searchParams.get("currency") === "LBP" ? "LBP" : "$"}
            />
          </h1>
        </div>
        <h1 className="text-2xl font-semibold mb-10">Total Portfolios </h1>
        <div className="border border-Purple h-full rounded-2xl bg-white flex items-center justify-center">
          <h1 className="text-4xl">
            <Currency
              number={dataAll?.total_wallets_balances}
              currency={searchParams.get("currency") === "LBP" ? "LBP" : "$"}
            />
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Income;

function Filter({ text, children, onclick, className, classNameBut }) {
  const { open, setOpen, mouse } = useClose();
  return (
    <div ref={mouse} className="cursor-pointer relative">
      <p
        onClick={() => {
          setOpen(!open);
          onclick();
        }}
        className={"w-32 py-2 " + classNameBut}
      >
        {text}
      </p>
      {children && (
        <div
          className={`${
            open
              ? `transition-all absolute right-32 max-sm:right-20 max-sm:top-8 top-3 bg-Purple rounded-md text-center space-y-2 py-2 px-5 text-white mt-1 z-50 ${className}`
              : "hidden"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
