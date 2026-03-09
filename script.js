const advertisements = [
	{ brand: "Tata Motors", title: "Nexon - Born For More", youtubeId: "dQw4w9WgXcQ", category: "new-work" },
	{ brand: "Mahindra", title: "XUV700 - Drive The Future", youtubeId: "3JZ_D3ELwOQ", category: "new-work" },
	{ brand: "Hero MotoCorp", title: "Splendor+ - Every Mile Counts", youtubeId: "oHg5SJYRHA0", category: "new-work" },
	{ brand: "Tata Motors", title: "Nexon - Born For More", youtubeId: "dQw4w9WgXcQ", category: "automobile" },
	{ brand: "Mahindra", title: "XUV700 - Drive The Future", youtubeId: "3JZ_D3ELwOQ", category: "automobile" },
	{ brand: "Hero MotoCorp", title: "Splendor+ - Every Mile Counts", youtubeId: "oHg5SJYRHA0", category: "automobile" },
	{ brand: "FMCG", title: "Product Launch Film", youtubeId: "L_jWHffIx5E", category: "products" },
	{ brand: "Tech", title: "Device Reveal", youtubeId: "fJ9rUzIMcZQ", category: "products" },
	{ brand: "Brand Story", title: "Campaign Film", youtubeId: "9bZkp7q19f0", category: "branded" },
	{ brand: "NGO", title: "Documentary Short", youtubeId: "CevxZvSJLk8", category: "branded" }
];

const newWorkGrid = document.getElementById("new-work-grid");
const loadMoreBtn = document.getElementById("load-more-btn");

const modal = document.getElementById("modal");
const modalIframe = document.getElementById("modal-iframe");
const modalBox = document.getElementById("modal-box");
const modalClose = document.getElementById("modal-close");

const BATCH_SIZE = 3;
let visibleNewWork = BATCH_SIZE;

function createVideoCard(video, dark = false) {
	const card = document.createElement("article");
	card.className = `video-card${dark ? " dark" : ""}`;

	card.innerHTML = `
		<div class="video-thumb">
			<img src="https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg" alt="${video.title} thumbnail" loading="lazy" />
			<button class="play-btn" type="button" aria-label="Play ${video.title}">
				<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
			</button>
		</div>
		<div class="video-info">
			<p class="video-brand">${video.brand}</p>
			<p class="video-title">${video.title}</p>
		</div>
	`;

	card.querySelector(".play-btn").addEventListener("click", () => openModal(video.youtubeId));
	return card;
}

function renderCategory(category, gridId) {
	const grid = document.getElementById(gridId);
	if (!grid) {
		return;
	}

	const dark = category === "branded";
	const items = advertisements.filter((ad) => ad.category === category);
	items.forEach((item) => grid.appendChild(createVideoCard(item, dark)));
}

function renderNewWork() {
	const items = advertisements.filter((ad) => ad.category === "new-work");
	newWorkGrid.innerHTML = "";

	items.slice(0, visibleNewWork).forEach((item) => {
		newWorkGrid.appendChild(createVideoCard(item));
	});

	loadMoreBtn.style.display = visibleNewWork >= items.length ? "none" : "inline-block";
}

function openModal(videoId) {
	modalIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
	modal.classList.add("active");
	modal.setAttribute("aria-hidden", "false");
	document.body.style.overflow = "hidden";
}

function closeModal() {
	modal.classList.remove("active");
	modal.setAttribute("aria-hidden", "true");
	modalIframe.src = "";
	document.body.style.overflow = "";
}

function initFadeObserver() {
	document.documentElement.classList.add("js-ready");

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("visible");
			}
		});
	}, { threshold: 0.05 });

	document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
}

renderCategory("automobile", "automobile-grid");
renderCategory("products", "products-grid");
renderCategory("branded", "branded-grid");
renderNewWork();
initFadeObserver();

loadMoreBtn.addEventListener("click", () => {
	visibleNewWork += BATCH_SIZE;
	renderNewWork();
});

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
	if (!modalBox.contains(event.target)) {
		closeModal();
	}
});

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape") {
		closeModal();
	}
});
