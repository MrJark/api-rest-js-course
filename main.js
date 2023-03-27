
const url = 'https://api.thecatapi.com/v1/images/search';

const btn = document.querySelector('.reload-btn');
btn.onclick = function () {
    fetch (url)
        .then (response => response.json())
        .then(data => {
            const cat = document.querySelector('img');
            cat.src = data[0].url;
        });
};

