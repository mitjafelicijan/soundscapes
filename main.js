import sounds from "./soundbank.js";

const defaultVolume = 0.4;
const soundbankDirectory = "./sounds";

window.addEventListener("load", () => {
	const controllsElement = document.querySelector(".controlls");
	const controllerTemplate = document.querySelector("#controller-template");

	sounds.forEach(sound => {
		const clone = controllerTemplate.content.cloneNode(true);
		const placeholder = clone.firstElementChild;
		const label = placeholder.querySelector("label");
		const volume = placeholder.querySelector("input[type=range]");
		const play = placeholder.querySelector("svg.play");
		const stop = placeholder.querySelector("svg.stop");
		const audio = new Audio(`${soundbankDirectory}${sound.file}`);

		// Setting up initial values.
		label.textContent = sound.name;
		volume.value = defaultVolume;
		audio.volume = defaultVolume;
		audio.loop = true;

		// Volume controls for each controller.
		volume.addEventListener("input", evt => {
			audio.volume = evt.target.value;
		});

		// Playback controls for each controller.
		clone.querySelectorAll("svg").forEach(svg => {
			svg.addEventListener("click", evt => {
				if (svg.classList.contains("play")) {
					play.style.display = "none";
					stop.style.display = "block";
					placeholder.classList.add("on");
					audio.play();
				} else {
					stop.style.display = "none";
					play.style.display = "block";
					placeholder.classList.remove("on");
					audio.pause();
				}
			});
		});

		controllsElement.appendChild(clone);
	});
});

