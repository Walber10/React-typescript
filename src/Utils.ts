import { format } from "date-fns";
import { GOOGLE_MAPS_SEARCH_URL } from "./constants";

export function formatShiftDate(
  startDateString: string,
  endDateString: string
): string {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);
  const formattedStartDate = format(startDate, "MMM d, EEE hh:mm a");
  const formattedEndDate = format(endDate, "hh:mm a");

  return `${formattedStartDate} - ${formattedEndDate} PDT`;
}

export function openGoogleMaps(address: string) {
  const mapsUrl = `${GOOGLE_MAPS_SEARCH_URL}${encodeURIComponent(address)}`;
  window.open(mapsUrl, "_blank");
}
