// A simple utility to format message time for React Native
export function formatMessageTime(timestamp: number | string): string {
  const date = new Date(timestamp);
  const now = new Date();

  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.ceil(diffDays / 30);

  if (diffDays <= 1) {
    return "Today";
  } else if (diffDays <= 7) {
    return `${diffDays} days ago`;
  } else if (diffMonths < 12) {
    return `${diffMonths} months ago`;
  } else {
    return date.toLocaleDateString(); // Fallback for older messages
  }
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
