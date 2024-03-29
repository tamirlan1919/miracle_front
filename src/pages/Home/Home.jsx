import React from 'react'
import Carousel from '../../components/carousel/Carousel'
import CarousBrands from '../../components/carousel-brands/CarousBrands'
import ProductCard from '../../components/ProductCard/ProductCard'
import Brands from '../../components/Brands/Brands'
import OurClients from '../../components/OurClients/OurClients'
import Nav from '../../components/Nav/Nav'
const Home = () => {
  return (
<>

    <Carousel/>
    <CarousBrands/>
    <h1 className='text-2xl text-center py-10 font-apple'>Товары</h1>
    <ProductCard/>
    <Brands/>
    <OurClients/>

</>
  )
}

export default Home
