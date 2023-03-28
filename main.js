
const url = 'https://api.thecatapi.com/v1/images/search';

// fetch(url)
//     .then(resp => resp.json())
//     .then(data => {
//         const img = document.querySelector('img');
//         img.src = data[0].url;
//     })

// const btn = document.querySelector('.reload-btn');
// btn.onclick = function () {
//     fetch (url)
//         .then (response => response.json())
//         .then(data => {
//             const cat = document.querySelector('img');
//             cat.src = data[0].url;
//         });
// };

//Usando async y await

async function myCat () {
    const respon = await fetch(url);
    const data = await respon.json();
    const img = document.querySelector('img');
    img.src = data[0].url;
}

const theButton = document.querySelector('button');
theButton.onclick = myCat;