import React from 'react'
import { Image } from 'astro:assets'
import esFlag from '@/assets/images/es-flag.svg'
import usFlag from '@/assets/images/uk-flag.svg'
import {useToggleLanguage,getLangFromUrl} from '@/i18n/utils'
import {ui} from '@/i18n/ui'
interface Props {
    invert?: Boolean
}
export const LanguageToggle = () => {

const lang : keyof typeof ui = getLangFromUrl(window.location.pathname)
const toggleLanguage = useToggleLanguage(lang);
const flag = lang == 'en'? esFlag : usFlag
const text = lang == 'en'? 'ES' : 'EN'
  return (
    <a href={toggleLanguage(window.location.pathname)} className="flex space-x-2 xl:space-x-2 sm:space-x-0  items-center justify-center hover:scale-105 transition hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm  ">
    <img className='!block sm:!hidden xl:!block' src={flag.src} width={17} height={17} alt='Language Flag'/>
    <span  className="text-gray-700 dark:text-gray-400  font-medium">
        {text}
    </span>
    </a>

  )
}

