import { useEffect, useRef, useState } from "react"

const SECTIONS = [
  {
    id: "home",
    title: "Home",
    description:
      "Get a clear starting point for your dashboard with setup shortcuts and quick access to key sections.",
    images: [
      {
        src: "/images/Dashboard/Home.png",
        title: "Home",
        caption:
          "View your dashboard overview, setup status, project shortcuts, and quick links to continue configuration.",
      },
    ],
  },
  {
    id: "realtime-user",
    title: "Realtime User",
    description:
      "Monitor live users, active sessions, and current activity happening across your app or website.",
    images: [
      {
        src: "/images/Dashboard/RealTime.png",
        title: "Realtime User",
        caption:
          "Track users who are active right now, see live activity, and understand current product usage instantly.",
      },
    ],
  },
  {
    id: "product-overview",
    title: "Product Overview",
    description:
      "Understand product health, performance, usage trends, reports, and system-level insights from one place.",
    images: [
      {
        src: "/images/Dashboard/Dashboard.png",
        title: "Product Overview",
        caption:
          "See product-level performance, active users, retention users, session duration, country data, and usage summaries.",
      },
      {
        src: "/images/Dashboard/SystemInsights.png",
        title: "System Insights",
        caption:
          "Analyze device, operating system, app version, browser, and technical performance to understand system behavior.",
      },
      {
        src: "/images/Dashboard/Reports.png",
        title: "Reports",
        caption:
          "Create and review reports for product usage, events, behavior trends, and business performance insights.",
      },
    ],
  },
  {
    id: "users",
    title: "Users",
    description:
      "Analyze users, page behavior, engagement, retention, and growth across your product lifecycle.",
    images: [
      {
        src: "/images/Dashboard/Users.png",
        title: "Users",
        caption:
          "View user lists, user details, sessions, devices, activity history, and important user-level analytics.",
      },
      {
        src: "/images/Dashboard/Pageinsights.png",
        title: "Page Insights",
        caption:
          "Understand page views, page activity, user movement, popular pages, and page-level performance insights.",
      },
      {
        src: "/images/Dashboard/UserEngagement.png",
        title: "User Engagement",
        caption:
          "Measure how users interact with screens, pages, events, features, and important product actions.",
      },
      {
        src: "/images/Dashboard/UserRetention.png",
        title: "User Retention",
        caption:
          "Track how many users return after first use and compare retention across selected time periods.",
      },
      {
        src: "/images/Dashboard/UserGrowth.png",
        title: "User Growth",
        caption:
          "Monitor new users, active users, returning users, and overall user growth trends over time.",
      },
    ],
  },
  {
    id: "ad",
    title: "Ad",
    description:
      "Track advertising performance, revenue, failures, impressions, clicks, and campaign-level results.",
    images: [
      {
        src: "/images/Dashboard/AdReport.png",
        title: "Ad Report",
        caption:
          "View ad impressions, clicks, revenue, fill rate, campaign performance, and monetization results.",
      },
      {
        src: "/images/Dashboard/Ads.png",
        title: "Ad Failure Insights",
        caption:
          "Find ad loading failures, failed impressions, network issues, and problems affecting ad revenue.",
      },
    ],
  },
  {
    id: "messaging",
    title: "Messaging",
    description:
      "Create, manage, schedule, target, and analyze messaging campaigns for user engagement.",
    images: [
      {
        src: "/images/analyticspage/Add-Notification.png",
        title: "Create Message",
        caption:
          "Create messages, configure message content, select users, and prepare engagement campaigns.",
      },
      {
        src: "/images/Dashboard/Campaignhistory.png",
        title: "Campaign History",
        caption:
          "Manage campaign lists, campaign status, schedule time, audience targeting, and campaign actions.",
      },
    ],
  },
  {
    id: "research",
    title: "Research",
    description:
      "Explore market trends, country insights, store performance, and custom listing opportunities.",
    images: [
      {
        src: "/images/Dashboard/MarketTrends.png",
        title: "Market Trends",
        caption:
          "Analyze market movement, category trends, top opportunities, and regional demand patterns.",
      },
      {
        src: "/images/Dashboard/.PNG",
        title: "Country Details",
        caption:
          "Review country-level user behavior, store data, traffic quality, and market performance details.",
      },
      {
        src: "/images/Dashboard/StoreInsights.png",
        title: "Custom Store Listing",
        caption:
          "Track custom store listings, visibility, traffic, ranking opportunities, and listing performance.",
      },
    ],
  },
  {
    id: "data",
    title: "Data",
    description:
      "Manage events, properties, captured data, visibility, and tracking configuration in one place.",
    images: [
      {
        src: "/images/Dashboard/Events.png",
        title: "Events",
        caption:
          "View tracked events, event names, sources, auto/manual tracking status, visibility, and event details.",
      },
      {
        src: "/images/Dashboard/Properties.png",
        title: "Properties",
        caption:
          "Manage user properties, device properties, event properties, and captured analytics attributes.",
      },
    ],
  },
  {
    id: "setting",
    title: "Setting",
    description:
      "Manage project settings, profile details, organization details, users, roles, and permissions.",
    images: [
      {
        src: "/images/Dashboard/project-setting.png",
        title: "Project Setting",
        caption:
          "Update project name, logo, API keys, platform details, Firebase key, and project configuration.",
      },
      {
        src: "/images/Dashboard/Integration.png",
        title: "Integrations",
        caption:
          "Manage your advertising, monetization, messaging, and communication integrations.",
      },
      {
        src: "/images/Dashboard/Version.png",
        title: "Version",
        caption:
          "Manage the SDK versions configured for your project.",
      },
      {
        src: "/images/Dashboard/Device-info.png",
        title: "Device",
        caption:
          "Review device information collected from your users.",
      },
      {
        src: "/images/Dashboard/New-Screen-activity.png",
        title: "Screen Activity",
        caption:
          "Review captured screen activity and understand how users interact with your product.",
      },
    ],
  },
]

