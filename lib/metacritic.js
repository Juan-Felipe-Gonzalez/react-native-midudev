export async function getLatestGames() {

  const API_READ_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWY4Y2JkMzkxODUwNWYzZTlkNDYyZjcwNzc1ZWI4YiIsIm5iZiI6MTc3NjU1NDAxMi45MjQsInN1YiI6IjY5ZTQxMDFjOTQ0ZTFkMzQyZDRiMmRmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.197jk9IsJd0V53BOaXf63-16giUCfEkOTuNIKNMyybY"

  const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'
  
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization" : "Bearer " + API_READ_ACCESS_TOKEN,
      "accept" : "application/json"
    },
  });

  const json = await response.json()
  
  console.log("\n\n****************************************")
  console.log("****************************************")
  console.log("****************************************")
  console.log("****************************************")
  console.log(json.results[0].vote_average)

  const { results : items } = json;

  return items.map((item) => {
    const { "original_title": title, "overview": description, "id": slug, "release_date": releaseDate, "poster_path": image, "vote_average": score } = item;

    return {
      description,
      releaseDate,
      score,
      slug,
      title,
      image : "https://image.tmdb.org/t/p/w500/" + image,
    };
  });
}

export async function getGameDetails(slug) {
  const GAME_DETAILS = `https://internal-prod.apigee.fandom.net/v1/xapi/composer/metacritic/pages/games/${slug}/web?&apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u`;

  const rawData = await fetch(GAME_DETAILS);
  const json = await rawData.json();

  const { components } = json;
  const { title, description, criticScoreSummary, images } = components[0];
  const { score } = criticScoreSummary;

  // get the card image
  const cardImage = images.find((image) => image.typeName === 'cardImage');
  const { bucketType, bucketPath } = cardImage;
  const img = `https://www.metacritic.com/a/img/${bucketType}${bucketPath}`;

  const rawReviews = components[3].data.items;

  // get the reviews
  const reviews = rawReviews.map((review) => {
    const { quote, score, date, publicationName, author } = review;
    return { quote, score, date, publicationName, author };
  });

  return {
    img,
    title,
    slug,
    description,
    score,
    reviews,
  };
}
