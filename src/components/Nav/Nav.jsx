import React from 'react'

const Nav = () => {
  return (
    <div>
      <nav className="text-black p-4  ">
  <div className="container mx-auto">
    <ul className="flex uppercase text-[14px] leading-6 justify-center  text-black">
      <li className="relative group mr-20">
        <a href="/">Каталог</a>
        <div className="hidden block absolute left-0 mt-2 space-y-2 bg-white text-black group-hover:block">
          <a href="/">Духи</a>
          <a href="/">Парфюм</a>
          <a href="/">Косметика</a>
        </div>
      </li>
      <li className='mr-20'><a href="/">Бренды</a></li>
      <li className='mr-20'><a href="/">Акции</a></li>
      <li className='mr-20'><a href="/">Вакансии</a></li>
      <li><a href="/">О нас</a></li>
    </ul>
  </div>
</nav>
    </div>
  )
}

export default Nav
