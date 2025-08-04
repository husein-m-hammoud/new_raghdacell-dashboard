import { Col } from "../../Grid-system";

const Input = ({ type, name, value, onChange, placeholder, col }) => {
  return (
    <Col md={col || 6}>
      <h1>{placeholder}</h1>
      <input
        type={type || "text"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-Purple m-1 py-3 rounded-xl"
      />
    </Col>
  );
};
export default Input;
