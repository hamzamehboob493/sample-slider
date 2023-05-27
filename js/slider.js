class Slider {
  constructor(sliderElement, config) {
    this.sliderElement = sliderElement;
    this.slidesContainer = sliderElement.querySelector(".slides");
    this.slides = Array.from(this.slidesContainer.children);
    this.navigationArrows = sliderElement.querySelector(".navigation-arrows");
    this.navigationDots = sliderElement.querySelector(".navigation-dots");
    this.config = config;
    this.currentSlideIndex = 0;
    this.totalSlides = this.slides.length;
    this.timer = null;

    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupDots();

    if (this.config.autoPlay) {
      this.startAutoPlay();
    }
  }

  setupNavigation() {
    const prevArrow = this.navigationArrows.querySelector(".arrow-prev");
    const nextArrow = this.navigationArrows.querySelector(".arrow-next");

    prevArrow.addEventListener("click", () => {
      this.gotoSlide(this.currentSlideIndex - 1);
    });

    nextArrow.addEventListener("click", () => {
      this.gotoSlide(this.currentSlideIndex + 1);
    });

    if (this.config.navigationArrows) {
      this.navigationArrows.style.display = "block";
    } else {
      this.navigationArrows.style.display = "none";
    }
  }

  setupDots() {
    this.navigationDots.innerHTML = ""; // Clear existing dots

    if (this.totalSlides > 1) {
      for (let i = 0; i < this.totalSlides; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        dot.addEventListener("click", () => {
          this.gotoSlide(i);
        });
        this.navigationDots.appendChild(dot);
      }

      this.navigationDots.style.display = "flex";
    } else {
      this.navigationDots.style.display = "none";
    }
  }

  gotoSlide(index) {
    if (index < 0) {
      index = this.totalSlides - 1;
    } else if (index >= this.totalSlides) {
      index = 0;
    }

    const direction = index > this.currentSlideIndex ? "next" : "prev";

    this.slidesContainer.style.transform = `translateX(${
      direction === "next" ? "-" : ""
    }${index * 100}%)`;
    this.navigationDots.children[this.currentSlideIndex].classList.remove(
      "active"
    );
    this.navigationDots.children[index].classList.add("active");
    this.currentSlideIndex = index;

    if (this.config.autoPlay) {
      this.stopAutoPlay();
      this.startAutoPlay();
    }
  }

  startAutoPlay() {
    this.timer = setInterval(() => {
      this.gotoSlide(this.currentSlideIndex + 1);
    }, this.config.autoPlayDuration);
  }

  stopAutoPlay() {
    clearInterval(this.timer);
  }

  addSlide(content) {
    const slide = document.createElement("div");
    slide.classList.add("slide");

    const avatar = document.createElement("img");
    avatar.classList.add("avatar");
    avatar.src = content.avatar;

    const message = document.createElement("div");
    message.classList.add("message");
    message.textContent = content.message;

    slide.appendChild(avatar);
    slide.appendChild(message);
    this.slidesContainer.appendChild(slide);

    this.totalSlides++;
    this.setupDots();
  }
}
