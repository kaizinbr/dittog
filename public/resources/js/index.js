const c = console

async function getDeveloperId(nome) {
    let content = nome   //document.querySelector('.content-title').textContent;
    content = encodeURI(content);
    c.log(content, 'encodado');

    const url = `https://api.rawg.io/api/developers?key=6b749e73010d4081b7a673763e7c93d6&search=${content}&page_size=1`;

    const config = {
    method: 'get',
    headers: {},
    }

    const res = await (await fetch(url, config)).json();

    let devId = res.results[0].id;
    return devId;
}

async function putData(nome) {

    c.log(nome);
    let devId = await getDeveloperId(nome);
    

    const url = `https://api.rawg.io/api/games?key=6b749e73010d4081b7a673763e7c93d6&developers=${devId}&page_size=20`;

    const config = {
    method: 'get',
    headers: {},
    }

    const data = await (await fetch(url, config)).json();


    const results = data.results;

    for (const dado of results) {
      createCardView(dado, nome);
    }
};

function createCardView(dado, nome) {
    const className = nome.replaceAll(' ', '-');
    const content = document.querySelector(`.${className}`).nextSibling.nextSibling;
    let main = content.firstChild.nextSibling;

    c.log(main);

    if (dado.name.length > 23) {
        dado.name = dado.name.substring(0, 23) + '...';
    }

    const card = `
    <div class="swiper-slide">
        <div class="card">
            <img src="${dado.background_image}" alt="">
            <div class="infos">
                <div class="game-infos">
                    <h2>${dado.name}</h2>
                    <div class="details">
                        <span class="material-symbols-outlined">
                            visibility
                        </span><h3>${dado.reviews_count}</h3>
                        <span class="material-symbols-outlined">
                            star
                        </span><h3>${dado.rating}</h3>
                    </div>
                </div>
                <div class="button">                        
                    <button>
                        <a href="/game/${dado.id}">
                            <h3>Ver</h3>
                            <span class="material-symbols-outlined arrow">
                                arrow_forward_ios
                            </span>
                        </a>
                    </button>
                    
                </div>
                
            </div>   
        </div>
    </div>`;


    main.insertAdjacentHTML('beforeend', card);

    callSwiper();

    // c.log(card);
};

function callSwiper() {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 20,
        freeMode: true,
        navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        },
    });
}


export default { putData };
  