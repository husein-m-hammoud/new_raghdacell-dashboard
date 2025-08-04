import React from "react";

const Title = ({ title, className }) => {
  return (
    <div className="relative ml-2 ">
      <span className="w-2 h-2 rounded-full bg-Pink absolute  top-1/2 -translate-y-1/2 left-0"></span>
      <div className={`text-start mb-3 ml-3 ${className} text-xl font-bold`}>
        {title}
      </div>
    </div>
  );
};

export default Title;
