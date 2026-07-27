import "./style.scss";

const Button = ({ children, className = "", onClick, type = "button" }) => {
  return (
    <button
      className={`pc-button ${className}`.trim()}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
