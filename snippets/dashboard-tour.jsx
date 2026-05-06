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
          src: "/images/Dashboard/Dashboard.PNG",
          title: "Realtime Users",
          caption:
            "Track users who are currently active on your website or app.",
        },
        {
          src: "/images/Dashboard/Dashboard.PNG",
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
          caption:
            "Review your product performance from a single overview screen.",
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
          caption:
            "Open user profiles and understand individual user activity.",
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

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeSection = sections[activeSectionIndex];
  const images = activeSection.images;
  const activeImage = images[activeImageIndex];

  const openSection = (index) => {
    setActiveSectionIndex(index);
    setActiveImageIndex(0);
  };

  const goNext = () => {
    if (activeImageIndex < images.length - 1) {
      setActiveImageIndex(activeImageIndex + 1);
    } else {
      const nextSectionIndex =
        activeSectionIndex + 1 >= sections.length ? 0 : activeSectionIndex + 1;
      setActiveSectionIndex(nextSectionIndex);
      setActiveImageIndex(0);
    }
  };

  const goPrevious = () => {
    if (activeImageIndex > 0) {
      setActiveImageIndex(activeImageIndex - 1);
    } else {
      const previousSectionIndex =
        activeSectionIndex === 0 ? sections.length - 1 : activeSectionIndex - 1;
      const previousImages = sections[previousSectionIndex].images;

      setActiveSectionIndex(previousSectionIndex);
      setActiveImageIndex(previousImages.length - 1);
    }
  };

  return (
    <div className="not-prose w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <p className="text-sm font-semibold text-gray-500">
          Twinalyze Dashboard Tour
        </p>

        <h2 className="mt-1 text-2xl font-bold text-gray-950">
          Explore the dashboard step by step
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Select any dashboard section and use Next to view each screenshot.
        </p>
      </div>

      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex gap-2 overflow-x-auto rounded-2xl border border-gray-200 bg-gray-50 p-2 lg:w-64 lg:flex-col lg:overflow-visible">
          {sections.map((section, index) => {
            const isActive = index === activeSectionIndex;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => openSection(index)}
                className="flex min-w-max items-center justify-between gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition lg:min-w-0"
                style={{
                  backgroundColor: isActive ? "#2563EB" : "transparent",
                  color: isActive ? "#ffffff" : "#374151",
                }}
              >
                <span className="flex items-center gap-3">
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-sm"
                    style={{
                      backgroundColor: isActive
                        ? "rgba(255,255,255,0.18)"
                        : "rgba(107,114,128,0.12)",
                    }}
                  >
                    {section.icon}
                  </span>

                  <span>{section.title}</span>
                </span>

                <span style={{ opacity: isActive ? 1 : 0.45 }}>›</span>
              </button>
            );
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

              <p className="mt-1 text-sm text-gray-600">
                {activeImage.caption}
              </p>
            </div>

            <div className="w-fit rounded-full border border-gray-200 px-3 py-1 text-sm font-medium text-gray-600">
              {activeImageIndex + 1} / {images.length}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
            <img
              key={activeImage.src}
              src={activeImage.src}
              alt={activeImage.title}
              className="w-full object-contain"
              style={{
                maxHeight: "520px",
              }}
            />

            <button
              type="button"
              onClick={goPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-lg transition hover:scale-105"
            >
              ‹ Prev
            </button>

            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
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
                    backgroundColor: isActive ? "#2563EB" : "#D1D5DB",
                  }}
                  aria-label={`Open screenshot ${index + 1}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
