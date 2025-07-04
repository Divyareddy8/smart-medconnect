const Button = ({ children, onClick, type = 'button', className = '' }) => (
  <button type={type} onClick={onClick} className={`btn btn-primary ${className}`}>
    {children}
  </button>
);

export default Button;
