const video = document.getElementById("video");
const videoSection = document.getElementById("introVideo_wrap");

const videoPlayback = 1000;
const videoEnding = 300;

// 비디오 로드 후 영역 길이 설정

// Lenis 인스턴스 생성
const lenis = new window.Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});


// 부드러운 스크롤 실행
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);