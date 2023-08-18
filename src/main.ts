import { cronometer } from "./utils/cronometer";

const imgContainerEl = document.getElementById(
  "img-container"
) as HTMLImageElement;
const loadingValueEl = document.getElementById(
  "loading-value"
) as HTMLDivElement;

const blurAmmount = 50;
const image = new Image();

image.src = "https://rebrand.ly/w9lao8s";
image.style.filter = `blur(${blurAmmount})px`;

image.onload = function () {
  let percentage = 0;

  cronometer({
    durationMs: 2500,
    callback() {
      percentage += 1;
      loadingValueEl.textContent = `${percentage}%`;
      image.style.filter = `blur(${
        blurAmmount - (blurAmmount * percentage) / 100
      }px)`;
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
  loadingValueEl.style.color = "#333";
  loadingValueEl.textContent = "An error occurred while loading the image.";
};
