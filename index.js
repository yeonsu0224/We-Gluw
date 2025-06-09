
const video = document.getElementById("video");
const videoSection = document.getElementById("introVideo_wrap");

const videoPlayback = 1000;
const videoEnding = 300;

//호버 혹은 클릭 인터랙션을 위한 요소 불러오기

let coliving_board = document.querySelector(".coliving_board")
let designSystem_Symbol_box = document.querySelector(".Symbol")
let symbol_svg = document.querySelector(".symbol_svg")
let symbol_grid = document.querySelector(".symbol_grid")






//호버 혹은 클릭 인터랙션을 위한 기능 구현
coliving_board.addEventListener("click", ()=>{

  coliving_board.classList.add("on");
  console.log("보드 클릭됨")

})

designSystem_Symbol_box.addEventListener('mouseenter', () =>{
  symbol_svg.classList.add("on")
  symbol_grid.classList.add("on")

})

designSystem_Symbol_box.addEventListener('mouseleave', () =>{
  symbol_svg.classList.remove("on")
  symbol_grid.classList.remove("on")
})




console.log(coliving_board);
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

document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video'); // 단일 비디오 요소를 선택합니다.
    if (!video) { // 비디오 요소가 없으면 함수 종료
        console.warn('Video element with ID "myVideo" not found.');
        return;
    }

    // 비디오를 재생할 스크롤 Y 위치 (픽셀 단위)를 정의합니다.
    // 이 값은 비디오 요소가 페이지의 어느 정도 높이에 있는지에 따라 조절해야 합니다.
    const playScrollPosition = 2000; // 예를 들어, 스크롤이 1000px 내려왔을 때 재생

    // 비디오를 일시 정지할 스크롤 Y 위치를 정의합니다.
    // playScrollPosition보다 커야 합니다.
    const pauseScrollPosition = 3000; // 예를 들어, 스크롤이 2000px를 넘어갔을 때 일시 정지

    let videoPlayed = false; // 비디오가 한 번 재생되었는지 추적하는 플래그

    function handleScroll() {
        // 현재 스크롤 Y 위치를 가져옵니다.
        const currentScrollY = window.scrollY || window.pageYOffset;

        // 비디오가 재생되어야 할 스크롤 위치에 도달했는지 확인
        if (currentScrollY >= playScrollPosition && currentScrollY < pauseScrollPosition) {
            if (video.paused) { // 비디오가 현재 일시 정지 상태이면 재생
                video.play().catch(error => {
                    console.error('Video play error:', error);
                    // 자동 재생 정책 등으로 인해 재생이 실패할 경우를 대비
                });
                videoPlayed = true; // 재생되었음을 표시
                console.log('Video playing due to scroll position.');
            }
        } else {
            // 비디오가 재생 중이고, 재생 범위를 벗어났으면 일시 정지
            if (!video.paused && videoPlayed) {
                video.pause();
                // video.currentTime = 0; // 필요하다면 재생 위치를 처음으로 돌림
                console.log('Video paused due to scroll position.');
            }
        }
    }

    // 스크롤 이벤트 리스너를 추가합니다.
    window.addEventListener('scroll', handleScroll);

    // 페이지 로드 시 초기 상태를 한 번 확인하여 비디오가 바로 재생될 수 있는지 확인
    handleScroll();
});