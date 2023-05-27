// Initialize sliders
const sliders = document.querySelectorAll(".slider");
const form = document.getElementById('config-form');
const submitBtn = document.getElementById('submit-config');

sliders.forEach((slider) => {
  const config = {
    navigationArrows: true,
    navigationDots: true,
    autoPlay: false,
    autoPlayDuration: 3000,
  };

  const sliderInstance = new Slider(slider, config);

  const form = document.getElementById("content-form");
  const messageInput = document.getElementById("message-input");
  const avatarInput = document.getElementById("avatar-input");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const message = messageInput.value;
    const avatar = avatarInput.value;

    if (message && avatar) {
      const content = {
        message,
        avatar,
      };

      sliderInstance.addSlide(content);

      messageInput.value = "";
      avatarInput.value = "";
    }
  });
});
