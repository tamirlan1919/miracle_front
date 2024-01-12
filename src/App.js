import './App.css';
import ProductCard from './components/ProductCard/ProductCard';
import CarousBrands from './components/carousel-brands/CarousBrands';
import Carousel from './components/carousel/Carousel';
import Header from './components/header/Header';
import Nav from './components/Nav/Nav';
import Shops from './components/Shops/Shops';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserIcon from './components/UserIcon/UserIcon';
import ProductDetails from './components/ProductDeatils/ProductDetails';
import Login from './components/Login/Login';
import About from './pages/About/About';
import Work from './pages/Work/Work';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import BrandProducts from './pages/BrandProducts/BrandProducts';
import Registration from './components/Registration/Registration';
import Favorites from './components/Favorites/Favorites';
import Cart from './components/Cart/Cart';
import Home from './pages/Home/Home';
import FooterComp from './components/Footer/Footer';
import { MantineProvider } from '@mantine/core';
import { NotPage } from './pages/NotPage/NotPage';
import Logout from './components/Logout';
import Profile from './pages/Profile/Profile';
import AllCategory from './pages/AllCategory/AllCategory';
import SearchResults from './pages/SearchResults/SearchResults';
import Orders from './pages/Orders/Orders';
import BrandPage from './pages/BrandPage/BrandPage';
import StickyBox from "react-sticky-box";
import { authMe } from './redux/slice/authSlice';
import { getCategories, getProducts } from './redux/slice/productSlice';
import { HashLoader } from 'react-spinners';
import styles from './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
function App() {
 



  return (
    <>
    <MantineProvider defaultColorScheme='dark'>
    <BrowserRouter>
    <Nav/>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="shops" element={<Shops />} />
      <Route path="products/:id" element={<ProductDetails />} />
      <Route path = 'about' element = {<About/>}/>
      <Route path = 'work' element = {<Work/>}/>
      <Route path="login" element={<Login />} />
      <Route path="logout" element={<Logout />} />
      <Route path="favorites" element={<Favorites />} />
      <Route path="sign-up" element={<Registration />} />
      <Route path="cart" element={<Cart />} />
      <Route path="profile" element={<Profile />} />
      <Route path='category' element = {<AllCategory/>}/>
      <Route path="/search-results/:query" element={<SearchResults/>} />
      <Route path="categories/:name" element={<CategoryPage/>} />
      <Route path="brands/" element={<BrandPage/>} />
      <Route path="brands/:name" element={<BrandProducts/>} />
      <Route path="orders" element={<Orders/>} />
      
      <Route path='*' element={<NotPage/>} />

    </Routes>
    <FooterComp/>
  </BrowserRouter>

  </MantineProvider>

  </>

  );
}
export default App
