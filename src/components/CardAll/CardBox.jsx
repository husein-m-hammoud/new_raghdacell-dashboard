import Delete from "../../images/delete (1).png";
import Edit from "../../images/edit (2).png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import Buttons from "../Buttons/Buttons";
const CardBox = ({
  children,
  deleteClick,
  edit,
  className,
  showEdit,
  show,
  showDelete,
  onClick,
}) => {
  const [sure, setSure] = useState(false);

  return (
    <>
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
      <div
        className={`border-2 border-Purple rounded-2xl p-3 bgimg w-full h-full ${className}`}
      >
        <div className="flex justify-end gap-1 mb-1">
          <Link to={show || ""} className={`${show ? "" : "hidden"}`}>
            <div className=" w-10 h-10 rounded-full hover:bg-slate-200 flex cursor-pointer justify-center items-center">
              <BiShow size={25} className="text-green-700" />
            </div>
          </Link>
          <div
            className={`${
              showDelete
                ? "hidden"
                : "w-10 h-10 rounded-full hover:bg-slate-200 flex cursor-pointer justify-center items-center"
            }`}
          >
            <img
              src={Delete}
              alt=""
              className=" w-6"
              onClick={() => setSure(true)}
            />
          </div>
          {(edit || onClick) && (
            <div
              className={`${
                showEdit ? "hidden" : ""
              } w-10 h-10 rounded-full  flex justify-center items-center cursor-pointer hover:bg-slate-200`}
            >
              <Link onClick={onClick} to={edit || ""}>
                <img src={Edit} alt="" className="cursor-pointer w-6" />
              </Link>
            </div>
          )}
        </div>
        <div>{children}</div>
      </div>
    </>
  );
};

export default CardBox;
