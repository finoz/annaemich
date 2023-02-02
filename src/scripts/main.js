import "../scss/main.scss";
import "what-input";
import Swiper, { A11y, Navigation, Pagination } from "swiper";
import carouselUtils from "./utils/carouselUtils";

class Setup {
  constructor() {
    this.songbookUrl = "./songs/";
    this.log = "Start finoz/annaemich";
  }

  listenForComponents() {
    const compDispatcher = new ComponentDispatcher();
    compDispatcher.createAsyncComponents().then(() => {
      compDispatcher.observeDomChanges();
    });
  }

  init() {
    console.log(this.log);
    this.setCarousel();
    this.setSongbook();
  }

  setCarousel() {
    let gallery = document.body.querySelector(".content-gallery");
    if (!gallery) return;
    carouselUtils.setSwiperMarkup({
      $el: gallery,
      hasArrows: true,
      hasBullets: true,
    });
    Swiper.use([Navigation, Pagination, A11y]);
    new Swiper(gallery, {
      slidesPerView: 1,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
      },
    });
  }

  setSongbook() {
    if (!window.songbook) return;
    window.songbook.sort(function (a, b) {
      return a.title.localeCompare(b.title);
    });
    window.songbook.forEach((song) => {
      this.setSong(song);
    });
  }

  async setSong(song) {
    let url = this.songbookUrl + song.id + ".html";
    const text = await this.getFetchedDom(url);
    song.text = text;
    let songMarkup = this.buildSongMarkup(song);
    let songbook = document.body.querySelector(".page-content--canti");
    songbook.insertAdjacentHTML("beforeend", songMarkup);
  }

  buildSongMarkup(song) {
    let songMarkup = `
			<details class="song" data-id="${song.id}" data-title="${song.title}" data-author="${song.author}">
				<summary class="song-title">${song.title}</summary>
				<div>`;
    if (song.author) {
      songMarkup += `<p class="song-author">${song.author}</p>`;
    }
    songMarkup += `<div class="song-text">${song.text}</div>
		</div></details>
		`;
    return songMarkup;
  }

  // UTILS

  async getFetchedDom(url) {
    return fetch(url).then(function (response) {
      return response.text();
    });
  }
}

let setup = new Setup();
setup.init();
