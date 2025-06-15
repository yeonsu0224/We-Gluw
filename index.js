const introVideo = document.getElementById("video");
const videoSection = document.getElementById("introVideo_wrap"); // 비디오를 감싸는 섹션 (또는 직접 video)

const videoPlayback = 1000;
const videoEnding = 300;


const Go_getCake_btn = document.querySelector(".tutorialMessage.video")

//네비게이션
const goUpButton = document.getElementById("goUpButton")
const mainNavBtns = document.querySelectorAll(".nav_button")
const fixedHeaderHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;

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


// interaction_start_btn은 코드에 정의되지 않았습니다. 필요하면 HTML에서 해당 요소를 불러와야 합니다.
// interaction_start_btn.addEventListener("click", ()=> {
//  
// })


// 원하는 곳으로 이동할 수 있는 함수 구현
function customScrollTo(options) {
    // Lenis 인스턴스가 존재하는지 확인
    if (typeof lenis === 'undefined' || !lenis) {
        console.error('Lenis 인스턴스를 찾을 수 없습니다. Lenis가 초기화되었는지 확인하세요.');
        return;
    }

    const defaultOptions = {
        target: 0, // 기본값: 페이지 상단
        offset: 0,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        onComplete: null,
        immediate: false // 즉시 스크롤 여부
    };

    // 기본 옵션과 전달받은 옵션을 병합
    const mergedOptions = { ...defaultOptions, ...options };

    let scrollTarget = mergedOptions.target;

    // 타겟이 문자열(CSS 선택자)인 경우 요소로 변환
    if (typeof scrollTarget === 'string') {
        const element = document.querySelector(scrollTarget);
        if (element) {
            scrollTarget = element;
        } else {
            console.warn(`customScrollTo: 선택자 "${mergedOptions.target}"에 해당하는 요소를 찾을 수 없습니다. 페이지 상단으로 스크롤합니다.`);
            scrollTarget = 0; // 요소를 찾지 못하면 페이지 상단으로 폴백
        }
    }

    // immediate 옵션이 true인 경우 Lenis 대신 window.scrollTo 사용
    if (mergedOptions.immediate) {
        let scrollY = 0;
        if (typeof scrollTarget === 'number') {
            scrollY = scrollTarget + mergedOptions.offset;
        } else if (scrollTarget instanceof HTMLElement) {
            scrollY = scrollTarget.getBoundingClientRect().top + window.pageYOffset + mergedOptions.offset;
        }

        window.scrollTo({
            top: scrollY,
            behavior: 'auto' // 부드러운 스크롤 없이 즉시
        });

        if (mergedOptions.onComplete && typeof mergedOptions.onComplete === 'function') {
            mergedOptions.onComplete();
        }
        return; // 즉시 스크롤 후 함수 종료
    }

    // Lenis의 scrollTo 메소드 호출
    // Lenis는 target으로 HTMLElement, CSS 선택자 문자열, 또는 숫자(절대 픽셀 값)를 직접 받을 수 있음.
    // 하지만 우리는 target을 이미 HTMLElement나 숫자로 정제했으므로 그대로 사용합니다.
    lenis.scrollTo(scrollTarget, {
        offset: mergedOptions.offset,
        duration: mergedOptions.duration,
        easing: mergedOptions.easing,
        onComplete: mergedOptions.onComplete
    });
}


//네비게이션 구현

goUpButton.addEventListener("click", ()=> {
    customScrollTo({
        target: 0, // 뷰포트의 가장 상단 (절대 픽셀 값 0)
        duration: 1.2
    });
});
mainNavBtns.forEach(function (NavBtn) {
    NavBtn.addEventListener('click', function (e) {
        e.preventDefault(); // 기본 앵커 동작 방지

        const targetId = this.dataset.section; // 예: "#section1"
        const targetElement = document.querySelector(targetId); // 이 요소를 직접 전달할 수도 있음

        // customScrollTo 함수 사용 예시
        customScrollTo({
            target: targetId, // 또는 targetElement
            offset: fixedHeaderHeight * -1, // 고정 헤더 고려
            duration: 1.2,
            onComplete: () => {
                console.log(`${targetId} 섹션으로 스크롤 완료!`);
                // 필요한 추가 작업 수행
            }
        });
    });
});


document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // 기본 앵커 동작 방지

        const targetId = this.getAttribute('href'); // "#section1"
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth', // 부드러운 스크롤
                block: 'start'      // 요소의 시작 부분이 뷰포트 상단에 오도록 (기본값)
            });
        }
    });
});


// ======== 스냅 기능 재활용을 위한 함수 추가 시작 ========


