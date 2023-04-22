
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY_n //tenía que poner solo los números y no " ?api_key= " al inicio ya que pre supone que va el api_key
    },
});

const urlAPI = 'https://api.themoviedb.org/3';
const url_poster_w300 = 'https://image.tmdb.org/t/p/w300/';

async function getTrendingMoviesPreview () {
    //AXIOS
    const { data } = await api('/trending/movie/day');
    const movies = data.results;

    //SIN AXIOS
    // const res = await fetch (urlAPI + '/trending/movie/day' + API_KEY_all);
    // const data = await res.json();
    // const movies = data.results;
    // console.log(data, movies);
    movies.forEach(movie => {

        const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');
        
        const movieContainer = document.createElement('div'); //para crear el elemento que necesitas. Un div por cada película
        movieContainer.classList.add('movie-container'); //para dar la clase movi-container a la variable y que el css funcione, sino no tendría estilos
    
        const movieImg = document.createElement('img'); // = que para el div pero para la imagen
        movieImg.classList.add('movie-img'); //le añadimos la clase para que coja el css
        movieImg.setAttribute('alt', movie.title); // ('atributo', 'valor del atibuto') -> para colocarle el atributo del alt. Y para saber cuál es, tienes que irte a la consola y ver el título de la película y decirle que sea ese el alt
        movieImg.setAttribute('src', url_poster_w300 + movie.poster_path); // para llamar a la url donde esté el poster que mide width=300 y a la propiedad de movie poster_path
        
        movieContainer.appendChild(movieImg);
        trendingPreviewMoviesContainer.appendChild(movieContainer); //permite traer al contenedor de películas 
        
    });
};

async function getCategoriesPreview () { //la construcción de esta lista es casi igual a la anterior
    //AXIOS
    const { data } = await api('genre/movie/list');
    
    //SIN AXIOS
    // const res = await fetch (urlAPI + '/genre/movie/list' + API_KEY_all);
    // const data = await res.json();

    const categories = data.genres;

    categories.forEach(categories => {
        const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');
        
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTile = document.createElement('h3');
        categoryTile.classList.add('category-title');
        categoryTile.setAttribute('id', 'id' + categories.id);
        const categoryTileText = document.createTextNode(categories.name); //para crear el texto de la categoría
    
        //estas 3 lineas son para añadir al html los elementos creados a partir de js y la api
        categoryTile.appendChild(categoryTileText);//para añadi el name al categoryTitle
        categoryContainer.appendChild(categoryTile); //para añadir el categoryTitle al contenedor de categorias
        previewCategoriesContainer.appendChild(categoryContainer); //añadir el contenedor de category al preview
    });

};

getTrendingMoviesPreview();
getCategoriesPreview();