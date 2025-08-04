import Delete from "../../images/delete (1).png";
import Edit from "../../images/edit (2).png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BiShow } from "react-icons/bi";
import Buttons from "../Buttons/Buttons";
import { useContextHook } from "../../Context/ContextOPen";
import { fetchData } from "../../APIs/useMyAPI";

const CardPro = ({
  children,
  deleteClick,
  edit,
  className,
  showEdit,
  show,
  showDelete,
  showHideOnMobile,
}) => {
  const [sure, setSure] = useState(false);

  const [check, setCheck] = useState(showHideOnMobile?.hide_in_mobile || false);
  const { setMessage } = useContextHook();
  const handleToggleHideInMobile = async (productId, hideInMobile) => {
    try {
      // Update the product's hide_in_mobile status
      const updatedProduct = await fetchData(
        `admin/products/${productId}/hide-in-mobile`,
        {
          hide_in_mobile: hideInMobile,
        },
        "PUT"
      );

      // // Update the local product list state
      // setProducts(products.map(product =>
      //     product.id === productId ? updatedProduct : product
      // ));
      setCheck(hideInMobile);
      // Set the success message based on the new hide_in_mobile status
      const message = hideInMobile
        ? "This product will not show on mobile anymore."
        : "This product will show on mobile now.";

      setMessage(message);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleToggleHideonAndroidMobile = async (productId, hideInMobile) => {
    try {
      // Update the product's hide_in_mobile status
      const updatedProduct = await fetchData(
        `admin/products/${productId}/hide-on-android-mobile`,
        {
          hide_in_mobile: hideInMobile,
        },
        "PUT"
      );

      // // Update the local product list state
      // setProducts(products.map(product =>
      //     product.id === productId ? updatedProduct : product
      // ));
      setCheck(hideInMobile);
      // Set the success message based on the new hide_in_mobile status
      const message = hideInMobile
        ? "This product will not show on mobile anymore."
        : "This product will show on mobile now.";

      setMessage(message);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
      {sure && (
        <>
          <div
            onClick={() => setSure(false)}
            className={` fixed w-full h-full top-0 left-0 bg-black/50 z-30 flex justify-center items-center`}
          ></div>
          <div className=" fixed -translate-x-1/2 -translate-y-1/2  top-1/2 left-1/2 bg-white z-40 rounded-3xl w-[500px] max-w-[500px] min-h-[200px] ">
            <p className="font-semibold text-3xl text-center py-7">
              Are you sure to delete the item ?
            </p>
            <div className="flex items-end m-5 space-x-2">
              <Buttons
                onClick={deleteClick}
                name="Yes"
                className="py-3 px-16 border hover:text-white  hover:bg-green-700 "
              />
              <Buttons
                onClick={() => setSure(false)}
                name="Cancel"
                className="py-3 px-16 border hover:text-white  hover:bg-red-700 "
              />
            </div>
          </div>
        </>
      )}
      <div
        className={`border-2 border-Purple rounded-2xl overflow-hidden  w-full h-full ${className}`}
      >
        <div>{children}</div>
        <div className="flex justify-end gap-1  mt-4">
          {showHideOnMobile && (
            <div className=" w-10 h-10 rounded-full hover:bg-slate-200 flex cursor-pointer justify-center items-center">
              <input
                type="checkbox"
                checked={check}
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                onChange={(e) =>
                  handleToggleHideInMobile(
                    showHideOnMobile.id,
                    e.target.checked
                  )
                }
              />
            </div>
          )}

          <Link to={show || ""} className={`${show ? "" : "hidden"}`}>
            <div className=" w-10 h-10 rounded-full hover:bg-slate-200 flex cursor-pointer justify-center items-center">
              <BiShow size={25} className="text-[#B5394B]" />
            </div>
          </Link>
          {showDelete ? (
            ""
          ) : (
            <div className="w-10 h-10  rounded-full hover:bg-slate-200 flex cursor-pointer justify-center items-center">
              <img
                src={Delete}
                alt=""
                className=" w-6"
                onClick={() => setSure(true)}
              />
            </div>
          )}

          <div
            className={`${
              showEdit ? "hidden" : ""
            } w-10 h-10 rounded-full  flex justify-center items-center cursor-pointer hover:bg-slate-200`}
          >
            <Link to={edit || ""}>
              <img src={Edit} alt="" className="cursor-pointer w-6" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardPro;
