//con este scrip puedes saber en todo momento en que página estás

window.addEventListener('hashchange', navigator, false);
window.addEventListener('DOMContentLoaded', navigator, false);

function navigator () { //esta función sirve para saber en que página estás aterrizado
    console.log(location);
    
    if(location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('movie=')) {
        moviesDetailsPage();
    } else if (location.hash.startsWith('category=')) {
        categoryPage();
    } else {
        homePage();
    }
};

function homePage(){
    console.log('Home Page');

    //llamamos aquí a estas funciones porque solo son útilies en la vista de home
    getTrendingMoviesPreview();
    getCategoriesPreview(); 
};
function categoryPage(){
    console.log('Category Page');
};
function searchPage(){
    console.log('Searh Page');
};
function trendsPage(){
    console.log('Trends Page');
};
function moviesDetailsPage(){
    console.log('Movie Page');
};