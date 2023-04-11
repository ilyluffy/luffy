const urlParams = new URLSearchParams(window.location.search);
const chapterId = urlParams.get("id");

const imgContainer = document.getElementById("img-container");
const navContainer = document.getElementById("nav-container");
const nextBtn = document.getElementById("next-btn");

const getChapterPages = async () => {
  try {
    const res = await axios.get("https://api.consumet.org/manga/mangahere/read", {
      params: { chapterId },
    });

    const pages = res.data;

    for (let i = 0; i < pages.length; i++) {
      const imgSrc = pages[i].img;
      const referer = pages[i].headerForImage.Referer;

      const img = document.createElement("img");
      img.src = `https://api.consumet.org/utils/image-proxy?url=${encodeURIComponent(
        imgSrc
      )}&referer=${encodeURIComponent(referer)}`;

      img.addEventListener("load", () => {
        if (img.naturalWidth > imgContainer.offsetWidth) {
          img.style.width = "100%";
        }
      });

      imgContainer.appendChild(img);
    }

    // Add next button
    const chapterIdParts = chapterId.split('/');
    const chapterNum = parseInt(chapterIdParts[2].substring(1));
    const nextChapterNum = chapterNum + 1;
    const nextChapterId = `${chapterIdParts[0]}/${chapterIdParts[1]}/c${nextChapterNum.toString().padStart(3, '0')}`;
    const nextChapterUrl = `${window.location.origin}${window.location.pathname}?id=${nextChapterId}`;



    const nextBtnHandler = () => {
      window.location.href = nextChapterUrl;
    };

    const nextBtnVisibility = await getNextChapterAvailability(nextChapterId);
    
    if (nextBtnVisibility) {
      nextBtn.style.display = "block";
      nextBtn.addEventListener("click", nextBtnHandler);
    }
  } catch (error) {
    console.error(error);
  }
};

const getNextChapterAvailability = async (chapterId) => {
  try {
    const res = await axios.get("https://api.consumet.org/manga/mangahere/info", {
      params: { id : chapterId.split("/")[0] },
    });

    

    const chapterNum = parseInt(chapterId.match(/c(\d+)/)[1]);
    const lastChapterNum = parseInt(res.data.chapters[0].id.match(/c(\d+)/)[1]);

    
    

    return chapterNum < lastChapterNum;
  } catch (error) {
    console.error(error);
    return false;
  }
};

getChapterPages();
