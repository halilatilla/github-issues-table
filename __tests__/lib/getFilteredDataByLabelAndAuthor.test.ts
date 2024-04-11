import { getFilteredDataByLabelAndAuthor } from '@/lib/utils';

describe('getFilteredDataByLabelAndAuthor', () => {
  const issues: any = [
    { labels: [{ name: 'bug' }, { name: 'urgent' }], user: { login: 'user1' } },
    { labels: [{ name: 'feature' }], user: { login: 'user2' } },
    { labels: [{ name: 'bug' }], user: { login: 'user3' } }
  ];

  test('filters by label only', () => {
    const filters = { label: 'bug' };
    const result = getFilteredDataByLabelAndAuthor(issues, filters);
    expect(result.length).toBe(2);
    expect(result).toEqual(expect.arrayContaining([issues[0], issues[2]]));
  });

  test('filters by author only', () => {
    const filters = { author: 'user2' };
    const result = getFilteredDataByLabelAndAuthor(issues, filters);
    expect(result.length).toBe(1);
    expect(result[0]).toEqual(issues[1]);
  });

  test('filters by both label and author', () => {
    const filters = { label: 'bug', author: 'user3' };
    const result = getFilteredDataByLabelAndAuthor(issues, filters);
    expect(result.length).toBe(1);
    expect(result[0]).toEqual(issues[2]);
  });

  test('applies no filters when none are provided', () => {
    const filters = {};
    const result = getFilteredDataByLabelAndAuthor(issues, filters);
    expect(result.length).toBe(3);
    expect(result).toEqual(issues);
  });

  test('returns no results when no matches are found', () => {
    const filters = { label: 'nonexistent', author: 'unknown' };
    const result = getFilteredDataByLabelAndAuthor(issues, filters);
    expect(result.length).toBe(0);
  });
});
