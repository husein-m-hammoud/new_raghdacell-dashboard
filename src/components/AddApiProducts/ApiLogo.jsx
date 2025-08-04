import React from "react";
import { fileUrl } from "../../APIs/useMyAPI";
const ApiLogo = ({ data , className = 'w-14'}) => {
    if(!data?.name) {
        return <></>;
    }
  return (
    <div
     

      className={` ${className}   py-2 flex align-middle items-center gap-2 `}
    >
        <img src={fileUrl+data?.logo} className={ ` ${className}`}/>

    </div>
  );
};

export default ApiLogo;
