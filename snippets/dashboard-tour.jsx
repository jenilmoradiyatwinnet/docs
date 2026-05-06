export const DashboardTour = () => {
  const sections = [
    {
      id: "home",
      title: "Home",
      icon: "⌂",
      images: [
        {
          src: "/images/Dashboard/Dashboard.PNG",
          title: "Home Overview",
          caption:
            "View the main dashboard overview and important business metrics.",
        },
        {
          src: "/images/Dashboard/Dashboard.PNG",
          title: "Home Analytics",
          caption:
            "Understand user activity, traffic, and product performance.",
        },
        {
          src: "/images/Dashboard/Dashboard.PNG",
          title: "Home Summary",
          caption: "Quickly review key reports from one place.",
        },
      ],
    },
    {
      id: "realtime-users",
      title: "Realtime Users",
      icon: "◉",
      images: [
        {
          src: "/images/Dashboard/Dashboard_realtime_2.PNG",
          title: "Realtime Users",
          caption:
            "Track users who are currently active on your website or app.",
        },
        {
          src: "/images/Dashboard/Dashboard_realtime_2.PNG",
          title: "Live Activity",
          caption: "See live user movement and active sessions.",
        },
        {
          src: "/images/Dashboard/Dashboard_realtime_2.PNG",
          title: "Realtime Details",
          caption: "Analyze realtime users by location, device, and activity.",
        },
      ],
    },
    {
      id: "product-overview",
      title: "Product Overview",
      icon: "▥",
      images: [
        {
          src: "/images/Dashboard/Dashboard_3_product_overview_1.PNG",
          title: "Product Overview",
          caption:
            "Review your product performance from a single overview screen.",
        },
        {
          src: "/images/Dashboard/Dashboard_3_System_Insights_2.PNG",
          title: "System Insights",
          caption: "Understand system and product insights.",
        },
        {
          src: "/images/Dashboard/Dashboard_3_Repots_3.PNG",
          title: "Reports",
          caption: "View product reports and summaries.",
        },
      ],
    },
    {
      id: "users",
      title: "Users",
      icon: "●",
      images: [
        {
          src: "/images/Dashboard/Dashboard_4_users_1.PNG",
          title: "Users",
          caption: "View all users tracked inside Twinalyze.",
        },
        {
          src: "/images/Dashboard/Dashboard_4_-page_insight_2.PNG",
          title: "Page Insight",
          caption: "Understand user page activity.",
        },
        {
          src: "/images/Dashboard/DashBoard_4_User_User Growth_5.PNG",
          title: "User Growth",
          caption: "Analyze user growth reports.",
        },
      ],
    },
    {
      id: "ad",
      title: "Ad",
      icon: "◀",
      images: [
        {
          src: "/images/Dashboard/DashBoard_5_Ad_AdReport_1.PNG",
          title: "Ad Report",
          caption: "View ad report and performance.",
        },
        {
          src: "/images/Dashboard/Dashboard_5_a_AdFailureInsight_3.PNG",
          title: "Ad Failure Insight",
          caption: "Analyze ad failure insights.",
        },
        {
          src: "/images/Dashboard/Dashboard_5_a_AdFailureInsight_3.PNG",
          title: "Ad Insights",
          caption: "Understand which ads are helping user growth.",
        },
      ],
    },
    {
      id: "notification",
      title: "Notification",
      icon: "◆",
      images: [
        {
          src: "/images/Dashboard/Dashboard_6_notification_1.PNG",
          title: "Notification",
          caption: "Create and manage notification campaigns.",
        },
        {
          src: "/images/Dashboard/Dashboard_6_notification_1.PNG",
          title: "Notification History",
          caption: "View notification campaign history and delivery details.",
        },
        {
          src: "/images/Dashboard/Dashboard_6_notification_1.PNG",
          title: "Notification Reports",
          caption: "Track sent, opened, and campaign performance.",
        },
      ],
    },
    {
      id: "research",
      title: "Research",
      icon: "◒",
      images: [
        {
          src: "/images/Dashboard/Dashboard_7_research_CountryStore.PNG",
          title: "Country Store",
          caption: "Research country and store-level insights.",
        },
        {
          src: "/images/Dashboard/Dashboard_7_research_CountryStore.PNG",
          title: "Market Trends",
          caption: "Explore market trends and country-level research.",
        },
        {
          src: "/images/Dashboard/Dashboard_7_research_CountryStore.PNG",
          title: "Research Reports",
          caption: "Use research data to improve product decisions.",
        },
      ],
    },
    {
      id: "data",
      title: "Data",
      icon: "▤",
      images: [
        {
          src: "/images/Dashboard/Dashboard_8_Data_Events_1.PNG",
          title: "Events",
          caption: "View event data.",
        },
        {
          src: "/images/Dashboard/Dashboard_8_Data_Properties_2.PNG",
          title: "Properties",
          caption: "View user, event, and device properties.",
        },
        {
          src: "/images/Dashboard/Dashboard_8_Data_Properties_2.PNG",
          title: "Data Settings",
          caption: "Control how data is stored and used inside Twinalyze.",
        },
      ],
    },
    {
      id: "setting",
      title: "Setting",
      icon: "⚙",
      images: [
        {
          src: "/images/Dashboard/Dashboard_9_ProjectSetting_1.PNG",
          title: "Project Setting",
          caption: "Manage project setting.",
        },
        {
          src: "/images/Dashboard/Dashboard_10_askTwinalyze_1.PNG",
          title: "Ask Twinalyze",
          caption: "Use Ask Twinalyze from dashboard.",
        },
        {
          src: "/images/Dashboard/Dashboard_10_askTwinalyze_1.PNG",
          title: "Settings Details",
          caption: "Manage dashboard and project-level settings.",
        },
      ],
    },
  ]

  const [current, setCurrent] = useState({
    sectionIndex: 0,
    imageIndex: 0,
  })

  const activeSectionIndex = current.sectionIndex
  const activeImageIndex = current.imageIndex

  const activeSection = sections[activeSectionIndex]
  const images = activeSection.images
  const activeImage = images[activeImageIndex]

  const openSection = (sectionIndex) => {
    setCurrent({
      sectionIndex,
      imageIndex: 0,
    })
  }

  const openImage = (sectionIndex, imageIndex) => {
    setCurrent({
      sectionIndex,
      imageIndex,
    })
  }

  const goNext = () => {
    setCurrent((prev) => {
      const currentSectionImages = sections[prev.sectionIndex].images

      if (prev.imageIndex < currentSectionImages.length - 1) {
        return {
          sectionIndex: prev.sectionIndex,
          imageIndex: prev.imageIndex + 1,
        }
      }

      const nextSectionIndex =
        prev.sectionIndex === sections.length - 1 ? 0 : prev.sectionIndex + 1

      return {
        sectionIndex: nextSectionIndex,
        imageIndex: 0,
      }
    })
  }

  const goPrevious = () => {
    setCurrent((prev) => {
      if (prev.imageIndex > 0) {
        return {
          sectionIndex: prev.sectionIndex,
          imageIndex: prev.imageIndex - 1,
        }
      }

      const previousSectionIndex =
        prev.sectionIndex === 0 ? sections.length - 1 : prev.sectionIndex - 1

      const previousSectionImages = sections[previousSectionIndex].images

      return {
        sectionIndex: previousSectionIndex,
        imageIndex: previousSectionImages.length - 1,
      }
    })
  }

  return (
    <div
      className="not-prose rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
      style={{
        width: "min(900px, calc(100vw - 500px))",
        maxWidth: "900px",
      }}
    >
      <div className="mb-5">
        <p className="text-xs font-semibold text-gray-500">
          Twinalyze Dashboard Tour
        </p>

        <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-950">
          Explore the dashboard step by step
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Select any dashboard section and use Next to view each screenshot.
        </p>
      </div>

      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex gap-2 overflow-x-auto rounded-2xl border border-gray-200 bg-gray-50 p-2 lg:w-[152px] lg:flex-col lg:overflow-visible">
          {sections.map((section, sectionIndex) => {
            const isActive = sectionIndex === activeSectionIndex

            return (
              <div key={section.id}>
                <button
                  type="button"
                  onClick={() => openSection(sectionIndex)}
                  className="flex w-full min-w-max items-center justify-between gap-2 rounded-xl px-3 py-3 text-left text-sm font-medium transition lg:min-w-0"
                  style={{
                    backgroundColor: isActive ? "#2563EB" : "transparent",
                    color: isActive ? "#ffffff" : "#374151",
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-sm"
                      style={{
                        backgroundColor: isActive
                          ? "rgba(255,255,255,0.18)"
                          : "rgba(107,114,128,0.12)",
                      }}
                    >
                      {section.icon}
                    </span>

                    <span className="leading-5">{section.title}</span>
                  </span>

                  <span
                    style={{
                      opacity: isActive ? 1 : 0.45,
                      transform: isActive ? "rotate(90deg)" : "rotate(0deg)",
                      transition: "0.2s ease",
                    }}
                  >
                    ›
                  </span>
                </button>

                {isActive && (
                  <div className="ml-10 mt-2 space-y-2 pb-2">
                    {section.images.map((image, imageIndex) => {
                      const isImageActive =
                        sectionIndex === activeSectionIndex &&
                        imageIndex === activeImageIndex

                      return (
                        <button
                          key={section.id + "-" + imageIndex}
                          type="button"
                          onClick={() => openImage(sectionIndex, imageIndex)}
                          className="block w-full rounded-md px-1 py-1 text-left text-sm transition"
                          style={{
                            color: isImageActive ? "#2563EB" : "#374151",
                            fontWeight: isImageActive ? "600" : "500",
                          }}
                        >
                          {imageIndex + 1}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold text-blue-600">
                {activeSection.title}
              </p>

              <h3 className="mt-1 text-xl font-bold text-gray-950">
                {activeImage.title}
              </h3>

              <p className="mt-1 max-w-xl text-sm leading-6 text-gray-600">
                {activeImage.caption}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-sm font-semibold text-gray-700">
              {activeImageIndex + 1} / {images.length}
            </div>
          </div>

          <div className="relative flex min-h-[500px] items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
            <img
              key={activeSection.id + "-" + activeImageIndex}
              src={activeImage.src}
              alt={activeImage.title}
              className="h-full w-full object-contain"
              style={{
                maxHeight: "620px",
              }}
            />

            <button
              type="button"
              onClick={goPrevious}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-lg transition hover:scale-105"
            >
              ‹ Prev
            </button>

            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
            >
              Next ›
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {images.map((image, index) => {
              const isActive = index === activeImageIndex

              return (
                <button
                  key={activeSection.id + "-dot-" + index}
                  type="button"
                  onClick={() =>
                    setCurrent({
                      sectionIndex: activeSectionIndex,
                      imageIndex: index,
                    })
                  }
                  className="h-2.5 rounded-full transition"
                  style={{
                    width: isActive ? "32px" : "10px",
                    backgroundColor: isActive ? "#2563EB" : "#D1D5DB",
                  }}
                  aria-label={`Open screenshot ${index + 1}`}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}