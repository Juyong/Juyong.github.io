(() => {
  const root = document.documentElement;
  let language = localStorage.getItem("homepage-language") || "en";

  function applyLanguage() {
    root.dataset.lang = language;
    root.lang = language === "zh" ? "zh-CN" : "en";
    document.querySelectorAll("[data-zh][data-en]").forEach((element) => {
      element.textContent = element.dataset[language];
    });
    document.querySelectorAll("[data-set-lang]").forEach((button) => {
      button.classList.toggle("active", button.dataset.setLang === language);
      button.setAttribute("aria-pressed", String(button.dataset.setLang === language));
    });
  }

  document.querySelectorAll("[data-set-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      language = button.dataset.setLang;
      localStorage.setItem("homepage-language", language);
      applyLanguage();
    });
  });

  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector(".main-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
    });
  }

  applyLanguage();
})();
