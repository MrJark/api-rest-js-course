
//Url general
const api_url = 'https://api.thecatapi.com/v1/images/search?api_key=live_bKskKbQpYZtsR4DBNUTzV9XJo2tqNGK0iUdj8wWh5am9z504w6QA6I4mBn1Z92om';
//url para guardar los michis en favs
const api_url_favourites = 'https://api.thecatapi.com/v1/favourites?api_key=live_bKskKbQpYZtsR4DBNUTzV9XJo2tqNGK0iUdj8wWh5am9z504w6QA6I4mBn1Z92om';

const spanError = document.getElementById('error');

// fetch(api_url)
//     .then(resp => resp.json())
//     .then(data => {
//         const img = document.querySelector('img');
//         img.src = data[0].url;
//     })

// const btn = document.querySelector('.reload-btn');
// btn.onclick = function () {
//     fetch (api_url)
//         .then (response => response.json())
//         .then(data => {
//             const cat = document.querySelector('img');
//             cat.src = data[0].url;
//         });
// };

//Usando async y await

// async function myCat () {
//     const respon = await fetch(api_url);
//     const data = await respon.json();
//     const img = document.querySelector('img');
//     img.src = data[0].url;
// }

// const theButton = document.querySelector('button');
// theButton.onclick = myCat;

//----Otra manera----

async function loadRandomMichis() {
    const res = await fetch(api_url);
    const data = await res.json();

    if (res.status !== 200){
        spanError.innerHTML = "Hubo un error: " + res.status;
    }else {
        const img = document.getElementById('random-img');
        img.src = data[0].url;
    }
}

//para guardar michis en fav

async function loadFavouritesMichis() {
    const res = await fetch(api_url_favourites);
    const data = await res.json();
    console.log(data);

    if(res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status;
    }
}

async function saveFavMichis() {
    const res = await fetch (api_url_favourites, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: 12
        }),
    });
    const data = await res.json();
}

loadRandomMichis();
loadFavouritesMichis();