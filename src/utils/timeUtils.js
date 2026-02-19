export const parseDurationToMinutes = (durationStr) => {
    if (!durationStr) return 0;

    let totalMinutes = 0;

    // Check for hours
    const hoursMatch = durationStr.match(/(\d+)h/);
    if (hoursMatch) {
        totalMinutes += parseInt(hoursMatch[1]) * 60;
    }

    // Check for minutes
    const minutesMatch = durationStr.match(/(\d+)m/);
    if (minutesMatch) {
        totalMinutes += parseInt(minutesMatch[1]);
    }

    // Check for seconds (optional, adding as fraction of minute)
    const secondsMatch = durationStr.match(/(\d+)s/);
    if (secondsMatch) {
        totalMinutes += parseInt(secondsMatch[1]) / 60;
    }

    return totalMinutes;
};
