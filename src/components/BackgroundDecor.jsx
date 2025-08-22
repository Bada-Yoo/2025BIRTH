// 여백에 깔릴 데코 이미지들 (src/images/* 에서 import)
import img1 from '../images/1.png'
import img2 from '../images/2.png'
import img3 from '../images/3.png'
import img4 from '../images/4.png'   // 👈 비밀 트리거
import img5 from '../images/5.png'
import img6 from '../images/6.png'
import img7 from '../images/7.png'
import img8 from '../images/8.png'
import img9 from '../images/9.png'
import img10 from '../images/10.png'

const slots = [
  { src: img1,  style: { top:  20, left:   1,  width: 160, rotate: -8 } }, // 좌상
  { src: img2,  style: { top:  22, right:  2,  width: 180, rotate:  6 } }, // 우상
  { src: img3,  style: { top:  40, left:   3,  width: 180, rotate: -4 } }, // 좌중
  // 👇 4번(비밀) — 클릭 시 팝업
  { src: img4,  style: { top:  50, right:  3,  width: 200, rotate:  8 }, secret: true }, // 우중(비밀)
  { src: img5,  style: { bottom: 7, left:   2,  width: 200, rotate: -10} }, // 좌하
  { src: img6,  style: { bottom: 5, right:  4,  width: 180, rotate:  10} }, // 우하
  { src: img7,  style: { top:   5, left:  12,  width: 120, rotate: 15 } },  // 좌 상단 보조
  { src: img8,  style: { top:  12, right: 12,  width: 120, rotate:  6 } },  // 우 상단 보조
  { src: img9,  style: { top:  60, left:  11,  width: 140, rotate: 20 } },  // 좌 하단 보조
  { src: img10, style: { top:  70, right: 15,  width: 140, rotate:  4 } },  // 우 하단 보조
]

export default function BackgroundDecor() {
  const handleSecretClick = () => {
    alert('오빠사랑해 💚')
  }

  return (
    <div className="decor" aria-hidden>
      {slots.map((s, i) => {
        const pos = {}
        if ('top' in s.style) pos.top = `${s.style.top}vh`
        if ('left' in s.style) pos.left = `${s.style.left}%`
        if ('right' in s.style) pos.right = `${s.style.right}%`
        if ('bottom' in s.style) pos.bottom = `${s.style.bottom}vh`

        return (
          <img
            key={i}
            src={s.src}
            alt=""
            className={`decor-img${s.secret ? ' secret' : ''}`}
            style={{
              ...pos,
              width: `${s.style.width}px`,
              transform: `rotate(${s.style.rotate}deg)`,
            }}
            // 비밀 이미지에만 클릭 이벤트
            onClick={s.secret ? handleSecretClick : undefined}
            onError={() => {}}
          />
        )
      })}
    </div>
  )
}
