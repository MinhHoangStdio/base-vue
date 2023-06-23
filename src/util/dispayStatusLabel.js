export const displayStatusLabel = (title) => {
  switch (title) {
    case "created":
      return "Todo";
    case "in_progress":
      return "In Progress";
    case "done":
      return "Done";
    case "close":
      return "Close";
    default:
      break;
  }
};
