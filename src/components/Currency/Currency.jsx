import React from "react";

const Currency = ({ number, currency }) => {
  return (
    <span>
      {currency === "LBP"
        ? parseInt(number).toLocaleString()
        : number?.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) || 0}
      {" " + currency || ""}
    </span>
  );
};

export default Currency;
