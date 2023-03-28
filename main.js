
const api_url = 'https://api.thecatapi.com/v1/images/search?api_key=live_bKskKbQpYZtsR4DBNUTzV9XJo2tqNGK0iUdj8wWh5am9z504w6QA6I4mBn1Z92om';

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

async function reload() {
    const res = await fetch(api_url);
    const data = await res.json();

    const img = document.querySelector('img');
    img.src = data[0].url;
}

reload();