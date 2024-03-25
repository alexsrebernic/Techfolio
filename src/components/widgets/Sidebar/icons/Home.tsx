import React from 'react';
import { type IconProps } from './types.ts';

const Home: React.FC<IconProps> = ({ size = 18, ...rest }) => {
  return (
    <svg width={size} {...rest} height={size} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M9.5742 1.13259C9.83054 0.955803 10.1695 0.955803 10.4258 1.13259L16.8113 5.53636C17.5556 6.04967 18 6.89605 18 7.8002V16.25C18 17.7688 16.7688 19 15.25 19H4.75C3.23122 19 2 17.7688 2 16.25V7.8002C2 6.89605 2.44443 6.04967 3.18873 5.53636L9.5742 1.13259ZM8.5 17.5H11.5V12.75C11.5 12.6119 11.3881 12.5 11.25 12.5H8.75C8.61193 12.5 8.5 12.6119 8.5 12.75V17.5ZM13 17.5V12.75C13 11.7835 12.2165 11 11.25 11H8.75C7.7835 11 7 11.7835 7 12.75V17.5H4.75C4.05964 17.5 3.5 16.9404 3.5 16.25V7.8002C3.5 7.38922 3.70201 7.0045 4.04033 6.77118L10 2.66106L15.9597 6.77118C16.298 7.0045 16.5 7.38922 16.5 7.8002V16.25C16.5 16.9404 15.9404 17.5 15.25 17.5H13Z"/></svg>
  );
};
export default Home
