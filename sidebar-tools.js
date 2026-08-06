(() => {
  if (window.__twinalyzeSidebarToolsInitialized) {
    return;
  }

  window.__twinalyzeSidebarToolsInitialized = true;

  const STORAGE_KEY = "twinalyze-docs-theme";
  const MINTLIFY_THEME_KEY = "theme";
  const STATUS_URL =
    "https://stats.uptimerobot.com/CtHHsPhHgi";

  const VALID_MODES = new Set([
    "system",
    "light",
    "dark",
  ]);

  const systemDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)",
  );

  let currentMode = getInitialMode();
  let applyingTheme = false;
  let mountFrame = null;

  function getInitialMode() {
    try {
      const customPreference =
        window.localStorage.getItem(STORAGE_KEY);

      if (VALID_MODES.has(customPreference)) {
        return customPreference;
      }

      const mintlifyPreference =
        window.localStorage.getItem(
          MINTLIFY_THEME_KEY,
        );

      if (VALID_MODES.has(mintlifyPreference)) {
        return mintlifyPreference;
      }
    } catch {
      // Continue with system preference.
    }

    return "system";
  }

  function resolveMode(mode) {
    if (mode === "system") {
      return systemDarkMode.matches
        ? "dark"
        : "light";
    }

    return mode;
  }

  function updateActiveButtons() {
    document
      .querySelectorAll(
        ".tw-sidebar-theme-button[data-theme-mode]",
      )
      .forEach((button) => {
        const isActive =
          button.dataset.themeMode === currentMode;

        button.toggleAttribute(
          "data-active",
          isActive,
        );

        button.setAttribute(
          "aria-pressed",
          String(isActive),
        );
      });
  }

  function applyTheme(
    mode,
    { persist = true } = {},
  ) {
    if (!VALID_MODES.has(mode)) {
      mode = "system";
    }

    currentMode = mode;

    const resolvedMode = resolveMode(mode);
    const root = document.documentElement;

    applyingTheme = true;

    root.classList.toggle(
      "dark",
      resolvedMode === "dark",
    );

    root.setAttribute(
      "data-theme",
      resolvedMode,
    );

    root.setAttribute(
      "data-twinalyze-theme-mode",
      mode,
    );

    root.style.colorScheme = resolvedMode;

    if (persist) {
      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          mode,
        );

        /*
         * This also keeps the Mintlify appearance
         * preference aligned across page reloads.
         */
        window.localStorage.setItem(
          MINTLIFY_THEME_KEY,
          mode,
        );
      } catch {
        // Ignore storage restrictions.
      }
    }

    updateActiveButtons();

    window.requestAnimationFrame(() => {
      applyingTheme = false;
    });
  }

  function createIcon(name) {
    const icons = {
      status: `
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M3 12h4l2.2-5 4.1 10 2.1-5H21"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      `,

      external: `
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M14 5h5v5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11 13 19 5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
          />
          <path
            d="M19 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      `,

      system: `
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <rect
            x="3.5"
            y="4.5"
            width="17"
            height="12"
            rx="2"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
          />
          <path
            d="M8.5 20h7M12 16.5V20"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
          />
        </svg>
      `,

      light: `
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <circle
            cx="12"
            cy="12"
            r="3.8"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
          />
          <path
            d="M12 2.5v2M12 19.5v2M4.5 12h-2M21.5 12h-2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
          />
        </svg>
      `,

      dark: `
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      `,
    };

    return icons[name] || "";
  }

  function createSidebarTools() {
    const container =
      document.createElement("div");

    container.id = "tw-sidebar-tools";
    container.className = "tw-sidebar-tools";

    container.innerHTML = `
      <a
        class="tw-sidebar-status-link"
        href="${STATUS_URL}"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Twinalyze system status"
      >
        <span class="tw-sidebar-status-icon">
          ${createIcon("status")}
        </span>

        <span class="tw-sidebar-status-label">
          System status
        </span>

        <span class="tw-sidebar-status-external">
          ${createIcon("external")}
        </span>
      </a>

      <div
        class="tw-sidebar-theme-controls"
        role="group"
        aria-label="Choose documentation appearance"
      >
        <button
          type="button"
          class="tw-sidebar-theme-button"
          data-theme-mode="system"
          aria-label="Use system appearance"
          title="System appearance"
          aria-pressed="false"
        >
          ${createIcon("system")}
        </button>

        <button
          type="button"
          class="tw-sidebar-theme-button"
          data-theme-mode="light"
          aria-label="Use light appearance"
          title="Light appearance"
          aria-pressed="false"
        >
          ${createIcon("light")}
        </button>

        <button
          type="button"
          class="tw-sidebar-theme-button"
          data-theme-mode="dark"
          aria-label="Use dark appearance"
          title="Dark appearance"
          aria-pressed="false"
        >
          ${createIcon("dark")}
        </button>
      </div>
    `;

    container.addEventListener(
      "click",
      (event) => {
        const button = event.target.closest(
          ".tw-sidebar-theme-button[data-theme-mode]",
        );

        if (!button) {
          return;
        }

        applyTheme(button.dataset.themeMode);
      },
    );

    return container;
  }

  function findSidebarShell(sidebarContent) {
    const explicitSidebar =
      document.querySelector("#sidebar");

    if (explicitSidebar) {
      return explicitSidebar;
    }

    const aside = sidebarContent.closest("aside");

    if (aside) {
      return aside;
    }

    let node = sidebarContent.parentElement;
    let bestCandidate =
      sidebarContent.parentElement;

    while (
      node &&
      node !== document.body &&
      node !== document.documentElement
    ) {
      const bounds =
        node.getBoundingClientRect();

      const isSidebarWidth =
        bounds.width >= 180 &&
        bounds.width <= 430;

      const isSidebarHeight =
        bounds.height >=
        window.innerHeight * 0.55;

      if (isSidebarWidth && isSidebarHeight) {
        bestCandidate = node;
      }

      node = node.parentElement;
    }

    return bestCandidate;
  }

  function mountSidebarTools() {
    mountFrame = null;

    const sidebarContent =
      document.querySelector("#sidebar-content");

    if (!sidebarContent) {
      return;
    }

    const sidebarShell =
      findSidebarShell(sidebarContent);

    if (!sidebarShell) {
      return;
    }

    sidebarShell.setAttribute(
      "data-tw-sidebar-shell",
      "true",
    );

    const shellPosition =
      window.getComputedStyle(
        sidebarShell,
      ).position;

    if (shellPosition === "static") {
      sidebarShell.style.position =
        "relative";
    }

    let tools =
      document.querySelector(
        "#tw-sidebar-tools",
      );

    if (!tools) {
      tools = createSidebarTools();
    }

    if (tools.parentElement !== sidebarShell) {
      sidebarShell.appendChild(tools);
    }

    document.documentElement.classList.add(
      "tw-sidebar-tools-ready",
    );

    updateActiveButtons();
  }

  function scheduleMount() {
    if (mountFrame !== null) {
      return;
    }

    mountFrame =
      window.requestAnimationFrame(
        mountSidebarTools,
      );
  }

  /*
   * Apply immediately so the selected appearance
   * remains active during page navigation.
   */
  applyTheme(currentMode, {
    persist: false,
  });

  systemDarkMode.addEventListener(
    "change",
    () => {
      if (currentMode === "system") {
        applyTheme("system", {
          persist: false,
        });
      }
    },
  );

  const pageObserver =
    new MutationObserver(() => {
      scheduleMount();
    });

  function initialize() {
    scheduleMount();

    pageObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener(
      "resize",
      scheduleMount,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "popstate",
      scheduleMount,
    );

    window.addEventListener(
      "hashchange",
      scheduleMount,
    );

    /*
     * Mintlify may refresh HTML attributes during
     * client-side navigation. Reapply the selected mode
     * only when those attributes no longer match.
     */
    const rootObserver =
      new MutationObserver(() => {
        if (applyingTheme) {
          return;
        }

        const expected =
          resolveMode(currentMode);

        const darkClassIsCorrect =
          document.documentElement.classList.contains(
            "dark",
          ) ===
          (expected === "dark");

        const dataThemeIsCorrect =
          document.documentElement.getAttribute(
            "data-theme",
          ) === expected;

        if (
          !darkClassIsCorrect ||
          !dataThemeIsCorrect
        ) {
          applyTheme(currentMode, {
            persist: false,
          });
        }
      });

    rootObserver.observe(
      document.documentElement,
      {
        attributes: true,
        attributeFilter: [
          "class",
          "data-theme",
        ],
      },
    );
  }

  if (
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initialize,
      {
        once: true,
      },
    );
  } else {
    initialize();
  }
})();