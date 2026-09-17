(() => {
  const data = window.SITE_DATA?.publications || [];
  const list = document.querySelector("#publication-list");
  const search = document.querySelector("#publication-search");
  const filters = document.querySelector("#category-filters");
  if (!list || !search || !filters) return;

  const categories = {
    all: { zh: "全部", en: "All" },
    human: { zh: "多模态情感数字人", en: "Multimodal Affective Digital Humans" },
    scene: { zh: "三维/四维场景", en: "3D/4D Scenes" },
    imaging: { zh: "成像与显示", en: "Imaging & Display" },
    geometry: { zh: "几何与优化", en: "Geometry & Optimization" }
  };
  let active = "all";

  function tagsFor(pub) {
    const text = `${pub.title} ${pub.venue}`.toLowerCase();
    const tags = [];
    if (/avatar|human|face|head|portrait|body|cloth|caricature|expression|talking/.test(text)) tags.push("human");
    if (/scene|nerf|gaussian|slam|reconstruction|render|dynamic|lidar|world|neural field|depth/.test(text)) tags.push("scene");
    if (/light|optic|lens|shadow|caustic|imaging|photometric|illumination|display|structured light/.test(text)) tags.push("imaging");
    if (/registr|geometr|mesh|point cloud|surface|optimization|geodesic|alignment|filter|barycentric|segmentation/.test(text)) tags.push("geometry");
    return tags.length ? [...new Set(tags)] : ["geometry"];
  }

  const sourceAssets = window.PUBLICATION_ASSETS || {};
  const tagged = data.map((pub) => {
    const source = sourceAssets[pub.id] || {};
    return { ...pub, image: source.image ?? pub.image, imageRatio: source.ratio || "16 / 9", categories: tagsFor(pub) };
  });
  const lang = () => document.documentElement.dataset.lang || "en";
  const label = (key) => categories[key][lang()];

  Object.keys(categories).forEach((key) => {
    const button = document.createElement("button");
    button.type = "button"; button.dataset.category = key; button.textContent = label(key);
    if (key === active) button.classList.add("active");
    button.addEventListener("click", () => { active = key; filters.querySelectorAll("button").forEach((item) => item.classList.toggle("active", item === button)); render(); });
    filters.append(button);
  });

  function render() {
    filters.querySelectorAll("button").forEach((button) => { button.textContent = label(button.dataset.category); });
    search.placeholder = search.dataset[`placeholder${lang() === "zh" ? "Zh" : "En"}`];
    const query = search.value.trim().toLowerCase();
    const visible = tagged.filter((pub) => (active === "all" || pub.categories.includes(active)) && (!query || `${pub.title} ${pub.authors} ${pub.venue}`.toLowerCase().includes(query)));
    list.replaceChildren();
    visible.forEach((pub) => {
      const card = document.createElement("article"); card.className = "publication-item";
      const media = document.createElement("div"); media.className = "publication-media"; media.style.aspectRatio = pub.imageRatio;
      if (pub.image) { const img = document.createElement("img"); img.src = pub.image; img.alt = ""; img.loading = "lazy"; media.append(img); }
      else { const placeholder = document.createElement("span"); placeholder.textContent = pub.year; media.append(placeholder); }
      const body = document.createElement("div"); body.className = "publication-body";
      const year = document.createElement("span"); year.className = "publication-year"; year.textContent = pub.year;
      const title = document.createElement("h3"); title.textContent = pub.title;
      const authors = document.createElement("p"); authors.className = "publication-authors"; authors.textContent = pub.authors;
      const venue = document.createElement("p"); venue.className = "publication-venue"; venue.textContent = pub.venue;
      const tags = document.createElement("div"); tags.className = "publication-tags";
      pub.categories.forEach((key) => { const tag = document.createElement("span"); tag.textContent = label(key); tags.append(tag); });
      const links = document.createElement("div"); links.className = "publication-links";
      pub.links.slice(0, 5).forEach((item) => { const anchor = document.createElement("a"); anchor.href = item.href; anchor.target = "_blank"; anchor.rel = "noreferrer"; anchor.textContent = item.label; links.append(anchor); });
      body.append(year, title, authors, venue, tags, links); card.append(media, body); list.append(card);
    });
    document.querySelector("#publication-empty").hidden = visible.length !== 0;
  }

  search.addEventListener("input", render);
  document.querySelectorAll("[data-set-lang]").forEach((button) => button.addEventListener("click", () => setTimeout(render, 0)));
  render();
})();
