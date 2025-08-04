import { useEffect } from "react";
import { useContextHook } from "../../Context/ContextOPen";

function Message() {
  const { message, setMessage } = useContextHook();

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage("");
      }, 4000);
    } else {
      setMessage("");
    }
  }, [message]);

  return (
    <>
      {
        <div
          className={`fixed transition-all right-7 bg-white border-t-4 border-Purple py-5 px-7 shadow-lg z-50  ${
            message ? "bottom-10 " : "-bottom-full"
          }`}
        >
          <p>{message}</p>
        </div>
      }
    </>
  );
}

export default Message;
