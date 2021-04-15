function MovieList(){
  $('#movie-list').html('')
  $.ajax({
    url : 'http://www.omdbapi.com',
    type : 'get',
    dataType : 'json',
    data : {
      'apikey' : '9e4ced24',
      's' : $('#search-input').val()
    },
    success : function(result){
      if(result.Response == "True"){
        let movies = result.Search
        $.each(movies, function(i,data){
          $('#movie-list').append(`
          <div class="col-md-4">
            <div class="card">
              <img src="`+ data.Poster +`"  class="card-img-top" alt="list">
              <div class="card-body">
                <h5 class="card-title">`+data.Title+`</h5>
                <h6 class="card-subtitle mb-2 text-muted">`+data.Year+`</h6>
                <a href="#" class="card-link details" data-toggle="modal" data-target="#exampleModal" data-id="`+data.imdbID+`">Details</a>
              </div>
              </div>
            </div>
          `)
        })
        $('#search-input').val('')
      } else {
        $('#movie-list').html(`
        <div class="col">
        <h1 class="text-center">Movie not found</h1>
        </div>`)
      }
    }
  })
}
$('#search-button').on('click', function() {
  MovieList()
})
$('#search-input').on('keyup', function(e){
  if(e.keyCode === 13){
    MovieList()
  }
})

$('#movie-list').on('click','.details', function(){
  
  $.ajax({
    url : 'http://www.omdbapi.com',
    type : 'get',
    dataType : 'json',
    data : {
      'apikey' : '9e4ced24',
      'i' : $(this).data('id')
    },
    success : function(movie){
      if(movie.Response === "True"){
        $('.modal-body').html(`
          <div class="container-fluid d-flex">
            <div class="row"
              <div class="col-md-4">
                <img src="`+movie.Poster+`">
              </div>
              <div class="col-md-8">
                <ul class="list-group">
                  <li class="list-group-item"><h3>`+movie.Title+`</h3></li>
                  <li class="list-group-item">`+movie.Title+`</li>
                  <li class="list-group-item">`+movie.Year+`</li>
                  <li class="list-group-item">`+movie.Released+`</li>
                  <li class="list-group-item">`+movie.Genre+`</li>
                  <li class="list-group-item">`+movie.Director+`</li>
                </ul>
              </div>
            </div>
          </div>
        `)
      }
    }
})
})