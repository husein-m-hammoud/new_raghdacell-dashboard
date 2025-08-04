import Logo from "../../images/IMG-20230702-WA0052-removebg.png";
import { ButtonRed } from "../../components";
import { BiHide, BiShow } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useLOGIN } from "../../APIs/useMyAPI";
import Loading from "../../Tools/Loading";
import { Link } from "react-router-dom";

const Login = () => {
  const [biShow, setBiShow] = useState(false);
  const { handleSubmit, error, loading, handleChange, setFormData } =
    useLOGIN();
  const handleSubmitMain = (e) => {
    e.preventDefault();
    handleSubmit("admin/login");
  };
  useEffect(() => {
    sessionStorage.getItem("fcm_token") &&
      setFormData({ fcm_token: sessionStorage.getItem("fcm_token") });
      console.log(sessionStorage.getItem("fcm_token"), 'fcm_token');
  }, []);
  return (
    <div className="fixed w-full h-full bg-white top-0 left-0 z-50 flex items-center justify-center text-center">
      <div className="w-1/2 max-lg:w-[90%] flex flex-col justify-center space-y-6 border border-Brown p-10 rounded-2xl">
        <div className="flex justify-center">
          <img src={Logo} alt="" className="w-[300px] mx-auto" />
        </div>
        <div className="flex w-full mx-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="block max-md:w-full mx-auto w-[100%] border-b border-b-Brown py-3 pr-5 font-semibold outline-none px-5"
          />
        </div>
        <div className="flex w-full mx-3 relative">
          <input
            type={!biShow ? "password" : "text"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="block max-md:w-full mx-auto w-[100%] border-b border-b-Brown py-3 pr-5 font-semibold outline-none px-5"
          />
          {biShow ? (
            <BiShow
              onClick={() => setBiShow(false)}
              size={25}
              className="absolute right-3 top-4 cursor-pointer"
            />
          ) : (
            <BiHide
              onClick={() => setBiShow(true)}
              size={25}
              className="absolute right-3 top-4 cursor-pointer"
            />
          )}
        </div>
        <div className="cursor-pointer">
          <Link to="/login/forget-password" className="underline text-Pink">
            forget Password
          </Link>
        </div>
        {loading ? <Loading /> : ""}
        <div className="text-red-600">{error}</div>
        <div className="w-fit mx-auto">
          <ButtonRed
            name="send"
            className="px-52 py-3"
            onClick={handleSubmitMain}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
