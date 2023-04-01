
//Url general
const api_url = 'https://api.thecatapi.com/v1/images/search?api_key=live_bKskKbQpYZtsR4DBNUTzV9XJo2tqNGK0iUdj8wWh5am9z504w6QA6I4mBn1Z92om';
//url para guardar los michis en favs
const api_url_favourites = 'https://api.thecatapi.com/v1/favourites?api_key=live_bKskKbQpYZtsR4DBNUTzV9XJo2tqNGK0iUdj8wWh5am9z504w6QA6I4mBn1Z92om';
//url para eliminar los michis en favs. Lo colocamos así porque por cada id específico hay una url específica y de esta manera hacemos el strig dinámico (aunque es una arrow function)
const api_url_delete = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_bKskKbQpYZtsR4DBNUTzV9XJo2tqNGK0iUdj8wWh5am9z504w6QA6I4mBn1Z92om`;


const spanError = document.getElementById('error');

//Formas alternativas de crear las funciones
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
        const btnSave = document.getElementById('saveMichi');

        img.src = data[0].url;

        btnSave.onclick = () => saveFavMichis(data[0].id);//con esto conseguimos extraer la inf del id que hace falta más abajo para la función de saveFavMichi
    }
    console.log(data);
}

//para guardar michis en fav

async function loadFavouritesMichis() {
    const res = await fetch(api_url_favourites);
    const data = await res.json();
    console.log(data);

    if(res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status;
    } else {
        const section = document.getElementById('favoritesMichis');
        section.innerHTML = "";

        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('Favourites Save Michis');
        h2.appendChild(h2Text);
        section.appendChild(h2);

        data.forEach(michi => {
            //estamos creadon el article para los elementos fav desde js
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Remove to Fav');

            btn.appendChild(btnText);//le añadimos al botón el text con appendChild
            img.src = michi.image.url;
            btn.onclick = () => deleteFavMichi(michi.id);
            article.appendChild(img);//añadimos al article la imagen y el btn con el appendChild
            article.appendChild(btn);
            section.appendChild(article);

        });
    }
}

//función para gaurdar michis
async function saveFavMichis(id) {
    const res = await fetch (api_url_favourites, {
        method: 'POST',
        headers: {
            // 'x-api-key': 'live_bKskKbQpYZtsR4DBNUTzV9XJo2tqNGK0iUdj8wWh5am9z504w6QA6I4mBn1Z92om',
            "content-type": "application/json",
        },
        body: JSON.stringify({
            image_id: id
        }),
    });
    const data = await res.json();

    console.log('save');
    console.log(res);

    if(res.status !== 200){
        spanError.innerHTML = "Hubo un error: " + res.status;
    } else {
        console.log('Michi guardado en Fav');
        loadFavouritesMichis();
    }
}

//función para elminar michis de favs

async function deleteFavMichi(id) {
    const res = await fetch(api_url_delete(id), {
        method: 'DELETE',
    });
    const data = await res.json();

    console.log('save');
    console.log(res);

    if(res.status !== 200){
        spanError.innerHTML = "Hubo un error: " + res.status;
    } else {
        console.log('Michi eliminado de Fav');
        loadFavouritesMichis();
    }
}

loadRandomMichis();
loadFavouritesMichis();