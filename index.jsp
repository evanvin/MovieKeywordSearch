<html>
<head>
<!-- CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<link rel="stylesheet" href="css/bootstrap-slider.css">
<link rel="stylesheet" href="css/bootstrap-tagsinput.css">
<link rel="stylesheet" href="css/bootstrap-multiselect.css">
<link rel="stylesheet" href="css/movie_style.css">

<!--JAVASCRIPT -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="js/bootstrap-tagsinput.min.js"></script>
<script src="js/bootstrap-multiselect.js"></script>
<script src="js/bootstrap-slider.js"></script>
<script src="js/cors-anywhere.js"></script>

</head>
<body id="background">

<div id="loadingDiv"><img src="img/load.gif"/></div>

<div class="container">
	<br><br><br><br>


	<div class="row">
		<div class="col-md-4">
			<div class="panel panel-default panel-transparent">
			  <div class="panel-body">
			  	<div class="row">
			    <div class="col-md-10 col-md-offset-1">
					<h1>Movie Search</h1>
					<br>
					
					<div class="form-group">
						<label>Keywords</label><input id="keywordTags" data-role="tagsinput" type="text" class="form-control" aria-describedby="basic-addon1">
					</div>
					<div class="form-group">
						<label>Genre</label><br>
						<select id="genreSelect" multiple="multiple" class="form-control">
							<option value="Thriller">Thriller</option>
							<option value="Drama">Drama</option>
							<option value="Crime">Crime</option>
							<option value="Mystery">Mystery</option>
							<option value="Fantasy">Fantasy</option>
							<option value="Romance">Romance</option>
							<option value="History">History</option>
							<option value="War">War</option>
							<option value="Western">Western</option>
							<option value="Family">Family</option>
							<option value="Musical">Musical</option>
							<option value="Horror">Horror</option>
							<option value="Action">Action</option>
							<option value="Comedy">Comedy</option>
							<option value="Sci-Fi">Sci-Fi</option>
							<option value="Adventure">Adventure</option>
							<option value="Biography">Biography</option>
							<option value="Documentary">Documentary</option>
							<option value="Sport">Sport</option>
							<option value="Animation">Animation</option>
							<option value="Music">Music</option>
							<option value="News">News</option>
						</select>
					</div>
					<div class="form-group">
						<label>Movie or TV</label><br>
						<select id="movieTVSelect" multiple="multiple" class="form-control">
							<option value="tvEpisode">TV Episode</option>
							<option value="short">Short Film</option>
							<option value="movie">Feature Film</option>
							<option value="tvSeries">TV Series</option>
							<option value="tvMovie">TV Movie</option>
							<option value="video">Video</option>
							<option value="videoGame">Video Game</option>
							<option value="tvMiniSeries">TV Mini-Series</option>
							<option value="tvSpecial">TV Special</option>
							<option value="tvShort">TV Short</option>
						</select>
					</div>
					
					<div class="form-group">
						<label>Rating</label><br>
						<input id="ratingSlider" type="text" class="span2" value="" data-slider-min="1" data-slider-max="10" data-slider-step=".1" data-slider-value="[1,10]" data-slider-handle="custom"/>
					</div>
					
					<div class="form-group centered">
						<button type="button" class="btn btn-danger btn-lg" onclick="clearForm();">Clear</button>
						<button type="button" class="btn btn-info btn-lg" onclick="searchMovies();">Search</button>
					</div>					
				</div>
				</div>
			  </div>
			</div>
		</div>
		<div class="col-md-8">
			<div class="panel panel-default panel-transparent">
			  <div class="panel-body">
				<div class="row">
					<div class="col-md-12" id="sortRow">
						<div class="form-group">
							<select id="sortBySelect" class="form-control">
								<option value="moviemeter" selected>Rating</option>
								<option value="user_rating">IMDB Rating</option>
								<option value="alpha">Alphabetical</option>
								<option value="release_date">Release Date</option>
								<option value="runtime">Runtime</option>
								<option value="year">Year</option>
							</select>
						</div>
						<div class="form-group">
							<select id="orderBySelect" class="form-control">
								<option value="asc">Ascending</option>
								<option value="desc">Descending</option>
							</select>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12" id="numberOfResults">
					
					</div>
				</div>	
				<div class="row">
					<div class="col-md-12" id="resultBody">
					
					</div>
				</div>				
			  </div>
			</div>
		</div>
	</div>
	
	
	

		
	
	
</div>


<div class="back-to-top">Top</div>

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"/></script>
<script src="js/log.js"></script>

</body>
</html>