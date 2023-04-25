//aquí vas a poder modificar las distintas vistas y dependiendo de la acción que hagas te llevará a una u otra además puedes saber en todo momento en que página estás gracias al location.hash
searchFormBtn.addEventListener('click', () => {
    location.hash = 'search=';
});

window.addEventListener('hashchange', navigator, false);
window.addEventListener('DOMContentLoaded', navigator, false);

function navigator () { //esta función sirve para saber en que página estás aterrizado
    console.log(location);
    
    if(location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        moviesDetailsPage();
    } else if (location.hash.startsWith('#category=')) {
        categoryPage();
    } else {
        homePage();
    }
};

function homePage(){
    console.log('Home Page');

    // coloco a cada propiedad a cada una de las secciones para la vista de home
    headerSection.classList.add('header-container--log');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive'); //no quieres que aparezca la arrow en la home, solo en las otras vistas, por tanto, a aque le pones la clase 'inactive'
    headerTitle.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white'); 
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    //llamamos aquí a estas funciones porque solo son útilies en la vista de home
    getTrendingMoviesPreview();
    getCategoriesPreview(); 
};
function categoryPage(){
    console.log('Category Page');

    headerSection.classList.add('header-container--log');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive'); 
    arrowBtn.classList.add('header-arrow--white'); 
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
};
function searchPage(){
    console.log('Searh Page');


};
function trendsPage(){
    console.log('Trends Page');

    headerSection.classList.remove('header-container--log');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive'); //sí quiero que aparezca por tanto, le quito el inactive
    arrowBtn.classList.remove('header-arrow--white'); 
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
};
function moviesDetailsPage(){
    console.log('Movie Page');

    // coloco a cada propiedad a cada una de las secciones para la vista de details
    headerSection.classList.remove('header-container--log');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive'); //sí quiero que aparezca por tanto, le quito el inactive
    arrowBtn.classList.remove('header-arrow--white'); 
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

};