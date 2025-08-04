import { useState } from "react";
import x from "../../images/X.png";
import Buttons from "./Buttons";
import { Col, Row } from "../../Grid-system";
import { usePOST } from "../../APIs/useMyAPI";
import Loading from "../../Tools/Loading";

const CancelBtn = ({ url }) => {
  const [sure, setSure] = useState(false);
  const { handleSubmit, loading, handleChangeInput } = usePOST({});

  const handleSubmitMain = (e) => {
    e.preventDefault();
    handleSubmit(url, "", true);
  };
  return (
    <>
      {loading ? <Loading /> : ""}
      <div className={` ${sure ? "" : "hidden"} `}>
        <div
          onClick={() => setSure(false)}
          className={` fixed w-full h-full top-0 left-0 popup z-30 `}
        ></div>
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
          <Row>
            <Col className="bg-white py-3 px-5 rounded-2xl m-1">
              <div className="text-2xl">Send a rejection note</div>
              <input
                placeholder="note..."
                type="text"
                name="refuse_reason"
                onChange={handleChangeInput}
                className="border  px-4 py-2 rounded-xl border-Pink"
              />
              <div className="flex gap-4 items-end m-5">
                <Buttons
                  onClick={handleSubmitMain}
                  name="Send"
                  className="py-3 px-16 border hover:text-white  hover:bg-green-700"
                />
                <Buttons
                  onClick={() => setSure(false)}
                  name="Cancel"
                  className="py-3 px-16 hover:text-white  hover:bg-red-700"
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div
        onClick={() => setSure(true)}
        className="w-[100px]  mx-auto mb-1 py-2 px-2 border-2 rounded-xl font-semibold border-Pink text-Pink flex gap-2 items-center bg-white cursor-pointer"
      >
        <span className="">Cancel</span>
        <span>
          <img src={x} alt="" width={12} />
        </span>
      </div>
    </>
  );
};

export default CancelBtn;
