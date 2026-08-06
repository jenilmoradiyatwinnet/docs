(() => {
  const FOOTER_ID = "twinalyze-sidebar-theme-footer";

  let animationFrameId = null;

  /**
   * Move Mintlify's original theme selector
   * into a fixed footer at the bottom of the sidebar.
   *
   * We keep Mintlify's original buttons and behavior:
   * Monitor = System
   * Sun = Light
   * Moon = Dark
   */
  function mountSidebarThemeSelector() {
    const sidebar = document.querySelector("#sidebar");

    const themeToggle = document.querySelector(
      '[data-component-name="theme-toggle"]'
    );

    if (!sidebar || !themeToggle || !document.body) {
      return;
    }

    let footer = document.getElementById(FOOTER_ID);

    if (!footer) {
      footer = document.createElement("div");
      footer.id = FOOTER_ID;

      document.body.appendChild(footer);
    }

    /*
     * Move the original Mintlify control.
     * Do not clone it because cloning would remove
     * Mintlify's original click behaviour.
     */
    if (themeToggle.parentElement !== footer) {
      footer.appendChild(themeToggle);
    }

    positionFooter(sidebar, footer);
  }

  /**
   * Align the footer with the actual sidebar position.
   * This works even when the sidebar does not begin
   * from the extreme left side of the browser.
   */
  function positionFooter(sidebar, footer) {
    const sidebarRect = sidebar.getBoundingClientRect();

    const horizontalSpace = 18;
    const footerWidth =
      sidebarRect.width - horizontalSpace * 2;

    if (
      window.innerWidth < 1024 ||
      sidebarRect.width <= 0 ||
      sidebarRect.height <= 0
    ) {
      footer.style.display = "none";
      return;
    }

    footer.style.display = "flex";

    footer.style.left = `${
      Math.round(
        sidebarRect.left + horizontalSpace
      )
    }px`;

    footer.style.width = `${
      Math.max(
        120,
        Math.round(footerWidth)
      )
    }px`;
  }

  /**
   * Prevent MutationObserver from running the
   * DOM operation hundreds of times immediately.
   */
  function scheduleMount() {
    if (animationFrameId !== null) {
      return;
    }

    animationFrameId =
      window.requestAnimationFrame(() => {
        animationFrameId = null;
        mountSidebarThemeSelector();
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      scheduleMount
    );
  } else {
    scheduleMount();
  }

  window.addEventListener(
    "load",
    scheduleMount
  );

  window.addEventListener(
    "resize",
    scheduleMount
  );

  /*
   * Mintlify uses client-side navigation.
   * The sidebar or theme selector can be recreated
   * when the user changes pages.
   */
  const observer = new MutationObserver(
    scheduleMount
  );

  observer.observe(
    document.documentElement,
    {
      childList: true,
      subtree: true,
    }
  );

  console.log(
    "[Twinalyze] Sidebar theme control loaded"
  );
})();