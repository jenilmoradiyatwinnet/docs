export const DashboardTour = () => {
  const sections = [
    {
      id: "home",
      title: "Home",
      icon: "⌂",
      images: [
        {
          src: "/images/Dashboard/Dashboard.PNG",
          title: "Home",
          caption: "View the main dashboard overview.",
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
          caption: "Track users who are currently active on your website or app.",
        },
      ],
    },
    {
      id: "product-overview",
      title: "Product Overview",
      icon: "▥",
      images: [
        {
          src: "/images/Dashboard/Dashboard_3_System_Insights_2.PNG",
          title: "System Insights",
          caption: "Understand system insights from your dashboard.",
        },
        {
          src: "/images/Dashboard/Dashboard_3_Repots_3.PNG",
          title: "Reports",
          caption: "View product overview reports and summaries.",
        },
        {
          src: "/images/Dashboard/Dashboard_3_advanceReport_funnel_1.PNG",
          title: "Advance Report",
          caption: "Explore advanced product overview reporting.",
        },
      ],
    },
    {
      id: "users",
      title: "Users",
      icon: "●",
      images: [
        {
          src: "/images/Dashboard/Dashboard_4_-page_insight_2.PNG",
          title: "Page Insights",
          caption: "Understand page-level user activity and insights.",
        },
        {
          src: "/images/Dashboard/Dashboard_4_User_userEngagement_3.PNG",
          title: "User Engagement",
          caption: "Review how users engage with your product.",
        },
        {
          src: "/images/Dashboard/Dashboard_4_user_userRetention_4.PNG",
          title: "User Retention",
          caption: "Analyze user retention over time.",
        },
        {
          src: "/images/Dashboard/DashBoard_4_User_User Growth_5.PNG",
          title: "User Growth",
          caption: "Measure growth and user trends.",
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
          caption: "View ad reports and performance metrics.",
        },
        {
          src: "/images/Dashboard/Dashboard_5_a_AdFailureInsight_3.PNG",
          title: "Ad Failure Insights",
          caption: "Analyze ad failure insights and issues.",
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
          caption: "Create and manage notifications.",
        },
        {
          src: "/images/Dashboard/Dashboard_6_notification_notificationCampaign_2.PNG",
          title: "Notification Campaign",
          caption: "Manage notification campaigns.",
        },
        {
          src: "/images/Dashboard/Dashboard_6_notification_notificationReportList_3.PNG",
          title: "Notification Report List",
          caption: "View notification reports and delivery data.",
        },
      ],
    },
    {
      id: "research",
      title: "Research",
      icon: "◒",
      images: [
        {
          src: "/images/Dashboard/Dashboard_7_Research_MarketTrends_1.PNG",
          title: "Market Trends",
          caption: "Explore market trends and top opportunities.",
        },
        {
          src: "/images/Dashboard/Dashboard_7_research_CountryStore.PNG",
          title: "Country Store",
          caption: "See country and store related research data.",
        },
        {
          src: "/images/Dashboard/Dashboard_7_Research_CountryDetails_2.PNG",
          title: "Country Details",
          caption: "Review country-level details and metrics.",
        },
        {
          src: "/images/Dashboard/Dashboard_7_Research_CustomStoreListing_3.PNG",
          title: "Custom Store Listing",
          caption: "View custom store listing research data.",
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
          caption: "View all tracked events and event details.",
        },
        {
          src: "/images/Dashboard/Dashboard_8_Data_Properties_2.PNG",
          title: "Properties",
          caption: "View user, device, and event properties.",
        },
      ],
    },
    {
      id: "setting",
      title: "Setting",
      icon: "⚙",
      images: [
        {
          src: "/images/Dashboard/Dashboard_11_settings_ProfileDetails_1.PNG",
          title: "Manage Profile",
          caption: "Manage profile details and account settings.",
        },
        {
          src: "/images/Dashboard/Dashboard_11_settings_Organization_2.PNG",
          title: "Users And Permissions",
          caption: "Manage users, roles, and permissions.",
        },
      ],
    },
  ]

  const [current, setCurrent] = useState({
    sectionIndex: 0,
    imageIndex: 0,
  })

  const [expandedSectionIndex, setExpandedSectionIndex] = useState(null)

  const activeSectionIndex = current.sectionIndex
  const activeImageIndex = current.imageIndex

  const activeSection = sections[activeSectionIndex]
  const images = activeSection.images
  const activeImage = images[activeImageIndex]

  const openSection = (sectionIndex) => {
    const hasDropdown = sections[sectionIndex].images.length > 1
    const isSameSection = sectionIndex === activeSectionIndex

    if (!hasDropdown) {
      setCurrent({
        sectionIndex,
        imageIndex: 0,
      })
      setExpandedSectionIndex(null)
      return
    }

    if (isSameSection) {
      setExpandedSectionIndex((prev) =>
        prev === sectionIndex ? null : sectionIndex
      )
      return
    }

    setCurrent({
      sectionIndex,
      imageIndex: 0,
    })

    setExpandedSectionIndex(sectionIndex)
  }

  const openImage = (sectionIndex, imageIndex) => {
    setCurrent({
      sectionIndex,
      imageIndex,
    })

    setExpandedSectionIndex(sectionIndex)
  }

  const goNext = () => {
    const currentImages = sections[activeSectionIndex].images

    if (activeImageIndex < currentImages.length - 1) {
      setCurrent({
        sectionIndex: activeSectionIndex,
        imageIndex: activeImageIndex + 1,
      })
      return
    }

    const nextSectionIndex =
      activeSectionIndex === sections.length - 1 ? 0 : activeSectionIndex + 1

    setCurrent({
      sectionIndex: nextSectionIndex,
      imageIndex: 0,
    })

    if (sections[nextSectionIndex].images.length > 1) {
      setExpandedSectionIndex(nextSectionIndex)
    } else {
      setExpandedSectionIndex(null)
    }
  }

  const goPrevious = () => {
    if (activeImageIndex > 0) {
      setCurrent({
        sectionIndex: activeSectionIndex,
        imageIndex: activeImageIndex - 1,
      })
      return
    }

    const previousSectionIndex =
      activeSectionIndex === 0 ? sections.length - 1 : activeSectionIndex - 1

    const previousImages = sections[previousSectionIndex].images

    setCurrent({
      sectionIndex: previousSectionIndex,
      imageIndex: previousImages.length - 1,
    })

    if (sections[previousSectionIndex].images.length > 1) {
      setExpandedSectionIndex(previousSectionIndex)
    } else {
      setExpandedSectionIndex(null)
    }
  }

  const renderSectionButton = (section, sectionIndex, isMobile = false) => {
    const isActive = sectionIndex === activeSectionIndex
    const hasDropdown = section.images.length > 1
    const isExpanded = expandedSectionIndex === sectionIndex

    return (
      <button
        key={section.id}
        type="button"
        onClick={() => openSection(sectionIndex)}
        className={
          isMobile
            ? "flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition"
            : "flex w-full items-center justify-between gap-2 rounded-xl px-2.5 py-2.5 text-left text-sm font-medium transition"
        }
        style={{
          backgroundColor: isActive ? "#2563EB" : isMobile ? "#ffffff" : "transparent",
          color: isActive ? "#ffffff" : "#374151",
          border: isMobile
            ? isActive
              ? "1px solid #2563EB"
              : "1px solid #E5E7EB"
            : "none",
        }}
      >
        <span className="flex items-center gap-2">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-lg text-xs"
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

        {hasDropdown && (
          <span
            style={{
              opacity: isActive ? 1 : 0.55,
              transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
              transition: "0.2s ease",
            }}
          >
            ›
          </span>
        )}
      </button>
    )
  }

  return (
    <div
      className="not-prose w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5 lg:p-6"
      style={{
        maxWidth: "960px",
      }}
    >
      <div className="mb-5">
        <p className="text-xs font-semibold text-gray-500 sm:text-sm">
          Twinalyze Dashboard Tour
        </p>

        <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
          Explore the dashboard step by step
        </h2>

        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          Select any dashboard section and use Next to view each screenshot.
        </p>
      </div>

      {/* Mobile Topbar */}
      <div className="mb-4 block rounded-2xl border border-gray-200 bg-gray-50 p-2 md:hidden">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {sections.map((section, sectionIndex) =>
            renderSectionButton(section, sectionIndex, true)
          )}
        </div>

        {expandedSectionIndex !== null &&
          sections[expandedSectionIndex].images.length > 1 && (
            <div className="mt-3 flex flex-wrap gap-2 border-t border-gray-200 pt-3">
              {sections[expandedSectionIndex].images.map((image, imageIndex) => {
                const isImageActive =
                  expandedSectionIndex === activeSectionIndex &&
                  imageIndex === activeImageIndex

                return (
                  <button
                    key={sections[expandedSectionIndex].id + "-" + imageIndex}
                    type="button"
                    onClick={() => openImage(expandedSectionIndex, imageIndex)}
                    className="rounded-full px-3 py-1.5 text-sm font-medium transition"
                    style={{
                      backgroundColor: isImageActive ? "#2563EB" : "#ffffff",
                      color: isImageActive ? "#ffffff" : "#374151",
                      border: isImageActive
                        ? "1px solid #2563EB"
                        : "1px solid #E5E7EB",
                    }}
                  >
                    {image.title}
                  </button>
                )
              })}
            </div>
          )}
      </div>

      <div className="flex flex-col gap-5 md:flex-row">
        {/* Tablet + Laptop Sidebar */}
        <div className="hidden rounded-2xl border border-gray-200 bg-gray-50 p-3 md:block md:w-[190px] lg:w-[205px]">
          <div className="space-y-1.5">
            {sections.map((section, sectionIndex) => {
              const hasDropdown = section.images.length > 1
              const isExpanded = expandedSectionIndex === sectionIndex

              return (
                <div key={section.id}>
                  {renderSectionButton(section, sectionIndex, false)}

                  {isExpanded && hasDropdown && (
                    <div className="ml-9 mt-2 space-y-2 pb-2">
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
                            {image.title}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold text-blue-600 sm:text-base">
                {activeSection.title}
              </p>

              <h3 className="mt-1 text-xl font-bold text-gray-950 sm:text-2xl">
                {activeImage.title}
              </h3>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
                {activeImage.caption}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-sm font-semibold text-gray-700 sm:h-12 sm:w-12 sm:text-base">
              {activeImageIndex + 1} / {images.length}
            </div>
          </div>

          <div className="relative flex min-h-[240px] items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 sm:min-h-[340px] md:min-h-[390px] lg:min-h-[430px]">
            <img
              key={activeSection.id + "-" + activeImageIndex}
              src={activeImage.src}
              alt={activeImage.title}
              className="h-full w-full object-contain"
              style={{
                maxHeight: "560px",
              }}
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={goPrevious}
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-md transition hover:scale-105"
            >
              ‹ Prev
            </button>

            {images.length > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-2">
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
                      className="h-2.5 rounded-full transition sm:h-3"
                      style={{
                        width: isActive ? "34px" : "11px",
                        backgroundColor: isActive ? "#2563EB" : "#D1D5DB",
                      }}
                      aria-label={`Open screenshot ${index + 1}`}
                    />
                  )
                })}
              </div>
            )}

            <button
              type="button"
              onClick={goNext}
              className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:scale-105"
            >
              Next ›
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}