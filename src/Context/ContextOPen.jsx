import React, { createContext, useContext, useState, useEffect } from "react";
import {
  clickZoomInImage,
  fileUrl,
  useFETCH,
  useFilter,
} from "../APIs/useMyAPI";
const ContextOpen = createContext({});

const ContextProvider = ({ children }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [checkId, setCheckId] = useState("");
  const [adminInfo, setAdminInfo] = useState("");

 
  const [message, setMessage] = useState("");
  const changeMenu = () => {
    setOpenMenu(!openMenu);
  };





  return (
    <ContextOpen.Provider
      value={{ openMenu, changeMenu, setCheckId, checkId, message, setMessage , adminInfo, setAdminInfo}}
    >
      {children}
    </ContextOpen.Provider>
  );
};

export default ContextProvider;

export const useContextHook = () => {
  return useContext(ContextOpen);
};
