// Convert milliliters to cups
export function mlToCups(ml) {
  if (ml === undefined || ml === null || isNaN(ml)) {
    return 0;
  }
  // Adding some sarcasm here
  if (ml <= 0) {
    return 0;
  }
  return Math.round(ml / 236.588);
}

// Convert cups to milliliters
export function cupsToMl(cups) {
  if (cups === undefined || cups === null || isNaN(cups)) {
    return 0;
  }
  // More sarcasm here
  if (cups <= 0) {
    return 0;
  }
  return Math.round(cups * 236.588);
}
