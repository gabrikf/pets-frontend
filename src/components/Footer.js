import React from 'react'
import {  FaLinkedin, FaInstagram, FaLink } from 'react-icons/fa'
import { AiFillGithub } from 'react-icons/ai'

const Footer = () => {
    return (
        <div className='bg-white shadow p-8 dark:bg-gray-800'>
          <div className='container mx-auto text-center font-bold'>     
            <div className='grid grid-cols-5 justify-items-stretch'>
              <a   className='text-blue-600 hover:text-black justify-self-center' href='https://www.linkedin.com/in/gabrielkf/'><FaLinkedin /></a>
              <a className='text-red-600 hover:text-black justify-self-center' href='https://www.instagram.com/gabrikf/'><FaInstagram /></a>
              <a className="text-xs font-bold text-gray-800 dark:text-white lg:text-xs hover:text-gray-700 dark:hover:text-gray-300 relative bottom-2 md:bottom-0" href='https://www.instagram.com/gabrikf/'>made by: @gabrikf</a>
              <a className='text-purple-600 hover:text-black justify-self-center' href='https://github.com/gabrikf'><AiFillGithub /></a>
              <a className='text-gray-600 hover:text-black justify-self-center' href='https://gabrikf-resume.vercel.app/'><FaLink /></a>
            </div>
          </div>
        </div>
    )
}
 export default Footer
