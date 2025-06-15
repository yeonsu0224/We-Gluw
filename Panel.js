//웹 인터랙션 섹션 요소들
window.interaction_panel = document.getElementById("interaction_panel")
window.interaction_start_btn = document.querySelector(".interaction_start_btn")
window.web_interaction_panel  =  document.querySelector(".panel.B")
const Interactionvideo_wrap = document.querySelector(".Interactionvideo_wrap")

// window.panel_mockup = document.querySelector(".panel_mockup_wrap")
// window.panel_mockup_img = document.querySelector(".panel_mockup")

let panel_mockup_num =0


//목업 화면들 경로 배열
const panel_mockupArr  =[
    "",
    "Img/panel/panel_2.png",
    "Img/panel/panel_3_sub.png",
    "",
    "Img/panel/panel_4.png",
    "Img/panel/panel_6.png",
    "Img/panel/panel_7.png",
    "Img/panel/panel_7.png",
    "Img/panel/panel_7.png",
    "Img/panel/panel_7.png"
]

const cake = document.querySelector(".cake_box")

const interaction_cover = document.querySelector(".interaction_cover")

//튜토리얼 메세지 불러오기 , 대사 배열

window.tutorialMessage_box = document.querySelector(".tutorialMessage.A")
window.tutorialMessage_box_sub = document.querySelector(".tutorialMessage.B")
window.tutorialMessage_cake = document.querySelector(".tutorialMessage.cake")

let tutorialNum =0
let tutorialNumSub =0

window.tutorialMessageArr =[
"냉장고에 로그인해  <strong>잠금을 해제</strong>하세요.",

"케이크를 냉장고에 넣어주세요",
"입고가 감지되었어요!",
"자동으로 음식 이름을 추측, 입력합니다",
"내 음식 리스트에 저장이 완료되었어요!",
"그럼, 다시 케이크를 먹은 범인을 찾아볼까요?",
"누군가 당신의 케이크를 꺼냈어요!",
"앱을 처음 키면 당신의 음식 리스트를 볼 수 있어요!",
"내 음식을 누가 꺼냈는지 입출고 내역을 확인 해 볼까요?",
"가장 최근 출고 내역을 볼까요?",
"범인을 찾았네요.. [최성민]님 이였군요",
"직접 말을 걸어볼 수도 있지만, 이번엔<br> 냉장고 관리자에게 경고를 부탁할까요?",
"좋아요, 문항에 따라 선택지를 골라주세요",
"먼저 사용자 신고,",
"사용자 중 <strong>[최성민]</strong> 님 선택",
"도난/분실을 선택",
"신고 내용을 자유롭게 적어 주세요",
"거의 다 왔어요!",
"축하드려요!<br>위글루의 가장 기본적인 사용법을 체험 해 보셨습니다!"

]

window.tutorialSubMessageArr = [
    "",
    "비밀번호, Face ID, 휴대폰 태그 등,<br> <strong>다양한 방식</strong>으로 로그인이 가능합니다!"
    ,"자동으로 사진이 등록됩니다,<br> 직접 선택 해 볼까요?",
    "음성이나 터치로 직접 설정 하실 수도 있어요!",
    "이제 위글루가 당신의 음식을 지켜봅니다.",
    "미리 등록 해 둔 음식이 다른 사용자에게 출고되면,<br> 사용자님께 알람이 전송돼요.",
    

]





let panel_section = document.querySelector(".panel_wrap")
let panelIntroductionButton = document.querySelector(".panel_Introduction_div");
let panelScreens = document.querySelectorAll(".panel_img");
let targetScreenIndex = 0;


let passwordClicked = 0;
let keypadButton = document.querySelectorAll(".keypad-button")
let passwordLength = document.querySelectorAll(".password_circle")
let passwordWrap = document.getElementById("password")


//음성인식 섹션
const panel_img_voice = document.querySelector(".panel_img.voice")
const listening_circle = document.querySelector(".circle")
const listening_text = document.querySelector(".listening-text")
const listening_typing = document.querySelector(".typing")
const button_container_voice = document.querySelector(".button-container.voice")
const voice_img = document.querySelector(".panel_img_voice")
const voice_done_btn = document.querySelector(".action-button.voice")


