//this is for the top rated one
'use strict'
const youTube_URL = "https://www.googleapis.com/youtube/v3/search";
const movie_url = "https://api.themoviedb.org/20/movie/top_rated?api_key=8138343e44a830c6f4885ac10eb30b86&language=en-US";
const movie_moreInfo_url = "https://api.themoviedb.org/3/movie/114?api_key=8138343e44a830c6f4885ac10eb30b86&language=en-US"
var movieCounter = 0;
var list = [];
let movieCounters = 0;
let thumbnailNumber=0;
let thumbnailIndex=0;
let pages = 1;
let arr = [];

function get_YouTube_API(curr){
    const settings ={
      url: youTube_URL,
      id:{
        kind:'youtube#video'
      },
      data : {
        part:'snippet',
        key:'AIzaSyA_btGl7SDfpHrSXexVkeSNiXW5111kg0w',
        q: `${curr}`,
        type:'video'
      },
      dataType: 'json',
      type: 'GET',
      maxResults:1,
    }
    
   
    $.ajax(settings).done(function(response){
        displayYouTubeSearchData(response,curr);
    });
}

function displayYouTubeSearchData(data,title, id) {
    const results = renderResult(data.items[0]);
    $(`div#${thumbnailNumber}.top-row-img`).append(results);
    thumbnailNumber++;
}


/**We want this to return the 
 * 'title +trailer" 
 */
function returnTitleTrailer(title){
    return `${title} trailer`;

}

/**Makes the div with the thumbnail linking to 
 * the Youtube page for the trailer.
 */
function renderResult(items){
    console.log(items);
    return `<a href = "https://www.youtube.com/watch?v=${items.id.videoId}" role="link" aria-roledescription="thumbnail link to the ${items.snippet.title} video">
        <img class="youtubeThumbnail" src="${items.snippet.thumbnails.medium.url}" 
        alt = "${items.snippet.title}"></a>`; 
} 


function get_movie_API(){
    console.log(pages);
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://api.themoviedb.org/3/movie/top_rated?api_key=8138343e44a830c6f4885ac10eb30b86&language=en-US&page=${pages}`,
        "method": "GET",
        "headers": {},
        "data": "{}",
      }
      
      
      $.ajax(settings).done(function (response) {
       console.log(response);
       var size = movieCounter+5;
       //loads 5 movies at a time.
       
       for(let i = movieCounter; i < size; i++){
        console.log(response.results[i].id);
        get_moreInfoMovie_API(response.results[i].id);
        movieCounter++;
        movieCounters++;
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
        getTitleOfMovieAndRating(response.genres, response.title, 
            response.vote_average, response.id,response.poster_path);
       
      });
}

function clickBoys(){
    $('#stayIn').on('click', function(event){
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

function getTitleOfMovieAndRating(genre, title, rating,id,imgPath){
    const genreHTML = renderGenreofMovie2(genre);
    //this is what needs to be searched for the youtubeAPI
    let searchQuery = returnTitleTrailer(title);
    get_YouTube_API(searchQuery);
    $('main').append(
        `<div class="movieContainer" data-id=${movieCounters} alignWithTop=false> 
            <div class="top-row">
            <div id=${thumbnailIndex} class='top-row-img' ></div>
            <ul class='top-row-text-list'>
                <li class='top-row-text-list-item'>
                    <span class='list-item-span-category'>Title:</span>
                    <span class='list-item-span'>${title}</span>
                 </li>
                <li class='top-row-text-list-item'>
                    <span class='list-item-span-category'>Rating:</span>
                    <span class='list-item-span'>${rating}</span>
                </li>
                <li class='top-row-text-list-item'>
                    <span class='list-item-span'>Genres:</span>
                    <ul class='list-item-span'>${genreHTML}</ul>
                </li>
            </div>
        </div>
        `
       
    );

    thumbnailIndex++;
    if((movieCounters%5)===0){
        let offset = $(`[data-id=${movieCounters}]`).offset();
        offset.left -= 20;
        offset.top -= 20;
        $('html, body').animate({
            scrollTop: offset.top,
            scrollLeft: offset.left
        });
} 
}



function renderGenreofMovie2(genres){
    //console.log(genre[0].name + " lllll");
    return genres.map(genre => {
        return `<li class="genreList">${genre.name}</li>`;
      }).join(", ");
}


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
        if(((movieCounter % 20)===0) & movieCounter!=0){
            pages++;
            movieCounter =0;
        }
    
        event.preventDefault();
        get_movie_API();
    });
  
}

function bindStartingFunctions(){
    clickBoys();
  
}


$(bindStartingFunctions);