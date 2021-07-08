const headerCityButton = document.querySelector('.header__city-button');

if(localStorage.getItem('city')){
    headerCityButton.textContent= localStorage.getItem('city');
}

headerCityButton.addEventListener('click',()=>{
    let result = prompt("Введите ваш город: ");
    headerCityButton.textContent = result;
    localStorage.setItem('city',result)
})

//Modal Window && blocking scroll

const disableScroll = () => {

}

const enableScroll = () => {
    
}

const toggleScroll = () => {
    let visibility;
    if(modal.classList.contains('cart-overlay-open')){
        visibility = 'hidden'
    }else{
        visibility = '';
    }
    const widthScroll = window.innerWidth - document.body.offsetWidth;
    document.body.style.cssText = `
       
        overflow: ${visibility};
        padding-right: ${widthScroll}px;
        width: 100%;
        height: 100%;

    `;
}

const subheaderCart = document.querySelector('.subheader__cart')
const modal = document.querySelector('.cart-overlay')
const cartBtnClose = document.querySelector('.cart__btn-close')

subheaderCart.addEventListener('click', ()=>{
    
    modal.classList.toggle('cart-overlay-open');
    toggleScroll();
})

modal.addEventListener('click', event => {
    if (event.target === modal || event.target === cartBtnClose ){
        modal.classList.toggle('cart-overlay-open')
        toggleScroll();
    }
})