//케이크 이름 바꿔 낄 변수 돔 배열로 불러옴
let cakeNameTexts = document.querySelectorAll(".cake_Name")

let cake_photo_Select = document.querySelector(".cake_photo_Select")
let photo_Select_Check = document.querySelector(".cake_photo_Select")
let selectButtons = document.querySelectorAll(".action-button.select-button")
let selectButton_end= document.querySelector(".action-button.select-button.end")
let panelEnd_button = document.querySelector(".action-button.select-button.panelEnd")
let user_box_reports = document.querySelectorAll(".user-box-report")



let cake_Name_now = ""

const voice_icon = document.querySelector('.icon-button.voice-icon')
const nextChoice_btn = document.querySelector(".nextChoice_btn")

let imgBtnstate = true

let Selected = false

let search_input = document.querySelector(".input-group.search-input input")



//체크리스트
let checklist = document.querySelector(".checklist")

function setStep(index, status) {
  const items = document.querySelectorAll('.checkItem');
  items.forEach((item, i) => {
    item.classList.remove('pending', 'active', 'done', 'disabled');
    if (i < index) item.classList.add('done');
    else if (i === index) item.classList.add(status || 'active');
    else item.classList.add('disabled');
  });
}


//---------------------휴대폰 앱 인터랙션 부분

const Phone_wrap = document.querySelector(".Phone_pos")

const look_screen = document.querySelector(".phone_screen.look")
const alert_box = document.querySelector(".alert_img")
const app_on_screen = document.querySelector(".phone_screen.appOn")

const GoWarehousing_btn = document.querySelector(".GoWarehousing_btn")
const food_list_screen = document.querySelector(".phone_screen.food_list")

const phone_screen_img_old = document.querySelector(".phone_screen_img.food_list.old")


const Warehousing_screen = document.querySelector(".phone_screen.Warehousing")
const WarehousingDetails_screen = document.querySelector(".phone_screen.WarehousingDetails")
const phone_screen_img_Warehousing_old = document.querySelector(".phone_screen_img.Warehousing.old")



const Details_btn = document.querySelector(".Details_btn")
// const back_btn = document.querySelector(".back_btn")



const Progress_line = document.querySelector(".Progress_line")
let Progress = 20


const nav_food_list = document.querySelector(".nav-item.food_list")
const nav_mypage = document.querySelector(".nav-item.mypage")

// const myPage_screen = document.querySelector(".phone_screen.myPage ")
const report_btn = document.querySelector(".report_btn")


const report_screen = document.querySelector(".phone_screen.report")

const report_question = document.querySelector(".report_question")
const choices = document.querySelectorAll(".choices")
const report_input = document.querySelector(".report-input")

const confirm_box = document.querySelector(".confirm_box")
const report_confirm_box = document.querySelector(".report_confirm_box")

let choiceNum = 0

let go_mayPage = false


//성민씨 신고 부분

const help_boxs = document.querySelectorAll(".help-box")
Select_report = false

//신고 질문들
const questionsArray = ["",`사용자 신고를 선택하셨어요.<br>누구를 신고할까요?`,
                            "최성민님을 선택하셨어요.<br>어떤 내용으로 신고할까요?",
                            "원활한 진행을 위해 신고 사유를<br> 입력해주세요.",
                            "신고 내용은 관리자 김성철님에게<br> 전달됩니다. 신고를 진행할까요?",
                            "신고가 접수되었습니다!<br> 관리자의 사정에 따라 조치 완료<br>까지 시간이 소요될 수 있어요."
]

const alphabetArray = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

//영상 재생 트리거
 const video = document.querySelector('.Interactionvideo');
  let stopTime = 0;
  let timeUpdateHandler = null;

  // 특정 구간만 재생하는 함수
  function playVideoSegment(startTime, endTime) {
    if (!video) {
      console.error('비디오 요소를 찾을 수 없습니다.');
      return;
    }

    if (startTime >= endTime) {
      console.error('시작 시간은 끝 시간보다 작아야 합니다.');
      return;
    }

    // 기존 이벤트 제거 (중복 방지)
    if (timeUpdateHandler) {
      video.removeEventListener('timeupdate', timeUpdateHandler);
      timeUpdateHandler = null;
    }

    stopTime = endTime;

    // 멈출 시간에 도달하면 정지
    timeUpdateHandler = () => {
      if (video.currentTime >= stopTime - 0.03) {
        video.pause();
        video.currentTime = stopTime;
        video.removeEventListener('timeupdate', timeUpdateHandler);
        timeUpdateHandler = null;
      }
    };

    video.addEventListener('timeupdate', timeUpdateHandler);

    // currentTime 설정 후 재생은 seeked 이벤트 이후
    video.pause();
    video.currentTime = startTime;

    video.addEventListener('seeked', function onSeeked() {
      video.removeEventListener('seeked', onSeeked); // 1회만 실행
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('비디오 재생 실패:', err);
        });
      }
    });
  }




