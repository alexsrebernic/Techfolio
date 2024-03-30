import React from 'react';
import { type IconProps } from './types.js';

const About: React.FC<IconProps> = ({ size = 18, ...rest }) => {
  return (
  <svg width={size} height={size} {...rest} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M10 2.5C8.61929 2.5 7.5 3.61929 7.5 5C7.5 6.38071 8.61929 7.5 10 7.5C11.3807 7.5 12.5 6.38071 12.5 5C12.5 3.61929 11.3807 2.5 10 2.5ZM6 5C6 2.79086 7.79086 1 10 1C12.2091 1 14 2.79086 14 5C14 7.20914 12.2091 9 10 9C7.79086 9 6 7.20914 6 5ZM3 16.625C3 13.5184 5.5184 11 8.625 11H11.375C14.4816 11 17 13.5184 17 16.625C17 17.9367 15.9367 19 14.625 19H5.375C4.06332 19 3 17.9367 3 16.625ZM8.625 12.5C6.34683 12.5 4.5 14.3468 4.5 16.625C4.5 17.1082 4.89175 17.5 5.375 17.5H14.625C15.1082 17.5 15.5 17.1082 15.5 16.625C15.5 14.3468 13.6532 12.5 11.375 12.5H8.625Z"/></svg>  );
};
export default About
