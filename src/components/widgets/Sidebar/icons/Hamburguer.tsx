import React from 'react';
import { type IconProps } from './types.js';

const Hamburguer: React.FC<IconProps> = ({ size = 18, color,  ...rest }) => {
  return (
<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} {...rest} viewBox="0 0 24 24">
	<rect width="24" height="24" fill="none" />
	<path fill={color} d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1m0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1M3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1" />
</svg>
)};
export default Hamburguer
