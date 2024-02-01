import React, { useState } from 'react'
import { FiMapPin } from 'react-icons/fi';
import { FaBars } from 'react-icons/fa'; // Пример иконы, вы можете выбрать другую из библиотеки react-icons
import './Nav.css'
import { IoIosClose } from 'react-icons/io';
import { CButton, COffcanvas, COffcanvasHeader, COffcanvasTitle, CCloseButton, COffcanvasBody } from '@coreui/react';

const Nav = () => {
  
  const [visible, setVisible] = useState(false)
  return (
    <>
    <div>
      <div className='flex items-center p-2 bg-[#F0F0F0]'>
        <a href='shops' className='text-1xl flex'><button className='text-1xl mr-5'><FiMapPin /></button> Магазины</a>
        <div className="menu-icon ml-5 text-1xl" onClick={() => setVisible(true)} >
         <FaBars />
      </div>
      </div>
      <div>
        <nav className="text-black p-4">
          <div className="container mx-auto">
            <ul className="flex uppercase text-[14px] leading-6 justify-center  text-black">
              <li className='mr-20'><a href="/brands">Бренды</a></li>
              <li className='mr-20'><a href="/work">Вакансии</a></li>
              <li><a href="/about">О нас</a></li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
    
        <COffcanvas placement="top" className='z-[999999999]' visible={visible} onHide={() => setVisible(false)}>
        <COffcanvasHeader>
          <COffcanvasTitle>Меню</COffcanvasTitle>
          <button className='text-3xl'  onClick={() => setVisible(false)}>
            <IoIosClose/>
          </button>
        </COffcanvasHeader>
        <COffcanvasBody>
       
          <div className="container mx-auto ">
            <ul className="block uppercase text-[18px] leading-6 justify-center  text-black">
              <li className='mr-20 mb-3'><a href="/brands">Бренды</a></li>
              <li className='mr-20 mb-3'><a href="/work">Вакансии</a></li>
              <li><a href="/about">О нас</a></li>
            </ul>
          </div>
        
        </COffcanvasBody>
      </COffcanvas>
      </>
  )
  
}

export default Nav
