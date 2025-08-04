import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Input,
  ButtonRed,
  DropdownWithSearch,
  Dropdown,
} from "../../components";
import { fileUrl, useFETCH, usePOST } from "../../APIs/useMyAPI";
import Loading from "../../Tools/Loading";

let processName = [
  { value: "USDT", name: "USDT" },
  { value: "WHISH_MONEY", name: "WHISH MONEY" },
  { value: "OMT_PAY", name: "OMT PAY" },
];
const AddChargingModal = ({ show, onClose, type, message = {} }) => {
  const [name, setName] = useState("");
  const [selectedValueUserId, setSelectedValueUserId] = useState("");
  const {
    handleChangeInput,
    handleSubmit,
    viewFile,
    setViewFile,
    setFormData,
    formData,
    loading,
    error,
  } = usePOST();
  const { data: allUsers, loading: is_loading_user } = useFETCH(
    `admin/users/all-users`
  );
  const [usersOptions, setUsersOptions] = useState([]);
  const [displayValue, setDisplayValue] = useState(""); // For formatted display

  const [currency, setCurrency] = useState("USD");
  const [errorsMs, setErrorsMs] = useState("");

  const handleToggle = () => {
    setCurrency(currency === "USD" ? "LBP" : "USD");
    setFormData({
      ...formData,
      currency: currency === "USD" ? "LBP" : "USD",
    });
  };

  const validateForm = () => {
    let newErrors = "";

    if (!formData.value) newErrors = "Price is required.";
    if (!formData.user_id) newErrors = "User is required.";

    if (!formData.name) newErrors = "Select a process.";

    setErrorsMs(newErrors);

    return newErrors ? false : true;
  };

  const handleSubmitMain = async (e) => {
    {
      console.log(formData, "hussein");

      if (!validateForm()) return;

      handleSubmit(`admin/charging-processes-create-manually`, null, true);
    }
  };

  useEffect(() => {
    if (allUsers?.data?.data) {
      let users = allUsers?.data?.data;

      const tmpusersOptions = users?.map((user) => ({
        value: user.id,
        label: user.username + " (" + user.phone_number + ")",
      }));
      console.log(tmpusersOptions, processName);
      setUsersOptions(tmpusersOptions);
    }
  }, [allUsers]);

  useEffect(() => {
    console.log("hussein Enter");
  }, []);

  // useEffect(() => {
  //   console.log("hussein Enter", formData);

  //   if (message && message?.id) {
  //     if (message?.user_id) {
  //       setSelectedValueUserId(message?.user_id);
  //     } else {
  //       setSelectedValueUserId("");
  //     }

  //     // Only update if formData has actually changed
  //     setFormData((prev) => {
  //       const newFormData = {
  //         message_id: message?.id,
  //         user_id: message?.user_id || "",
  //         image: message?.image || "",
  //         currency: "USD",
  //       };
  //       return JSON.stringify(prev) === JSON.stringify(newFormData)
  //         ? prev
  //         : newFormData;
  //     });
  //   } else {
  //     setFormData((prev) => {
  //       const newFormData = {
  //         message_id: "",
  //         user_id: "",
  //         image: "",
  //         currency: "USD",
  //       };
  //       return JSON.stringify(prev) === JSON.stringify(newFormData)
  //         ? prev
  //         : newFormData;
  //     });
  //   }
  // }, [show]); // Only depends on message

  useEffect(() => {
    console.log('hussein Enter', formData )
    if(message && message?.id ) {
      if(message?.user_id) {
        setSelectedValueUserId(message?.user_id)
      }
      else {
        setSelectedValueUserId('')
      }

      setFormData({
         message_id: message?.id,
         user_id: message?.user_id,
         image: message?.image,
         currency: 'USD',
      });
  }
  else {
    setFormData({
      message_id: "",
      user_id: "",
      image: "",
      currency: 'USD',
    });
  }

  },[show])

  const handleSelectUser = (option) => {
    setFormData({
      ...formData,
      user_id: option.value,
    });
  };

  const handleSelectProcessName = (option) => {
    setFormData({
      ...formData,
      name: option.value,
    });
    console.log(option);
  };

const handleChangeValue = (e) => {
  let input = e.target.value;

  // Allow only numbers and a single dot
  const cleaned = input.replace(/[^0-9.]/g, "");

  // Prevent multiple dots
  const parts = cleaned.split(".");
  if (parts.length > 2) return;

  const rawValue = parts.length === 2 ? parts[0] + "." + parts[1] : cleaned;

  if (rawValue === "" || isNaN(rawValue)) {
    setFormData({ ...formData, value: "" });
    setDisplayValue("");
    return;
  }

  // Store as number if possible
  setFormData({ ...formData, value: parseFloat(rawValue) });

  // Format with commas but preserve decimals
  const [intPart, decimalPart] = rawValue.split(".");
  let formatted = new Intl.NumberFormat().format(intPart);
  if (decimalPart !== undefined) {
    formatted += "." + decimalPart;
  }

  setDisplayValue(formatted);
};


  if (!show || is_loading_user) return null;

  return (
    <div id="addCategory" className="modal">
      <div className="addCategory_modal-content charging">
        {loading ? <Loading /> : ""}

        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Add Deposit</h2>
        <div className=" mt-5">
          <h1>Users</h1>
          <DropdownWithSearch
            options={usersOptions}
            label=""
            onSelect={handleSelectUser}
            selectedValue={selectedValueUserId}
          />

          <h1 className="mt-2">Process namee</h1>
          <Dropdown options={processName} onSelect={handleSelectProcessName} />

          <div className="flex items-center mt-3 justify-between  ">
            {/* Price Input */}
            <div className=" relative">
              <input
                type="text"
                value={displayValue}
                name="value"
                onChange={handleChangeValue}
                className="border p-2 rounded me-2"
                placeholder="Enter price"
              />
              <span className="input_currency">{currency}</span>
            </div>

            {/* Toggle Switch */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">USD</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={currency === "LBP"}
                  onChange={handleToggle}
                />
                <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer-checked:bg-blue-600 relative transition-all">
                  <div
                    className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${
                      currency === "LBP" ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></div>
                </div>
              </label>
              <span className="text-gray-700">LBP</span>
            </div>
          </div>
        </div>

        <ButtonRed
          name="Save"
          className={"w-50 mt-4 p-2"}
          onClick={handleSubmitMain}
        />

        <div className="text-red-500 font-semibold">{error || errorsMs}</div>

        {message && message.image && (
          <img
            src={fileUrl + message.image}
            alt=""
            className=" m-auto flex my-3 h-[200px] "
          />
        )}
      </div>
    </div>
  );
};

export default AddChargingModal;