function setupScrollSnapObserver(elementToSnap, threshold, offset = 0) {
    if (!elementToSnap) {
        console.warn('setupScrollSnapObserver: 스냅할 요소를 찾을 수 없습니다.', elementToSnap);
        return;
    }

    // 스냅이 발생 중인지 추적하는 플래그
    // 여러 스냅 대상이 있을 때 동시에 스크롤되는 것을 방지하기 위함
    let isSnapping = false;

    // 현재 Lenis가 스크롤 중인지 확인하는 함수 (Lenis 자체에 그런 직접적인 API는 없으므로 간접적으로 확인)
    // 좀 더 견고하게 하려면 lenis.on('scroll', ...)을 통해 스크롤 상태를 추적해야 함
    // 여기서는 간단하게 isSnapping 플래그로 제어합니다.

    const snapObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // isSnapping이 true면 이미 스냅 중이거나 스냅 동작이 방금 완료된 상태이므로 추가 동작 안함
            if (isSnapping) {
                return;
            }

            // entry.isIntersecting && entry.intersectionRatio >= threshold:
            // 요소가 지정된 threshold 이상으로 뷰포트에 들어왔는지 확인
            // entry.boundingClientRect.top >= 0:
            // 요소의 상단이 뷰포트 상단보다 아래에 있는지 (즉, 아래에서 위로 스크롤하여 진입)
            // 이를 통해 사용자가 위로 스크롤하여 지나쳤을 때는 스냅되지 않도록 합니다.
            // (사용자의 스크롤 방향에 따라 스냅 동작을 다르게 할 수 있음)

            // 만약 위에서 아래로 스크롤하다가 threshold를 넘어가고,
            // 요소의 상단이 뷰포트 상단보다 아래에 있을 때 스냅
            if (entry.isIntersecting && entry.intersectionRatio >= threshold && entry.boundingClientRect.top >= 0) {
                // 이전에 스크롤이 끝난 상태가 아니면 (예: 사용자가 직접 스크롤 중)
                // Lenis의 스크롤이 시작되면 isSnapping을 true로 설정
                isSnapping = true;
                console.log(`스크롤 스냅 발생: ${elementToSnap.id || elementToSnap.tagName}이(가) ${threshold * 100}% 이상 보임`);

                lenis.scrollTo(elementToSnap, {
                    offset: offset, // 고정 헤더 등이 있다면 음수 값으로 보정 (예: -fixedHeaderHeight)
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    onComplete: () => {
                        // 스크롤 완료 후 isSnapping 플래그 초기화
                        isSnapping = false;
                        console.log(`스크롤 스냅 완료: ${elementToSnap.id || elementToSnap.tagName}`);
                    }
                });
            }
        });
    }, {
        root: null, // 뷰포트 기준
        rootMargin: "0px",
        threshold: threshold // threshold를 인자로 받음
    });

    snapObserver.observe(elementToSnap);
}

// ======== 스냅 기능 재활용을 위한 함수 추가 끝 ========


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
    }
    // 비디오 재생/일시정지 로직은 그대로 유지 (스냅 로직과 분리)
    else if (entry.target.id === "video" || entry.target.id === "introVideo_wrap") { // 비디오 섹션
      if (entry.isIntersecting) {
        if (introVideo.paused) {
          introVideo.play().catch(error => {
            console.error('Video play error:', error);
          });
          console.log('Video playing due to intersection.');
        }
      } else {
        if (!introVideo.paused) {
          introVideo.pause();
          console.log('Video paused due to leaving intersection.');
        }
      }
    }
  });
}, observerOptions);

// 각각의 카드 관찰 시작
functionCards.forEach((card) => observer.observe(card));

// 비디오 섹션 재생/일시정지 관찰 시작
observer.observe(videoSection);


// ======== 비디오 특정 시간 감지 로직 (이전 답변에서 수정된 부분) ========
const targetTime = 37;
let eventTriggered = false;

introVideo.addEventListener('timeupdate', () => {
    if (introVideo.currentTime >= targetTime && !eventTriggered) {
        console.log(`${targetTime}초 지점에 도달했습니다!`);
        eventTriggered = true;

        Go_getCake_btn.classList.add("on");
    }
});

introVideo.addEventListener('play', () => {
    if (eventTriggered && introVideo.currentTime < targetTime) {
        eventTriggered = false;
    }
});
introVideo.addEventListener('seeked', () => {
    if (eventTriggered && introVideo.currentTime < targetTime) {
        eventTriggered = false;
    }
});


Go_getCake_btn.addEventListener("click", ()=>{
  customScrollTo({
        target: '#interaction',
        offset: -30,
        duration: 1.5
    });

})


// ======== 비디오 특정 시간 감지 로직 끝 ========


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

// ======== 새로운 스냅 기능 적용 ========

// 비디오 상단보다 조금 더 아래로 스크롤되도록 offset 조정
const videoSnapPadding = 50; // 비디오 상단에서 뷰포트 상단으로부터 추가할 여백 (px)

// 비디오 섹션에 스냅 기능 적용 (뷰포트 50% 이상 보이면 스냅)
// offset은 고정 헤더 높이를 고려한 후, videoSnapPadding 만큼 더 아래로 스크롤되도록 설정
setupScrollSnapObserver(videoSection, 0.5, -fixedHeaderHeight + videoSnapPadding);

// 필요하다면 다른 섹션에도 이 함수를 재활용하여 스냅 기능을 적용할 수 있습니다.
// 예시:
// const someOtherSection = document.getElementById('someOtherSectionId');
// setupScrollSnapObserver(someOtherSection, 0.7, -fixedHeaderHeight + 30);