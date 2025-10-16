import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import {Pagination, Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination'
import 'swiper/css/navigation'


const SwiperComponent = (prop) => {
  console.log('imgs: ', prop.imgs);
  return (
    <div className='slider'>
    <Swiper
      spaceBetween={50}
      modules={[Pagination, Navigation]}
      pagination={{clickable: true}}
      navigation
      slidesPerView={3}
    >
      {prop.imgs.map((img) => (
        <SwiperSlide><img src={img} alt='img'/></SwiperSlide>
      ))}
      {/* <SwiperSlide><img src='https://placehold.co/600x400' alt='img' /></SwiperSlide>
      <SwiperSlide><img src='https://placehold.co/600x400' alt='img' /></SwiperSlide>
      <SwiperSlide><img src='https://placehold.co/600x400' alt='img' /></SwiperSlide>
      <SwiperSlide><img src='https://placehold.co/600x400' alt='img' /></SwiperSlide> */}
    </Swiper>
    </div>
  )
}

export default SwiperComponent