function scrollToPhoneNav(lenis, offset = 50) {
  const target = document.getElementById('Phone_nav');
  if (!target || !lenis) return;

  const top = target.getBoundingClientRect().top + window.scrollY - offset;

  lenis.scrollTo(top, {
    offset: 0,
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // 부드러운 ease-out
  });
}


function nextTutorialMessage(){
    tutorialMessage_box.classList.remove("on")
    tutorialNum ++;
    setTimeout(()=>{
        tutorialMessage_box.innerHTML = tutorialMessageArr[tutorialNum]
        tutorialMessage_box.classList.add("on")
    }, 600)
   
}

function nextTutorialMessage_sub(){
    
        tutorialMessage_box_sub.classList.remove("on")
    tutorialNumSub ++;
        
   
    
    setTimeout(()=>{
        tutorialMessage_box_sub.innerHTML = tutorialSubMessageArr[tutorialNumSub]
        tutorialMessage_box_sub.classList.add("on")
    }, 700)

    setTimeout(()=>{
        tutorialMessage_box_sub.classList.remove("on")
    }, 4000)
   
}



//인터랙션 시작
interaction_start_btn.addEventListener("click", ()=> {
    console.log("인터랙션 비디오 재생")
    Interactionvideo_wrap.style.filter = "none"
    playVideoSegment(1, 3)
     interaction_cover.classList.add("off")
  setTimeout(()=>{
    interaction_cover.style.display = "none"
    web_interaction_panel.classList.add("on")
    
  }, 1000)

  setTimeout(()=>{
    tutorialMessage_box.classList.add("on")
  }, 2000)
})




// 휴대폰 조작 인터랙션 구현
alert_box.addEventListener("click", () => {
    
        look_screen.classList.add("sliderUp")
    app_on_screen.style.display = "block"
    nextTutorialMessage()
    setStep(1);

    setTimeout(()=>{
        app_on_screen.style.display = "none"
        phone_screen_img_old.classList.add("fadeoff")
        nextTutorialMessage()

    },3000)
  
    
})

GoWarehousing_btn.addEventListener("click", ()=>{
   
    nextTutorialMessage()
    food_list_screen.classList.add("slideleft")
    Warehousing_screen.classList.remove("rightWaiting")
    
    phone_screen_img_Warehousing_old.classList.add("fadeoff")
    
  
})
Details_btn.addEventListener("click", ()=> {
    nextTutorialMessage()
     Warehousing_screen.classList.add("slideleft")
     WarehousingDetails_screen.classList.remove("rightWaiting")
     setStep(2);
     report_btn.classList.add("fadein")

     setTimeout(()=>{
        nextTutorialMessage()
     }, 2000)
    
    
})

// back_btn.addEventListener("click", ()=>{
//     WarehousingDetails_screen.classList.add("rightWaiting")
//     food_list_screen.classList.remove("slideleft")
    
// })

// nav_mypage.addEventListener("click", ()=> {
//     if(go_mayPage){
//         nav_food_list.classList.remove("active")
//         nav_mypage.classList.add("active")
//         food_list_screen.classList.add("slideleft")
//         myPage_screen.classList.remove("rightWaiting")
//     }
// })

report_btn.addEventListener("click", ()=> {
    WarehousingDetails_screen.classList.add("slideleft")
     
     report_screen.classList.remove("rightWaiting")
     nextTutorialMessage()

     setTimeout(()=>{
        nextTutorialMessage()
     }, 2000)
})

