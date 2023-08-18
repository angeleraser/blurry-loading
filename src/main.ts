import { cronometer } from "./utils/cronometer";

const imgContainerEl = document.getElementById(
  "img-container"
) as HTMLImageElement;
const loadingValueEl = document.getElementById(
  "loading-value"
) as HTMLDivElement;

const blurAmount = "var(--blur-amount)";

const image = new Image();
image.src = "https://rebrand.ly/w9lao8s";

image.onload = function () {
  let percentage = 0;

  cronometer({
    durationMs: 2500,
    callback() {
      percentage += 1;
      loadingValueEl.textContent = `${percentage}%`;
      image.style.filter = `blur(calc(${blurAmount} - (${blurAmount} * ${percentage}) / 100))`;
    },
    onStart() {
      image.classList.add("img");
      imgContainerEl.append(image);
    },
    onComplete() {
      loadingValueEl.style.opacity = "0";
    },
  });
};

image.onerror = function () {
  loadingValueEl.style.color = "var(--black)";
  loadingValueEl.textContent = "An error occurred while loading the image.";
};
