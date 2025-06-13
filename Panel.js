

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




//---------------------휴대폰 앱 인터랙션 부분

const Phone_wrap = document.getElementById("Phone")

const look_screen = document.querySelector(".phone_screen.look")
const alert_box = document.querySelector(".alert_img")
const app_on_screen = document.querySelector(".phone_screen.appOn")

const GoWarehousing_btn = document.querySelector(".GoWarehousing_btn")
const food_list_screen = document.querySelector(".phone_screen.food_list")
const Warehousing_screen = document.querySelector(".phone_screen.Warehousing")
const WarehousingDetails_screen = document.querySelector(".phone_screen.WarehousingDetails")
const Details_btn = document.querySelector(".Details_btn")
const back_btn = document.querySelector(".back_btn")



const Progress_line = document.querySelector(".Progress_line")
let Progress = 20


const nav_food_list = document.querySelector(".nav-item.food_list")
const nav_mypage = document.querySelector(".nav-item.mypage")

const myPage_screen = document.querySelector(".phone_screen.myPage ")

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







// 휴대폰 조작 인터랙션 구현
alert_box.addEventListener("click", () => {
    if(!go_mayPage){
        look_screen.classList.add("sliderUp")
    app_on_screen.style.display = "block"

    setTimeout(()=>{
        app_on_screen.style.display = "none"
    },3000)
    }
    
})

GoWarehousing_btn.addEventListener("click", ()=>{
    if(!go_mayPage){
    console.log("입출고 목록으로 갈래요")
    food_list_screen.classList.add("slideleft")
    Warehousing_screen.classList.remove("rightWaiting")
    }
})
Details_btn.addEventListener("click", ()=> {
    if(!go_mayPage){
     Warehousing_screen.classList.add("slideleft")
     WarehousingDetails_screen.classList.remove("rightWaiting")
    }
})

back_btn.addEventListener("click", ()=>{
    WarehousingDetails_screen.classList.add("rightWaiting")
    food_list_screen.classList.remove("slideleft")
    go_mayPage = true
})

nav_mypage.addEventListener("click", ()=> {
    if(go_mayPage){
        nav_food_list.classList.remove("active")
        nav_mypage.classList.add("active")
        food_list_screen.classList.add("slideleft")
        myPage_screen.classList.remove("rightWaiting")
    }
})

report_btn.addEventListener("click", ()=> {
     myPage_screen.classList.add("slideleft")
     report_screen.classList.remove("rightWaiting")
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



nextChoice_btn.addEventListener("click", () => {
  // Select_report가 true일 때만 작동
  if (Select_report) {
    // 다시 false로 바꿔서 반복 클릭 방지
    Select_report = false;
    
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

voice_icon.addEventListener("click", 
    nextScreen
)




panelIntroductionButton.addEventListener("click", ()=> {
     if(imgBtnstate){
        nextScreen()
        
    }

    if(targetScreenIndex >= 2){
        panelIntroductionButton.style.display = "none"
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

        
        Selected = true; // 입력값이 있으면 true로 설정
        console.log("입력값이 있습니다:", Selected);
        cake_Name_now = inputValue

        
    } else {
        Selected = false; // 입력값이 없으면 (모두 지워졌을 때) false로 설정
        console.log("입력값이 없습니다:", Selected);
    }

    cakeNaming()
    
      
});


//음성 인식 인터랙션
listening_circle.addEventListener("click", ()=> {
  listening_circle.classList.add("on")
  listening_text.innerText = "듣고있어요."
  listening_typing.classList.add('on')
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

  },5000)
})


// 테스트를 위해 현재 hasInputValue 값 출력 (초기 상태)
console.log("초기 hasInputValue:", Selected);



selectButton_end.addEventListener("click", ()=>
{
    targetScreenIndex +=1
    
})


selectButtons.forEach(selectButton => {
    selectButton.addEventListener("click",() => {
    
    if(Selected){
        console.log("선택 완료 후 버튼 누름")
        nextScreen()
        Selected = false

        
    }
    
} )
})

panelEnd_button.addEventListener("click", ()=> {
    panel_section.classList.add("off")
    setTimeout(()=>{
        panel_section.style.display = "none"
    }, 1000)

//휴대폰 시퀀스 시작
    Phone_wrap.style.display = "flex"
setTimeout(()=>{
        Phone_wrap.style.opacity = "1"
    }, 1000)

})



keypadButton.forEach(keypadBtn => {
keypadBtn.addEventListener('click', ()=> {
    
    if(passwordClicked == 5){
        setTimeout(()=>{
            nextScreen()
            passwordWrap.style.display = "none"
        }, 1000)
        passwordLength[passwordClicked].classList.add('clicked')
        
        
    }else{
        passwordLength[passwordClicked].classList.add('clicked')
    passwordClicked++;
    }
    


})
})

cake_photo_Select.addEventListener("click",() => {
    photo_Select_Check.classList.add("Checked")
    Selected = true;
})




function nextScreen(){
 // 모든 패널에서 on 클래스 제거
    panelScreens.forEach(screen => {
        screen.classList.remove("on");
    });

    // 인덱스 증가 (다음 이미지로)
    targetScreenIndex++;

    // 인덱스가 마지막이면 다시 0으로
    if (targetScreenIndex >= panelScreens.length) {
        targetScreenIndex = 0;
    }

    panelIntroductionButton.classList.remove("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z")
    // 해당 인덱스에 on 클래스 추가
    panelScreens[targetScreenIndex].classList.add("on");
    panelIntroductionButton.classList.add( `${alphabetArray[targetScreenIndex]}`)
}
