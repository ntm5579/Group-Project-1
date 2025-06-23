let titleH1;
let episodeIdSpan;
let directorSpan;
let producerSpan;
let releaseDateSpan;
let openingCrawlP;
let charactersUl;
let planetsUl;
const baseUrl = `http://localhost:9001/api`;

addEventListener('DOMContentLoaded', () => {
  titleH1 = document.querySelector('h1#title');
  episodeIdSpan = document.querySelector('span#episode_id');
  directorSpan = document.querySelector('span#director');
  producerSpan = document.querySelector('span#producer');
  releaseDateSpan = document.querySelector('span#release_date');
  openingCrawlP = document.querySelector('p#opening_crawl');
  charactersUl = document.querySelector('#characters>ul');
  planetsUl = document.querySelector('#planets>ul');
  
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get('id');
  getFilm(id);
});

async function getFilm(id) {
  let film;
  try {
    film = await fetchFilm(id);
    film.characters = await fetchCharacters(id);
    film.planets = await fetchPlanets(id);
  }
  catch (ex) {
    console.error(`Error reading film ${id} data.`, ex.message);
  }
  renderFilm(film);
}

async function fetchFilm(id) {
  let filmUrl = `${baseUrl}/films/${id}`;
  return await fetch(filmUrl)
    .then(res => res.json());
}

async function fetchCharacters(id) {
  const url = `${baseUrl}/films/${id}/characters`;
  const characters = await fetch(url)
    .then(res => res.json());
  return characters;
}

async function fetchPlanets(id) {
  const url = `${baseUrl}/films/${id}/planets`;
  const planets = await fetch(url)
    .then(res => res.json());
  return planets;
}

const renderFilm = film => {
  document.title = `SWAPI - ${film?.title}`;
  titleH1.textContent = film?.title;
  episodeIdSpan.textContent = film?.episode_id;
  directorSpan.textContent = film?.director;
  producerSpan.textContent = film?.producer;
  releaseDateSpan.textContent = film?.release_date;
  openingCrawlP.textContent = film?.opening_crawl;
  
  const charactersLis = film?.characters?.map(character => 
    `<li><a href="/character.html?id=${character.id}">${character.name}</a></li>`
  );
  charactersUl.innerHTML = charactersLis?.join("") || "";
  
  const planetsLis = film?.planets?.map(planet => 
    `<li><a href="/planet.html?id=${planet.id}">${planet.name}</a></li>`
  );
  planetsUl.innerHTML = planetsLis?.join("") || "";
};