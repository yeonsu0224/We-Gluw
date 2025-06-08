
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