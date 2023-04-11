const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("searchTerm");
const resultsList = document.getElementById("results-list");

const apiUrl = "https://api.consumet.org/manga/mangahere/";

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = searchInput.value;
  const url = `${apiUrl}${query}`;
  try {
    const { data } = await axios.get(url);
    const results = data.results;
    resultsList.innerHTML = "";
    results.forEach((result) => {
      const li = document.createElement("li");
      const title = result.title;
      const imageSrc = result.image ? `https://api.consumet.org/utils/image-proxy?url=${encodeURIComponent(result.image)}&referer=${encodeURIComponent(result.headerForImage.Referer)}` : `https://dummyimage.com/200x300/000/fff&text=${title}`;
      const altTitles = result.altTitles;
      const altTitlesString = altTitles && altTitles.length > 0 ? `(${altTitles.join(", ")})` : "";
      const id = result.id;
      li.innerHTML = `<a href="#"><img src="${imageSrc}" alt="${title}"/><div class="result-info"><h2>${title}</h2><p>${altTitlesString}</p></div></a>`;
      resultsList.appendChild(li);

      const image = li.querySelector("img");
      image.addEventListener("click", () => {
        window.location.href = `info.html?id=${id}`;
      });
    });
  } catch (error) {
    console.error(error);
  }
});
