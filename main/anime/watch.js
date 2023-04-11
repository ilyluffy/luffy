const seriesInfo = async function init() {
  const queryParams = new URLSearchParams(window.location.search);
  const episodeId = queryParams.get('episode');
  const title = queryParams.get('title').toLowerCase();
  const apiUrl = `https://api.consumet.org/anime/gogoanime/watch/${title}-episode-${episodeId}?server=gogocdn`;

  try {
    const response = await fetch(apiUrl);
    const { sources } = await response.json();

    const video = document.getElementById('video');

    // Check that sources is an array before iterating over it
    if (Array.isArray(sources)) {
      // Loop through sources to find the highest quality available
      let highestQuality = -1;
      let highestQualityUrl = null;

      for (const source of sources) {
        if (source.quality === 'default') {
          continue;
        }

        const quality = parseInt(source.quality);
        if (quality > highestQuality && quality <= 1080) {
          highestQuality = quality;
          highestQualityUrl = source.url;
        }
      }

      if (highestQualityUrl && Hls.isSupported()) {
        const hls = new window.Hls();
        hls.loadSource(highestQualityUrl);
        hls.attachMedia(video);
      } else {
        video.src = highestQualityUrl;
      }
    } else {
      console.error('Sources is not an array:', sources);
    }

    // Check if there's a next episode
    const infoUrl = `https://api.consumet.org/anime/gogoanime/info/${title}`;
    const infoResponse = await fetch(infoUrl);
    const { episodes } = await infoResponse.json();
    const nextEpisode = episodes.find((ep) => ep.number === parseInt(episodeId) + 1);

    // Add event listener to next episode button
    const nextEpisodeBtn = document.getElementById('next-episode-btn');
    const nextEpisodeUrl = nextEpisode ? `watch.html?title=${title}&episode=${nextEpisode.number}` : '#';
    nextEpisodeBtn.addEventListener('click', () => {
      // Update local storage with next episode number
      const localStorageEpisodes = JSON.parse(localStorage.getItem(title)) || [];
      const nextEpisodeNumber = nextEpisode.number;
      localStorage.setItem(title, JSON.stringify([...localStorageEpisodes, nextEpisodeNumber]));
      window.location.href = nextEpisodeUrl;
    });

    // Hide next episode button if there's no next episode
    const nextEpisodeContainer = document.getElementById('next-episode-container');
    nextEpisodeContainer.style.display = nextEpisode ? 'block' : 'none';
  } catch (err) {
    console.error(err);
  }
}

// Add next episode number to URL and update local storage when user clicks next episode button
seriesInfo();
