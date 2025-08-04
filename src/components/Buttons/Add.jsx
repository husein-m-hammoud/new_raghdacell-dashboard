import React, { useState } from "react";

const Add = ({ children }) => {
  const [add, setAdd] = useState(false);
  return (
    <>
      <div
        onClick={() => setAdd(!add)}
        style={{ userSelect: "none" }}
        className={`${
          add ? "rotate-45 " : ""
        } flex z-10 active:-rotate-45  justify-center transition  fixed bottom-10 right-5 font-bold  text-5xl text-white cursor-pointer w-14 h-14 rounded-full bg-Purple`}
      >
        +
      </div>
      <div
        className={`rounded-2xl  fixed -bottom-full right-10  w-[200px]  p-5 ${
          add ? "add" : ""
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default Add;
