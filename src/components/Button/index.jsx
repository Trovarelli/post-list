import "./styles.css";

export const Button = ({ text, onClick, disabled }) => (
  <button
    id="buttonId"
    className="button"
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);
