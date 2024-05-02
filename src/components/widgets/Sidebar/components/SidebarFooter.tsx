import styled from '@emotion/styled';
import React from 'react';
import ThemeBlack from '../icons/ThemeBlack';
import ThemeWhite from '../icons/ThemeWhite';
import { LanguageToggle } from '@/components/common/LanguageToggle';
interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  collapsed?: boolean;
}



const StyledSidebarFooter = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 8px;
  color: white;
`;

const StyledCollapsedSidebarFooter = styled.a`
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  color: white;
`;


export const SidebarFooter: React.FC<SidebarFooterProps> = ({ children, collapsed, ...rest }) => {
  function toggleTheme(){
    document.documentElement.classList.toggle('dark');
    localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    window.dispatchEvent(new Event("storage"));
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: '20px',
      }}
    >
      {collapsed ? (
        <StyledCollapsedSidebarFooter >
          <div className='flex   items-center justify-center  md:flex-col xl:flex-row xl:space-x-4'>
            <LanguageToggle/>
            <span onClick={toggleTheme}>
              {children}
            </span>
          </div>
         
        </StyledCollapsedSidebarFooter>
      ) : (
        <StyledSidebarFooter {...rest}>
           <div className='flex   items-center justify-center  md:flex-col xl:flex-row xl:space-x-4'>
            <LanguageToggle/>
            <span onClick={toggleTheme}>
              {children}
            </span>
          </div>
        </StyledSidebarFooter>
      )}
    </div>
  );
};
