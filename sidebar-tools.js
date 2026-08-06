(() => {
  const FOOTER_ID = "twinalyze-sidebar-theme-footer";

  /**
   * Move Mintlify's existing theme selector
   * to the bottom of the desktop sidebar.
   */
  function moveThemeSelector() {
    const sidebar = document.querySelector("#sidebar");

    const themeToggle = document.querySelector(
      '[data-component-name="theme-toggle"]'
    );

    if (!sidebar || !themeToggle) {
      return;
    }

    let footer = document.getElementById(FOOTER_ID);

    // Create the bottom sidebar area only once.
    if (!footer) {
      footer = document.createElement("div");
      footer.id = FOOTER_ID;

      footer.innerHTML = `
        <div class="twinalyze-sidebar-theme-control"></div>
      `;

      sidebar.appendChild(footer);
    }

    const themeControl = footer.querySelector(
      ".twinalyze-sidebar-theme-control"
    );

    // Move the original Mintlify selector into our footer.
    if (
      themeControl &&
      themeToggle.parentElement !== themeControl
    ) {
      themeControl.appendChild(themeToggle);
    }
  }

  let updateRequested = false;

  /**
   * Prevent the MutationObserver from running
   * the same DOM operation too many times.
   */
  function requestUpdate() {
    if (updateRequested) {
      return;
    }

    updateRequested = true;

    window.requestAnimationFrame(() => {
      updateRequested = false;
      moveThemeSelector();
    });
  }

  // Run after the initial page is ready.
  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      requestUpdate
    );
  } else {
    requestUpdate();
  }

  /**
   * Mintlify uses client-side navigation.
   * Watch for sidebar and page re-renders.
   */
  const observer = new MutationObserver(requestUpdate);

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  window.addEventListener("popstate", requestUpdate);
})();