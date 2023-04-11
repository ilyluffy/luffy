const seriesInfo = document.querySelector('.series-info');
const queryParams = new URLSearchParams(window.location.search);
const seriesId = queryParams.get('id');

async function getSeriesInfo(id) {
  try {
    const response = await fetch(`https://api.consumet.org/anime/gogoanime/info/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

function renderSeriesInfo(series) {
  const img = document.createElement('img');
  img.src = series.image;
  img.alt = series.title;

  const infoContainer = document.createElement('div');
  const title = document.createElement('h2');
  title.textContent = series.title;
  const description = document.createElement('p');
  description.textContent = series.description;
  const genres = document.createElement('p');
  genres.textContent = `Genres: ${series.genres.join(', ')}`;
  const subOrDub = document.createElement('p');
  subOrDub.textContent = `Sub or Dub: ${series.subOrDub}`;

  infoContainer.appendChild(title);
  infoContainer.appendChild(description);
  infoContainer.appendChild(genres);
  infoContainer.appendChild(subOrDub);

  const episodesContainer = document.createElement('div');
  episodesContainer.classList.add('episodes');

  const episodesTitle = document.createElement('h3');
  episodesTitle.textContent = 'Episodes:';
  episodesContainer.appendChild(episodesTitle);

  seriesInfo.appendChild(img);
  seriesInfo.appendChild(infoContainer);
  seriesInfo.appendChild(episodesContainer);

  const clickedEpisodes = JSON.parse(localStorage.getItem(seriesId)) || [];
  for (let i = 1; i <= series.totalEpisodes; i++) {
    const episodeButton = document.createElement('button');
    episodeButton.textContent = `${i}`;
    episodeButton.style.backgroundColor = clickedEpisodes.includes(i) ? 'green' : 'white';
    episodeButton.addEventListener('click', () => {
      const episodeTitle = series.title.replace(/ /g, '-');
      const episodeNumber = i;
      window.location.href = `watch.html?title=${episodeTitle}&episode=${episodeNumber}`;
      clickedEpisodes.push(i);
      localStorage.setItem(seriesId, JSON.stringify(clickedEpisodes));
      episodeButton.style.backgroundColor = 'green';
    });

    episodesContainer.appendChild(episodeButton);
  }
  
  document.title = `${seriesId} - Mid Anime`; // set the title as the series ID
}


async function init() {
  const series = await getSeriesInfo(seriesId);
  renderSeriesInfo(series);
}

init();
