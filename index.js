const introVideo = document.getElementById("video");
const videoSection = document.getElementById("introVideo_wrap");

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

// 전역 플래그 추가: 수동 스크롤(네비게이션 클릭 등)이 진행 중인지 여부
let isManualScrolling = false;


// 원하는 곳으로 이동할 수 있는 함수 구현
function customScrollTo(options) {
    if (typeof lenis === 'undefined' || !lenis) {
        console.error('Lenis 인스턴스를 찾을 수 없습니다. Lenis가 초기화되었는지 확인하세요.');
        return;
    }

    const defaultOptions = {
        target: 0,
        offset: 0,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        onComplete: null,
        immediate: false
    };

    const mergedOptions = { ...defaultOptions, ...options };

    let scrollTarget = mergedOptions.target;

    if (typeof scrollTarget === 'string') {
        const element = document.querySelector(scrollTarget);
        if (element) {
            scrollTarget = element;
        } else {
            console.warn(`customScrollTo: 선택자 "${mergedOptions.target}"에 해당하는 요소를 찾을 수 없습니다. 페이지 상단으로 스크롤합니다.`);
            scrollTarget = 0;
        }
    }

    // 명시적 스크롤 시작 시 플래그 설정
    isManualScrolling = true;

    if (mergedOptions.immediate) {
        let scrollY = 0;
        if (typeof scrollTarget === 'number') {
            scrollY = scrollTarget + mergedOptions.offset;
        } else if (scrollTarget instanceof HTMLElement) {
            scrollY = scrollTarget.getBoundingClientRect().top + window.pageYOffset + mergedOptions.offset;
        }

        window.scrollTo({
            top: scrollY,
            behavior: 'auto'
        });

        if (mergedOptions.onComplete && typeof mergedOptions.onComplete === 'function') {
            mergedOptions.onComplete();
        }
        // 즉시 스크롤은 애니메이션이 없으므로 바로 플래그 해제
        isManualScrolling = false;
        return;
    }

    // Lenis 스크롤 완료 시 플래그 해제
    const originalOnComplete = mergedOptions.onComplete;
    mergedOptions.onComplete = () => {
        if (originalOnComplete) {
            originalOnComplete();
        }
        isManualScrolling = false;
        console.log("수동 스크롤 완료. 자동 스냅 재활성화.");
    };

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
        target: 0,
        duration: 1.2
    });
});

mainNavBtns.forEach(function (NavBtn) {
    NavBtn.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.dataset.section;
        const targetElement = document.querySelector(targetId);

        customScrollTo({
            target: targetId,
            offset: fixedHeaderHeight * -1,
            duration: 1.2,
            onComplete: () => {
                console.log(`${targetId} 섹션으로 스크롤 완료!`);
            }
        });
    });
});


// 이 부분은 위의 mainNavBtns.forEach 로직과 기능이 겹치므로 하나만 사용하는 것이 좋습니다.
// 만약 두 개의 네비게이션이 별도의 역할을 한다면 그대로 두세요.
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // customScrollTo를 사용하여 통일성을 유지합니다.
            customScrollTo({
                target: targetElement,
                offset: 0, // 필요에 따라 offset 조정
                duration: 1.2,
                // onComplete는 customScrollTo 내에서 이미 처리됩니다.
            });
        }
    });
});


/**
 * 특정 요소가 뷰포트에 일정 비율 이상 보일 때 해당 요소로 스크롤 스냅하는 Observer를 설정합니다.
 * @param {HTMLElement} elementToSnap 스냅할 대상 HTML 요소.
 * @param {number} threshold Intersection Observer의 threshold (0.0 ~ 1.0).
 * @param {number} offset 스크롤할 때 적용할 오프셋 (픽셀). (예: 고정 헤더 높이)
 * @param {number} [delay=0] 요소가 보인 후 스냅되기까지의 딜레이 시간 (밀리초). 기본값은 0 (딜레이 없음).
 */
