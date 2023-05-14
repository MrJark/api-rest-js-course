
const $ = (id) => document.querySelector(id);

// Sections
const headerSection = $ ('#header');
const trendingPreviewSection = $ ('#trendingPreview');
const categoriesPreviewSection = $ ('#categoriesPreview');
const genericSection = $ ('#genericList');
const movieDetailSection = $ ('#movieDetail');

// Lists & Containers
const searchForm = $ ('#searchForm');
const trendingMoviesPreviewList = $ ('.trendingPreview-movieList');
const categoriesPreviewList = $ ('.categoriesPreview-list');
const movieDetailCategoriesList = $ ('#movieDetail .categories-list');
const relatedMoviesContainer = $ ('.relatedMovies-scrollContainer');
const likedMoviesSection = $ ('#liked');

// Elements
const headerTitle = $ ('.header-title');
const arrowBtn = $ ('.header-arrow');
const headerCategoryTitle = $ ('.header-title--categoryView');

const searchFormInput = $ ('#searchForm input');
const searchFormBtn = $ ('#searchBtn');

const trendingBtn = $ ('.trendingPreview-btn');

const movieDetailTitle = $ ('.movieDetail-title');
const movieDetailDescription = $ ('.movieDetail-description');
const movieDetailScore = $ ('.movieDetail-score');

const likedMovieContainer = $ ('.liked-container');
const likedMovieListArticle = $ ('.liked-movieList');

const headerTitleMovie4U = $ ('#header-title--movie4u');//he intentado colocarlo para cada vez que le de al título, me recarge la página y no tenga que estar con cmd+r

const headerMenu = $ ('.header-menu');