help_boxs.forEach(help_box=>{
 
    help_box.addEventListener("click", ()=>{
        
        
        nextChoice_btn.classList.add("active")
        help_boxs.forEach(box => {
            box.classList.remove("active");
            
        });

        if(help_box.dataset.answer === "correct"){
            Select_report = true
            console.log(Select_report)
            
        }else(
            Select_report = false
        );

        // 클릭된 help_box에만 active 클래스 추가
        help_box.classList.add("active");
        console.log(Select_report);
    })
})
user_box_reports.forEach(user_box => {
  user_box.addEventListener("click", () => {
    
    // 조건에 따라 선택 상태 저장
    Select_report = user_box.dataset.answer == "correct";

    console.log(Select_report); // 확인용 출력

    // 모든 박스를 초기화
    user_box_reports.forEach(box => {
      box.classList.remove("active");
      box.classList.add("other");
    });

    // 클릭된 박스만 active로
    user_box.classList.add("active");
    user_box.classList.remove("other");

    // 다음 버튼 활성화
    nextChoice_btn.classList.add("active");
  });
});

report_input.addEventListener('input', () => {

   
    if (report_input.value.trim().length > 0) {

        
        Select_report = true; // 입력값이 있으면 true로 설정
        console.log("입력값이 있습니다:", Selected);
        nextChoice_btn.classList.add("active");
       

        
    } else {
        Selected = false; // 입력값이 없으면 (모두 지워졌을 때) false로 설정
        console.log("입력값이 없습니다:", Selected);
        
    }
    
      
});

confirm_box.addEventListener("click", ()=> {
    report_confirm_box.classList.toggle("checked");

    if(report_confirm_box.classList.contains("checked")){
         nextChoice_btn.classList.add("active");
         Select_report=true
    }
})



let ChoiceCount =0

nextChoice_btn.addEventListener("click", () => {
  // Select_report가 true일 때만 작동
  if (Select_report) {
    // 다시 false로 바꿔서 반복 클릭 방지
    Select_report = false;
    nextTutorialMessage()
    ChoiceCount++;
    
    if(ChoiceCount === 5){
        setStep(3);
    }
    
    Progress+=20
    Progress_line.style.width = `${Progress}%`

    // 버튼에 활성화 클래스 제거
    nextChoice_btn.classList.remove("active");

    // 다음 선택지로 이동
    choiceNum++;
    report_question.innerHTML = questionsArray[choiceNum]

    // 모든 선택지에서 on 클래스 제거
    choices.forEach(choiceUi => {
      choiceUi.classList.remove("on");
    });

    // 다음 선택지에 on 클래스 추가
    choices[choiceNum].classList.add("on");
    console.log("choices 길이:", choices.length);
    
    
  }

  // 현재 Select_report 상태 확인용 콘솔 출력
  console.log(Select_report);
});













//음성인식으로 넘어가기

voice_icon.addEventListener("click", ()=>{
    nextScreen()
    // panel_mockup_img.src = "Img/panel/panel_voice_sub1.png"
    playVideoSegment(22.5, 22.6)
}
    
)




panelIntroductionButton.addEventListener("click", ()=> {
     if(imgBtnstate){
        nextScreen()
        // panel_mockup.classList.add("on")
        
        playVideoSegment(3, 4)
        
        
    }

    if(targetScreenIndex >= 2){
        panelIntroductionButton.style.display = "none"
        nextTutorialMessage_sub()
        playVideoSegment(5, 5.5 )
        
        
        
    }
}
);


function cakeNaming(){
    cakeNameTexts.forEach(cakeName => {
    cakeName.innerText = `${cake_Name_now}`
    })
   
}



search_input.addEventListener('input', () => {

    const inputValue = search_input.value.trim();
    if (search_input.value.trim().length > 0) {

        
         // 입력값이 있으면 true로 설정
        console.log("입력값이 있습니다:", Selected);
        cake_Name_now = inputValue
        Selected = true;

        
    } else {
       Selected = true; // 입력값이 없으면 (모두 지워졌을 때) false로 설정
        console.log("입력값이 없습니다:", Selected);
        cake_Name_now = "딸기케이크"
    }

    cakeNaming()
    
    
      
});


