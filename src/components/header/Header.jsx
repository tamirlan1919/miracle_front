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
import { FiBox } from "react-icons/fi";

import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import img from './Frame 1 (3).svg';
import { CButton, COffcanvas, COffcanvasHeader, COffcanvasTitle, CCloseButton, COffcanvasBody } from '@coreui/react';

import img1 from './whatsapp.svg'
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

      <div className={`best items-center p-2 ${isAtTop ? '' : ''}`}>
  <div className='container mb-3'>
    <div className={`row ${isAtTop ? 'sticky-top' : ''}`}>
      <div className="imgs col-xl-2 mr-[50px] col-lg-2">
        <a href="/" className='miracle'><img className='miracle_img w-full' src={img} alt="" /></a>
      </div>
      <div className={`col-xl-1 col-lg-1 col-md-1 col-sm-1 py-2 rounded-lg max-w-[148px] self-center flex max-h-[42px] mr-7 text-[12px] catalog ${isModalOpen ? 'bg-[#E8E8E8] text-[black]' : 'bg-[#028103] text-white'}`} onClick={openModal}>
        {isModalOpen ?
          <button className='bs text-3xl'>
            <IoIosClose />
          </button>
          :
          <button className='bs text-2xl'>
            <BsList />
          </button>}
      </div>
      <div className="poisk col-xl-5 col-lg-6 col-md-12 col-sm-12 self-center block">
        <SearchComponent />
      </div>
      <div className='col-xl-3 users col-lg-2 col-md-12 col-sm-12 pl-10 py-1 self-center text-3xl'>
        <div className="wrap flex align-middle">
          <div className="home">
            <a href="/">
              <button className=' btns mr-4'><MdHome /> </button>
            </a>
          </div>
          <div className="favorite">
            <a href="/favorites">
              <button className=' btns mr-4'><AiOutlineHeart /></button>
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
                    <button className='btns text-4xl relative top-[-20px] mr-4'><AiOutlineShopping /></button>
                  </>
                ) : (
                  <button className='btns text-4xl mr-4'><AiOutlineShopping /></button>
                )}

              </div>

            </a>
          </div>
          <div className={`menu ${isModalOpen ? 'text-[black]' : ' text-black'}`} onClick={openModal}>
            {isModalOpen ?
              <button className='bs text-3xl'>
                <IoIosClose />
              </button>
              :
              <button className='bs text-3xl'>
                <BsList />
              </button>}
          </div>
          {data ? (
          <div className={`order`}>
           
              <Link to={'/orders'}>
                <button className='mr-4'><FiBox /></button>
              </Link>
            
          </div>
          ) : <div className='d-none'></div>}
          <div className="userr">

            {data ? (
              // Если данные о пользователе есть, выводим его имя
              (
                <>
                  <a href='/profile'>
                    <button >
                      {avatar ? (
                        <img src={avatar} alt="User Avatar" className="rounded-full h-8 w-8 mr-4" />
                      ) : (
                        <AiOutlineUser />
                      )}
                    </button>
                  </a>
                </>
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
  <div className="elem max-w-[50px]" >
    <img src={img1} alt=""  />
  </div>
</div>

      <COffcanvas placement="start" className= 'text-black z-[9999999]' scroll={true} visible={isModalOpen} onHide={closeModal}>
        <COffcanvasHeader>
          <COffcanvasTitle>     <div className="w-[70%]">
        <a href="/" className='miracle'><img className='miracle_img w-full' src={img} alt="" /></a>
      </div></COffcanvasTitle>
          
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
                  <Link to={`/categories/${category?.attributes.name}`} onClick={closeModal}>
                    {category.attributes?.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {status === 'error' && <p>Error loading categories.</p>}
        </COffcanvasBody>
      </COffcanvas>
      
      
      {/* <div className="floating-button" >
      <svg className="circle" viewBox="0 0 100 100">
  <path id="circle" d="M 0,50 a 50,50 0 1,1 0,1 z" />
  <text>
    <textPath xlinkHref='#circle'>
      Задать вопрос
    </textPath>
  </text>
</svg>

</div> */}
    </>
  );
};

export default Header;