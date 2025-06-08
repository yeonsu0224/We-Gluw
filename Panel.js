let menu = document.querySelectorAll('.menu');

let Panel = document.getElementById('Panel');
let modal = document.querySelector('.modal');


function displayOn(item) {

    item.style.display = "block"
}
function displayOff(item) {

    item.style.display = "none"
}


// Panel.addEventListener('click', () => {
//     display(modal)
// })


function hideAllPage() {
    document.querySelectorAll('[class^="page_"]').forEach(i => {
        displayOff(i);
    });

}


menu.forEach(thisMenu => {

    thisMenu.addEventListener('click', () => {

        
    let menuNum = thisMenu.dataset.mnum;

    let pageOn = document.querySelector(`.page_${menuNum}`)
    hideAllPage();
    displayOn(pageOn)

    menu.forEach(pickMenu =>{
        pickMenu.classList.remove("active");
    })


    thisMenu.classList.add('active')
});
});