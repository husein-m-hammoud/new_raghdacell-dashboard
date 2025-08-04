import { useState } from "react";
import reorder from "../../images/reload.png";
import { Col, Row } from "../../Grid-system";
import Buttons from "./Buttons";
import { usePOST } from "../../APIs/useMyAPI";
import Loading from "../../Tools/Loading";

const ReorderBtn = ({ url, acceptNote }) => {
  const [sure, setSure] = useState(false);
  const { handleSubmit, loading, handleChangeInput } = usePOST({});

  const handleSubmitMain = (e) => {
    e.preventDefault();
    handleSubmit(url, "", true);
  };

  return (
    <>
      {loading ? <Loading /> : ""}
  
      <div
         onClick={handleSubmitMain}
        className="w-[100px] mx-auto mb-1 py-2 px-2 border-2 rounded-xl font-semibold border-green-600 text-green-600 flex gap-2 items-center bg-white cursor-pointer"
      >
        <span className="">Reorder</span>
        <img src={reorder} alt="" width={15} />

       
      </div>
    </>
  );
};

export default ReorderBtn;
