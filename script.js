var response
var api_data
var id
var keyword

async function getData() {
	response1 = await fetch('https://NFLXroulette.samharris.xyz/keywords.json');
	api_data1 = await response1.json()

	random_num = getRandomInt(0,api_data1.length-1)
	keyword = api_data1[random_num].id


	response = await fetch('https://api.themoviedb.org/3/discover/movie?language=en-us&vote_count.gte=3000&with_keywords=' + keyword + '&api_key=8c3bccbc2733907ba7cfeddb6e80ee5e');
	api_data = await response.json()

	if (api_data.total_results == 0) {
		console.log("oh no");
		getData()
	} else {
		
		random_num = getRandomInt(0,api_data.results.length-1);
		id = api_data.results[random_num].id

		response = await fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=8c3bccbc2733907ba7cfeddb6e80ee5e');
		api_data = await response.json()

		console.log(api_data)

		const {poster_path, original_title, tagline, release_date, runtime, vote_average} = api_data;

		document.getElementById("title_html").textContent = original_title;
		document.getElementById("plot_html").textContent = tagline;
		document.getElementById("runtime_html").textContent = "🕒 " + runtime + " minutes";
		document.getElementById("rating_html").textContent = "⭐ " + vote_average + "/10";
		document.getElementById("release_html").textContent = "📅 " + release_date;
		//document.getElementById("age_rating_html").attributes[1].textContent = "img/" + Rated.toLowerCase() + ".png";
		document.getElementById("img_url_html").attributes[1].textContent = 'http://image.tmdb.org/t/p/original' + poster_path;
	}
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}


getData()
