(function () {
  function initTwinalyzeDashboardTour() {
    const roots = document.querySelectorAll("[data-tour-root]");

    roots.forEach((root) => {
      const buttons = root.querySelectorAll("[data-tour-target]");
      const panels = root.querySelectorAll("[data-tour-panel]");

      function activate(target) {
        buttons.forEach((button) => {
          button.classList.toggle(
            "is-active",
            button.getAttribute("data-tour-target") === target
          );
        });

        panels.forEach((panel) => {
          panel.classList.toggle(
            "is-active",
            panel.getAttribute("data-tour-panel") === target
          );
        });
      }

      buttons.forEach((button) => {
        const target = button.getAttribute("data-tour-target");

        button.addEventListener("click", function () {
          activate(target);
        });

        button.addEventListener("mouseenter", function () {
          activate(target);
        });
      });

      if (!root.dataset.initialized) {
        root.dataset.initialized = "true";
        activate("home");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTwinalyzeDashboardTour);
  } else {
    initTwinalyzeDashboardTour();
  }

  window.addEventListener("popstate", initTwinalyzeDashboardTour);
  window.addEventListener("load", initTwinalyzeDashboardTour);
})();