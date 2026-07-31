(() => {
  if (window.__twinalyzeChangelogScrollSpyInitialized) return;

  window.__twinalyzeChangelogScrollSpyInitialized = true;

  const ACTIVE_CLASS = "twinalyze-toc-active";
  const UPDATE_SELECTOR = ".update-container[id]";
  const TOC_LINK_SELECTOR = '#table-of-contents a[href*="#"]';

  let animationFrame = null;

  const getUpdates = () =>
    Array.from(document.querySelectorAll(UPDATE_SELECTOR));

  const getTocLinks = () =>
    Array.from(document.querySelectorAll(TOC_LINK_SELECTOR));

  const getLinkId = (link) => {
    try {
      const url = new URL(
        link.getAttribute("href") || "",
        window.location.href
      );

      return decodeURIComponent(url.hash.slice(1));
    } catch {
      return "";
    }
  };

  const getActiveUpdateId = (updates) => {
    if (!updates.length) return "";

    /*
     * The reading line sits below the sticky header. An entry remains
     * selected until the following entry crosses this same line.
     */
    const readingLine = Math.max(
      130,
      Math.min(220, window.innerHeight * 0.24)
    );

    let activeUpdate = updates[0];

    for (const update of updates) {
      if (update.getBoundingClientRect().top > readingLine) break;
      activeUpdate = update;
    }

    const atPageBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 8;

    return atPageBottom
      ? updates[updates.length - 1].id
      : activeUpdate.id;
  };

  const applyActiveState = () => {
    animationFrame = null;

    const updates = getUpdates();
    const links = getTocLinks();
    const activeId = getActiveUpdateId(updates);

    for (const link of links) {
      const isActive =
        Boolean(activeId) && getLinkId(link) === activeId;

      if (link.classList.contains(ACTIVE_CLASS) !== isActive) {
        link.classList.toggle(ACTIVE_CLASS, isActive);
      }

      const item = link.closest("toc-item");

      if (
        item &&
        item.classList.contains(ACTIVE_CLASS) !== isActive
      ) {
        item.classList.toggle(ACTIVE_CLASS, isActive);
      }
    }
  };

  const scheduleUpdate = () => {
    if (animationFrame !== null) return;
    animationFrame = window.requestAnimationFrame(applyActiveState);
  };

  const initialize = () => {
    window.addEventListener("scroll", scheduleUpdate, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", scheduleUpdate, {
      passive: true,
    });
    window.addEventListener("hashchange", scheduleUpdate);

    /*
     * Mintlify can replace the TOC or rewrite its active classes during
     * client-side rendering. Restore our single calculated state in both
     * cases, instead of relying on a delayed polling interval.
     */
    const observer = new MutationObserver(scheduleUpdate);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "aria-current"],
    });

    applyActiveState();
    window.setTimeout(applyActiveState, 100);
    window.setTimeout(applyActiveState, 400);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, {
      once: true,
    });
  } else {
    initialize();
  }
})();
