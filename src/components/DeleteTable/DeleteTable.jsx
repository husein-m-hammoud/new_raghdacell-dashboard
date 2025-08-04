import React, { useState } from "react";
import Delete from "../../images/delete (1).png";
import Buttons from "../Buttons/Buttons";
const DeleteTable = ({ deleteClick }) => {
  const [sure, setSure] = useState(false);
  return (
    <div>
      {sure && (
        <>
          <div
            onClick={() => setSure(false)}
            className={`fixed w-full h-full top-0 left-0 popup z-30 flex justify-center items-center`}
          ></div>
          <div className="bg-white z-40 fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-3xl w-[500px] max-w-[500px] min-h-[200px] ">
            <p className="font-semibold text-3xl text-center py-7">
              Are you sure to delete the item ?
            </p>
            <div className="flex items-end m-5 space-x-2">
              <Buttons
                onClick={deleteClick}
                name="Yes"
                className="py-3 px-16  hover:text-white  hover:bg-green-700"
              />
              <Buttons
                onClick={() => setSure(false)}
                name="Cancel"
                className="py-3 px-16  hover:text-white  hover:bg-red-700"
              />
            </div>
          </div>
        </>
      )}
      <img
        src={Delete}
        alt=""
        className=" cursor-pointer"
        onClick={() => setSure(true)}
      />
    </div>
  );
};

export default DeleteTable;
