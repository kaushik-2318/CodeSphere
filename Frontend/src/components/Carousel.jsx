import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./css/carousel.css";
import {
  Autoplay,
  EffectCoverflow,
  Pagination,
  FreeMode,
} from "swiper/modules";

import img1 from "/screenshots/1.jpg";
import img2 from "/screenshots/12.jpg";
import img3 from "/screenshots/6.jpg";
import img4 from "/screenshots/5.jpg";
import img5 from "/screenshots/BlueDeerLoginForm.png";
import img6 from "/screenshots/FoxLoginForm.png";
import img7 from "/screenshots/NeonButton.png";

function Carousel() {
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 1,
          stretch: 0,
          depth: 100,
          modifier: 4,
          slideShadows: false,
        }}
        autoplay={{
          delay: 1500,
        }}
        loop={true}
        pagination={true}
        modules={[Autoplay, EffectCoverflow, Pagination, FreeMode]}
      >
        <SwiperSlide>
          <img src={img1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img4} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img5} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img6} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img7} alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Carousel;
