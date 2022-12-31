import "../scss/main.scss";
import "what-input";
import Swiper, { A11y, Navigation, Pagination } from "swiper";
import carouselUtils from "./utils/carouselUtils";

class Setup {
  constructor() {
    this.log = "Start finoz/annaemich";
  }
  init() {
    console.log(this.log);
    this.setCarousel();
  }

  setCarousel() {
    let gallery = document.body.querySelector(".content-gallery");
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
}
let setup = new Setup();
setup.init();
