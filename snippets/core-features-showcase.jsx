export const CoreFeaturesShowcase = () => {
  const quickStats = [
    {
      value: "Live",
      label: "User activity",
      text: "Monitor active users, sessions, and screen views in real time.",
    },
    {
      value: "360°",
      label: "User behavior",
      text: "Understand events, journeys, engagement, and product usage.",
    },
    {
      value: "1 place",
      label: "Analytics + automation",
      text: "Analyze, segment, notify, and optimize from one platform.",
    },
  ];

  const navItems = [
    ["Real-Time Analytics", "#real-time-analytics"],
    ["User & Event Tracking", "#user-event-tracking"],
    ["Ads Analytics", "#ads-analytics"],
    ["Push Automation", "#push-automation"],
    ["Funnels & Reports", "#funnels-reports"],
  ];

  const sections = [
    {
      id: "real-time-analytics",
      tag: "Real-time visibility",
      title: "Real-Time Analytics",
      subtitle:
        "See what is happening inside your app or website as users interact with it.",
      icon: "📊",
      accent: "blue",
      points: [
        "Live users",
        "Active sessions",
        "Screen views",
        "Real-time dashboards",
      ],
      result:
        "Use this to monitor product activity, campaign impact, sudden traffic changes, and live user behavior.",
      cards: [
        {
          title: "Live Users",
          text: "Know how many users are active right now.",
        },
        {
          title: "Sessions",
          text: "Track how often users open and use your product.",
        },
        {
          title: "Screen Views",
          text: "Understand which screens or pages users visit most.",
        },
        {
          title: "Dashboards",
          text: "View important metrics in a real-time dashboard.",
        },
      ],
    },
    {
      id: "user-event-tracking",
      tag: "Behavior tracking",
      title: "User & Event Tracking",
      subtitle:
        "Track every important user action and understand the complete user journey.",
      icon: "🧭",
      accent: "purple",
      points: [
        "Automatic event tracking",
        "User journeys",
        "Screen tracking",
        "Custom events",
        "Engagement insights",
      ],
      result:
        "Use this to understand what users do, where they drop, and which actions lead to conversion.",
      cards: [
        {
          title: "Auto Tracking",
          text: "Capture common actions without manual event setup.",
        },
        {
          title: "User Journeys",
          text: "See how users move from one step to another.",
        },
        {
          title: "Screen Tracking",
          text: "Track app screens, web pages, and navigation flow.",
        },
        {
          title: "Custom Events",
          text: "Track actions like add to cart, payment failed, signup, or purchase.",
        },
      ],
    },
    {
      id: "ads-analytics",
      tag: "Ad performance",
      title: "Ads Analytics",
      subtitle:
        "Measure ad impressions, clicks, revenue, failures, and overall ad performance.",
      icon: "💰",
      accent: "green",
      points: [
        "Impressions",
        "Clicks",
        "Revenue",
        "Failures",
        "Ad performance optimization",
      ],
      result:
        "Use this to improve ad revenue, reduce failed ad loads, and understand ad engagement.",
      cards: [
        {
          title: "Impressions",
          text: "Track how many times ads are shown.",
        },
        {
          title: "Clicks",
          text: "Measure user interaction with ads.",
        },
        {
          title: "Revenue",
          text: "Monitor revenue generated from ads.",
        },
        {
          title: "Failures",
          text: "Detect ad load failures and missed revenue opportunities.",
        },
      ],
    },
    {
      id: "push-automation",
      tag: "Engagement engine",
      title: "Push Notifications & Automation",
      subtitle:
        "Send the right message to the right users at the right time.",
      icon: "🔔",
      accent: "orange",
      points: [
        "Scheduled notifications",
        "Multilingual campaigns",
        "Automated messaging",
        "Engagement tracking",
      ],
      result:
        "Use this to re-engage users, run campaigns, automate messaging, and measure notification performance.",
      cards: [
        {
          title: "Scheduled Campaigns",
          text: "Send notifications at a specific date and time.",
        },
        {
          title: "Multilingual Campaigns",
          text: "Create campaigns for different languages and regions.",
        },
        {
          title: "Automation",
          text: "Trigger messages based on user behavior or rules.",
        },
        {
          title: "Engagement Tracking",
          text: "Track delivery, opens, clicks, and campaign results.",
        },
      ],
    },
    {
      id: "funnels-reports",
      tag: "Growth insights",
      title: "Funnels, Retention & Reports",
      subtitle:
        "Analyze conversion, repeat usage, cohorts, custom reports, and user segments.",
      icon: "📈",
      accent: "pink",
      points: [
        "Conversion funnels",
        "Retention analytics",
        "Cohort analysis",
        "Custom reports",
        "Segmentation",
      ],
      result:
        "Use this to find drop-off points, measure retention, compare cohorts, and make better product decisions.",
      cards: [
        {
          title: "Funnels",
          text: "See where users convert or drop off.",
        },
        {
          title: "Retention",
          text: "Measure how often users return after first use.",
        },
        {
          title: "Cohorts",
          text: "Group users by date, behavior, or action.",
        },
        {
          title: "Reports",
          text: "Build custom reports using events, users, countries, platforms, and campaigns.",
        },
      ],
    },
  ];

  return (
    <div className="tw-core-page">
      <section className="tw-core-hero">
        <div className="tw-core-hero-glow" />

        <div className="tw-core-kicker">
          <span>Twinalyze Core Features</span>
        </div>

        <h1>Understand users. Track events. Improve growth.</h1>

        <p className="tw-core-hero-subtitle">
          Twinalyze brings real-time analytics, user tracking, ads analytics,
          push automation, funnels, retention, and reports into one powerful
          analytics platform.
        </p>

        <div className="tw-core-actions">
          <a href="#real-time-analytics" className="tw-core-primary-btn">
            Explore features
          </a>
          <a href="#how-it-works" className="tw-core-secondary-btn">
            How it works
          </a>
        </div>

        <div className="tw-core-stats">
          {quickStats.map((item) => (
            <div className="tw-core-stat-card" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="tw-feature-nav">
        {navItems.map(([label, href]) => (
          <a href={href} key={label}>
            {label}
          </a>
        ))}
      </div>

      <section className="tw-platform-summary">
        <div>
          <span className="tw-section-label">One platform</span>
          <h2>Everything your team needs to understand and engage users</h2>
        </div>

        <p>
          From live users to custom events, ad revenue, notification campaigns,
          funnels, retention, and reports — Twinalyze gives your team a complete
          view of product performance.
        </p>
      </section>

      <section className="tw-feature-list">
        {sections.map((section, index) => (
          <article
            className={`tw-feature-section tw-accent-${section.accent}`}
            id={section.id}
            key={section.id}
          >
            <div className="tw-feature-left">
              <div className="tw-feature-index">
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>

              <div className="tw-feature-icon">{section.icon}</div>

              <span className="tw-feature-tag">{section.tag}</span>

              <h2>{section.title}</h2>

              <p className="tw-feature-subtitle">{section.subtitle}</p>

              <div className="tw-pill-list">
                {section.points.map((point) => (
                  <span key={point}>{point}</span>
                ))}
              </div>

              <div className="tw-feature-result">
                <strong>Best use:</strong>
                <p>{section.result}</p>
              </div>
            </div>

            <div className="tw-feature-grid">
              {section.cards.map((card) => (
                <div className="tw-mini-card" key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="tw-how-it-works" id="how-it-works">
        <div className="tw-how-header">
          <span className="tw-section-label">Simple flow</span>
          <h2>How Twinalyze works</h2>
          <p>
            Install the SDK, collect data, analyze behavior, engage users, and
            improve product performance.
          </p>
        </div>

        <div className="tw-steps-grid">
          <div className="tw-step-card">
            <span>01</span>
            <h3>Install SDK</h3>
            <p>Add Twinalyze SDK to your app, website, or platform.</p>
          </div>

          <div className="tw-step-card">
            <span>02</span>
            <h3>Collect data</h3>
            <p>Capture users, sessions, screens, events, ads, and engagement.</p>
          </div>

          <div className="tw-step-card">
            <span>03</span>
            <h3>Analyze insights</h3>
            <p>View real-time dashboards, journeys, funnels, and reports.</p>
          </div>

          <div className="tw-step-card">
            <span>04</span>
            <h3>Optimize growth</h3>
            <p>Improve conversion, retention, campaign performance, and revenue.</p>
          </div>
        </div>
      </section>

      <section className="tw-team-section">
        <div className="tw-team-card">
          <span>Product teams</span>
          <h3>Understand product usage</h3>
          <p>Analyze screens, events, user journeys, funnels, and engagement.</p>
        </div>

        <div className="tw-team-card">
          <span>Marketing teams</span>
          <h3>Improve campaigns</h3>
          <p>Track notifications, audience behavior, campaign engagement, and retention.</p>
        </div>

        <div className="tw-team-card">
          <span>Growth teams</span>
          <h3>Optimize conversion</h3>
          <p>Find drop-offs, build cohorts, segment users, and improve revenue.</p>
        </div>
      </section>

      <section className="tw-final-cta">
        <span>Built for modern analytics</span>
        <h2>Turn product data into clear growth decisions</h2>
        <p>
          Twinalyze helps teams understand users, measure performance, automate
          engagement, and grow with confidence.
        </p>
      </section>
    </div>
  );
};