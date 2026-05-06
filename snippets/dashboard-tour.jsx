const defaultSections = [
  {
    id: "home",
    title: "Home",
    icon: "⌂",
    images: [
      {
        src: "/images/dashboard-tour/home-1.png",
        title: "Home Overview",
        caption: "View the main dashboard overview and important business metrics.",
      },
      {
        src: "/images/dashboard-tour/home-2.png",
        title: "Home Analytics",
        caption: "Understand user activity, traffic, and product performance.",
      },
      {
        src: "/images/dashboard-tour/home-3.png",
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
        src: "/images/dashboard-tour/realtime-users-1.png",
        title: "Realtime Users",
        caption: "Track users who are currently active on your website or app.",
      },
      {
        src: "/images/dashboard-tour/realtime-users-2.png",
        title: "Live Activity",
        caption: "See live user movement and active sessions.",
      },
      {
        src: "/images/dashboard-tour/realtime-users-3.png",
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
        src: "/images/dashboard-tour/product-overview-1.png",
        title: "Product Overview",
        caption: "Review your product performance from a single overview screen.",
      },
      {
        src: "/images/dashboard-tour/product-overview-2.png",
        title: "Product Metrics",
        caption: "Understand how users interact with your product.",
      },
      {
        src: "/images/dashboard-tour/product-overview-3.png",
        title: "Product Insights",
        caption: "Find important product-level analytics and trends.",
      },
    ],
  },
  {
    id: "users",
    title: "Users",
    icon: "●",
    images: [
      {
        src: "/images/dashboard-tour/users-1.png",
        title: "Users",
        caption: "View all users tracked inside Twinalyze.",
      },
      {
        src: "/images/dashboard-tour/users-2.png",
        title: "User Profiles",
        caption: "Open user profiles and understand individual user activity.",
      },
      {
        src: "/images/dashboard-tour/users-3.png",
        title: "User Segments",
        caption: "Filter and analyze users based on behavior and properties.",
      },
    ],
  },
  {
    id: "ad",
    title: "Ad",
    icon: "◀",
    images: [
      {
        src: "/images/dashboard-tour/ad-1.png",
        title: "Ad Analytics",
        caption: "Track ad performance and campaign activity.",
      },
      {
        src: "/images/dashboard-tour/ad-2.png",
        title: "Ad Reports",
        caption: "Review campaign reports and performance breakdowns.",
      },
      {
        src: "/images/dashboard-tour/ad-3.png",
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
        src: "/images/dashboard-tour/notification-1.png",
        title: "Notification",
        caption: "Create and manage notification campaigns.",
      },
      {
        src: "/images/dashboard-tour/notification-2.png",
        title: "Campaign Setup",
        caption: "Configure audience, message, and schedule.",
      },
      {
        src: "/images/dashboard-tour/notification-3.png",
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
        src: "/images/dashboard-tour/research-1.png",
        title: "Research",
        caption: "Explore user behavior and product research insights.",
      },
      {
        src: "/images/dashboard-tour/research-2.png",
        title: "Behavior Analysis",
        caption: "Find patterns in user journeys and engagement.",
      },
      {
        src: "/images/dashboard-tour/research-3.png",
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
        src: "/images/dashboard-tour/data-1.png",
        title: "Data",
        caption: "Manage events, properties, and collected analytics data.",
      },
      {
        src: "/images/dashboard-tour/data-2.png",
        title: "Event Data",
        caption: "View event structure and incoming data.",
      },
      {
        src: "/images/dashboard-tour/data-3.png",
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
        src: "/images/dashboard-tour/setting-1.png",
        title: "Settings",
        caption: "Manage project, account, and workspace settings.",
      },
      {
        src: "/images/dashboard-tour/setting-2.png",
        title: "Project Settings",
        caption: "Update project details, keys, and configuration.",
      },
    ],
  },
];

