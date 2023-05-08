let maxPage; //para la paginaion, es necesario para que no nos de error cuando los U hagan el scroll máx
let page = 1; //para la pagination
let infinitesScroll; //para pagination

//aquí vas a poder modificar las distintas vistas y dependiendo de la acción que hagas te llevará a una u otra además puedes saber en todo momento en que página estás gracias al location.hash
searchFormBtn.addEventListener('click', () => {
    location.hash = '#search=' + searchFormInput.value; //esto es para escuchar que es lo que han escrito los usuarios y ponerlo en la url
});
arrowBtn.addEventListener('click', () => {
    history.back();
    // container.innerHTML = '';
    // location.hash = '#home';
});
trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
});
headerTitleMovie4U.addEventListener('click', () => {
    location.hash = '#home';
});
// headerTitleMovie4U.addEventListener('click', location.reload());

window.addEventListener('hashchange', navigator, false);
window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('scroll', infinitesScroll, {passive: false});

function navigator () { //esta función sirve para saber en que página estás aterrizado
    console.log(location);

    if (infinitesScroll) {
        window.removeEventListener('scroll', infinitesScroll, {passive: false});
        infinitesScroll = undefined;
    }
    
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

    //pongo los dos porque en algunos navegadores no son compatibles
    document.scrollTop = 0; //para que el scroll por defecto esté arriba, en 0 px
    document.documentElement.scrollTop = 0; 
    // document.body.scrollTop = 0; //este es otra opción

    if (infinitesScroll) {
        window.addEventListener('scroll', infinitesScroll, {passive: false})
    }
};

function homePage(){
    console.log('Home Page');

    // coloco a cada propiedad a cada una de las secciones para la vista de home
    headerSection.classList.remove('header-container--log');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive'); //no quieres que aparezca la arrow en la home, solo en las otras vistas, por tanto, a aque le pones la clase 'inactive'
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
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

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
  
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    //con location.hash.split('='); lo que hace es decolvernos un array que es partido por un igual, es decir, cada vez que haya un igual, la url, el hash, se dividirá. En mi caso, como las categorías url + ?#category=Action-28, dividirá por un lado url + category y por otro nombre de la categoria y su id que a su vez tengo que hacer otro location.hash.split('-') para separar el nombre del id
    const [_, categoryData] = location.hash.split('=');
    const [categoryName, categoryId] = categoryData.split('-');

    headerCategoryTitle.innerHTML = categoryName;

    getMoviesByCtaegory(categoryId);
    infinitesScroll = getPaginatedMoviesByCategory(id);

};

function searchPage(){
    console.log('Searh Page');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    //['#search', 'busqueda'] esta parte la ponemos para saber que es lo que han buscado
    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query);

    infinitesScroll = getPaginatedMoviesBySearch(query);
};

function moviesDetailsPage(){
    console.log('Movie Page');
    

    headerSection.classList.add('header-container--long');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
    headerMenu.classList.add('inactive');

    //[#movie, id]
    const [_, movieId] = location.hash.split('=');

    getMovieById(movieId);
    
};

function trendsPage(){
    console.log('Trends Page');

    headerSection.classList.remove('header-container--log');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive'); 
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
    
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML = 'Tendencias';
   
    getTrendingMovies(); 

    infinitesScroll = getPaginatedTrendingMovies;
};