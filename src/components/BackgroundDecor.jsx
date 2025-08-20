export default function BackgroundDecor() {
  // 이미지 파일이 없으면 콘솔 경고만 나오고 화면은 정상 작동
  return (
    <div className="decor" aria-hidden>
      <img className="i1" src="/images/image1.png" alt="" onError={() => {}} />
      <img className="i2" src="/images/image2.png" alt="" onError={() => {}} />
      <img className="i3" src="/images/image3.png" alt="" onError={() => {}} />
      <img className="i4" src="/images/image4.png" alt="" onError={() => {}} />
    </div>
  );
}
