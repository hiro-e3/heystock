import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const numberFormatter = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
});


/**
 * Generates a sequence of numbers from the specified start (inclusive) to end (exclusive).
 *
 * @param start - The beginning number of the sequence.
 * @param end - The number at which to stop generating the sequence (exclusive).
 * @yields A number in the range from start to end.
 */
export function* range(start: number, end: number) {
  for (let i = start; i < end; i++) {
    yield i;
  }
}

export function calcPagination(
  currentPage: number,
  lastPage: number,
  maxPages: number = 5
) {
  const offset = Math.floor(maxPages / 2);

  let start = currentPage - offset;
  let end = currentPage + offset;

  if (lastPage <= maxPages) {
    start = 1;
    end = lastPage;
  } else {
    if (start < 1) {
      start = 1;
      end = start + maxPages - 1;
    } else if (end > lastPage) {
      end = lastPage;
      start = end - maxPages + 1;
    }
  }

  return [...range(start, end + 1)];
}