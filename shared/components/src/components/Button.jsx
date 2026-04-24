import './Button.css';

const Button = ({ children, onClick, className = '' }) => {
  return (
    <button onClick={onClick} className={`pc-button ${className}`.trim()}>
      {children}
    </button>
  );
};

export default Button;
