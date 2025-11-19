// // A simple utility to format message time for React Native
// export function formatMessageTime(
//   timestamp: number | string,
//   trans: any
// ): string {
//   // const date = new Date(timestamp);
//   // const now = new Date();

//   // const diffTime = Math.abs(now.getTime() - date.getTime());
//   // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//   // const diffMonths = Math.ceil(diffDays / 30);

//   // if (diffDays <= 1) {
//   //   return "Today";
//   // } else if (diffDays <= 7) {
//   //   return `${diffDays} days ago`;
//   // } else if (diffMonths < 12) {
//   //   return `${diffMonths} months ago`;
//   // } else {
//   //   return date.toLocaleDateString(); // Fallback for older messages
//   // }

//   if (typeof trans !== "function") {
//     return "...";
//   }

//   let time;

//   const parsedTimestamp = new Date(timestamp);
//   const currentTime = new Date();
//   const timeDifference = currentTime.getTime() - parsedTimestamp.getTime();

//   const seconds = Math.floor(timeDifference / 1000);
//   if (seconds < 60) {
//     if (seconds === 1) {
//       time = trans("secondAgo", { count: seconds });
//     } else {
//       time = trans("secondsAgo", { count: seconds });
//     }
//     return time;
//   }

//   const minutes = Math.floor(timeDifference / (1000 * 60));
//   if (minutes < 60) {
//     if (minutes === 1) {
//       time = trans("minuteAgo", { count: minutes });
//     } else {
//       time = trans("minutesAgo", { count: minutes });
//     }
//     return time;
//   }

//   const hours = Math.floor(timeDifference / (1000 * 60 * 60));
//   if (hours < 24) {
//     if (hours === 1) {
//       time = trans("hourAgo", { count: hours });
//     } else {
//       time = trans("hoursAgo", { count: hours });
//     }
//     return time;
//   }

//   const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//   if (days < 30) {
//     if (days === 1) {
//       time = trans("dayAgo", { count: days });
//     } else {
//       time = trans("daysAgo", { count: days });
//     }
//     return time;
//   }

//   const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
//   if (months < 12) {
//     if (months === 1) {
//       time = trans("monthAgo", { count: months });
//     } else {
//       time = trans("monthsAgo", { count: months });
//     }
//     return time;
//   }

//   const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));
//   if (years === 1) {
//     time = trans("yearAgo", { count: years });
//   } else {
//     time = trans("yearsAgo", { count: years });
//   }

//   return time;
// }

export function formatMessageTime(timestamp: number | string, trans: any) {
  if (typeof trans !== "function") return "...";

  let ts: number;

  // Handle ISO string
  if (typeof timestamp === "string" && isNaN(Number(timestamp))) {
    const parsed = new Date(timestamp).getTime();
    if (!parsed || isNaN(parsed)) return "";
    ts = parsed;
  } else {
    // Handle number or numeric string
    ts = Number(timestamp);
    if (!ts || isNaN(ts)) return "";
    if (ts.toString().length === 10) ts *= 1000; // seconds → ms
  }

  const now = Date.now();
  const diffMs = now - ts;
  if (diffMs < 0) return "";

  const seconds = Math.floor(diffMs / 1000);

  // -------------------------
  // FIX: prevent "0 seconds ago"
  // -------------------------
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
    return trans(months === 1 ? "monthAgo" : "monthsAgo", { count: months });
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
