
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

//lazy loader para observar todo el html por eso solo tiene un argumento, entries, sino tendría 2, las options
const lazyLoader = new IntersectionObserver( (entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) { //la pripiedad 'isIntersecting' permite saber si un objeto está siendo observado por el window por tanto, si es true, tiene que mostrar la img sino, no
            const url = entry.target.getAttribute('data-img');//target es la propiedad de entry que nos da el data-img que queremos para colocarle la url cuando esté a la vista
            entry.target.setAttribute('src', url);
        }
    });
});

const urlAPI = 'https://api.themoviedb.org/3';
const url_poster_w300 = 'https://image.tmdb.org/t/p/w300/';

//la funciones aquí son para no repetirlas
function createMovies( movies, container, 
    { 
        lazyLoad = false, // damos el LazyLoad como parámetro de entrada en faso
        clean = true //queremos que mientra clean sea true nos limpie el html
    } = {}
) {  
    if (clean) {
        container.innerHTML = ''; //para limpiar el html
    };
  
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        //lo coloco aquí porque no funciona en otro lado ya que depende de que película esté trayendo la API, saldrá una info u otra
        
    
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(
            lazyLoad ? 'data-img' : 'src', //cambio src por data-img para hacer la función del lazy loading y que no me guarde la url en src sino en data-img
            // 'src',
            url_poster_w300 + movie.poster_path,
        );
        movieImg.addEventListener('click', () => { //con el arrow le decimos que es lo que queremos hacer
            location.hash = '#movie=' + movie.id;
        });

        //crear una imagen cuando no cargue el contenido
        movieImg.addEventListener('error', () => {
            movieImg.setAttribute(
              'src',
              'https://static.platzi.com/static/images/error/img404.png',
            );
            const movieTitleText = document.createTextNode(movieImg.getAttribute('alt'));
            const movieTile = document.createElement('span');
            movieTile.style.fontWeight = 'bold';
            // movieTile.style.display = 'flex';
            // movieTile.style.alignItems = 'center';
            // movieTile.style.justifyContent = 'center';
            movieContainer.appendChild(movieTile);
            movieTile.appendChild(movieTitleText);
        });

        movieImg.onerror = () =>{
            movieImg.setAttribute('src', `${imgErrorUrl}`);
            movieImg.setAttribute('alt'), 'url-broke-img';
        };

        const movieBtn = document.createElement('button'); //para poner el botón de liked a las películas
        movieBtn.classList.add('movie-btn');
        movieBtn.addEventListener('click', () => {
            movieBtn.classList.toggle('movie-btn--liked');
        });

        if (lazyLoad) { // solo si el lazyLoad es true, se aplicará la función observe
            lazyLoader.observe(movieImg);//esto es para añadir cada una de las películas de createMovies al lazyLoader
        };

        movieContainer.appendChild(movieImg);
        movieContainer.appendChild(movieBtn);
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

    createMovies(movies, trendingMoviesPreviewList, true);//el true es del lazyLoading

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
    maxPage = data.total_pages;

    createMovies(movies, genericSection, { lazyLoad: true });    

};

function getPaginatedMoviesByCategory(id) {
    return async function () { //es así esta función porque tiene un parámetro y al llamarla en navigation, la estaríamos ejecutando y para evitar eso, ponemos el return y la función async para que se ejecute 
        const { 
            scrollTop,
            scrollHeight,
            clientHeight
          } = document.documentElement;
    
        const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 100);
    
        const pageIsNotMax = page < maxPage;
        
        if (scrollIsBottom && pageIsNotMax) {
            page++;
            const { data } = await api('discover/movie', {
                params: {
                    with_genres: id,
                    page,
                },
            });
        
            const movies = data.results;
        
            createMovies(movies, genericSection, { lazyLoad: true, clean: false }); //no quiero que borre para que mantenga la paginación
    
        };
    }
};

async function getMoviesBySearch (query) {
    const { data } = await api('search/movie', {
        params: {
            query,
        },
    });

    const movies = data.results;
    maxPage = data.total_pages;

    createMovies(movies, genericSection);    

};

function getPaginatedMoviesBySearch(query) {
    return async function () { //es así esta función porque tiene un parámetro y al llamarla en navigation, la estaríamos ejecutando y para evitar eso, ponemos el return y la función async para que se ejecute 
        const { 
            scrollTop,
            scrollHeight,
            clientHeight
          } = document.documentElement;
    
        const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 100);
    
        const pageIsNotMax = page < maxPage;
        
          if (scrollIsBottom && pageIsNotMax) {
            page++;
            const { data } = await api('search/movie', {
                params: {
                    query,
                    page,
                },
            });
        
            const movies = data.results;
        
            createMovies(movies, genericSection, { lazyLoad: true, clean: false }); //no quiero que borre para que mantenga la paginación
    
        };
    }
};

async function getTrendingMovies () {

    const { data } = await api('/trending/movie/day');
    const movies = data.results; 
    maxPage = data.total_pages; 

    createMovies(movies, genericSection, { lazyLoad: true, clean: true });

    // const btnLoadMore = document.createElement('button'); //este botón es para que cargue más películas en la parte de trending
    // btnLoadMore.innerText = 'Load more...';
    // btnLoadMore.addEventListener('click', getPaginatedTrendingMovies);
    // genericSection.appendChild(btnLoadMore);

};

async function getPaginatedTrendingMovies() {

    const { 
        scrollTop,
        scrollHeight,
        clientHeight
      } = document.documentElement;

    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 100);

    const pageIsNotMax = page < maxPage;

      if (scrollIsBottom && pageIsNotMax) {
        page++;
        const { data } = await api('/trending/movie/day', {
            params: { //esto es así por AXIOS
                page,
            },
        });
        const movies = data.results; 
    
        createMovies(movies, genericSection, { lazyLoad: true, clean: false }); //no quiero que borre para que mantenga la paginación

    };


//     const btnLoadMore = document.createElement('button'); //este botón es para que cargue más películas en la parte de trending
//     btnLoadMore.innerText = 'Load more...';
//     btnLoadMore.addEventListener('click', getPaginatedTrendingMovies);
//     genericSection.appendChild(btnLoadMore);
};

async function getMovieById(id) {
    const { data: movie } = await api('movie/' + id);

    //url de la img pero de 500px para que se vea en grande
    const movieImgUrl = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path;
    //para colocarla, como lo hicimos con CSS tenemos que poner lo siguiente:
    headerSection.style.background = `
    linear-gradient(
        180deg, 
        rgba(0, 0, 0, 0.35) 19.27%, 
        rgba(0, 0, 0, 0) 29.17%
    ),
    url(${movieImgUrl})
    `;

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average

    createCategories(movie.genres, movieDetailCategoriesList);

    getRelatedMoviesById(id);
};

async function getRelatedMoviesById(id) {
    const { data } = await api(`movie/${id}/recommendations`);
    const relatedMovies = data.results;

    createMovies(relatedMovies, relatedMoviesContainer);
};