//음성 인식 인터랙션
listening_circle.addEventListener("click", ()=> {

  playVideoSegment(22.5, 26)
  listening_circle.classList.add("on")
  listening_text.innerText = "듣고있어요."
  listening_typing.classList.add('on')
  // panel_mockup_img.src = "Img/panel/panel_voice_sub2.png"
  cake_Name_now = "딸기케이크"
  cakeNaming()
    console.log("케이크 이름:", cake_Name_now);
  setTimeout(()=>{
    listening_circle.classList.remove("on")
    listening_circle.classList.add("ok")
    listening_text.innerText = "이대로 등록할까요?"
    
    Selected = true
    button_container_voice.style.display = "flex"
    voice_img.src = "Img/panel/panel_bg_dark.png"
    // panel_mockup_img.src = "Img/panel/panel_voice_sub3.png"

  },5000)
})


voice_done_btn.addEventListener("click", ()=> {
    // panel_mockup_img.src = "Img/panel/panel_7.png"
})





selectButton_end.addEventListener("click", ()=>
{
    targetScreenIndex +=1
    
})


selectButtons.forEach(selectButton => {
    selectButton.addEventListener("click",() => {
    
    if(Selected){
        console.log("선택 완료 후 버튼 누름")
        nextScreen()
        nextTutorialMessage()
        Selected = false
        playVideoSegment(21, 21.5)

        if(tutorialNumSub ==2){
            Selected = true;
            nextTutorialMessage_sub()
            
        }else if(tutorialNumSub ==3){
          Selected = true;
            nextTutorialMessage_sub()
          playVideoSegment(27,27.5)
        }

        
    }
    
} )
})



panelEnd_button.addEventListener("click", ()=> {
    panel_section.classList.add("off")
    nextTutorialMessage()
    web_interaction_panel.classList.remove("on")
    tutorialMessage_box.classList.add("Phone")
    tutorialMessage_box_sub.classList.add("Phone")

    setTimeout(()=>{
        panel_section.style.display = "none"
        
        
    }, 1000)
   

//휴대폰 시퀀스 시작
    Phone_wrap.style.display = "block"
    // panel_mockup.classList.remove("on")
    playVideoSegment(27, 29.5)
    setTimeout(()=>{
        Phone_wrap.classList.add("on")
        checklist.classList.add("on")
    },3000)

    setTimeout(()=>{
         scrollToPhoneNav(lenis, 80);
    }, 4000)

setTimeout(()=>{
        
        nextTutorialMessage()
        nextTutorialMessage_sub()
    }, 5000)


})


keypadButton.forEach(keypadBtn => {
  keypadBtn.addEventListener('click', () => {
    
    if (passwordClicked >= 6) return; // ✅ 6번째 이상 클릭 무시

    passwordLength[passwordClicked].classList.add('clicked');

    if (passwordClicked === 5) {
      setTimeout(() => {
        nextScreen();
        nextTutorialMessage();
        console.log("인터랙션 비디오 재생")
        playVideoSegment(6, 12)
        passwordWrap.style.display = "none";
        cake.classList.add("on")
        tutorialMessage_cake.classList.add("on")
     
      }, 10);
    }

    passwordClicked++; // ✅ 어디서든 클릭 카운트를 증가시켜야 함

  });
});


cake.addEventListener("click", ()=> {
    cake.classList.add("active")
    tutorialMessage_cake.classList.remove("on")
    playVideoSegment(15, 20)
    
    nextTutorialMessage()
    nextTutorialMessage_sub()
    nextScreen();
})


cake_photo_Select.addEventListener("click",() => {
    photo_Select_Check.classList.add("Checked")
    Selected = true;
    playVideoSegment(19,20)
    
})






function nextScreen(){
 // 모든 패널에서 on 클래스 제거
    panelScreens.forEach(screen => {
        screen.classList.remove("on");
    });
    

    // 인덱스 증가 (다음 이미지로)
    targetScreenIndex++;
    panel_mockup_num++;
    console.log(targetScreenIndex)

    // 인덱스가 마지막이면 다시 0으로
    // if (targetScreenIndex >= panelScreens.length) {
    //     targetScreenIndex = 0;
    // }
    //냉장고 영상에 덮어씌울 거
    // panel_mockup_img.src = panel_mockupArr[panel_mockup_num]


    panelIntroductionButton.classList.remove("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z")
    // 해당 인덱스에 on 클래스 추가
    panelScreens[targetScreenIndex].classList.add("on");
    panelIntroductionButton.classList.add( `${alphabetArray[targetScreenIndex]}`)
}


