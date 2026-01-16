import Image from "next/image";

export type TicketCardProps = {
  title: string;
  priceLabel?: string;        // e.g. "Ticket Price"
  description?: string;
  imageSrc?: string;          // URL or local path
  onDetails?: () => void;     // if you want a modal later
  detailsHref?: string;       // if you want a page route
  buttonText?: string;        // default "Details"
};

export default function TicketCard({
  title,
  priceLabel = "Ticket Price",
  description = "",
  imageSrc = "/placeholder.jpg",
  onDetails,
  detailsHref,
  buttonText = "Details",
}: TicketCardProps) {
  const ButtonContent = (
    <span className="inline-flex h-10 w-full items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700">
      {buttonText}
    </span>
  );

  return (
    <div className="w-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
      {/* Image */}
      <div className="relative h-44 w-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
          priority={false}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="mt-1 text-sm font-medium text-gray-500">{priceLabel}</p>

        {description ? (
          <p className="mt-3 line-clamp-3 text-sm text-gray-500">{description}</p>
        ) : (
          <p className="mt-3 line-clamp-3 text-sm text-gray-400">
            No description provided.
          </p>
        )}

        <div className="mt-5">
          {detailsHref ? (
            <a href={detailsHref}>{ButtonContent}</a>
          ) : (
            <button type="button" onClick={onDetails} className="w-full">
              {ButtonContent}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
