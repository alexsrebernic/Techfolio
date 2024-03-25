import styled from '@emotion/styled';
import React from 'react';
import { Typography } from './Typography';
import  type Author from '@/interfaces/Author';
interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  rtl: boolean;
  author: Author
}

const StyledSidebarHeader = styled.div`
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  > div {
    width: 100%;
    overflow: hidden;
  }
`;


export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ children, author, rtl, ...rest }) => {
  const {image, first_name, last_name,role} = author
  return (
    <StyledSidebarHeader {...rest}>
      <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'start', alignItems: 'center' }}>
        <img src={image} alt='Image of Author'/>
        <Typography variant="subtitle1" fontWeight={700} color="#0098e5">
          {first_name} {last_name}
        </Typography>
        <Typography variant="subtitle1" fontWeight={400} color="#0098e5">
          {role}
        </Typography>
      </div>
    </StyledSidebarHeader>
  );
};
