import "./styles.css";

export const Button = ({ text, onClick, disabled, reference }) => (
  <button
    ref={reference}
    className="button"
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);
