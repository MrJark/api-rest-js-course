
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY_n //tenía que poner solo los números y no " ?api_key= " al inicio ya que pre supone que va el api_key
    },
});


//utils: urls and functions that to be reused

const urlAPI = 'https://api.themoviedb.org/3';
const url_poster_w300 = 'https://image.tmdb.org/t/p/w300/';

//la funciones aquí son para no repetirlas
function createMovies(movies, container) { 
    container.innerHTML = '';
  
    movies.forEach(movie => {
      const movieContainer = document.createElement('div');
      movieContainer.classList.add('movie-container');
  
      const movieImg = document.createElement('img');
      movieImg.classList.add('movie-img');
      movieImg.setAttribute('alt', movie.title);
      movieImg.setAttribute('src', url_poster_w300 + movie.poster_path,);
  
      movieContainer.appendChild(movieImg);
      container.appendChild(movieContainer);
    });
};

function createCategories (categories, container) {

    container.innerHTML = ""; //para limpiar y que no se me duplique cada vez que vuelva al home

    categories.forEach(categories => {
      
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTile = document.createElement('h3');
        categoryTile.classList.add('category-title');
        categoryTile.setAttribute('id', 'id' + categories.id);
        
        //añadir a cada una de las categorías el evento de click para que me lleve a su respectiva pag
        categoryTile.addEventListener('click', () => { 
            location.hash = `category=${categories.name}-${categories.id}`; //con esto, hago que me salga en la url la id y el nombre para que sea UX friendly
        });
        
        const categoryTileText = document.createTextNode(categories.name); //para crear el texto de la categoría
       
        //estas 3 lineas son para añadir al html los elementos creados a partir de js y la api
        categoryTile.appendChild(categoryTileText);//para añadi el name al categoryTitle
        categoryContainer.appendChild(categoryTile); //para añadir el categoryTitle al contenedor de categorias
        container.appendChild(categoryContainer); //añadir el contenedor de category al preview
    
    });
};

//api calls

async function getTrendingMoviesPreview () {
    //AXIOS
    const { data } = await api('/trending/movie/day');
    const movies = data.results;

    createMovies(movies, trendingMoviesPreviewList);

    //SIN AXIOS
    // const res = await fetch (urlAPI + '/trending/movie/day' + API_KEY_all);
    // const data = await res.json();
    // const movies = data.results;
    // console.log(data, movies);

};

async function getCategoriesPreview () { //la construcción de esta lista es casi igual a la anterior
    //AXIOS
    const { data } = await api('genre/movie/list');
    
    //SIN AXIOS
    // const res = await fetch (urlAPI + '/genre/movie/list' + API_KEY_all);
    // const data = await res.json();
    const categories = data.genres;

    createCategories(categories, categoriesPreviewList)
    ;

};

async function getMoviesByCtaegory (id) {
    const { data } = await api('discover/movie', {
        params: {
            with_genres: id,
        },
    });

    const movies = data.results;

    createMovies(movies, genericSection);    

}

// getTrendingMoviesPreview();
// getCategoriesPreview();