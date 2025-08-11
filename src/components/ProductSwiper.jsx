// src/components/ProductSwiper.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// ...생략
export default function ProductSwiper({ items, onPick }) {
  if (!items?.length) return null;

  return (
    <Swiper
      className="mySwiper"              // 🔹 CSS 먹이기
      modules={[Pagination, A11y]}
      slidesPerView={2}
      spaceBetween={12}
      pagination={{ clickable: true }}
    >
      {items.map((item, i) => (
        <SwiperSlide key={`${item.id}-${i}`}>
          <button type="button" className={`item ${item.cls ?? ''}`} onClick={() => onPick(item)}>
            <div className="thumb">                         {/* 🔹 비율 고정 박스 */}
              <img src={item.img} alt={item.name} />
            </div>
            <div style={{ marginTop: 8 }}>
              {item.name}<br />{item.price.toLocaleString()}원
            </div>
          </button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

