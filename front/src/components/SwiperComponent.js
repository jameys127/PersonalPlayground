import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import {Pagination, Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination'
import 'swiper/css/navigation'


const SwiperComponent = () => {
  return (
    <div className='slider'>
    <Swiper
      spaceBetween={50}
      modules={[Pagination, Navigation]}
      pagination={{clickable: true}}
      navigation
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide><img src='https://placehold.co/600x400' alt='img' /></SwiperSlide>
      <SwiperSlide><img src='https://placehold.co/600x400' alt='img' /></SwiperSlide>
      <SwiperSlide><img src='https://placehold.co/600x400' alt='img' /></SwiperSlide>
      <SwiperSlide><img src='https://placehold.co/600x400' alt='img' /></SwiperSlide>
    </Swiper>
    </div>
  )
}

export default SwiperComponent
