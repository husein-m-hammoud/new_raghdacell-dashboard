import Img from "../../images/IMG-20230702-WA0052-removebg.png";
import { useState } from "react";
import { useEffect } from "react";
import { usePOST } from "../../APIs/useMyAPI";
import Loading from "../../Tools/Loading";

const SetPassword = () => {
  const [biShow, setBiShow] = useState(false);
  const {
    setFormData,
    handleSubmit,
    error,
    loading,
    handleChangeInput,
    formData,
  } = usePOST({});
  const handleSubmitMain = (e) => {
    e.preventDefault();
    handleSubmit("admin/reset-password", "/login");
  };

  useEffect(() => {
    setFormData({
      ...formData,
      verification_code: sessionStorage.getItem("code"),
      email: sessionStorage.getItem("email"),
    });
  }, []);
  return (
    <div className="fixed w-full h-full bg-white top-0 left-0 z-50 flex items-center justify-center text-center">
      <div className=" text-black w-full  flex items-center justify-center my-4 ">
        <div className="bg-white shadow-md shadow-Pink bg-opacity-50 max-sm:w-full ma px-3 py-5 rounded-2xl lg:w-2/5 md:w-1/2 w-full m-3 ">
          <img src={Img} alt="" width={260} className="mx-auto" />
          <div>
            <h1 className="text-4xl text-Pink font-semibold mb-10">
              Set Password
            </h1>
            <div className="flex flex-col  justify-center my-5  max-sm:w-full mx-auto space-y-8 ">
              <div className="flex flex-col">
                <span>Password</span>
                <input
                  type={biShow ? "text" : "password"}
                  name="password"
                  placeholder={"********"}
                  onChange={handleChangeInput}
                  className="w-full py-3 px-3 bg-slate-400  outline-none bg-opacity-50 mt-3 placeholder:text-white text-Pink text-xl rounded-2xl"
                />
              </div>
              <div className="flex flex-col">
                <span>Confirm Password</span>
                <input
                  type={biShow ? "text" : "password"}
                  name="password_confirmation"
                  className="w-full py-3 px-3 bg-slate-400 outline-none bg-opacity-50 mt-3 placeholder:text-white text-Pink text-xl rounded-2xl"
                  placeholder={"********"}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="text-end text-l text-Brown flex items-center justify-start space-x-2">
                <input
                  type="checkbox"
                  className="relative w-5 h-5"
                  onChange={(e) => setBiShow(e.target.checked)}
                />
                <span>Show Password</span>
              </div>
              {loading ? <Loading /> : ""}
              <div className="text-red-600">{error}</div>
              <button
                onClick={handleSubmitMain}
                className="w-full py-3 bg-Pink   text-white text-xl rounded-2xl"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
