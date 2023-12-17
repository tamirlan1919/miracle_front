import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosClose } from "react-icons/io";

import { BsList } from 'react-icons/bs';
import { AiOutlineHeart, AiOutlineUser, AiOutlineShopping } from 'react-icons/ai';
import { FiMapPin } from 'react-icons/fi';
import { getProducts } from '../../redux/slice/productSlice';
import SearchComponent from '../SearchComponent/SearchComponent';
import { getCategories } from '../../redux/slice/catalogSlice';
import { authMe } from '../../redux/slice/authSlice'; 
import { MdHome } from "react-icons/md";

import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import img from './Frame 1 (3).svg';
import { CButton, COffcanvas, COffcanvasHeader, COffcanvasTitle, CCloseButton, COffcanvasBody } from '@coreui/react';


const Header = () => {
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.categories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.auth);
  const [avatar, setAvatar] = useState(null);
  const [isAtTop, setIsAtTop] = useState(true);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Dispatch the necessary actions to fetch products and categories when the component mounts
    dispatch(authMe())
    dispatch(getCategories());
    const handleScroll = () => {
      // Проверка, находится ли пользователь в верхней части страницы
      setIsAtTop(window.scrollY >= 200);
    };

    // Добавление слушателя события прокрутки
    window.addEventListener('scroll', handleScroll);

    // Очистка слушателя при размонтировании компонента
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  

  }, [dispatch]);

  useEffect(() => {
    // Получите аватар, если у пользователя есть данные
    if (data) {
      const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.username)}`;
      setAvatar(avatarUrl);
    }
  }, [data]);
  return (
    <>
      <div className='block items-center p-2 bg-[#F0F0F0]'>
        <a href='shops' className='text-1xl flex'><button className='text-1xl mr-5'><FiMapPin /></button> Магазины</a>
      </div>
      <div>
        <nav className="text-black p-4">
          <div className="container mx-auto">
            <ul className="flex uppercase text-[14px] leading-6 justify-center  text-black">
              <li className='mr-20'><a href="/">Бренды</a></li>
              <li className='mr-20'><a href="/">Акции</a></li>
              <li className='mr-20'><a href="/work">Вакансии</a></li>
              <li><a href="/about">О нас</a></li>
            </ul>
          </div>
        </nav>
      </div>
      <div className={`block items-center p-2  ${isAtTop ? 'sticky-top' : ''}`}>
      <div className='container mb-3'>
        <div className="row">
          <div className="imgs  col-xl-2 mr-[50px] col-lg-2">
            <a href="/" className='miracle'><img className='miracle_img w-full' src={img} alt="" /></a>
          </div>
          <div className={`col-xl-2 col-lg-1 col-md-1 col-sm-1  py-2 rounded-lg max-w-[148px] self-center  flex max-h-[42px]  mr-7  text-[12px]   catalog ${isModalOpen ? 'bg-[#E8E8E8] text-[black]' : 'bg-[#028103] text-white' }`} onClick={openModal}>
            {isModalOpen ?
            <button className='bs text-3xl'>
              
            <IoIosClose />
            </button>
            :
            
            <button className='bs text-2xl'>
            <BsList />
            </button>}
          </div>
          <div className="poisk  col-xl-5 col-lg-6 col-md-12 col-sm-12  self-center block ">
            <SearchComponent />
          </div>
          <div className='col-xl-2 users col-lg-2 col-md-12 col-sm-12 pl-10 py-1 self-center text-3xl'>
            <div className="wrap flex">
              <div className="home">
              <a href="/">
                <button className=' btns '><MdHome/> </button>
              </a>
              </div>
              <div className="favorite">
            <a href="/favorites">
                <button className=' btns '><AiOutlineHeart /></button>
              </a>
              </div>
              <div className="cartt max-w-[46px]">
                <a href="/cart">
                  <div className="wrap">
                  {Array.isArray(data?.cart) && data.cart.length > 0 ? (
                    <>
                      <p className='relative top-[20px] right-[-14px] font-bold text-[#028103] text-[15px]'>
                        {data.cart.length}
                      </p>
                      <button className='btns text-4xl relative top-[-20px]'><AiOutlineShopping /></button>
                    </>
                  ) : (
                    <button className='btns text-4xl'><AiOutlineShopping /></button>
                  )}

                  </div>
                  
                </a>
                </div>
              <div className={`menu ${isModalOpen ? '] text-[black]' : ' text-black' }`} onClick={openModal}>
            {isModalOpen ?
            <button className='bs text-3xl'>
              
            <IoIosClose />
            </button>
            :
            
            <button className='bs text-3xl'>
            <BsList />
            </button>}
          </div>
              <div className="user">
                
              {data ? (
              // Если данные о пользователе есть, выводим его имя
              (
                
                <a href='/profile'>
                <button >
                  {avatar ? (
                    <img src={avatar} alt="User Avatar" className="rounded-full h-8 w-8 mr-2" />
                  ) : (
                    <AiOutlineUser />
                  )}
                </button>
              </a>
              )
            ) : (
              
              <a href="/login">
                <button type="button" className="mr-4 text-3xl mt-1 btns border-none pointer-events-auto">
                  <AiOutlineUser />
                </button>
              </a>
           )} 
              </div>

              </div>
          </div>
        </div>
      </div>
      </div>
      <COffcanvas placement="start" className= 'text-black' scroll={true} visible={isModalOpen} onHide={closeModal}>
        <COffcanvasHeader>
          <COffcanvasTitle>Categories</COffcanvasTitle>
          
          <button className='text-3xl' onClick={closeModal}>
            <IoIosClose/>
          </button>
        </COffcanvasHeader>
        <COffcanvasBody>
          {/* Render categories */}
          {status === 'loading' && <p>Loading...</p>}
          {status === 'loaded' && (
            <ul className="list-group">
              {categories?.map((category) => (
                <li key={category?.id} className="list-group-item">
                  <Link to={`/categories/${category.attributes?.slug}`} onClick={closeModal}>
                    {category.attributes?.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {status === 'error' && <p>Error loading categories.</p>}
        </COffcanvasBody>
      </COffcanvas>
    </>
  );
};

export default Header;