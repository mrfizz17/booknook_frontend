import { differenceInHours, format, formatDistance, isAfter } from "date-fns";

export const BORROW_DAYS = 5;

// Kept outside components so the current time is read once per request.
export function getCurrentTime(): number {
  return Date.now();
}

type BorrowDates = {
  borrowDate?: string | Date | null;
  returnDate?: string | Date | null;
};

export type BorrowStatus = "overdue" | "due-soon" | "on-time" | "unknown";

export function toDate(value?: string | Date | null): Date | null {
  if (!value) return null;

  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function getBorrowDates(book: BorrowDates) {
  return {
    borrowedAt: toDate(book.borrowDate),
    dueAt: toDate(book.returnDate),
  };
}

export function getBorrowStatus(book: BorrowDates, now: number): BorrowStatus {
  const { dueAt } = getBorrowDates(book);

  if (!dueAt) return "unknown";
  if (isAfter(now, dueAt)) return "overdue";
  if (differenceInHours(dueAt, now) <= 24) return "due-soon";

  return "on-time";
}

export function formatBorrowDate(date: Date | null): string {
  return date ? format(date, "MMM d, yyyy") : "—";
}

export function formatDueDistance(dueAt: Date, now: number): string {
  return formatDistance(dueAt, now, { addSuffix: true });
}

export function formatOverdueDistance(dueAt: Date, now: number): string {
  return formatDistance(dueAt, now);
}
