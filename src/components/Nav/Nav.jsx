import React from 'react'
import { FiMapPin } from 'react-icons/fi';

const Nav = () => {
  return (
    <div>
      <div className='block items-center p-2 bg-[#F0F0F0]'>
        <a href='shops' className='text-1xl flex'><button className='text-1xl mr-5'><FiMapPin /></button> Магазины</a>
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
  )
}

export default Nav
