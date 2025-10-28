import React from 'react';

const Button = ({ children, ...props }) => (
  <button {...props} style={{ padding: '10px 20px', margin: '5px' }}>
    {children}
  </button>
);

export default Button;
