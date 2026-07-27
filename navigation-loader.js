(() => {
  if (window.__twinalyzeNavigationLoaderInitialized) return

  window.__twinalyzeNavigationLoaderInitialized = true

  const LOADER_ID = "twinalyze-navigation-loader"
  const MINIMUM_VISIBLE_TIME = 250
  const FALLBACK_TIME = 8000

  let startedAt = 0
  let finishTimer = null
  let fallbackTimer = null

  const getLoader = () => {
    let loader = document.getElementById(LOADER_ID)

    if (loader) return loader

    loader = document.createElement("div")
    loader.id = LOADER_ID
    loader.setAttribute("aria-hidden", "true")

    loader.innerHTML = `
      <div class="twinalyze-navigation-loader-bar"></div>
    `

    document.body.appendChild(loader)

    return loader
  }

  const isLoaderActive = () => {
    const loader = document.getElementById(LOADER_ID)

    return loader?.classList.contains("is-loading")
  }

  const startLoader = () => {
    const loader = getLoader()

    window.clearTimeout(finishTimer)
    window.clearTimeout(fallbackTimer)

    loader.classList.remove("is-complete", "is-visible", "is-loading")

    // Restart the CSS animation.
    void loader.offsetWidth

    startedAt = Date.now()

    loader.classList.add("is-visible", "is-loading")

    fallbackTimer = window.setTimeout(() => {
      finishLoader()
    }, FALLBACK_TIME)
  }

  const finishLoader = () => {
    const loader = document.getElementById(LOADER_ID)

    if (!loader || !isLoaderActive()) return

    window.clearTimeout(finishTimer)
    window.clearTimeout(fallbackTimer)

    const elapsedTime = Date.now() - startedAt
    const remainingTime = Math.max(
      0,
      MINIMUM_VISIBLE_TIME - elapsedTime
    )

    finishTimer = window.setTimeout(() => {
      loader.classList.remove("is-loading")
      loader.classList.add("is-complete")

      window.setTimeout(() => {
        loader.classList.remove("is-visible", "is-complete")
      }, 220)
    }, remainingTime)
  }

  const scheduleFinish = (delay = 160) => {
    window.clearTimeout(finishTimer)

    finishTimer = window.setTimeout(() => {
      finishLoader()
    }, delay)
  }

  const isInternalNavigation = (anchor, event) => {
    if (!anchor) return false
    if (event.defaultPrevented) return false
    if (event.button !== 0) return false
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return false
    }

    if (anchor.hasAttribute("download")) return false
    if (anchor.target === "_blank") return false

    const href = anchor.getAttribute("href")

    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    ) {
      return false
    }

    let destination

    try {
      destination = new URL(anchor.href, window.location.href)
    } catch {
      return false
    }

    if (destination.origin !== window.location.origin) {
      return false
    }

    const samePage =
      destination.pathname === window.location.pathname &&
      destination.search === window.location.search

    // Do not show the loader for heading/hash navigation.
    if (samePage) return false

    return true
  }

  // Start loader for sidebar and top-navbar navigation.
  document.addEventListener(
    "click",
    (event) => {
      const target = event.target

      if (!(target instanceof Element)) return

      const anchor = target.closest("a[href]")

      if (!anchor) return

      const navigationArea = anchor.closest(
        "#sidebar-content, #mobile-nav-content, #navbar, header"
      )

      if (!navigationArea) return
      if (!isInternalNavigation(anchor, event)) return

      startLoader()
    },
    true
  )

  // Complete loader after Mintlify replaces the page content.
  const contentObserver = new MutationObserver((mutations) => {
    if (!isLoaderActive()) return

    const contentArea = document.querySelector("#content-area")

    const contentChanged = mutations.some((mutation) => {
      if (
        contentArea &&
        (mutation.target === contentArea ||
          contentArea.contains(mutation.target))
      ) {
        return true
      }

      return Array.from(mutation.addedNodes).some((node) => {
        if (!(node instanceof Element)) return false

        return (
          node.id === "content-area" ||
          node.id === "content" ||
          Boolean(node.querySelector("#content-area, #content"))
        )
      })
    })

    if (contentChanged) {
      scheduleFinish()
    }
  })

  contentObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true,
  })

  // Browser Back and Forward navigation.
  window.addEventListener("popstate", () => {
    startLoader()
  })

  window.addEventListener("pageshow", () => {
    scheduleFinish(100)
  })
})()