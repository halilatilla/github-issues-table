import { timeSince } from '@/lib/utils';

// Mock the current date before running the tests
const CURRENT_DATE = new Date();
// Mock Date constructor to return a fixed current time
jest.useFakeTimers().setSystemTime(CURRENT_DATE);

describe('timeSince', () => {
  it('returns just now for durations less than a minute', () => {
    const dateJustNow = new Date(CURRENT_DATE.getTime() - 30 * 1000); // 30 seconds ago
    expect(timeSince(dateJustNow)).toBe('just now');
  });

  it('returns minutes ago for durations more than a minute but less than an hour', () => {
    const dateMinutesAgo = new Date(CURRENT_DATE.getTime() - 90 * 1000); // 90 seconds ago
    expect(timeSince(dateMinutesAgo)).toBe('1 minutes ago');
  });

  it('returns hours ago for durations more than an hour but less than a day', () => {
    const dateHoursAgo = new Date(CURRENT_DATE.getTime() - 2 * 3600 * 1000); // 2 hours ago
    expect(timeSince(dateHoursAgo)).toBe('2 hours ago');
  });

  it('returns yesterday for durations more than a day but less than 2 days', () => {
    const dateYesterday = new Date(CURRENT_DATE.getTime() - 25 * 3600 * 1000); // 25 hours ago
    expect(timeSince(dateYesterday)).toBe('yesterday');
  });

  it('returns days ago for durations more than 2 days but less than a month', () => {
    const dateDaysAgo = new Date(CURRENT_DATE.getTime() - 3 * 86400 * 1000); // 3 days ago
    expect(timeSince(dateDaysAgo)).toBe('3 days ago');
  });

  it('returns months ago for durations more than a month but less than a year', () => {
    const dateMonthsAgo = new Date(CURRENT_DATE.getTime() - 40 * 86400 * 1000); // 40 days ago, roughly a month and a bit
    expect(timeSince(dateMonthsAgo)).toBe('1 months ago');
  });

  it('returns years ago for durations more than a year', () => {
    const dateYearsAgo = new Date(CURRENT_DATE.getTime() - 370 * 86400 * 1000); // 370 days ago, more than a year
    expect(timeSince(dateYearsAgo)).toBe('1 years ago');
  });
});
