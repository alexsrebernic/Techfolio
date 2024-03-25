import React from 'react';
import { type IconProps } from './types.js';

const Projects: React.FC<IconProps> = ({ size = 18, ...rest }) => {
  return (
  <svg width={size} {...rest} height={size} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M8.32378 2H11.6762C11.9337 1.99998 12.1702 1.99997 12.3679 2.01612C12.581 2.03353 12.8142 2.07339 13.0445 2.19074C13.3738 2.35852 13.6415 2.62624 13.8093 2.95552C13.9266 3.18583 13.9665 3.419 13.9839 3.63213C14 3.82981 14 4.06629 14 4.32377L14 5L16.6762 5C16.9337 4.99998 17.1702 4.99997 17.3679 5.01612C17.581 5.03353 17.8142 5.07339 18.0445 5.19074C18.3738 5.35852 18.6415 5.62624 18.8093 5.95552C18.9266 6.18583 18.9665 6.419 18.9839 6.63213C19 6.82981 19 7.06629 19 7.32377V11.6762C19 11.9337 19 12.1702 18.9839 12.3679C18.9665 12.581 18.9266 12.8142 18.8093 13.0445C18.6415 13.3738 18.3738 13.6415 18.0445 13.8093C18.0297 13.8168 18.0148 13.824 18 13.831V15.6762C18 15.9337 18 16.1702 17.9839 16.3679C17.9665 16.581 17.9266 16.8142 17.8093 17.0445C17.6415 17.3738 17.3738 17.6415 17.0445 17.8093C16.8142 17.9266 16.581 17.9665 16.3679 17.9839C16.1702 18 15.9337 18 15.6762 18H4.32377C4.06629 18 3.82981 18 3.63213 17.9839C3.419 17.9665 3.18583 17.9266 2.95552 17.8093C2.62624 17.6415 2.35852 17.3738 2.19074 17.0445C2.07339 16.8142 2.03353 16.581 2.01612 16.3679C1.99997 16.1702 1.99998 15.9337 2 15.6762L2 13.831C1.98517 13.824 1.97034 13.8168 1.95552 13.8093C1.62624 13.6415 1.35852 13.3738 1.19074 13.0445C1.07339 12.8142 1.03353 12.581 1.01612 12.3679C0.999966 12.1702 0.999983 11.9337 1 11.6762V7.32378C0.999983 7.0663 0.999966 6.82982 1.01612 6.63213C1.03353 6.419 1.07339 6.18583 1.19074 5.95552C1.35852 5.62624 1.62624 5.35852 1.95552 5.19074C2.18583 5.07339 2.419 5.03353 2.63213 5.01612C2.82982 4.99997 3.0663 4.99998 3.32379 5C3.3325 5 3.34124 5 3.35 5H6L6 4.32379C5.99998 4.0663 5.99997 3.82982 6.01612 3.63213C6.03353 3.419 6.07339 3.18583 6.19074 2.95552C6.35852 2.62624 6.62624 2.35852 6.95552 2.19074C7.18583 2.07339 7.419 2.03353 7.63213 2.01612C7.82982 1.99997 8.0663 1.99998 8.32378 2ZM3.35 6.5C3.0576 6.5 2.88341 6.50059 2.75428 6.51114C2.67547 6.51757 2.64234 6.52607 2.63347 6.52883C2.58883 6.55235 2.55235 6.58883 2.52883 6.63347C2.52607 6.64234 2.51757 6.67547 2.51114 6.75428C2.50059 6.88341 2.5 7.0576 2.5 7.35V11.65C2.5 11.9424 2.50059 12.1166 2.51114 12.2457C2.51757 12.3245 2.52607 12.3577 2.52883 12.3665C2.55235 12.4112 2.58883 12.4477 2.63347 12.4712C2.64234 12.4739 2.67547 12.4824 2.75428 12.4889C2.76561 12.4898 2.77729 12.4906 2.78936 12.4914C2.79424 12.4917 2.7991 12.492 2.80395 12.4923C2.92791 12.4996 3.09346 12.5 3.35 12.5H7V11.75C7 11.3358 7.33579 11 7.75 11C8.16422 11 8.5 11.3358 8.5 11.75V12.5H11.5V11.75C11.5 11.3358 11.8358 11 12.25 11C12.6642 11 13 11.3358 13 11.75V12.5H16.65C16.9065 12.5 17.0721 12.4996 17.1961 12.4923C17.2009 12.492 17.2058 12.4917 17.2106 12.4914C17.2227 12.4906 17.2344 12.4898 17.2457 12.4889C17.3245 12.4824 17.3577 12.4739 17.3665 12.4712C17.4112 12.4477 17.4477 12.4112 17.4712 12.3665C17.4739 12.3577 17.4824 12.3245 17.4889 12.2457C17.4994 12.1166 17.5 11.9424 17.5 11.65V7.35C17.5 7.0576 17.4994 6.88341 17.4889 6.75428C17.4824 6.67547 17.4739 6.64234 17.4712 6.63347C17.4477 6.58883 17.4112 6.55235 17.3665 6.52883C17.3577 6.52607 17.3245 6.51758 17.2457 6.51114C17.1166 6.50059 16.9424 6.5 16.65 6.5H3.35ZM12.5 5H7.5V4.35C7.5 4.0576 7.50059 3.88341 7.51114 3.75428C7.51757 3.67547 7.52607 3.64234 7.52883 3.63347C7.55235 3.58883 7.58883 3.55235 7.63346 3.52883C7.64234 3.52607 7.67547 3.51757 7.75428 3.51114C7.88341 3.50059 8.0576 3.5 8.35 3.5H11.65C11.9424 3.5 12.1166 3.50059 12.2457 3.51114C12.3245 3.51757 12.3577 3.52607 12.3665 3.52883C12.4112 3.55235 12.4477 3.58882 12.4712 3.63347C12.4739 3.64234 12.4824 3.67547 12.4889 3.75428C12.4994 3.88341 12.5 4.0576 12.5 4.35V5ZM12.4703 3.63088C12.4703 3.63085 12.4705 3.63132 12.4708 3.63236L12.4703 3.63088ZM12.3691 3.52973C12.3691 3.52974 12.3686 3.52957 12.3676 3.52918L12.3691 3.52973ZM7.63088 3.52973C7.63085 3.52972 7.63132 3.52953 7.63236 3.52918L7.63088 3.52973ZM7.52918 3.63236C7.52953 3.63131 7.52972 3.63085 7.52973 3.63088L7.52918 3.63236ZM17.3691 6.52973C17.3691 6.52974 17.3686 6.52956 17.3676 6.52917L17.3691 6.52973ZM17.4703 6.63088C17.4703 6.63085 17.4705 6.63132 17.4708 6.63236L17.4703 6.63088ZM17.4703 12.3691C17.4703 12.3691 17.4704 12.3686 17.4708 12.3676L17.4703 12.3691ZM17.3691 12.4703C17.3692 12.4703 17.3687 12.4705 17.3676 12.4708L17.3691 12.4703ZM16.5 14H13V14.25C13 14.6642 12.6642 15 12.25 15C11.8358 15 11.5 14.6642 11.5 14.25V14H8.5V14.25C8.5 14.6642 8.16422 15 7.75 15C7.33579 15 7 14.6642 7 14.25V14H3.5V15.65C3.5 15.9424 3.50059 16.1166 3.51114 16.2457C3.51758 16.3245 3.52607 16.3577 3.52883 16.3665C3.55235 16.4112 3.58883 16.4477 3.63347 16.4712C3.64235 16.4739 3.67547 16.4824 3.75428 16.4889C3.88341 16.4994 4.0576 16.5 4.35 16.5H15.65C15.9424 16.5 16.1166 16.4994 16.2457 16.4889C16.3245 16.4824 16.3577 16.4739 16.3665 16.4712C16.4112 16.4477 16.4477 16.4112 16.4712 16.3665C16.4739 16.3577 16.4824 16.3245 16.4889 16.2457C16.4994 16.1166 16.5 15.9424 16.5 15.65V14ZM16.4703 16.3691C16.4703 16.3691 16.4704 16.3686 16.4708 16.3676L16.4703 16.3691ZM16.3691 16.4703C16.3692 16.4703 16.3687 16.4705 16.3676 16.4708L16.3691 16.4703ZM3.63088 16.4703C3.63091 16.4703 3.63143 16.4704 3.63236 16.4708L3.63088 16.4703ZM3.52918 16.3676C3.52957 16.3686 3.52974 16.3691 3.52973 16.3691L3.52918 16.3676ZM2.63088 12.4703C2.63091 12.4703 2.63143 12.4704 2.63236 12.4708L2.63088 12.4703ZM2.52918 12.3676C2.52957 12.3686 2.52974 12.3691 2.52973 12.3691L2.52918 12.3676ZM2.52917 6.63239C2.52952 6.63132 2.52972 6.63085 2.52973 6.63088L2.52917 6.63239ZM2.63239 6.52917C2.63144 6.52956 2.63091 6.52974 2.63088 6.52973L2.63239 6.52917Z"/></svg>  );
};
export default Projects
