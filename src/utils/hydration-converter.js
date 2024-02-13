// Convert milliliters to cups
function mlToCups(ml) {
  return Math.round(ml / 236.588);
}

// Convert cups to milliliters
function cupsToMl(cups) {
  return Math.round(cups * 236.588);
}

export { mlToCups, cupsToMl };
