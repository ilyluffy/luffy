const queryParams = new URLSearchParams(window.location.search);
const mangaId = queryParams.get("id");

const apiUrl = `https://api.consumet.org/manga/mangahere/info?id=${mangaId}`;

const getMangaInfo = async () => {
  try {
    const { data } = await axios.get(apiUrl);

    document.getElementById("title").textContent = data.title;

    if (data.headers) {
      const imageUrl = `https://api.consumet.org/utils/image-proxy?url=${data.image}&referer=${data.headers.Referer}`;
      document.getElementById("manga-image").src = imageUrl;
    }

    if (data.altTitles && data.altTitles.length > 0) {
      const altTitlesElement = document.getElementById("alt-titles");
      altTitlesElement.innerHTML = "<strong>Alt Titles:</strong><br>";
      data.altTitles.forEach((altTitle) => {
        const altTitleElement = document.createElement("p");
        altTitleElement.textContent = altTitle;
        altTitlesElement.appendChild(altTitleElement);
      });
    }

    if (data.genres && data.genres.length > 0) {
      const genresElement = document.getElementById("genres");
      genresElement.innerHTML = "<strong>Genres:</strong><br>";
      data.genres.forEach((genre) => {
        const genreElement = document.createElement("p");
        genreElement.textContent = genre;
        genresElement.appendChild(genreElement);
      });
    }

    const chapterButtonsElement = document.getElementById("chapter-buttons");
    data.chapters.forEach((chapter) => {
      const chapterButton = document.createElement("button");
      chapterButton.textContent = chapter.title;
      chapterButton.addEventListener("click", () => {
        window.location.href = `manga.html?id=${chapter.id}`;
      });
      chapterButtonsElement.appendChild(chapterButton);
    });

  } catch (err) {
    console.error(err);
  }
};

getMangaInfo();