export const DashboardTour = () => {
  const navbarRef = useRef(null)
  const transitionTimerRef = useRef(null)
  const firstFrameRef = useRef(null)
  const secondFrameRef = useRef(null)

  const [activeSectionIndex, setActiveSectionIndex] =
    useState(0)

  const [activeImageIndex, setActiveImageIndex] =
    useState(0)

  const [canScrollLeft, setCanScrollLeft] =
    useState(false)

  const [canScrollRight, setCanScrollRight] =
    useState(false)

  /*
   * This image stays visible while the next image loads.
   */
  const [displayedImage, setDisplayedImage] =
    useState(SECTIONS[0].images[0])

  /*
   * Incoming image is rendered above the old image only
   * after it has completely loaded.
   */
  const [incomingImage, setIncomingImage] =
    useState(null)

  const [incomingVisible, setIncomingVisible] =
    useState(false)

  /*
   * Loader is shown only on the first image load.
   * It does not replace the current image while switching.
   */
  const [displayedImageLoaded, setDisplayedImageLoaded] =
    useState(false)

  const [isSwitchingImage, setIsSwitchingImage] =
    useState(false)

  const [imageLoadError, setImageLoadError] =
    useState(false)

  const [retryKey, setRetryKey] = useState(0)

  const activeSection = SECTIONS[activeSectionIndex]
  const activeImage =
    activeSection.images[activeImageIndex]

  const updateNavArrows = () => {
    const element = navbarRef.current

    if (!element) return

    const maxScrollLeft =
      element.scrollWidth - element.clientWidth

    setCanScrollLeft(element.scrollLeft > 4)

    setCanScrollRight(
      maxScrollLeft > 4 &&
        element.scrollLeft < maxScrollLeft - 4
    )
  }

  useEffect(() => {
    updateNavArrows()

    const element = navbarRef.current

    if (!element) return

    element.addEventListener(
      "scroll",
      updateNavArrows
    )

    window.addEventListener(
      "resize",
      updateNavArrows
    )

    const timer = window.setTimeout(
      updateNavArrows,
      150
    )

    return () => {
      element.removeEventListener(
        "scroll",
        updateNavArrows
      )

      window.removeEventListener(
        "resize",
        updateNavArrows
      )

      window.clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(
      updateNavArrows,
      80
    )

    return () => {
      window.clearTimeout(timer)
    }
  }, [activeSectionIndex])

  /*
   * Preload the requested image.
   *
   * Important:
   * The currently displayed image stays visible until the
   * requested image has loaded and decoded successfully.
   */
  useEffect(() => {
    if (
      activeImage.src === displayedImage.src
    ) {
      setIsSwitchingImage(false)
      setImageLoadError(false)
      return
    }

    let cancelled = false

    setIsSwitchingImage(true)
    setImageLoadError(false)
    setIncomingImage(null)
    setIncomingVisible(false)

    const preloadImage = new Image()

    const showLoadedImage = async () => {
      try {
        if (
          typeof preloadImage.decode === "function"
        ) {
          await preloadImage.decode()
        }
      } catch {
        // The image can still be displayed even when
        // decode() is unavailable or rejects.
      }

      if (cancelled) return

      setIncomingImage(activeImage)

      /*
       * Two animation frames ensure the incoming image
       * first renders at opacity 0 and then fades to 1.
       */
      firstFrameRef.current =
        window.requestAnimationFrame(() => {
          secondFrameRef.current =
            window.requestAnimationFrame(() => {
              if (cancelled) return

              setIncomingVisible(true)
            })
        })

      transitionTimerRef.current =
        window.setTimeout(() => {
          if (cancelled) return

          setDisplayedImage(activeImage)
          setDisplayedImageLoaded(true)
          setIncomingImage(null)
          setIncomingVisible(false)
          setIsSwitchingImage(false)
        }, 250)
    }

    preloadImage.onload = showLoadedImage

    preloadImage.onerror = () => {
      if (cancelled) return

      /*
       * Keep the previous image visible when the requested
       * image fails. This prevents a blank image area.
       */
      setIncomingImage(null)
      setIncomingVisible(false)
      setIsSwitchingImage(false)
      setImageLoadError(true)
    }

    preloadImage.src = activeImage.src

    return () => {
      cancelled = true

      preloadImage.onload = null
      preloadImage.onerror = null

      if (transitionTimerRef.current) {
        window.clearTimeout(
          transitionTimerRef.current
        )
      }

      if (firstFrameRef.current) {
        window.cancelAnimationFrame(
          firstFrameRef.current
        )
      }

      if (secondFrameRef.current) {
        window.cancelAnimationFrame(
          secondFrameRef.current
        )
      }
    }
  }, [
    activeImage.src,
    displayedImage.src,
    retryKey,
  ])

  /*
   * Preload the next and previous image in the background.
   * This makes arrow navigation feel faster.
   */
  useEffect(() => {
    const allImages = SECTIONS.flatMap(
      (section) => section.images
    )

    const currentGlobalIndex =
      allImages.findIndex(
        (image) => image.src === activeImage.src
      )

    if (currentGlobalIndex === -1) return

    const nextImage =
      allImages[
        (currentGlobalIndex + 1) %
          allImages.length
      ]

    const previousImage =
      allImages[
        (currentGlobalIndex -
          1 +
          allImages.length) %
          allImages.length
      ]

    const imagesToPreload = [
      nextImage,
      previousImage,
    ]

    imagesToPreload.forEach((image) => {
      if (!image?.src) return

      const preload = new Image()
      preload.src = image.src
    })
  }, [activeImage.src])

  const openSection = (index) => {
    setActiveSectionIndex(index)
    setActiveImageIndex(0)
  }

  const handleMobileSectionChange = (event) => {
    openSection(Number(event.target.value))
  }

  const goNext = () => {
    if (
      activeImageIndex <
      activeSection.images.length - 1
    ) {
      setActiveImageIndex(
        (previousIndex) => previousIndex + 1
      )

      return
    }

    const nextSectionIndex =
      activeSectionIndex ===
      SECTIONS.length - 1
        ? 0
        : activeSectionIndex + 1

    setActiveSectionIndex(nextSectionIndex)
    setActiveImageIndex(0)
  }

  const goPrev = () => {
    if (activeImageIndex > 0) {
      setActiveImageIndex(
        (previousIndex) => previousIndex - 1
      )

      return
    }

    const previousSectionIndex =
      activeSectionIndex === 0
        ? SECTIONS.length - 1
        : activeSectionIndex - 1

    setActiveSectionIndex(
      previousSectionIndex
    )

    setActiveImageIndex(
      SECTIONS[previousSectionIndex].images
        .length - 1
    )
  }

  const scrollNavbar = (direction) => {
    const element = navbarRef.current

    if (!element) return

    element.scrollBy({
      left:
        direction === "left"
          ? -240
          : 240,
      behavior: "smooth",
    })

    window.setTimeout(
      updateNavArrows,
      250
    )
  }

  const retryImage = () => {
    setImageLoadError(false)

    setRetryKey(
      (previousKey) => previousKey + 1
    )
  }

  return (
    <div className="not-prose m-0 w-full max-w-none p-0">
      <style>{`
        .dashboard-tour-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .dashboard-tour-inner-tab {
          border-color: #d1d5db;
          background-color: #ffffff;
          color: #64748b;
          font-weight: 500;
        }

        .dashboard-tour-inner-tab:hover {
          border-color: #d1d5db;
          background-color: #f3f4f6;
          color: #000000;
        }

        .dashboard-tour-inner-tab-active {
          border-color: #d1d5db !important;
          background-color: #f3f4f6 !important;
          color: #000000 !important;
          font-weight: 500 !important;
        }

        .dashboard-tour-arrow {
          border-color: #e5e7eb;
          background-color: #ffffff;
          color: #6b7280;
        }

        .dashboard-tour-arrow:hover {
          border-color: #d1d5db;
          background-color: #f3f4f6;
          color: #000000;
        }

        /*
         * Fixed responsive image height.
         * The container exists before the image loads,
         * so page content does not move.
         */
        .dashboard-tour-image-frame {
          position: relative;
          width: 100%;
          height: 520px;
          contain: layout paint;
        }

        @media (max-width: 1024px) {
          .dashboard-tour-image-frame {
            height: 420px;
          }
        }

        @media (max-width: 768px) {
          .dashboard-tour-image-frame {
            height: 300px;
          }
        }

        @media (max-width: 480px) {
          .dashboard-tour-image-frame {
            height: 220px;
          }
        }

        .dashboard-tour-image {
          position: absolute;
          inset: 0;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          backface-visibility: hidden;
          transform: translateZ(0);
        }

        .dashboard-tour-displayed-image {
          z-index: 1;
        }

        .dashboard-tour-incoming-image {
          z-index: 2;
          transition: opacity 250ms ease;
          will-change: opacity;
        }

        .dashboard-tour-image-loader {
          background: linear-gradient(
            90deg,
            #f3f4f6 25%,
            #e5e7eb 50%,
            #f3f4f6 75%
          );
          background-size: 200% 100%;
          animation: dashboard-tour-loading 1.4s infinite;
        }

        @keyframes dashboard-tour-loading {
          0% {
            background-position: 200% 0;
          }

          100% {
            background-position: -200% 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .dashboard-tour-incoming-image {
            transition: none;
          }

          .dashboard-tour-image-loader {
            animation: none;
          }
        }

        .dark .dashboard-tour-inner-tab,
        [data-theme="dark"] .dashboard-tour-inner-tab {
          border-color: #374151;
          background-color: #111827;
          color: #d1d5db;
        }

        .dark .dashboard-tour-inner-tab:hover,
        [data-theme="dark"] .dashboard-tour-inner-tab:hover {
          border-color: #4b5563;
          background-color: #374151;
          color: #ffffff;
        }

        .dark .dashboard-tour-inner-tab-active,
        [data-theme="dark"] .dashboard-tour-inner-tab-active {
          border-color: #4b5563 !important;
          background-color: #374151 !important;
          color: #ffffff !important;
          font-weight: 500 !important;
        }

        .dark .dashboard-tour-arrow,
        [data-theme="dark"] .dashboard-tour-arrow {
          border-color: #374151;
          background-color: #111827;
          color: #d1d5db;
        }

        .dark .dashboard-tour-arrow:hover,
        [data-theme="dark"] .dashboard-tour-arrow:hover {
          border-color: #4b5563;
          background-color: #374151;
          color: #ffffff;
        }

        .dark .dashboard-tour-image-loader,
        [data-theme="dark"] .dashboard-tour-image-loader {
          background: linear-gradient(
            90deg,
            #111827 25%,
            #1f2937 50%,
            #111827 75%
          );
          background-size: 200% 100%;
        }
      `}</style>

      <div className="mb-6">
        <div className="mb-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
          Getting Started
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <h1
            className="m-0 font-bold tracking-tight text-gray-950 dark:text-gray-100"
            style={{
              margin: 0,
              fontSize: "30px",
              lineHeight: "36px",
            }}
          >
            Dashboard Tour
          </h1>

          <p
            className="m-0 text-gray-600 dark:text-gray-400"
            style={{
              margin: 0,
              fontSize: "18px",
              lineHeight: "28px",
            }}
          >
            Explore the Twinalyze dashboard step
            by step.
          </p>
        </div>
      </div>

      <div className="mb-5 hidden border-b border-gray-200 dark:border-gray-700 md:block">
        <div className="flex items-center gap-2">
          {canScrollLeft && (
            <button
              type="button"
              onClick={() =>
                scrollNavbar("left")
              }
              className="shrink-0 border-0 bg-transparent px-1 text-[26px] font-medium leading-none text-gray-400 transition hover:text-blue-600 dark:hover:text-blue-400"
              aria-label="Scroll dashboard tabs left"
            >
              ‹
            </button>
          )}

          <div
            ref={navbarRef}
            className="dashboard-tour-scrollbar flex flex-1 items-center gap-1 overflow-x-auto whitespace-nowrap"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {SECTIONS.map(
              (section, index) => {
                const isActive =
                  index === activeSectionIndex

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() =>
                      openSection(index)
                    }
                    title={section.title}
                    className={`relative flex h-[48px] shrink-0 items-center justify-center border-0 bg-transparent px-4 text-center transition ${
                      isActive
                        ? "text-sm font-bold text-blue-600 dark:text-blue-400"
                        : "text-sm font-medium text-black hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                    }`}
                  >
                    <span className="leading-none">
                      {section.title}
                    </span>

                    {isActive && (
                      <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-blue-600 dark:bg-blue-400" />
                    )}
                  </button>
                )
              }
            )}
          </div>

          {canScrollRight && (
            <button
              type="button"
              onClick={() =>
                scrollNavbar("right")
              }
              className="shrink-0 border-0 bg-transparent px-1 text-[26px] font-medium leading-none text-gray-400 transition hover:text-blue-600 dark:hover:text-blue-400"
              aria-label="Scroll dashboard tabs right"
            >
              ›
            </button>
          )}
        </div>
      </div>

      <div className="mb-5 block md:hidden">
        <label className="mb-2 block text-xs font-semibold text-gray-500 dark:text-gray-400">
          Select dashboard section
        </label>

        <select
          value={activeSectionIndex}
          onChange={
            handleMobileSectionChange
          }
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        >
          {SECTIONS.map(
            (section, index) => (
              <option
                key={section.id}
                value={index}
              >
                {section.title}
              </option>
            )
          )}
        </select>
      </div>

      <div className="mb-4 min-h-[30px]">
        {activeSection.images.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {activeSection.images.map(
              (image, index) => {
                const isActive =
                  index === activeImageIndex

                return (
                  <button
                    key={image.title}
                    type="button"
                    onClick={() =>
                      setActiveImageIndex(index)
                    }
                    className={`dashboard-tour-inner-tab inline-flex h-[30px] items-center justify-center rounded-full border px-3 text-[13px] leading-none transition ${
                      isActive
                        ? "dashboard-tour-inner-tab-active"
                        : ""
                    }`}
                  >
                    {image.title}
                  </button>
                )
              }
            )}
          </div>
        )}
      </div>

      <div className="mb-4 flex min-h-[56px] flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <p className="m-0 text-sm leading-6 text-gray-600 dark:text-gray-300 sm:text-base sm:leading-7">
            {activeImage.caption ||
              activeSection.description}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={goPrev}
            className="dashboard-tour-arrow flex h-9 w-9 items-center justify-center rounded-full border text-lg transition"
            aria-label="Previous screenshot"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={goNext}
            className="dashboard-tour-arrow flex h-9 w-9 items-center justify-center rounded-full border text-lg transition"
            aria-label="Next screenshot"
          >
            ›
          </button>
        </div>
      </div>

      <div className="dashboard-tour-image-frame m-0 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm dark:border-gray-700 dark:bg-gray-950">
        {!displayedImageLoaded && (
          <div className="dashboard-tour-image-loader absolute inset-0 z-10 flex items-center justify-center">
            <div className="rounded-xl border border-gray-200 bg-white/90 px-4 py-3 text-sm font-medium text-gray-600 shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/90 dark:text-gray-300">
              Loading preview...
            </div>
          </div>
        )}

        <img
          key={`${displayedImage.src}-${retryKey}`}
          src={displayedImage.src}
          alt={displayedImage.title}
          width="1600"
          height="900"
          onLoad={() => {
            setDisplayedImageLoaded(true)
            setImageLoadError(false)
          }}
          onError={() => {
            setDisplayedImageLoaded(false)
            setImageLoadError(true)
          }}
          className={`dashboard-tour-image dashboard-tour-displayed-image ${
            displayedImageLoaded
              ? "opacity-100"
              : "opacity-0"
          }`}
        />

        {incomingImage && (
          <img
            src={incomingImage.src}
            alt={incomingImage.title}
            width="1600"
            height="900"
            className={`dashboard-tour-image dashboard-tour-incoming-image ${
              incomingVisible
                ? "opacity-100"
                : "opacity-0"
            }`}
          />
        )}

        {isSwitchingImage &&
          displayedImageLoaded && (
            <div
              className="absolute right-3 top-3 z-20 rounded-lg border border-gray-200 bg-white/90 px-3 py-2 text-xs font-medium text-gray-600 shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/90 dark:text-gray-300"
              aria-live="polite"
            >
              Loading preview...
            </div>
          )}

        {imageLoadError && (
          <div
            className="absolute bottom-3 right-3 z-30 flex items-center gap-3 rounded-xl border border-red-200 bg-white/95 px-3 py-2 shadow-sm backdrop-blur-sm dark:border-red-900 dark:bg-gray-900/95"
            aria-live="polite"
          >
            <span className="text-xs font-medium text-red-600 dark:text-red-400">
              Preview unavailable
            </span>

            <button
              type="button"
              onClick={retryImage}
              className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 
































// import { useEffect, useRef, useState } from "react"

// export const DashboardTour = () => {
//   const navbarRef = useRef(null)

//   const sections = [
//     {
//       id: "home",
//       title: "Home",
//       description:
//         "Get a clear starting point for your dashboard with setup shortcuts and quick access to key sections.",
//       images: [
//         {
//           src: "/images/Dashboard/Home.png",
//           title: "Home",
//           caption:
//             "View your dashboard overview, setup status, project shortcuts, and quick links to continue configuration.",
//         },
//       ],
//     },
//     {
//       id: "realtime-user",
//       title: "Realtime User",
//       description:
//         "Monitor live users, active sessions, and current activity happening across your app or website.",
//       images: [
//         {
//           src: "/images/Dashboard/RealTime.png",
//           title: "Realtime User",
//           caption:
//             "Track users who are active right now, see live activity, and understand current product usage instantly.",
//         },
//       ],
//     },
//     {
//       id: "product-overview",
//       title: "Product Overview",
//       description:
//         "Understand product health, performance, usage trends, reports, and system-level insights from one place.",
//       images: [
//         {
//           src: "/images/Dashboard/Dashboard.png",
//           title: "Product Overview",
//           caption:
//             "See product-level performance, active users, retention users, session duration, country data, and usage summaries.",
//         },
//         {
//           src: "/images/Dashboard/SystemInsights.png",
//           title: "System Insights",
//           caption:
//             "Analyze device, operating system, app version, browser, and technical performance to understand system behavior.",
//         },
//         {
//           src: "/images/Dashboard/Reports.png",
//           title: "Reports",
//           caption:
//             "Create and review reports for product usage, events, behavior trends, and business performance insights.",
//         },
//       ],
//     },
//     {
//       id: "users",
//       title: "Users",
//       description:
//         "Analyze users, page behavior, engagement, retention, and growth across your product lifecycle.",
//       images: [
//         {
//           src: "/images/Dashboard/Users.png",
//           title: "Users",
//           caption:
//             "View user lists, user details, sessions, devices, activity history, and important user-level analytics.",
//         },
//         {
//           src: "/images/Dashboard/Pageinsights.png",
//           title: "Page Insights",
//           caption:
//             "Understand page views, page activity, user movement, popular pages, and page-level performance insights.",
//         },
//         {
//           src: "/images/Dashboard/UserEngagement.png",
//           title: "User Engagement",
//           caption:
//             "Measure how users interact with screens, pages, events, features, and important product actions.",
//         },
//         {
//           src: "/images/Dashboard/UserRetention.png",
//           title: "User Retention",
//           caption:
//             "Track how many users return after first use and compare retention across selected time periods.",
//         },
//         {
//           src: "/images/Dashboard/UserGrowth.png",
//           title: "User Growth",
//           caption:
//             "Monitor new users, active users, returning users, and overall user growth trends over time.",
//         },
//       ],
//     },
//     {
//       id: "ad",
//       title: "Ad",
//       description:
//         "Track advertising performance, revenue, failures, impressions, clicks, and campaign-level results.",
//       images: [
//         {
//           src: "/images/Dashboard/AdReport.png",
//           title: "Ad Report",
//           caption:
//             "View ad impressions, clicks, revenue, fill rate, campaign performance, and monetization results.",
//         },
//         {
//           src: "/images/Dashboard/Ads.png",
//           title: "Ad Failure Insights",
//           caption:
//             "Find ad loading failures, failed impressions, network issues, and problems affecting ad revenue.",
//         },
//       ],
//     },
//     {
//       id: "messaging",
//       title: "Messaging",
//       description:
//         "Create, manage, schedule, target, and analyze messaging campaigns for user engagement.",
//       images: [
//         {
//           src: "/images/analyticspage/Add-Notification.png",
//           title: "Messaging- create Message",
//           caption:
//             "Create messages, configure message content, select users, and prepare engagement campaigns.",
//         },
//         {
//           src: "/images/Dashboard/Campaignhistory.png",
//           title: "Campaign history",
//           caption:
//             "Manage campaign lists, campaign status, schedule time, audience targeting, and campaign actions.",
//         },
       
//       ],
//     },
//     {
//       id: "research",
//       title: "Research",
//       description:
//         "Explore market trends, country insights, store performance, and custom listing opportunities.",
//       images: [
//         {
//           src: "/images/Dashboard/MarketTrends.png",
//           title: "Market Trends",
//           caption:
//             "Analyze market movement, category trends, top opportunities, and regional demand patterns.",
//         },
//         {
//           src: "/images/Dashboard/.PNG",
//           title: "Country Details",
//           caption:
//             "Review country-level user behavior, store data, traffic quality, and market performance details.",
//         },
//         {
//           src: "/images/Dashboard/StoreInsights.png",
//           title: "Custom Store Listing",
//           caption:
//             "Track custom store listings, visibility, traffic, ranking opportunities, and listing performance.",
//         },
//       ],
//     },
//     {
//       id: "data",
//       title: "Data",
//       description:
//         "Manage events, properties, captured data, visibility, and tracking configuration in one place.",
//       images: [
//         {
//           src: "/images/Dashboard/Events.png",
//           title: "Events",
//           caption:
//             "View tracked events, event names, sources, auto/manual tracking status, visibility, and event details.",
//         },
//         {
//           src: "/images/Dashboard/Properties.png",
//           title: "Properties",
//           caption:
//             "Manage user properties, device properties, event properties, and captured analytics attributes.",
//         },
//       ],
//     },
//     {
//       id: "setting",
//       title: "Setting",
//       description:
//         "Manage project settings, profile details, organization details, users, roles, and permissions.",
//       images: [
//         {
//           src: "/images/Dashboard/project-setting.png",
//           title: "Project Setting",
//           caption:
//             "Update project name, logo, API keys, platform details, Firebase key, and project configuration.",
//         },
//         {
//           src: "/images/Dashboard/Integration.png",
//           title: "Integrations",
//           caption:
//             "Manage all of your integrations here.",
//         },
//         {
//           src: "/images/Dashboard/Version.png",
//           title: "Version",
//           caption:
//             "Manage version of Sdk.",
//         },
//          {
//           src: "/images/Dashboard/Device-info.png",
//           title: "Device",
//           caption:
//             "Check device info.",
//         },
//          {
//           src: "/images/Dashboard/New-Screen-activity.png",
//           title: "Screen Activity",
//           caption:
//             "Check what screen activity is being done.",
//         }
//       ],
//     },
//   ]

//   const [activeSectionIndex, setActiveSectionIndex] = useState(0)
//   const [activeImageIndex, setActiveImageIndex] = useState(0)
//   const [canScrollLeft, setCanScrollLeft] = useState(false)
//   const [canScrollRight, setCanScrollRight] = useState(false)

//   const activeSection = sections[activeSectionIndex]
//   const activeImage = activeSection.images[activeImageIndex]

//   const updateNavArrows = () => {
//     if (!navbarRef.current) return

//     const element = navbarRef.current
//     const maxScrollLeft = element.scrollWidth - element.clientWidth

//     setCanScrollLeft(element.scrollLeft > 4)
//     setCanScrollRight(
//       maxScrollLeft > 4 && element.scrollLeft < maxScrollLeft - 4
//     )
//   }

//   useEffect(() => {
//     updateNavArrows()

//     const element = navbarRef.current

//     if (!element) return

//     element.addEventListener("scroll", updateNavArrows)
//     window.addEventListener("resize", updateNavArrows)

//     const timer = window.setTimeout(updateNavArrows, 150)

//     return () => {
//       element.removeEventListener("scroll", updateNavArrows)
//       window.removeEventListener("resize", updateNavArrows)
//       window.clearTimeout(timer)
//     }
//   }, [])

//   useEffect(() => {
//     const timer = window.setTimeout(updateNavArrows, 80)

//     return () => {
//       window.clearTimeout(timer)
//     }
//   }, [activeSectionIndex])

//   const openSection = (index) => {
//     setActiveSectionIndex(index)
//     setActiveImageIndex(0)
//   }

//   const handleMobileSectionChange = (event) => {
//     openSection(Number(event.target.value))
//   }

//   const goNext = () => {
//     if (activeImageIndex < activeSection.images.length - 1) {
//       setActiveImageIndex((previousIndex) => previousIndex + 1)
//       return
//     }

//     const nextSectionIndex =
//       activeSectionIndex === sections.length - 1
//         ? 0
//         : activeSectionIndex + 1

//     setActiveSectionIndex(nextSectionIndex)
//     setActiveImageIndex(0)
//   }

//   const goPrev = () => {
//     if (activeImageIndex > 0) {
//       setActiveImageIndex((previousIndex) => previousIndex - 1)
//       return
//     }

//     const previousSectionIndex =
//       activeSectionIndex === 0
//         ? sections.length - 1
//         : activeSectionIndex - 1

//     setActiveSectionIndex(previousSectionIndex)
//     setActiveImageIndex(
//       sections[previousSectionIndex].images.length - 1
//     )
//   }

//   const scrollNavbar = (direction) => {
//     if (!navbarRef.current) return

//     navbarRef.current.scrollBy({
//       left: direction === "left" ? -240 : 240,
//       behavior: "smooth",
//     })

//     window.setTimeout(updateNavArrows, 250)
//   }

//   return (
//     <div className="not-prose m-0 w-full max-w-none p-0">
//       <style>{`
//         .dashboard-tour-scrollbar::-webkit-scrollbar {
//           display: none;
//         }

//         .dashboard-tour-inner-tab {
//           border-color: #d1d5db;
//           background-color: #ffffff;
//           color: #64748b;
//           font-weight: 500;
//         }

//         .dashboard-tour-inner-tab:hover {
//           border-color: #d1d5db;
//           background-color: #f3f4f6;
//           color: #000000;
//         }

//         .dashboard-tour-inner-tab-active {
//           border-color: #d1d5db !important;
//           background-color: #f3f4f6 !important;
//           color: #000000 !important;
//           font-weight: 500 !important;
//         }

//         .dashboard-tour-arrow {
//           border-color: #e5e7eb;
//           background-color: #ffffff;
//           color: #6b7280;
//         }

//         .dashboard-tour-arrow:hover {
//           border-color: #d1d5db;
//           background-color: #f3f4f6;
//           color: #000000;
//         }

//         .dark .dashboard-tour-inner-tab,
//         [data-theme="dark"] .dashboard-tour-inner-tab {
//           border-color: #374151;
//           background-color: #111827;
//           color: #d1d5db;
//         }

//         .dark .dashboard-tour-inner-tab:hover,
//         [data-theme="dark"] .dashboard-tour-inner-tab:hover {
//           border-color: #4b5563;
//           background-color: #374151;
//           color: #ffffff;
//         }

//         .dark .dashboard-tour-inner-tab-active,
//         [data-theme="dark"] .dashboard-tour-inner-tab-active {
//           border-color: #4b5563 !important;
//           background-color: #374151 !important;
//           color: #ffffff !important;
//           font-weight: 500 !important;
//         }

//         .dark .dashboard-tour-arrow,
//         [data-theme="dark"] .dashboard-tour-arrow {
//           border-color: #374151;
//           background-color: #111827;
//           color: #d1d5db;
//         }

//         .dark .dashboard-tour-arrow:hover,
//         [data-theme="dark"] .dashboard-tour-arrow:hover {
//           border-color: #4b5563;
//           background-color: #374151;
//           color: #ffffff;
//         }
//       `}</style>

//       {/* <div className="mb-6">
//         <div className="mb-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
//           Getting Started
//         </div>

//         <h1
//           className="m-0 font-bold tracking-tight text-gray-950 dark:text-gray-100"
//           style={{
//             fontSize: "30px",
//             lineHeight: "36px",
//           }}
//         >
//           Dashboard Tour
//         </h1>

//         <p
//           className="m-0 text-gray-600 dark:text-gray-400"
//           style={{
//             marginTop: "10px",
//             fontSize: "18px",
//             lineHeight: "28px",
//           }}
//         >
//           Explore the Twinalyze dashboard step by step.
//         </p>
//       </div> */}
      

//       <div className="mb-6">
//   <div className="mb-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
//     Getting Started
//   </div>

//   <div
//     style={{
//       display: "flex",
//       flexDirection: "column",
//       gap: "10px",
//     }}
//   >
//     <h1
//       className="m-0 font-bold tracking-tight text-gray-950 dark:text-gray-100"
//       style={{
//         margin: 0,
//         fontSize: "30px",
//         lineHeight: "36px",
//       }}
//     >
//       Dashboard Tour
//     </h1>

//     <p
//       className="m-0 text-gray-600 dark:text-gray-400"
//       style={{
//         margin: 0,
//         fontSize: "18px",
//         lineHeight: "28px",
//       }}
//     >
//       Explore the Twinalyze dashboard step by step.
//     </p>
//   </div>
// </div>


//       <div className="mb-5 hidden border-b border-gray-200 dark:border-gray-700 md:block">
//         <div className="flex items-center gap-2">
//           {canScrollLeft && (
//             <button
//               type="button"
//               onClick={() => scrollNavbar("left")}
//               className="shrink-0 border-0 bg-transparent px-1 text-[26px] font-medium leading-none text-gray-400 transition hover:text-blue-600 dark:hover:text-blue-400"
//               aria-label="Scroll left"
//             >
//               ‹
//             </button>
//           )}

//           <div
//             ref={navbarRef}
//             className="dashboard-tour-scrollbar flex flex-1 items-center gap-1 overflow-x-auto whitespace-nowrap"
//             style={{
//               scrollbarWidth: "none",
//               msOverflowStyle: "none",
//             }}
//           >
//             {sections.map((section, index) => {
//               const isActive = index === activeSectionIndex

//               return (
//                 <button
//                   key={section.id}
//                   type="button"
//                   onClick={() => openSection(index)}
//                   title={section.title}
//                   className={`relative flex h-[48px] shrink-0 items-center justify-center border-0 bg-transparent px-4 text-center transition ${
//                     isActive
//                       ? "text-sm font-bold text-blue-600 dark:text-blue-400"
//                       : "text-sm font-medium text-black hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
//                   }`}
//                 >
//                   <span className="leading-none">{section.title}</span>

//                   {isActive && (
//                     <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-blue-600 dark:bg-blue-400" />
//                   )}
//                 </button>
//               )
//             })}
//           </div>

//           {canScrollRight && (
//             <button
//               type="button"
//               onClick={() => scrollNavbar("right")}
//               className="shrink-0 border-0 bg-transparent px-1 text-[26px] font-medium leading-none text-gray-400 transition hover:text-blue-600 dark:hover:text-blue-400"
//               aria-label="Scroll right"
//             >
//               ›
//             </button>
//           )}
//         </div>
//       </div>

//       <div className="mb-5 block md:hidden">
//         <label className="mb-2 block text-xs font-semibold text-gray-500 dark:text-gray-400">
//           Select dashboard section
//         </label>

//         <select
//           value={activeSectionIndex}
//           onChange={handleMobileSectionChange}
//           className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
//         >
//           {sections.map((section, index) => (
//             <option key={section.id} value={index}>
//               {section.title}
//             </option>
//           ))}
//         </select>
//       </div>

//       {activeSection.images.length > 1 && (
//         <div className="mb-4 flex flex-wrap gap-2">
//           {activeSection.images.map((image, index) => {
//             const isActive = index === activeImageIndex

//             return (
//               <button
//                 key={image.title}
//                 type="button"
//                 onClick={() => setActiveImageIndex(index)}
//                 className={`dashboard-tour-inner-tab inline-flex h-[30px] items-center justify-center rounded-full border px-3 text-[13px] leading-none transition ${
//                   isActive ? "dashboard-tour-inner-tab-active" : ""
//                 }`}
//               >
//                 {image.title}
//               </button>
//             )
//           })}
//         </div>
//       )}

//       <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
//         <div className="min-w-0">
//           <p className="m-0 text-sm leading-6 text-gray-600 dark:text-gray-300 sm:text-base sm:leading-7">
//             {activeImage.caption || activeSection.description}
//           </p>
//         </div>

//         <div className="flex shrink-0 items-center gap-3">
//           <button
//             type="button"
//             onClick={goPrev}
//             className="dashboard-tour-arrow flex h-9 w-9 items-center justify-center rounded-full border text-lg transition"
//             aria-label="Previous screenshot"
//           >
//             ‹
//           </button>

//           <button
//             type="button"
//             onClick={goNext}
//             className="dashboard-tour-arrow flex h-9 w-9 items-center justify-center rounded-full border text-lg transition"
//             aria-label="Next screenshot"
//           >
//             ›
//           </button>
//         </div>
//       </div>

//       <div className="m-0 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-950">
//         <img
//           key={`${activeSection.id}-${activeImageIndex}`}
//           src={activeImage.src}
//           alt={activeImage.title}
//           className="block h-auto w-full"
//         />
//       </div>
//     </div>
//   )
// }