function setupScrollSnapObserver(elementToSnap, threshold, offset = 0, delay = 0) {
    if (!elementToSnap) {
        console.warn('setupScrollSnapObserver: 스냅할 요소를 찾을 수 없습니다.', elementToSnap);
        return;
    }

    let isSnapping = false;
    let snapTimeoutId = null;

    const snapObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // 수동 스크롤 중이거나 이미 스냅 중인 경우 자동 스냅 방지
            if (isManualScrolling || isSnapping) {
                return;
            }

            // 요소가 뷰포트를 벗어나면 타이머 취소
            if (!entry.isIntersecting) {
                if (snapTimeoutId) {
                    clearTimeout(snapTimeoutId);
                    snapTimeoutId = null;
                    console.log(`스크롤 스냅 타이머 취소: ${elementToSnap.id || elementToSnap.tagName}이(가) 뷰포트를 벗어남.`);
                }
                return; // 요소가 벗어나면 더 이상 진행하지 않음
            }

            // 요소가 지정된 threshold 이상으로 뷰포트에 들어오고,
            // 요소의 상단이 뷰포트 상단보다 아래에 있을 때 (아래에서 위로 스크롤 진입)
            if (entry.intersectionRatio >= threshold && entry.boundingClientRect.top >= 0) {
                if (snapTimeoutId) {
                    clearTimeout(snapTimeoutId);
                }

                console.log(`스크롤 스냅 감지: ${elementToSnap.id || elementToSnap.tagName}이(가) ${threshold * 100}% 이상 보임. ${delay}ms 후 스냅 시도.`);

                snapTimeoutId = setTimeout(() => {
                    // 딜레이 이후에도 여전히 요소가 뷰포트에 있고, 스냅 중이 아니며, 수동 스크롤 중이 아니라면 스냅 실행
                    if (entry.isIntersecting && !isSnapping && !isManualScrolling) {
                        isSnapping = true;
                        console.log(`스크롤 스냅 발생: ${elementToSnap.id || elementToSnap.tagName}`);

                        lenis.scrollTo(elementToSnap, {
                            offset: offset,
                            duration: 1.2,
                            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                            onComplete: () => {
                                isSnapping = false;
                                console.log(`스크롤 스냅 완료: ${elementToSnap.id || elementToSnap.tagName}`);
                                snapTimeoutId = null;
                            }
                        });
                    } else {
                        console.log(`스크롤 스냅 취소됨: ${elementToSnap.id || elementToSnap.tagName}이(가) 딜레이 중 뷰포트를 벗어나거나 이미 스냅 중/수동 스크롤 중이었음.`);
                        snapTimeoutId = null;
                    }
                }, delay);
            }
        });
    }, {
        root: null,
        rootMargin: "0px",
        threshold: threshold
    });

    snapObserver.observe(elementToSnap);
}


const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const index = entry.target.dataset.index;

    if (entry.target.classList.contains("function_list")) {
      if (entry.isIntersecting) {
        functionTextBoxs.forEach((el) => el.classList.remove("on"));
        functionTextBoxs[index].classList.add("on");
      }
    } else if (entry.target.id === "video" || entry.target.id === "introVideo_wrap") {
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

functionCards.forEach((card) => observer.observe(card));

observer.observe(videoSection);


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


user_box_cover.forEach(box_cover=> {
  box_cover.addEventListener("click", () => {
  box_cover.classList.add("on");
  console.log("유저박스 클릭됨");
});
})


setInterval(() => {
  symbol_svg.classList.add("on");
  symbol_grid.classList.add("on");
}, 3000);

setInterval(() => {
  symbol_svg.classList.remove("on");
  symbol_grid.classList.remove("on");
}, 6000);


const videoSnapPadding = 50;

setupScrollSnapObserver(videoSection, 0.5, -fixedHeaderHeight + videoSnapPadding, 0);

const OverviewSection =document.getElementById('Overview')
setupScrollSnapObserver(OverviewSection, 0.5, -fixedHeaderHeight + videoSnapPadding, 0);


const UserResearchSection =document.getElementById('UserResearch')
setupScrollSnapObserver(UserResearchSection, 0.5, -350, 0);


functionCards.forEach(functionCard => {
  setupScrollSnapObserver(functionCard, 0.5, -fixedHeaderHeight -230 , 0);
})

const designSystemSection = document.querySelector('.designSystem_grid')
setupScrollSnapObserver(designSystemSection, 0.01, -600, 0);



const AppIntroduction = document.getElementById('AppIntroduction')
const Real_time_Logging = document.getElementById('Real_time_Logging')
const Food_management = document.getElementById('Food_management')
const ID_Lock = document.getElementById('ID_Lock')
const Admin_moderation = document.getElementById('Admin_moderation')
const ScanIssue = document.getElementById('ScanIssue')
const Food_sharing = document.getElementById('Food_sharing')
const Look_system = document.getElementById('Look_system')
const last_wegluePhoto = document.getElementById('last_wegluePhoto')



setupScrollSnapObserver(AppIntroduction, 0.3, -50, 0);
setupScrollSnapObserver(Real_time_Logging, 0.3, 50, 0);
setupScrollSnapObserver(Food_management, 0.3, -50, 0);
setupScrollSnapObserver(ID_Lock, 0.3, -50, 0);
setupScrollSnapObserver(Admin_moderation, 0.3, -50, 0);
setupScrollSnapObserver(ScanIssue, 0.3, -50, 0);
setupScrollSnapObserver(Food_sharing, 0.3, -50, 0);
setupScrollSnapObserver(Look_system, 0.3, -50, 0);
setupScrollSnapObserver(last_wegluePhoto, 0.3, -50, 0);