import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { IFiltersState, TIssue } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getReadableTextColor(backgroundColor: string) {
  const r = parseInt(backgroundColor.slice(0, 2), 16);
  const g = parseInt(backgroundColor.slice(2, 4), 16);
  const b = parseInt(backgroundColor.slice(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'black' : 'white';
}

export function timeSince(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000; // 365 * 24 * 60 * 60

  if (interval > 1) {
    return Math.floor(interval) + ' years ago';
  }
  interval = seconds / 2592000; // 30 * 24 * 60 * 60
  if (interval > 1) {
    return Math.floor(interval) + ' months ago';
  }
  interval = seconds / 86400; // 24 * 60 * 60
  if (interval >= 2) {
    return Math.floor(interval) + ' days ago';
  }
  if (interval >= 1) {
    return 'yesterday';
  }
  interval = seconds / 3600; // 60 * 60
  if (interval >= 1) {
    return Math.floor(interval) + ' hours ago';
  }
  interval = seconds / 60;
  if (interval >= 1) {
    return Math.floor(interval) + ' minutes ago';
  }
  return 'just now'; // For anything less than a minute
}

export function getFilteredDataByLabelAndAuthor(
  data: TIssue[],
  filters: IFiltersState
) {
  return data.filter(item => {
    const labelMatch = filters.label
      ? item.labels.some(label => label.name === filters.label)
      : true;
    const authorMatch = filters.author
      ? item.user.login === filters.author
      : true;
    return labelMatch && authorMatch;
  });
}
