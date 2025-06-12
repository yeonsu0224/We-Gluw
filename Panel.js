let panelIntroductionButton = document.querySelector(".panel_Introduction_button");
let panelScreens = document.querySelectorAll(".panel_img");
let targetScreenIndex = 0;


let passwordClicked = 0;
let keypadButton = document.querySelectorAll(".keypad-button")
let passwordLength = document.querySelectorAll(".password_circle")
let passwordWrap = document.getElementById("password")

//케이크 이름 바꿔 낄 변수 돔 배열로 불러옴
let cakeNameTexts = document.querySelectorAll(".cake_Name")

let cake_photo_Select = document.querySelector(".cake_photo_Select")
let photo_Select_Check = document.querySelector(".cake_photo_Select")
let selectButtons = document.querySelectorAll(".action-button.select-button")

let Selected = false

let search_input = document.querySelector(".input-group.search-input input")




const alphabetArray = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const storedFoodName = localStorage.getItem('foodName');





console.log(passwordLength);
console.log(targetScreenIndex)
console.log(panelIntroductionButton)

panelIntroductionButton.addEventListener("click",

   nextScreen
);


function cakeNaming(){
    cakeNameTexts.forEach(cakeName => {
    cakeName.innerText = `${storedFoodName}`
    })
   
}



search_input.addEventListener('input', () => {

    const inputValue = search_input.value.trim();
    if (search_input.value.trim().length > 0) {

        
        Selected = true; // 입력값이 있으면 true로 설정
        console.log("입력값이 있습니다:", Selected);
        localStorage.setItem('foodName', inputValue);
        console.log("로컬 스토리지에 저장됨:", inputValue);
        
    } else {
        Selected = false; // 입력값이 없으면 (모두 지워졌을 때) false로 설정
        console.log("입력값이 없습니다:", Selected);
    }


    
        if (storedFoodName !== null) { // 데이터가 존재할 경우 (null이 아닌 경우)
             
            cakeNaming()
        } else {
            console.log("로컬 스토리지에 'foodName'이라는 데이터가 없습니다.");
        }
});

// 테스트를 위해 현재 hasInputValue 값 출력 (초기 상태)
console.log("초기 hasInputValue:", Selected);




selectButtons.forEach(selectButton => {
    selectButton.addEventListener("click",() => {
    
    if(Selected){
        console.log("선택 완료 후 버튼 누름")
        nextScreen()
        Selected = false

        
    }
    
} )
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
