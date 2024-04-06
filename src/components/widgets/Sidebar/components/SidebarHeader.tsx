import styled from '@emotion/styled';
import React from 'react';
import { Typography } from './Typography';
import type AuthorSidebarInterface from '@/interfaces/AuthorSidebar.ts'
import type NormalizedAuthor from '@/interfaces/NormalizedAuthor';
interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  rtl: boolean;
  author: NormalizedAuthor,
  collapsed: boolean,
  socialMedias: {url: string, icon: React.ReactNode}[]
}

const StyledSidebarHeader = styled.div`
  height: fit-content;
  min-height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  > div {
    width: 100%;
    overflow: hidden;
  }
`;


export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ collapsed, socialMedias, children, author, rtl, ...rest }) => {
  const {photo, firstName, lastName,role} = author
 
  return (
    <>
    <StyledSidebarHeader {...rest}>
      <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'start', alignItems: 'center' }}>
        <img 
        className="mx-auto w-[100px]  rounded-lg  shadow-lg"
        src={photo} 
        alt='Image of Author'
        />
        {!collapsed &&
        <div className=' text-center mt-4'>
          <Typography variant="subtitle1" fontWeight={600}  className='dark:text-white' color="#111111">
            {firstName} {lastName}
          </Typography>
          <Typography fontSize="14px" variant="subtitle1" fontWeight={400} color="#6A6A6A">
            {role}
          </Typography>
        </div>
        }
        {   !collapsed &&
       <div className='flex flex-wrap  '>
       {
         socialMedias.map(item => (
           <a key={item.url} className='hover:scale-105 transition-all p-2 ps-menu-button' href={item.url}>
             {item.icon}
           </a>
         ))
       }
     </div>
        }
      </div>
    </StyledSidebarHeader>
  
  </>
  );
};
