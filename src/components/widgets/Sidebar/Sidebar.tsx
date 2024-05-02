import React, { useEffect, type ReactNode } from 'react'
import {SidebarHeader} from './components/SidebarHeader.tsx'
import {SidebarFooter} from './components/SidebarFooter.tsx'
import { Sidebar as SidebarReact , Menu, MenuItem , type MenuItemStyles } from 'react-pro-sidebar';
import Home from './icons/Home.tsx'
import Projects from './icons/Projects.tsx'
import { useTranslatedPath, useTranslations } from '@/i18n/utils.ts';
import Store from './icons/Store.tsx'
import Contact from './icons/Contact.tsx'
import About from './icons/About.tsx'
import Blog from './icons/Blog.tsx'
import {  menuClasses  } from '../Sidebar';
import hexToRGBA from '@/helpers/HexToRGBA.ts';
import { NavbarPhone } from "../NavbarPhone.tsx";
import {socialMediaDataHeader} from './icons/SocialMedia.tsx'
import type NormalizedAuthor from '@/interfaces/NormalizedAuthor.ts';
import { sidebarUi } from '@/i18n/menus.ts';
const themes = {
  light: {
    sidebar: {
      backgroundColor: '#F4F5F5',
      color: '#666666',
    },
    menu: {
      menuContent: '#F4F5F5',
      icon: '#666666',
      hover: {
        backgroundColor: '#E8EAEB',
        icon: '#666666',
        color: '#111111',
      },
      focus: {
        color: "#111111",
        icon: "#111111",
        fontWeigth: 700,
        backgroundColor: "#e0e0e0"
      },
      disabled: {
        color: '#9fb6cf',
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: '#141414',
      color: '#666666',
    },
    menu: {
      menuContent: '#141414',
      icon: '#666666',
      transition:"all",
      hover: {
        icon: "#ffffff",
        backgroundColor: '#353535',
        color: '#cecece',
      },
      focus: {
        color: "#ffffff",
        icon: "#ffffff",
        fontWeigth: 700,
        backgroundColor: "#3d3d3d"
      },
      disabled: {
        color: '#3e5e7e',
      },
    },
  },
};
interface Props {
  author : NormalizedAuthor
  children: ReactNode
  lang: string
}
export const Sidebar = ({author, children,lang} : Props) => {
  type Theme = 'light' | 'dark';
  const [collapsed, setCollapsed] = React.useState(false);
  const [toggled, setToggled] = React.useState(false);
  const [broken, setBroken] = React.useState(false);
  const [rtl, setRtl] = React.useState(false);
  const [hasImage, setHasImage] = React.useState(false);
  const [theme, setTheme] = React.useState<Theme>('light');
  const translatePath = useTranslatedPath(lang)
  const translate = useTranslations(lang,sidebarUi)
  useEffect(() => {
    window.addEventListener('resize', (e) => {
      checkSize()
    })
    checkSize()
  
  }, [])
  useEffect(() => {
    setTheme(checkStorage())
    window.addEventListener('storage', () => {
      setTheme(checkStorage())
   })
  }, [localStorage.theme])
  function checkSize(){
    return window.innerWidth < 1400
    ? window.innerWidth < 768
    ? setCollapsed(false)
    : setCollapsed(true)
    : setCollapsed(false)
  }
  function extractSocialMediaUrls(object : NormalizedAuthor){
    const socialMedias : {icon:string , url: string}[] = []
    for(const key in object) {
      if(object.hasOwnProperty(key) && object[key] && key.toLocaleLowerCase().endsWith('url')){
        socialMedias.push(
          {
            url: object[key],
            icon: socialMediaDataHeader[key.slice(0,-3)]
          }
        )
      }
    }
    return socialMedias
  }
  function checkStorage(){
    return localStorage.theme
  }
  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: '15px',
      fontWeight: 500,
    },
    icon: {
      color: themes[theme].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: '#b6b7b9',
    },
    button: {
      borderRadius: '10px',
      transition: 'backgroundColor',
      '&:hover': {
        backgroundColor: hexToRGBA(themes[theme].menu.hover.backgroundColor, hasImage ? 0.8 : 1),
        color: themes[theme].menu.hover.color,
      },
      '&:focus': {
        backgroundColor: hexToRGBA(themes[theme].menu.focus.backgroundColor, hasImage ? 0.8 : 1),
        color: themes[theme].menu.focus.color,
      },
    },
  };
  return (
    <>
    <NavbarPhone
    author={author}
    toggleSidebar={setToggled}
    theme={theme}
    />
    <SidebarReact
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        rtl={rtl}
        width='300px'
        breakPoint="md"
        backgroundColor={hexToRGBA(themes[theme].sidebar.backgroundColor, hasImage ? 0.9 : 1)}
        rootStyles={{
          color: themes[theme].sidebar.color,
          height: '100vh',
          position: 'fixed',
          border: 'none',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '700px' }}>
          <SidebarHeader 
          socialMedias={extractSocialMediaUrls(author)}
          author={author}
          rtl={rtl} 
          collapsed={collapsed}
          style={{ marginBottom: '24px', marginTop: '32px' }} />
          <div style={{ flex: 1, marginBottom: '32px' }}>
            <Menu className='w-[90%] mx-auto space-y-5' menuItemStyles={menuItemStyles}>
              <MenuItem  href={translatePath('/', lang)} icon={<Home size={20} />} >
                {translate('sidebar.homepage')}
              </MenuItem>
              <MenuItem href={translatePath('/projects', lang)}icon={<Projects size={20} />}>
                {translate('sidebar.projects')}

              </MenuItem>
              <MenuItem href={translatePath('/about', lang)}  icon={<About size={20} />}>
                {translate('sidebar.about')}

              </MenuItem>
              <MenuItem href={translatePath('/store', lang)}  icon={<Store size={20} />}>
                {translate('sidebar.store')}

              </MenuItem>
              <MenuItem href={translatePath('/blog', lang)}  icon={<Blog size={20} />}>
                {translate('sidebar.blog')}
              </MenuItem>
              <MenuItem href={translatePath('/contact', lang)} icon={<Contact size={20} />}>
                {translate('sidebar.contact')}

              </MenuItem>
            </Menu>
            {
              collapsed &&
              <Menu className='w-[90%] mx-auto space-y-5 ' menuItemStyles={menuItemStyles}>
                <div className='dark:border-t-[#686868] mt-3 w-[60%] border-t ml-[15px]'>

                </div>
                {
                  extractSocialMediaUrls(author).map(item => (
                    <MenuItem key={item.url} href={item.url}  icon={item.icon}>
                    </MenuItem>
                  ))
                }
            </Menu>
            }
          </div>
          <SidebarFooter collapsed={collapsed} >
            {children}
          </SidebarFooter>
        </div>
      </SidebarReact>
    </>
  )
}
