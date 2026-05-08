import { useEffect, useRef, useState } from "react"

export const DashboardTour = () => {
  const navbarRef = useRef(null)

  const sections = [
    {
      id: "home",
      title: "Home",
      description:
        "Get a clear starting point for your dashboard with setup shortcuts and quick access to key sections.",
      images: [
        {
          src: "/images/Dashboard/Dashboard.PNG",
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
          src: "/images/Dashboard/Dashboard_realtime_2.PNG",
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
          src: "/images/Dashboard/Dashboard_3_product_overview_1.PNG",
          title: "Product Overview",
          caption:
            "See product-level performance, active users, retention users, session duration, country data, and usage summaries.",
        },
        {
          src: "/images/Dashboard/Dashboard_3_System_Insights_2.PNG",
          title: "System Insights",
          caption:
            "Analyze device, operating system, app version, browser, and technical performance to understand system behavior.",
        },
        {
          src: "/images/Dashboard/Dashboard_3_Repots_3.PNG",
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
          src: "/images/Dashboard/Dashboard_4_users_1.PNG",
          title: "Users",
          caption:
            "View user lists, user details, sessions, devices, activity history, and important user-level analytics.",
        },
        {
          src: "/images/Dashboard/Dashboard_4_-page_insight_2.PNG",
          title: "Page Insights",
          caption:
            "Understand page views, page activity, user movement, popular pages, and page-level performance insights.",
        },
        {
          src: "/images/Dashboard/Dashboard_4_User_userEngagement_3.PNG",
          title: "User Engagement",
          caption:
            "Measure how users interact with screens, pages, events, features, and important product actions.",
        },
        {
          src: "/images/Dashboard/Dashboard_4_user_userRetention_4.PNG",
          title: "User Retention",
          caption:
            "Track how many users return after first use and compare retention across selected time periods.",
        },
        {
          src: "/images/Dashboard/DashBoard_4_User_User Growth_5.PNG",
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
          src: "/images/Dashboard/DashBoard_5_Ad_AdReport_1.PNG",
          title: "Ad Report",
          caption:
            "View ad impressions, clicks, revenue, fill rate, campaign performance, and monetization results.",
        },
        {
          src: "/images/Dashboard/Dashboard_5_a_AdFailureInsight_3.PNG",
          title: "Ad Failure Insights",
          caption:
            "Find ad loading failures, failed impressions, network issues, and problems affecting ad revenue.",
        },
      ],
    },
    {
      id: "notification",
      title: "Notification",
      description:
        "Create, manage, schedule, target, and analyze notification campaigns for user engagement.",
      images: [
        {
          src: "/images/Dashboard/Dashboard_6_notification_1.PNG",
          title: "Notification",
          caption:
            "Create notifications, configure message content, select users, and prepare engagement campaigns.",
        },
        {
          src: "/images/Dashboard/Dashboard_6_notification_notificationCampaign_2.PNG",
          title: "Notification Campaign",
          caption:
            "Manage campaign lists, campaign status, schedule time, audience targeting, and campaign actions.",
        },
        {
          src: "/images/Dashboard/Dashboard_6_notification_notificationReportList_3.PNG",
          title: "Notification Report List",
          caption:
            "Review delivery, opens, clicks, failed notifications, campaign reports, and engagement performance.",
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
          src: "/images/Dashboard/Dashboard_7_Research_MarketTrends_1.PNG",
          title: "Market Trends",
          caption:
            "Analyze market movement, category trends, top opportunities, and regional demand patterns.",
        },
        {
          src: "/images/Dashboard/Dashboard_7_Research_CountryDetails_2.PNG",
          title: "Country Details",
          caption:
            "Review country-level user behavior, store data, traffic quality, and market performance details.",
        },
        {
          src: "/images/Dashboard/Dashboard_7_Research_CustomStoreListing_3.PNG",
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
          src: "/images/Dashboard/Dashboard_8_Data_Events_1.PNG",
          title: "Events",
          caption:
            "View tracked events, event names, sources, auto/manual tracking status, visibility, and event details.",
        },
        {
          src: "/images/Dashboard/Dashboard_8_Data_Properties_2.PNG",
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
          src: "/images/Dashboard/Dashboard_9_ProjectSetting_1.PNG",
          title: "Project Setting",
          caption:
            "Update project name, logo, API keys, platform details, Firebase key, and project configuration.",
        },
        {
          src: "/images/Dashboard/Dashboard_11_settings_ProfileDetails_1.PNG",
          title: "Profile Details",
          caption:
            "Manage profile information, personal details, account settings, and user preferences.",
        },
        {
          src: "/images/Dashboard/Dashboard_11_settings_Organization_2.PNG",
          title: "Organization",
          caption:
            "Manage organization information, team members, users, roles, access, and permissions.",
        },
      ],
    },
  ]

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const activeSection = sections[activeSectionIndex]
  const activeImage = activeSection.images[activeImageIndex]

  const updateNavArrows = () => {
    if (!navbarRef.current) return

    const el = navbarRef.current
    const maxScrollLeft = el.scrollWidth - el.clientWidth

    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(maxScrollLeft > 4 && el.scrollLeft < maxScrollLeft - 4)
  }

  useEffect(() => {
    updateNavArrows()

    const el = navbarRef.current
    if (!el) return

    el.addEventListener("scroll", updateNavArrows)
    window.addEventListener("resize", updateNavArrows)

    const timer = window.setTimeout(updateNavArrows, 150)

    return () => {
      el.removeEventListener("scroll", updateNavArrows)
      window.removeEventListener("resize", updateNavArrows)
      window.clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    window.setTimeout(updateNavArrows, 80)
  }, [activeSectionIndex])

  const openSection = (index) => {
    setActiveSectionIndex(index)
    setActiveImageIndex(0)
  }

  const handleMobileSectionChange = (event) => {
    openSection(Number(event.target.value))
  }

  const goNext = () => {
    if (activeImageIndex < activeSection.images.length - 1) {
      setActiveImageIndex((prev) => prev + 1)
      return
    }

    const nextSectionIndex =
      activeSectionIndex === sections.length - 1 ? 0 : activeSectionIndex + 1

    setActiveSectionIndex(nextSectionIndex)
    setActiveImageIndex(0)
  }

  const goPrev = () => {
    if (activeImageIndex > 0) {
      setActiveImageIndex((prev) => prev - 1)
      return
    }

    const prevSectionIndex =
      activeSectionIndex === 0 ? sections.length - 1 : activeSectionIndex - 1

    setActiveSectionIndex(prevSectionIndex)
    setActiveImageIndex(sections[prevSectionIndex].images.length - 1)
  }

  const scrollNavbar = (direction) => {
    if (!navbarRef.current) return

    navbarRef.current.scrollBy({
      left: direction === "left" ? -240 : 240,
      behavior: "smooth",
    })

    window.setTimeout(updateNavArrows, 250)
  }

  return (
    <div className="not-prose mx-auto w-full max-w-[920px] px-4 py-6 sm:px-5 sm:py-8">
      <style>{`
        .dashboard-tour-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Header */}
      <div className="mb-6 sm:mb-7">
        <div className="mb-2 text-sm font-semibold text-blue-600">
          Getting Started
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              Dashboard
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
              Explore the Twinalyze dashboard step by step.
            </p>
          </div>

          <a
            href="https://sandbox.twinalyze.com/organizations"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 w-fit items-center gap-2 rounded-lg bg-[#2557E8] px-4 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-[#1D4ED8] hover:text-white"
          >
            Demo Account

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              className="h-3.5 w-3.5 fill-current"
              aria-hidden="true"
            >
              <path d="M384 64C366.3 64 352 78.3 352 96C352 113.7 366.3 128 384 128L466.7 128L265.3 329.4C252.8 341.9 252.8 362.2 265.3 374.7C277.8 387.2 298.1 387.2 310.6 374.7L512 173.3L512 256C512 273.7 526.3 288 544 288C561.7 288 576 273.7 576 256L576 96C576 78.3 561.7 64 544 64L384 64zM144 160C99.8 160 64 195.8 64 240L64 496C64 540.2 99.8 576 144 576L400 576C444.2 576 480 540.2 480 496L480 416C480 398.3 465.7 384 448 384C430.3 384 416 398.3 416 416L416 496C416 504.8 408.8 512 400 512L144 512C135.2 512 128 504.8 128 496L128 240C128 231.2 135.2 224 144 224L224 224C241.7 224 256 209.7 256 192C256 174.3 241.7 160 224 160L144 160z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Desktop / Tablet navbar */}
      <div className="mb-5 hidden border-b border-gray-200 md:block">
        <div className="flex items-center gap-2">
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scrollNavbar("left")}
              className="shrink-0 border-0 bg-transparent px-1 text-[26px] font-medium leading-none text-gray-400 transition hover:text-blue-600"
              aria-label="Scroll left"
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
            {sections.map((section, index) => {
              const isActive = index === activeSectionIndex

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => openSection(index)}
                  title={section.title}
                  className="relative flex h-[48px] shrink-0 items-center justify-center border-0 bg-transparent px-4 text-center font-semibold transition"
                  style={{
                    fontSize: "15px",
                    color: isActive ? "#2563EB" : "#64748B",
                  }}
                >
                  <span className="leading-none">{section.title}</span>

                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-blue-600" />
                  )}
                </button>
              )
            })}
          </div>

          {canScrollRight && (
            <button
              type="button"
              onClick={() => scrollNavbar("right")}
              className="shrink-0 border-0 bg-transparent px-1 text-[26px] font-medium leading-none text-gray-400 transition hover:text-blue-600"
              aria-label="Scroll right"
            >
              ›
            </button>
          )}
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className="mb-5 block md:hidden">
        <label className="mb-2 block text-xs font-semibold text-gray-500">
          Select dashboard section
        </label>

        <select
          value={activeSectionIndex}
          onChange={handleMobileSectionChange}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        >
          {sections.map((section, index) => (
            <option key={section.id} value={index}>
              {section.title}
            </option>
          ))}
        </select>
      </div>

      {/* Inner tab buttons */}
      {activeSection.images.length > 1 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {activeSection.images.map((image, index) => {
            const isActive = index === activeImageIndex

            return (
              <button
                key={image.title}
                type="button"
                onClick={() => setActiveImageIndex(index)}
                className="inline-flex h-[30px] items-center justify-center rounded-full border px-3 font-semibold leading-none transition"
                style={{
                  fontSize: "13px",
                  borderColor: isActive ? "#2563EB" : "#D1D5DB",
                  backgroundColor: isActive ? "#EFF6FF" : "#FFFFFF",
                  color: isActive ? "#2563EB" : "#64748B",
                }}
              >
                {image.title}
              </button>
            )
          })}
        </div>
      )}

      {/* Content + screenshot arrows */}
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
            {activeImage.caption || activeSection.description}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={goPrev}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-lg text-gray-500 transition hover:border-blue-300 hover:text-blue-600"
            aria-label="Previous screenshot"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={goNext}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-lg text-gray-500 transition hover:border-blue-300 hover:text-blue-600"
            aria-label="Next screenshot"
          >
            ›
          </button>
        </div>
      </div>

      {/* Image */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm">
        <div className="flex h-[220px] items-center justify-center bg-white sm:h-[300px] lg:h-[353px]">
          <img
            key={`${activeSection.id}-${activeImageIndex}`}
            src={activeImage.src}
            alt={activeImage.title}
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  )
}