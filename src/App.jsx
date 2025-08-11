import { useMemo, useState } from 'react';
import './App.css';
import ProductSwiper from './components/ProductSwiper';


// 가장 쉬운 사용을 위해 public/Img 기준 경로 사용
const ITEMS = [
  // 단품
  { id: 'music',        name: '뮤지션 실바니안',        price: 13000, img: './public/Img/music.jpg.avif',       cat: 'single',  cls: 'music' },
  { id: 'travel',       name: '여행자 실바니안',        price: 11000, img: './public/Img/travel.jpg.avif',      cat: 'single',  cls: 'travel' },
  { id: 'sheep',        name: '양 실바니안',            price: 15000, img: './public/Img/sheep.jpg',            cat: 'single',  cls: 'sheep' },
  { id: 'dog',        name: '리트리버 실바니안',            price: 15000, img: './public/Img/dog.jpg.avif',            cat: 'single',  cls: 'sheep' },
  { id: 'baby',        name: '흔들목마 실바니안',            price: 25000, img: './public/Img/baby.jpg',            cat: 'single',  cls: 'sheep' },

  // 한정판
  { id: 'caramel',      name: '(한정판) 카라멜 실바니안', price: 22000, img: './public/Img/caramel.jpg',          cat: 'limited', cls: 'caramel' },
  { id: 'ghost',        name: '(한정판) 유령 실바니안',   price: 25000, img: './public/Img/ghostcat.jpg.webp',    cat: 'limited', cls: 'ghost' },

  // 세트
  { id: 'picnic',       name: '피크닉 세트',             price: 40700, img: './public/Img/picnic.jpg',           cat: 'set',     cls: 'picnic' },
  { id: 'kindergarten', name: '유치원 세트',             price: 50700, img: './public/Img/kindergarten.jpg',     cat: 'set',     cls: 'kindergarten' },
  { id: 'lunch',        name: '패밀리 오후 세트',        price: 51700, img: './public/Img/lunch.jpg',            cat: 'set',     cls: 'lunch' },
];

const fmt = (n) => n.toLocaleString('ko-KR');

export default function App() {
  // 탭 상태
  const [tab, setTab] = useState('single');

  // 장바구니: key = item.id, value = { name, price, count }
  const [cart, setCart] = useState({});

  const total = useMemo(
    () => Object.values(cart).reduce((sum, { price, count }) => sum + price * count, 0),
    [cart]
  );

  const addToCart = (item) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[item.id]) next[item.id].count += 1;
      else next[item.id] = { name: item.name, price: item.price, count: 1 };
      return next;
    });
  };

  const inc = (id) => {
    setCart((prev) => ({ ...prev, [id]: { ...prev[id], count: prev[id].count + 1 } }));
  };
  const dec = (id) => {
    setCart((prev) => {
      const next = { ...prev };
      if (!next[id]) return prev;
      if (next[id].count > 1) next[id].count -= 1;
      else delete next[id];
      return next;
    });
  };

  const clearAll = () => setCart({});
  const checkout = () => {
    if (Object.keys(cart).length === 0) {
      alert('장바구니가 비어있습니다 😢');
      return;
    }
    alert('주문 감사합니다 🐰');
    setCart({});
  };

  // 탭별 상품
  const itemsInTab = ITEMS.filter((i) => i.cat === tab);

  return (
    <div className="container">
      <div id="menu">
        <h1>🐰 Hello! It&apos;s Sylvanian Families Shop 🐰</h1>

        {/* ✅ 탭 버튼 */}
        <div className="tab-buttons" role="tablist" aria-label="상품 카테고리">
          <button
            className={`tab-btn ${tab === 'single' ? 'active' : ''}`}
            role="tab"
            aria-selected={tab === 'single'}
            onClick={() => setTab('single')}
          >
            단품
          </button>
          <button
            className={`tab-btn ${tab === 'limited' ? 'active' : ''}`}
            role="tab"
            aria-selected={tab === 'limited'}
            onClick={() => setTab('limited')}
          >
            한정판
          </button>
          <button
            className={`tab-btn ${tab === 'set' ? 'active' : ''}`}
            role="tab"
            aria-selected={tab === 'set'}
            onClick={() => setTab('set')}
          >
            세트
          </button>
        </div>

        {/* ✅ 탭 패널 */}
        {/* tab === 'single' */}
        <div className={`tab-panel ${tab === 'single' ? 'active' : ''}`} id="tab-single" role="tabpanel" hidden={tab !== 'single'}>
          <ProductSwiper items={ITEMS.filter(i => i.cat === 'single')} onPick={addToCart} />
        </div>

        {/* tab === 'limited' */}
        <div className={`tab-panel ${tab === 'limited' ? 'active' : ''}`} id="tab-limited" role="tabpanel" hidden={tab !== 'limited'}>
          <ProductSwiper items={ITEMS.filter(i => i.cat === 'limited')} onPick={addToCart} />
        </div>

        {/* tab === 'set' */}
        <div className={`tab-panel ${tab === 'set' ? 'active' : ''}`} id="tab-set" role="tabpanel" hidden={tab !== 'set'}>
          <ProductSwiper items={ITEMS.filter(i => i.cat === 'set')} onPick={addToCart} />
        </div>

        <h3>💵 결제하기</h3>

        {/* 장바구니 */}
        <div id="cart">
          {Object.entries(cart).length === 0 ? (
            <p>장바구니가 비어 있어요</p>
          ) : (
            Object.entries(cart).map(([id, { name, price, count }]) => (
              <div key={id} className="cart-row">
                <button className="qty-btn" onClick={() => dec(id)}>−</button>
                <span>{name} x{count} ({fmt(price * count)}원)</span>
                <button className="qty-btn" onClick={() => inc(id)}>+</button>
              </div>
            ))
          )}
          <p>Total: <span id="total">{fmt(total)}</span>원</p>
        </div>

        <div className="btn-group">
          <button onClick={clearAll} className="btn gray" id="clearBtn">모두삭제</button>
          <button onClick={checkout} className="btn pink" id="checkoutBtn">결제하기</button>
        </div>
      </div>
    </div>
  );
}

// 상품 목록 그리드 컴포넌트
function MenuGrid({ items, onPick }) {
  return (
    <div className="menu-items">
      {items.map(item => (
        <button
          key={item.id}
          type="button"
          className={`item ${item.cls}`}
          onClick={() => onPick(item)}
          aria-label={`${item.name} 담기`}
        >
          <img src={item.img} alt={item.name} />
          {item.name}<br />{item.price.toLocaleString()}원
        </button>
      ))}
    </div>
  );
}
