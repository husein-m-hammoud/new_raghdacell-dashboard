import { BiMenu } from "react-icons/bi";
import Logo from "../../images/logo.png";
import { useContextHook } from "../../Context/ContextOPen";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ButtonRed from "../Buttons/ButtonRed";
import { logout, usePOST, useFETCH } from "../../APIs/useMyAPI";

const Navbar = () => {
  const { changeMenu } = useContextHook();
  const [adminInfo, setAdminInfo] = useState({});
  const { handleSubmit, setMessage } = usePOST({});
  const [sure, setSure] = useState(false);

  const { data: dataInfoAdmin } = useFETCH(
    window.localStorage.getItem("token") ? `admin/admin-info` : ""
  );

  useEffect(() => {
    if (dataInfoAdmin?.data?.data) setAdminInfo(dataInfoAdmin?.data?.data);
  }, [dataInfoAdmin]);

  return (
    <>
      {sure && (
        <>
          <div
            onClick={() => setSure(false)}
            className={`fixed w-full  h-full top-0 left-0 popup z-30`}
          ></div>
          <div className="bg-white fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-[60] rounded-3xl w-[500px] max-w-[500px] min-h-[200px]">
            <p className="font-semibold text-3xl text-center py-7">
              Are you sure to log out?
            </p>
            <div className="flex items-end m-5 space-x-2">
              <ButtonRed
                className="py-3 px-10"
                name="Yes"
                onClick={() => logout("admin/logout")}
              />
              <button
                onClick={() => setSure(false)}
                className=" border px-10 border-Brown text-Brown bg-white font-semibold  p-3 rounded-xl ml-5"
              >
                No
              </button>
            </div>
          </div>
        </>
      )}

      <div className="w-100 sticky top-0 z-20 bg-white flex items-center justify-between flex-wrap mb-1  border-b-2 border-Brown py-2">
        <div>
          <BiMenu
            size={35}
            className="text-Brown cursor-pointer"
            onClick={changeMenu}
          />
        </div>
        <div className="">
          {/* <img src={Logo} alt="" className="w" /> */}
          <img className="site-logo header-logo" alt="Logo" width={85} />
        </div>
        <div className="flex gap-1 mx-3 ">
          <div className="my-auto mx-3">
           ${adminInfo?.balance}
          </div>
         
          <ButtonRed
            className="px-3 py-2"
            onClick={() => setSure(true)}
            name="Log Out"
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
