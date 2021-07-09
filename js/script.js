const headerCityButton = document.querySelector('.header__city-button');

let hash = location.hash.substring(1);

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

//запрос бд

const getGoods = (callback, value) => {
    getData()
        .then( data => {
            if (value) {
                callback(data.filter(item => item.category===value))
            }else{ callback(data) }
        })
        .catch(e=>{console.error(e)})
}

const getData = async () =>{
    const data = await fetch('db.json');
        
    if(data.ok){
        return data.json();
    } else {
        throw new Error(`Can\`t get data ${data.status} ${data.statusText}`)
    }
}


try {
    const goodsList = document.querySelector('.goods__list')

    if (!goodsList){throw new "Can`t get goods list, try on goods page "}


    const createCard = ({ id, preview, cost, brand, name, sizes }) => {
        const li = document.createElement('li');

        li.classList.add('goods__item');
        li.innerHTML = `
            <article class="good">
                <a class="good__link-img" href="card-good.html#${id}">
                    <img class="good__img" src="goods-image/${preview}" alt="">
                </a>
                <div class="good__description">
                    <p class="good__price">${cost} &#8381;</p>
                    <h3 class="good__title">${brand} <span class="good__title__grey">/ ${name}</span></h3>
                    ${sizes? `<p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">${sizes.join(' ')}</span></p>` : ''}
                    <a class="good__link" href="card-good.html#id56454">Подробнее</a>
                </div>
            </article>`
        return li;
    }
    
    const renderGoodsList = data => {
        goodsList.innerHTML = '';
        

        // for (let i=0; i< data.length; i++){
        //     console.log(data[i])
        // }

        for (const item of data){
            const card  = createCard(item);
            goodsList.append(card)
        }

    }

    window.addEventListener('hashchange', ()=>{
        hash = location.hash.substring(1);
        getGoods(renderGoodsList, hash);
        goodsTitle = document.querySelector('.goods__title');
        if (hash ==='men'){
            goodsTitle.textContent = 'Мужчинам'
        } else if (hash==='kids') {
            goodsTitle.textContent = 'Детям'
        } else {
            goodsTitle.textContent = 'Женщинам'
        }
    })
    getGoods(renderGoodsList, hash);
    
} catch (err) {
    console.warn(err)
}