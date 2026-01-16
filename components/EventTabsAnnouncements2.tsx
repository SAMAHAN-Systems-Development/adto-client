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

export default function EventAnnouncements({
  announcements,
}: EventAnnouncementsProps) {
  return (
    <div className="mt-10">
      {announcements.map((a, idx) => (
        <div key={a.id} className="py-8">
          {/* top row: title + updated */}
          <div className="flex items-start justify-between gap-6">
            <h3 className="text-xl font-bold text-gray-900">{a.title}</h3>

            <p className="shrink-0 text-sm text-gray-400">
              Updated at {formatUpdatedAt(a.updatedAt)}
            </p>
          </div>

          {/* body + see more */}
          <p className="mt-4 text-base leading-relaxed text-gray-500">
            <span className="line-clamp-2">{a.body}</span>{" "}
            <button
              type="button"
              className="font-semibold text-gray-700 hover:text-gray-900"
              onClick={() => console.log("See more:", a.id)}
            >
              See more...
            </button>
          </p>

          {/* divider */}
          {idx !== announcements.length - 1 && (
            <div className="mt-8 border-b border-gray-200" />
          )}
        </div>
      ))}
    </div>
  );
}
