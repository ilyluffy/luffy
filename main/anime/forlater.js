const topAnimeContainer = document.querySelector('.top-anime-container');

async function getTopAiringAnime() {
  try {
    const response = await fetch(`https://api.consumet.org/anime/gogoanime/top-airing`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
  }
}

function renderTopAnime(anime) {
  topAnimeContainer.innerHTML = '';
  anime.forEach((a) => {
    const animeDiv = document.createElement('div');
    animeDiv.className = 'top-anime';
    const img = document.createElement('img');
    img.src = a.image;
    img.alt = a.title;
    animeDiv.appendChild(img);
    const title = document.createElement('div');
    title.className = 'top-anime-title';
    title.textContent = a.title;
    animeDiv.appendChild(title);
    animeDiv.addEventListener('click', () => {
      window.location.href = `series.html?id=${a.id}`;
    });
    topAnimeContainer.appendChild(animeDiv);
  });
}

async function init() {
  const topAnime = await getTopAiringAnime();
  renderTopAnime(topAnime);
}

init();
