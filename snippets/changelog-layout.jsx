const getCategoryClass = (category = "") => {
  return category
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

export const ChangelogLayout = ({ entries = [] }) => {
  const [activeId, setActiveId] = useState(entries[0]?.id || "");

  const entryRefs = useRef({});
  const navigationRefs = useRef({});
  const animationFrameRef = useRef(null);

  const years = Array.from(
    new Set(entries.map((entry) => entry.year))
  );

  useEffect(() => {
    const updateActiveEntry = () => {
      animationFrameRef.current = null;

      if (!entries.length) return;

      /*
       * A feed remains active until its bottom has moved
       * completely above this line.
       *
       * This accounts for the sticky Mintlify navbar.
       */
      const topBoundary = 96;

      let nextActiveId =
        entries[entries.length - 1]?.id || "";

      for (const entry of entries) {
        const element = entryRefs.current[entry.id];

        if (!element) continue;

        const rectangle = element.getBoundingClientRect();

        /*
         * This is the first feed that has not completely
         * disappeared above the screen.
         */
        if (rectangle.bottom > topBoundary) {
          nextActiveId = entry.id;
          break;
        }
      }

      setActiveId((currentId) =>
        currentId === nextActiveId
          ? currentId
          : nextActiveId
      );
    };

    const scheduleUpdate = () => {
      if (animationFrameRef.current !== null) return;

      animationFrameRef.current =
        window.requestAnimationFrame(updateActiveEntry);
    };

    scheduleUpdate();

    window.addEventListener("scroll", scheduleUpdate, {
      passive: true,
    });

    window.addEventListener("resize", scheduleUpdate, {
      passive: true,
    });

    const initialTimer = window.setTimeout(
      scheduleUpdate,
      250
    );

    return () => {
      window.removeEventListener(
        "scroll",
        scheduleUpdate
      );

      window.removeEventListener(
        "resize",
        scheduleUpdate
      );

      window.clearTimeout(initialTimer);

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(
          animationFrameRef.current
        );
      }
    };
  }, [entries]);

  useEffect(() => {
    const activeNavigationItem =
      navigationRefs.current[activeId];

    if (!activeNavigationItem) return;

    activeNavigationItem.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [activeId]);

  const scrollToEntry = (entryId) => {
    const element = entryRefs.current[entryId];

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.history.replaceState(
      null,
      "",
      `#${entryId}`
    );
  };

  return (
    <div className="tw-changelog-layout">
      <main className="tw-changelog-main">
        {years.map((year) => {
          const yearEntries = entries.filter(
            (entry) => entry.year === year
          );

          return (
            <section
              key={year}
              className="tw-changelog-year"
              aria-labelledby={`changelog-year-${year}`}
            >
              <h2
                id={`changelog-year-${year}`}
                className="tw-changelog-year-title"
              >
                {year}
              </h2>

              {yearEntries.map((entry) => (
                <article
                  key={entry.id}
                  id={entry.id}
                  ref={(element) => {
                    if (element) {
                      entryRefs.current[entry.id] =
                        element;
                    } else {
                      delete entryRefs.current[
                        entry.id
                      ];
                    }
                  }}
                  className="tw-changelog-entry"
                >
                  <div className="tw-changelog-entry-meta">
                    <time
                      className="tw-changelog-date"
                      dateTime={entry.isoDate}
                    >
                      {entry.date}
                    </time>

                    <span className="tw-changelog-area">
                      {entry.area}
                    </span>
                  </div>

                  <div className="tw-changelog-entry-content">
                    <span
                      className={`tw-changelog-category tw-changelog-category-${getCategoryClass(
                        entry.category
                      )}`}
                    >
                      {entry.category}
                    </span>

                    <h3 className="tw-changelog-entry-title">
                      {entry.title}
                    </h3>

                    <p className="tw-changelog-summary">
                      {entry.summary}
                    </p>

                    <p className="tw-changelog-release-type">
                      <strong>Release type:</strong>{" "}
                      {entry.releaseType}
                    </p>

                    <ul className="tw-changelog-points">
                      {entry.points.map(
                        (point, index) => (
                          <li key={`${entry.id}-${index}`}>
                            <strong>
                              {point.title}:
                            </strong>{" "}
                            {point.description}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </article>
              ))}
            </section>
          );
        })}
      </main>

      <aside
        className="tw-changelog-navigation"
        aria-label="Changelog navigation"
      >
        <div className="tw-changelog-navigation-title">
          On this page
        </div>

        <div className="tw-changelog-navigation-scroll">
          {years.map((year) => {
            const yearEntries = entries.filter(
              (entry) => entry.year === year
            );

            return (
              <div
                key={year}
                className="tw-changelog-navigation-year"
              >
                <div className="tw-changelog-navigation-year-label">
                  {year}
                </div>

                {yearEntries.map((entry) => {
                  const isActive =
                    activeId === entry.id;

                  return (
                    <button
                      key={entry.id}
                      ref={(element) => {
                        if (element) {
                          navigationRefs.current[
                            entry.id
                          ] = element;
                        } else {
                          delete navigationRefs.current[
                            entry.id
                          ];
                        }
                      }}
                      type="button"
                      className={`tw-changelog-navigation-item ${
                        isActive
                          ? "is-active"
                          : ""
                      }`}
                      aria-current={
                        isActive
                          ? "true"
                          : undefined
                      }
                      onClick={() =>
                        scrollToEntry(entry.id)
                      }
                    >
                      <span className="tw-changelog-navigation-dot" />

                      <span>{entry.date}</span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
};