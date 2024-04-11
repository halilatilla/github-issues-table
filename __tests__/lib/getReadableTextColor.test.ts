import { getReadableTextColor } from '@/lib/utils';

describe('getReadableTextColor', () => {
  // Test case for a light background color
  it('returns black for light background colors', () => {
    const lightBackgroundColor = 'F6F8FA'; // Light gray, for example
    const textColor = getReadableTextColor(lightBackgroundColor);
    expect(textColor).toBe('black');
  });

  // Test case for a dark background color
  it('returns white for dark background colors', () => {
    const darkBackgroundColor = '0D1117'; // Dark gray, for example
    const textColor = getReadableTextColor(darkBackgroundColor);
    expect(textColor).toBe('white');
  });

  // You could add more test cases here to cover edge cases or other scenarios
  // For example, testing the boundaries of the YIQ threshold
  it('returns black for exactly mid-range YIQ', () => {
    // This is a color with an exact YIQ of 128, which is the boundary condition.
    // Depending on how you handle edge cases, this might need to be adjusted.
    const midBackgroundColor = '808080'; // A mid-gray, for example
    const textColor = getReadableTextColor(midBackgroundColor);
    expect(textColor).toBe('black'); // Assuming inclusive comparison (>= 128)
  });
});
