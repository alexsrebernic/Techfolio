import React from 'react'
import type AuthorSidebar from '@/interfaces/AuthorSidebar'
import Hamburguer from './Sidebar/icons/Hamburguer'
interface Props {
  author : AuthorSidebar,
  toggleSidebar: Function,
  theme: 'light' | 'dark',
 
}
export const NavbarPhone = ({author, toggleSidebar,theme} : Props) => {
  const {photo, firstName, lastName,role} = author
  return (
    <div className='md:hidden flex items-center justify-between p-2 dark:bg-dark'>
      <div className='flex items-center justify-center space-x-2' >
        <img 
          className="mx-auto w-[50px]  rounded-lg  shadow-lg"
          src={photo} 
          alt='Image of Author'
          />
          <div>
            <p className='font-semibold'>{firstName} {lastName}</p>
            <p className='text-[#6A6A6A]'>{role}</p>
          </div>

      </div>
      <div className='' >
        <Hamburguer onClick={toggleSidebar}  color={theme == 'light' ? 'black' : 'white'} size={30}/>
      </div>
    </div>
  )
}
