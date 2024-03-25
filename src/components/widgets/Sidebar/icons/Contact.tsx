import React from 'react';
import { type IconProps } from './types.js';

const Contact: React.FC<IconProps> = ({ size = 18, ...rest }) => {
  return (
<svg width={size} {...rest} height={size} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M2.56424 5.35337L10 9.63457L17.4358 5.35337C17.27 4.85744 16.8017 4.5 16.25 4.5H3.75C3.19828 4.5 2.73005 4.85744 2.56424 5.35337ZM17.5 7.04725L10.3742 11.15C10.1426 11.2833 9.85743 11.2833 9.62578 11.15L2.5 7.04725V14.25C2.5 14.9404 3.05964 15.5 3.75 15.5H16.25C16.9404 15.5 17.5 14.9404 17.5 14.25V7.04725ZM1 5.75C1 4.23122 2.23122 3 3.75 3H16.25C17.7688 3 19 4.23122 19 5.75V14.25C19 15.7688 17.7688 17 16.25 17H3.75C2.23122 17 1 15.7688 1 14.25V5.75Z"/></svg>  );
};
export default Contact
