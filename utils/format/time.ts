export function formatMessageTime(timestamp: number | string, trans: any) {
  if (typeof trans !== "function") return "...";

  let ts: number;

  // ----------------------------------------
  // Parse timestamp (ISO string or number)
  // ----------------------------------------
  if (typeof timestamp === "string" && isNaN(Number(timestamp))) {
    // ISO string
    const parsed = new Date(timestamp).getTime();
    if (!parsed || isNaN(parsed)) return "";
    ts = parsed;
  } else {
    // Number or numeric string
    ts = Number(timestamp);
    if (!ts || isNaN(ts)) return "";

    // Convert seconds → ms
    if (ts.toString().length === 10) ts *= 1000;
  }

  const now = Date.now();
  let diffMs = now - ts;

  // ----------------------------------------
  // FIX: prevent empty result for future time
  // ----------------------------------------
  if (diffMs < 0) diffMs = 0; // clamp to zero

  const seconds = Math.floor(diffMs / 1000);

  // Just now (0–5s)
  if (seconds < 5) {
    return trans("justNow") || "Just now";
  }

  if (seconds < 60) {
    return trans(seconds === 1 ? "secondAgo" : "secondsAgo", {
      count: seconds,
    });
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return trans(minutes === 1 ? "minuteAgo" : "minutesAgo", {
      count: minutes,
    });
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return trans(hours === 1 ? "hourAgo" : "hoursAgo", { count: hours });
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return trans(days === 1 ? "dayAgo" : "daysAgo", { count: days });
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return trans(months === 1 ? "monthAgo" : "monthsAgo", {
      count: months,
    });
  }

  const years = Math.floor(months / 12);
  return trans(years === 1 ? "yearAgo" : "yearsAgo", { count: years });
}

// Placeholder for translation hook if not provided in context
// In a real app, you'd import your actual useGetTranslation hook
const useGetTranslation = () => {
  const translations: { [key: string]: string } = {
    January: "January",
    February: "February",
    March: "March",
    April: "April",
    May: "May",
    June: "June",
    July: "July",
    August: "August",
    September: "September",
    October: "October",
    November: "November",
    December: "December",
  };
  return (key: string) => translations[key] || key;
};

export function formatDate(
  timestamp: string | number,
  trans: ReturnType<typeof useGetTranslation>
): [string, string] {
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  const monthNames = [
    trans("January"),
    trans("February"),
    trans("March"),
    trans("April"),
    trans("May"),
    trans("June"),
    trans("July"),
    trans("August"),
    trans("September"),
    trans("October"),
    trans("November"),
    trans("December"),
  ];
  const month = monthNames[date.getMonth()];

  return [day, `${month} ${year}`];
}
