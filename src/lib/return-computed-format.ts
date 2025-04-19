export const returnComputedFormat = (format: string) => {
  switch (format) {
    case "bassboosted":
      return "BassBoosted";
    case "nightcore":
      return "Nightcore";
    case "slowedreverb":
      return "SlowedReverb";
    default:
      return "Lyrics";
  }
};
