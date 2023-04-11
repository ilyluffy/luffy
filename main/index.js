const imageContainer = document.querySelector('.image-container');
const searchInput = document.querySelector('#search-input');
const topAnimeContainer = document.querySelector('.top-anime-container');
const parentContainer = document.querySelector('.parent-container');
const nextButton = document.createElement('button');
const backButton = document.createElement('button');
let page = 1;
nextButton.style.display = 'none';
backButton.style.display = 'none';
nextButton.style.margin = 'auto';
backButton.style.margin = 'auto';

async function searchImages(query, page) {
  try {
    const response = await fetch(`https://api.consumet.org/anime/gogoanime/${query}?page=${page}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
  }
}

function renderImages(images) {
  imageContainer.innerHTML = '';
  images.forEach((image) => {
    const imgContainer = document.createElement('div');
    const img = document.createElement('img');
    img.src = image.image;
    img.alt = image.title;
    img.title = image.title;
    img.addEventListener('click', () => {
      window.location.href = `series.html?id=${image.id}`;
    });
    const title = document.createElement('div');
    title.textContent = image.title;
    imgContainer.appendChild(img);
    imgContainer.appendChild(title);
    imageContainer.appendChild(imgContainer);
  });
}

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
  backButton.style.display = 'none';
  nextButton.style.backgroundColor = '#FFC107';
  nextButton.style.color = '#FFFFFF';
  nextButton.style.fontSize = '16px';
  nextButton.style.padding = '10px 20px';
  nextButton.style.borderRadius = '10px';
  nextButton.style.transition = 'all 0.3s ease-in-out';
  nextButton.style.margin = 'auto';

  backButton.style.backgroundColor = '#2196F3';
  backButton.style.color = '#FFFFFF';
  backButton.style.fontSize = '16px';
  backButton.style.padding = '10px 20px';
  backButton.style.borderRadius = '10px';
  backButton.style.transition = 'all 0.3s ease-in-out';
  backButton.style.margin = 'auto';
}

init();

searchInput.addEventListener('input', async () => {
  const query = searchInput.value.trim();
  page = 1;
  if (query === '') {
    topAnimeContainer.style.display = 'flex';
    imageContainer.innerHTML = '';
    nextButton.style.display = 'none';
    backButton.style.display = 'none';

  } else {
    const images = await searchImages(query, page);

    if (images.length === 0 && query.length > 3) {
        imageContainer.innerHTML = '<h2 class="not-found">Not Found</h2>';
        topAnimeContainer.style.display = 'none';
        nextButton.style.display = 'block';
        backButton.style.display = 'none';
    } else {
        renderImages(images);
        topAnimeContainer.style.display = 'none';
        nextButton.style.display = 'block';
        backButton.style.display = page > 1 ? 'block' : 'none';
        nextButton.textContent = `Next Page`;
        backButton.textContent = `Previous Page`;
    }
  }
});

nextButton.addEventListener('click', async () => {
  const query = searchInput.value.trim();
  page++
  
    ;

  if (query !== '') {
    const images = await searchImages(query, page);

    if (images.length === 0) {
        imageContainer.innerHTML = '<h2 class="not-found">Not Found</h2>';
        nextButton.style.display = 'none';
        backButton.style.display = 'none';
    } else {
        renderImages(images);
        if(page>1){
          backButton.style.display = 'block';
        }
    }
  }
});

backButton.addEventListener('click', async () => {
  const query = searchInput.value.trim();
  if(page>1){
    page--;
  }
  

  if (query !== '') {
    const images = await searchImages(query, page);

    if (images.length === 0) {
        imageContainer.innerHTML = '<h2 class="not-found">Not Found</h2>';

    } else {
        renderImages(images);
        nextButton.style.display = 'block';
    }
  }
});
parentContainer.appendChild(backButton);
parentContainer.appendChild(nextButton);
