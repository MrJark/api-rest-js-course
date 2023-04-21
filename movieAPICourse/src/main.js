
const urlAPI = 'https://api.themoviedb.org/3/';
const url_poster_w300 = 'https://image.tmdb.org/t/p/w300/';

async function getTrendingMoviesPreview () {
    const res = await fetch (urlAPI + 'trending/movie/day' + API_KEY_all);
    const data = await res.json();
    const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');

    const movies = data.results;
    console.log(data, movies);
    movies.forEach(movie => {
        const movieContainer = document.createElement('div'); //para crear el elemento que necesitas. Un div por cada película
        movieContainer.classList.add('movie-container'); //para dar la clase movi-container a la variable y que el css funcione, sino no tendría estilos
    
        const movieImg = document.createElement('img'); // = que para el div pero para la imagen
        movieImg.classList.add('movie-img'); //le añadimos la clase para que coja el css
        movieImg.setAttribute('alt', movie.title); // ('atributo', 'valor del atibuto') -> para colocarle el atributo del alt. Y para saber cuál es, tienes que irte a la consola y ver el título de la película y decirle que sea ese el alt
        movieImg.setAttribute('src', url_poster_w300 + movie.poster_path); // para llamar a la url donde esté el poster que mide width=300 y a la propiedad de movie poster_path
        
        movieContainer.appendChild(movieImg);
        trendingPreviewMoviesContainer.appendChild(movieContainer); //permite traer al contenedor de películas 

    });

}

getTrendingMoviesPreview();