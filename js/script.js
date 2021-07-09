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

const getGoods = (callback,prop, value) => {
    console.log(value)
    console.log(prop)
    getData()
        .then( data => {
            if (value) {
                callback(data.filter(item => {return item[prop]===value}))
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
        
        for (const item of data){
            const card  = createCard(item);
            goodsList.append(card)
        }

    }

    window.addEventListener('hashchange', ()=>{
        hash = location.hash.substring(1);
        getGoods(renderGoodsList,'category',hash);
        goodsTitle = document.querySelector('.goods__title');
        if (hash ==='men'){
            goodsTitle.textContent = 'Мужчинам'
        } else if (hash==='kids') {
            goodsTitle.textContent = 'Детям'
        } else if (hash==='women'){
            goodsTitle.textContent = 'Женщинам'
        }else if (hash===''){
            goods.goodsTitle = 'Мужчинам'
        }
    })
    getGoods(renderGoodsList,'category', hash);
    
} catch (err) {
    console.warn(err)
}

// страница категорий

try{
   

}catch(error){
    console.warn(error)
}

//страница товара

try{
    if(!document.querySelector('.card-good')){
        throw 'This is not a card-good page'
    }
    const cardGoodImage = document.querySelector('.card-good__image');
    const cardGoodBrand = document.querySelector('.card-good__brand');
    const cardGoodTitle = document.querySelector('.card-good__title');
    const cardGoodPrice = document.querySelector('.card-good__price');
    const cardGoodColor = document.querySelector('.card-good__color');
    const cardGoodColorList = document.querySelector('.card-good__color-list');
    const cardGoodSizes = document.querySelector('.card-good__sizes');
    const cardGoodSizesList = document.querySelector('.card-good__sizes-list');
    const cardGoodBuy = document.querySelector('.card-good__buy');
    const cardGoodSelectWrapper = document.querySelectorAll('.card-good__select__wrapper');

    const generateList = (arr) => arr.reduce((html, item, index)=> {
       return html + `<li class="card-good__select-item " data-id="${i}">${item}</li>`
    }, '')

    const renderCardGood = ([{brand,name,cost,color,sizes,photo}]) => {

        cardGoodImage.src = 'goods-image/'+photo;
        cardGoodImage.alt = `${brand} ${name}`
        cardGoodBrand.textContent = brand;
        cardGoodTitle.textContent = name
        cardGoodPrice.textContent = cost
        if(color){
            cardGoodColor.textContent = color[0];
            cardGoodColor.dataset.id = 0;
            cardGoodColorList.innerHTML = generateList(color);

        }else{
            cardGoodColor.style.display = 'none'
        }
        if(sizes){
            cardGoodSizes.textContent = sizes[0]
            cardGoodSizes.dataset.id = 0;
            cardGoodSizesList.innerHTML = generateList(sizes);
        }else{
            cardGoodSizes.style.display = 'none'
        }
        
   
    }


    cardGoodSelectWrapper.forEach(item => item.addEventListener('click', event=>{
        if (event.target.closest('.card-good__select')){
            event.target.classList.toggle('card-good__select__open');
        }
        if (event.target.closest('.card-good__select-item')){
            const cardGoodSelect = item.querySelector('.card-good__select');
            cardGoodSelect.textContent = event.target.textContent;
            cardGoodSelect.dataset.id = event.target.dataset.id;
            cardGoodSelect.classList.remove('card-good__select__open')

        }
    }))
    getGoods(renderCardGood, 'id', hash)

}catch(error){
    console.warn(error)
}