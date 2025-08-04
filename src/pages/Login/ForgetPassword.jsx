import { usePOST } from "../../APIs/useMyAPI";
import Img from "../../images/IMG-20230702-WA0052-removebg.png";
import Loading from "../../Tools/Loading";
import { useEffect } from "react";

const ForgetPassword = () => {
  const { handleSubmit, error, loading, handleChangeInput, formData } = usePOST(
    {}
  );

  const handleSubmitMain = (e) => {
    e.preventDefault();
    handleSubmit("admin/send/verification-code", "/login/verification-code");
  };
  useEffect(() => {
    sessionStorage.setItem("email", formData?.email);
  }, [formData]);
  return (
    <div className="fixed w-full h-full bg-white top-0 left-0 z-50 flex items-center justify-center text-center">
      <div className="text-black w-full flex items-center justify-center my-4">
        <div className="bg-white shadow-md shadow-Pink bg-opacity-50 max-sm:w-full py-5 px-3 rounded-2xl lg:w-2/5 md:w-1/2 w-full m-3">
          <img src={Img} alt="" width={260} className="mx-auto" />
          <div className=" flex justify-center items-center">
            <div className="w-full">
              <h1 className="text-4xl text-center font-semibold text-Pink mb-10">
                Forget password
              </h1>
              <div className="flex flex-col justify-center my-5  max-sm:w-full mx-auto space-y-8 ">
                <div className="flex flex-col">
                  <span>Enter your email</span>
                  <input
                    type="text"
                    name="email"
                    onChange={handleChangeInput}
                    className="w-full py-3 px-3 bg-slate-400   outline-none bg-opacity-50 mt-3 placeholder:text-white text-Pink text-xl rounded-2xl"
                    placeholder="Enter your email"
                  />
                </div>
                {loading ? <Loading /> : ""}
                <div className="text-red-600">{error}</div>

                <button
                  className="w-full py-3 bg-Pink text-white text-xl rounded-2xl"
                  onClick={handleSubmitMain}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
