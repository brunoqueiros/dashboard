import React from 'react';
import './styles.css';

export default ({ children, resolution = '720p' }) => (
  <div className={`grid grid--${resolution}`}>
    {children}
  </div>
);
