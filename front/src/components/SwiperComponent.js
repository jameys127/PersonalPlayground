import React, {useState} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import {Pagination, Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination'
import 'swiper/css/navigation'


const SwiperComponent = (prop) => {
  const [expandedImg, setExpandedImg] = useState(null);
  return (
    <>
      <div className='slider'>
      <Swiper
        spaceBetween={50}
        modules={[Pagination, Navigation]}
        // pagination={{clickable: true}}
        navigation
        loop={true}
        slidesPerView={3}
      >
        {prop.imgs.map((img) => (
          <SwiperSlide className='swiper-slide'><img src={img} alt='img' onClick={() => setExpandedImg(img)}/></SwiperSlide>
        ))}
      </Swiper>
      </div>
      {expandedImg && (
        <div className='lightbox-overlay' onClick={() => setExpandedImg(null)}>
          <div className='lightbox-content' onClick={(e) => e.stopPropagation()}>
            <img src={expandedImg} alt='expanded image' />
            <button className='close-btn' onClick={() => setExpandedImg(null)}>
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default SwiperComponent
