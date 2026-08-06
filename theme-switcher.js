(() => {
  const CONTROL_ID = "twinalyze-theme-control";
  const STORAGE_KEY = "theme";

  const systemQuery = window.matchMedia(
    "(prefers-color-scheme: dark)"
  );

  function getSavedTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);

    if (
      savedTheme === "light" ||
      savedTheme === "dark" ||
      savedTheme === "system"
    ) {
      return savedTheme;
    }

    return "system";
  }

  function resolveTheme(theme) {
    if (theme === "system") {
      return systemQuery.matches ? "dark" : "light";
    }

    return theme;
  }

  function applyTheme(theme) {
    const resolvedTheme = resolveTheme(theme);
    const html = document.documentElement;

    html.classList.remove("light", "dark");
    html.classList.add(resolvedTheme);

    html.setAttribute("data-theme", resolvedTheme);
    html.style.colorScheme = resolvedTheme;

    localStorage.setItem(STORAGE_KEY, theme);

    updateSelectedButton(theme);
  }

  function updateSelectedButton(theme) {
    const buttons = document.querySelectorAll(
      `#${CONTROL_ID} [data-theme-mode]`
    );

    buttons.forEach(button => {
      const isSelected =
        button.dataset.themeMode === theme;

      button.classList.toggle(
        "is-selected",
        isSelected
      );

      button.setAttribute(
        "aria-pressed",
        String(isSelected)
      );
    });
  }

  function getSidebarPosition() {
    const sidebar =
      document.querySelector("#sidebar") ||
      document.querySelector("#sidebar-content");

    if (!sidebar) {
      return {
        left: 20,
        width: 230,
      };
    }

    const rect = sidebar.getBoundingClientRect();

    return {
      left: Math.round(rect.left + 16),
      width: Math.max(
        120,
        Math.round(rect.width - 32)
      ),
    };
  }

  function positionControl() {
    const control =
      document.getElementById(CONTROL_ID);

    if (!control) {
      return;
    }

    const position = getSidebarPosition();

    control.style.left = `${position.left}px`;
    control.style.width = `${position.width}px`;
  }

  function createThemeControl() {
    if (document.getElementById(CONTROL_ID)) {
      positionControl();
      return;
    }

    const control = document.createElement("div");

    control.id = CONTROL_ID;

    control.innerHTML = `
      <div class="twinalyze-theme-divider"></div>

      <div class="twinalyze-theme-pill">
        <button
          type="button"
          class="twinalyze-theme-option"
          data-theme-mode="system"
          title="System"
          aria-label="Use system appearance"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect
              x="3"
              y="4"
              width="18"
              height="13"
              rx="2"
            ></rect>

            <path d="M8 21h8"></path>
            <path d="M12 17v4"></path>
          </svg>
        </button>

        <button
          type="button"
          class="twinalyze-theme-option"
          data-theme-mode="light"
          title="Light"
          aria-label="Use light appearance"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle
              cx="12"
              cy="12"
              r="4"
            ></circle>

            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="m4.93 4.93 1.42 1.42"></path>
            <path d="m17.66 17.66 1.41 1.41"></path>
            <path d="m4.93 19.07 1.42-1.41"></path>
            <path d="m17.66 6.34 1.41-1.41"></path>
          </svg>
        </button>

        <button
          type="button"
          class="twinalyze-theme-option"
          data-theme-mode="dark"
          title="Dark"
          aria-label="Use dark appearance"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M21 12.79A9 9 0 1 1
                 11.21 3A7 7 0 0 0
                 21 12.79Z"
            ></path>
          </svg>
        </button>
      </div>
    `;

    control.addEventListener("click", event => {
      const button = event.target.closest(
        "[data-theme-mode]"
      );

      if (!button) {
        return;
      }

      applyTheme(button.dataset.themeMode);
    });

    document.body.appendChild(control);

    positionControl();
    applyTheme(getSavedTheme());

    console.log(
      "[Twinalyze] Theme switcher created successfully"
    );
  }

  function initialize() {
    createThemeControl();
    positionControl();
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initialize
    );
  } else {
    initialize();
  }

  window.addEventListener("load", initialize);
  window.addEventListener("resize", positionControl);

  systemQuery.addEventListener("change", () => {
    if (getSavedTheme() === "system") {
      applyTheme("system");
    }
  });

  /*
    Mintlify uses client-side navigation.
    Recreate the control if the page structure changes.
  */
  const observer = new MutationObserver(() => {
    if (!document.getElementById(CONTROL_ID)) {
      createThemeControl();
    }

    positionControl();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();