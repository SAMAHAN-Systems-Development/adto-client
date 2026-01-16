"use client";

import { useEffect, useRef, useState } from "react";

type Announcement = {
  id: string;
  title: string;
  body: string;
  updatedAt: string;
};

type EventAnnouncementsProps = {
  announcements: Announcement[];
};

function formatUpdatedAt(isoString: string) {
  const d = new Date(isoString);

  return d.toLocaleString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function useIsTruncated(text: string, deps: unknown[] = []) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      // Compare rendered height vs scroll height
      // When clamped, scrollHeight becomes bigger than clientHeight
      setIsTruncated(el.scrollHeight > el.clientHeight + 1);
    };

    // Measure after paint
    const raf = requestAnimationFrame(measure);

    // Responsive re-measure
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, ...deps]);

  return { ref, isTruncated };
}

function AnnouncementRow({ a, isLast }: { a: Announcement; isLast: boolean }) {
  const [expanded, setExpanded] = useState(false);

  // When expanded changes, we want to re-check truncation (deps includes expanded)
  const { ref, isTruncated } = useIsTruncated(a.body, [expanded]);

  const showToggle = !expanded && isTruncated;

  return (
    <div className="py-8">
      {/* top row: title + updated */}
      <div className="flex items-start justify-between gap-6">
        <h3 className="text-xl font-bold text-gray-900">{a.title}</h3>

        <p className="shrink-0 text-sm text-gray-400">
          Updated at {formatUpdatedAt(a.updatedAt)}
        </p>
      </div>

      {/* body */}
      <div className="mt-4">
        <p
          ref={ref}
          className={[
            "text-base leading-relaxed text-gray-500 overflow-hidden",
            // IMPORTANT: no "block" here, to avoid display conflict warnings
            expanded
              ? "overflow-visible [display:block]"
              : "[display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]",
          ].join(" ")}
        >
          {a.body}
        </p>

        {/* CTA area: uniform height when collapsed */}
        <div className="mt-2 h-6">
          {expanded ? (
            <button
              type="button"
              className="font-semibold text-gray-700 hover:text-gray-900"
              onClick={() => setExpanded(false)}
            >
              See less
            </button>
          ) : (
            <button
              type="button"
              className={`font-semibold text-gray-700 hover:text-gray-900 ${
                showToggle ? "visible" : "invisible"
              }`}
              onClick={() => setExpanded(true)}
            >
              See more...
            </button>
          )}
        </div>
      </div>

      {/* divider */}
      {!isLast && <div className="mt-8 border-b border-gray-200" />}
    </div>
  );
}

export default function EventAnnouncements({ announcements }: EventAnnouncementsProps) {
  return (
    <div className="mt-10">
      {announcements.map((a, idx) => (
        <AnnouncementRow
          key={a.id}
          a={a}
          isLast={idx === announcements.length - 1}
        />
      ))}
    </div>
  );
}
