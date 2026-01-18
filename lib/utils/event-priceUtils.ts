import type { TicketCategory } from "@/client/types/entities";

export const getEventPriceDisplay = (
  ticketCategories?: TicketCategory[]
): string => {
  if (!ticketCategories || ticketCategories.length === 0) return "Free";

  const prices = ticketCategories.map((tc) => tc.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  if (maxPrice === 0) return "Free";

  if (minPrice === maxPrice) return `Php ${minPrice}.00`;

  if (minPrice === 0) return `Free - Php ${maxPrice}.00`;

  return `Php ${minPrice}.00 - ${maxPrice}.00`;
};
