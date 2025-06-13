const video = document.getElementById("video");
const videoSection = document.getElementById("introVideo_wrap"); // 비디오를 감싸는 섹션 (또는 직접 video)

const videoPlayback = 1000;
const videoEnding = 300;

// 호버 혹은 클릭 인터랙션을 위한 요소 불러오기
let user_box_cover = document.querySelectorAll(".user_box_cover");
let designSystem_Symbol_box = document.querySelector(".Symbol");
let symbol_svg = document.querySelector(".symbol_svg");
let symbol_grid = document.querySelector(".symbol_grid");

// keyfunction 카드 스크롤 애니메이션을 위한 불러오기
const functionTextBoxs = document.querySelectorAll(".functionTextBox");
const functionCards = document.querySelectorAll(".function_list");

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



// keyfunction 카드 스크롤 애니메이션
const observerOptions = {
  root: null, // 뷰포트 기준
  rootMargin: "0px",
  threshold: 0.5, // 50% 보이면 감지 (중앙쯤 오면)
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const index = entry.target.dataset.index;

    if (entry.target.classList.contains("function_list")) { // keyfunction 카드
      if (entry.isIntersecting) {
        // 먼저 모든 텍스트 카드 비활성화
        functionTextBoxs.forEach((el) => el.classList.remove("on"));
        // 해당 index만 활성화
        functionTextBoxs[index].classList.add("on");
      }
    } else if (entry.target.id === "video" || entry.target.id === "introVideo_wrap") { // 비디오 섹션
      if (entry.isIntersecting) {
        if (video.paused) {
          video.play().catch(error => {
            console.error('Video play error:', error);
          });
          console.log('Video playing due to intersection.');
        }
      } else {
        if (!video.paused) {
          video.pause();
          console.log('Video paused due to leaving intersection.');
        }
      }
    }
  });
}, observerOptions);

// 각각의 카드 관찰 시작
functionCards.forEach((card) => observer.observe(card));

// 비디오 또는 비디오 섹션 관찰 시작
// videoSection이 화면에 들어오면 비디오가 보이므로 videoSection을 관찰하는 것이 더 적절할 수 있습니다.
// 만약 video 자체가 스크롤 영역에 직접적으로 있다면 video를 직접 관찰해도 됩니다.
observer.observe(videoSection); // 또는 observer.observe(video);


// 호버 혹은 클릭 인터랙션을 위한 기능 구현
user_box_cover.forEach(box_cover=> {
  box_cover.addEventListener("click", () => {
  box_cover.classList.add("on");
  console.log("유저박스 클릭됨");
});
})


// symbol_svg와 symbol_grid 애니메이션 (기존 코드 유지)
setInterval(() => {
  symbol_svg.classList.add("on");
  symbol_grid.classList.add("on");
}, 3000);

setInterval(() => {
  symbol_svg.classList.remove("on");
  symbol_grid.classList.remove("on");
}, 6000);

console.log(coliving_board);

