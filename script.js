const advertisements = [
  {
    title: "Automobile Campaign Film",
    client: "Brand / Agency",
    year: "2026",
    category: "automobile",
    youtubeUrl: "",
  },
  {
    title: "Product Story Ad",
    client: "Brand / Agency",
    year: "2025",
    category: "products",
    youtubeUrl: "",
  },
  {
    title: "Launch Commercial",
    client: "Brand / Agency",
    year: "2025",
    category: "branded-content",
    youtubeUrl: "",
  },
  {
    title: "Lifestyle Product Ad",
    client: "Brand / Agency",
    year: "2025",
    category: "products",
    youtubeUrl: "",
  },
  {
    title: "Category Campaign Film",
    client: "Brand / Agency",
    year: "2024",
    category: "automobile",
    youtubeUrl: "",
  },
  {
    title: "Technology Product Film",
    client: "Brand / Agency",
    year: "2024",
    category: "products",
    youtubeUrl: "",
  },
  {
    title: "Brand Film",
    client: "Brand / Agency",
    year: "2024",
    category: "branded-content",
    youtubeUrl: "",
  },
  {
    title: "Launch Teaser",
    client: "Brand / Agency",
    year: "2024",
    category: "branded-content",
    youtubeUrl: "",
  },
  {
    title: "Performance Commercial",
    client: "Brand / Agency",
    year: "2023",
    category: "automobile",
    youtubeUrl: "",
  },
  {
    title: "Product Reveal Ad",
    client: "Brand / Agency",
    year: "2023",
    category: "products",
    youtubeUrl: "",
  },
  {
    title: "Digital Spot",
    client: "Brand / Agency",
    year: "2023",
    category: "branded-content",
    youtubeUrl: "",
  },
  {
    title: "Campaign Cut",
    client: "Brand / Agency",
    year: "2024",
    category: "automobile",
    youtubeUrl: "",
  },
];

const itemsPerPage = 6;
let visibleItems = itemsPerPage;

function getYouTubeEmbedUrl(url) {
  if (!url) {
    return "";
  }

  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${parsed.pathname.replace("/", "")}`;
    }
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }
  } catch {
    return "";
  }

  return "";
}

function createAdCard(ad) {
  const article = document.createElement("article");
  article.className = "ad-card";

  const embedUrl = getYouTubeEmbedUrl(ad.youtubeUrl);
  const videoHtml = embedUrl
    ? `<iframe src="${embedUrl}" title="${ad.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    : `<div class="placeholder">Add a YouTube link in <strong>script.js</strong> to display this video.</div>`;

  article.innerHTML = `
    <div class="video-wrap">${videoHtml}</div>
    <div class="ad-content">
      <h4>${ad.title}</h4>
      <p class="meta">${ad.client} · ${ad.year}</p>
    </div>
  `;

  return article;
}

function renderAds() {
  const container = document.getElementById("ads-grid");
  const loadMoreBtn = document.getElementById("load-more");

  if (!container) {
    return;
  }

  container.innerHTML = "";

  advertisements.slice(0, visibleItems).forEach((ad) => {
    container.append(createAdCard(ad));
  });

  if (loadMoreBtn) {
    const allLoaded = visibleItems >= advertisements.length;
    loadMoreBtn.disabled = allLoaded;
    loadMoreBtn.textContent = allLoaded ? "All Work Shown" : "Load More";
  }
}

function renderCategorySection(containerId, category) {
  const container = document.getElementById(containerId);

  if (!container) {
    return;
  }

  container.innerHTML = "";

  advertisements
    .filter((ad) => ad.category === category)
    .forEach((ad) => {
      container.append(createAdCard(ad));
    });
}

function renderCategorySections() {
  renderCategorySection("automobile-grid", "automobile");
  renderCategorySection("products-grid", "products");
  renderCategorySection("branded-content-grid", "branded-content");
}

function setupLoadMore() {
  const loadMoreBtn = document.getElementById("load-more");

  if (!loadMoreBtn) {
    return;
  }

  loadMoreBtn.addEventListener("click", () => {
    visibleItems = Math.min(visibleItems + itemsPerPage, advertisements.length);
    renderAds();
  });
}

setupLoadMore();
renderAds();
renderCategorySections();
