import React from "react";
import ButtonRed from "./ButtonRed";
import Buttons from "./Buttons";
import { Link } from "react-router-dom";

const Back = ({ name, onClick, link }) => {
  return (
    <div className="fixed bottom-3 right-5  flex  gap-2">
      <Link to={link || ""}>
        <Buttons
          onClick={onClick}
          name={name}
          className={`bg-Purple px-4 text-white hover:bg-opacity-75 ${
            name ? "" : "hidden"
          }`}
        />
      </Link>
      <ButtonRed
        className="py-2 px-5"
        name="Back"
        onClick={() => window.history.go(-1)}
      />
    </div>
  );
};

export default Back;
