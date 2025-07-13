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
