//this is for the top rated one
const movie_url = "https://api.themoviedb.org/3/movie/top_rated?api_key=8138343e44a830c6f4885ac10eb30b86&language=en-US";
const movie_moreInfo_url = "https://api.themoviedb.org/3/movie/114?api_key=8138343e44a830c6f4885ac10eb30b86&language=en-US"
var movieCounter = 0;
var list = [];

function get_movie_API(){
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": movie_url,
        "method": "GET",
        "headers": {},
        "data": "{}",
      }
      
      $.ajax(settings).done(function (response) {
       console.log(response);
       var size = movieCounter+5;
       //loads 5 movies at a time.
       for(let i = movieCounter; i < size; i++){
        get_moreInfoMovie_API(response.results[i].id);
        movieCounter++;
        }
        });

    }

function get_moreInfoMovie_API(id){
    console.log("in here");
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=8138343e44a830c6f4885ac10eb30b86`,
        "method": "GET",
        "headers": {},
        "data": "{}"
      }

      $.ajax(settings).done(function(response) {
        console.log(response);
        console.log(response.id);
        console.log(response.title);
        getTitleOfMovieAndRating(response,response.title, response.vote_average);
       
      });
}

function clickBoys(){
    $('#boys').on('click', function(event){
        event.preventDefault();
        loadBoysPage();
    });
}

function loadBoysPage(){
    $('main').empty();
    addContentBoys();
}

function addContentBoys(){
    $('main').append(
        `<div class="divContainer">
         <button type="submit" class="innerBtn" id="moviesBoys">Movies</button>
         <button type="submit" class="innerBtn" id="foodBoys">Food</button>
         </div>`  
    )
    isMovieBtnClickedBoys();
}

function isMovieBtnClickedBoys(){
    $('.divContainer').on('click', function(event){
        event.preventDefault();
        get_movie_API();
        addLoadMoreMoviesBtn();
    });
}

function getTitleOfMovieAndRating(response, title, rating){
  
    $('main').append(
        `<section class="${title}"><p>${title}</p><p>${rating}</p></section>`
    )

    response.genres.map(function(key){
        console.log(key.name);
        renderGenreofMovie2(key.name, response.title);
    });
}
/*
function renderGenreofMovie(genreTitle){
    $('main').append(
        `<section class="genreMovie"><p class="genreP">${genreTitle}</p></section>`
    )
}*/

function renderGenreofMovie2(genreTitle, sectionIn){
    var movieClass = sectionIn;
    console.log("in hereeeeeee");
    var ll = $('main').find('.sectionIn');
    $('.sectionIn').append(
        `<section class="genreMovie"><p class="genreP">${genreTitle}</p></section>`
    )
}
/*
function renderMovieRating(rating){
    $('main').append(
        `<section class="ratingMovie"><p>${rating}</p></section>`
    )
}*/


/**Render the movie page with the list of movies when 
 * the user clicks movies.
 */
function renderMoviePage(){
    $('main').empty();
    $('main').append(appendMovieTitle());
}

function appendMovieTitle(){
    //design later
    return `<div class="movieListContainer"><h1>Movies</h1>
            </div>`
}

/**Allows users to load more than 5 videos */
function addLoadMoreMoviesBtn(){
    $('body').append(
        `<footer><button class="loadMore" type="submit">Load more</button></footer>`
    )
    loadMoreMovies();
}

/**Loads more movies */
function loadMoreMovies(){
    $('.loadMore').on('click', function(event){
        event.preventDefault();
        get_movie_API();
    });
  
}

function bindStartingFunctions(){
    clickBoys();
  
}


$(bindStartingFunctions);