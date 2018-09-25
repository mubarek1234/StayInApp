


function clickBoys(){
    $('#boys').on('click', function(event){
        console.log("hello");
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
            <button type="submit" class="innerBtn" id="moviesBoys">Food</button>
         </div>`  
    )
}

function bindStartingFunctions(){
    clickBoys();
}

$(bindStartingFunctions);