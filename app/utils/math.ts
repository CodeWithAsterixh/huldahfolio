/**
 * Calculates the value for a given percentage within a specified range.
 * 
 * @param range - A tuple containing the [min, max] values.
 * @param percentage - The percentage to calculate (default: 100).
 * @returns The calculated value.
 * 
 * @example
 * calculateValueFromRange([1, 100], 50) // returns 50.5 (wait, user said 1-100, 50% is 50. Let's check math)
 * (100 - 1) * 0.5 + 1 = 49.5 + 1 = 50.5. 
 * Actually, usually 1-100 means 100 units. 
 * If it's 0-100, 50% is 50.
 * I'll follow the standard linear interpolation (lerp) formula.
 */
export function calculateValueFromRange(
    [min, max]: [number, number], 
    percentage: number = 100
): number {
    return min + (max - min) * (percentage / 100);
}