export const DashboardTour = ({
  sections = defaultSections,
  primaryColor = "#315BFF",
  height = "620px",
  autoMoveToNextTab = true,
}) => {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeSection = sections[activeSectionIndex];
  const images = activeSection?.images || [];
  const activeImage = images[activeImageIndex];

  const openSection = (index) => {
    setActiveSectionIndex(index);
    setActiveImageIndex(0);
  };

  const goNext = () => {
    if (activeImageIndex < images.length - 1) {
      setActiveImageIndex(activeImageIndex + 1);
      return;
    }

    if (autoMoveToNextTab) {
      const nextSectionIndex = (activeSectionIndex + 1) % sections.length;
      setActiveSectionIndex(nextSectionIndex);
      setActiveImageIndex(0);
    }
  };

  const goPrevious = () => {
    if (activeImageIndex > 0) {
      setActiveImageIndex(activeImageIndex - 1);
      return;
    }

    const previousSectionIndex =
      activeSectionIndex === 0 ? sections.length - 1 : activeSectionIndex - 1;

    const previousSectionImages = sections[previousSectionIndex]?.images || [];

    setActiveSectionIndex(previousSectionIndex);
    setActiveImageIndex(Math.max(previousSectionImages.length - 1, 0));
  };

  return (
    <div className="not-prose w-full rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <style>
        {`
          @keyframes twTourSlide {
            from {
              opacity: 0;
              transform: translateX(16px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>

      <div className="mb-4">
        <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
          Twinalyze Dashboard Tour
        </p>
        <h2 className="mt-1 text-2xl font-bold text-zinc-950 dark:text-white">
          Explore the dashboard step by step
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Select any section from the left side and use Next to view each screen.
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <aside className="flex gap-2 overflow-x-auto rounded-2xl border border-zinc-200 bg-zinc-50 p-2 dark:border-zinc-800 dark:bg-zinc-900 md:w-64 md:flex-col md:overflow-visible">
          {sections.map((section, index) => {
            const isActive = index === activeSectionIndex;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => openSection(index)}
                className="flex min-w-max items-center justify-between gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition md:min-w-0"
                style={{
                  backgroundColor: isActive ? primaryColor : "transparent",
                  color: isActive ? "#ffffff" : "inherit",
                }}
              >
                <span className="flex items-center gap-3">
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-sm"
                    style={{
                      backgroundColor: isActive
                        ? "rgba(255,255,255,0.18)"
                        : "rgba(113,113,122,0.12)",
                    }}
                  >
                    {section.icon}
                  </span>
                  <span>{section.title}</span>
                </span>

                <span style={{ opacity: isActive ? 1 : 0.5 }}>›</span>
              </button>
            );
          })}
        </aside>

        <section className="min-w-0 flex-1">
          <div className="mb-3 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold" style={{ color: primaryColor }}>
                {activeSection?.title}
              </p>
              <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                {activeImage?.title}
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {activeImage?.caption}
              </p>
            </div>

            <div className="rounded-full border border-zinc-200 px-3 py-1 text-sm font-medium text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
              {activeImageIndex + 1} / {images.length}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
            {activeImage && (
              <img
                key={`${activeSection.id}-${activeImageIndex}`}
                src={activeImage.src}
                alt={activeImage.title}
                className="w-full object-contain"
                style={{
                  maxHeight: height,
                  animation: "twTourSlide 280ms ease",
                }}
              />
            )}

            <button
              type="button"
              onClick={goPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-900 shadow-lg transition hover:scale-105 dark:bg-zinc-950 dark:text-white"
            >
              ‹ Prev
            </button>

            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
              style={{ backgroundColor: primaryColor }}
            >
              Next ›
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {images.map((image, index) => {
              const isActive = index === activeImageIndex;

              return (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  className="h-2.5 rounded-full transition"
                  style={{
                    width: isActive ? "32px" : "10px",
                    backgroundColor: isActive ? primaryColor : "#d4d4d8",
                  }}
                  aria-label={`Open screenshot ${index + 1}`}
                />
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};