import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';
import * as chrono from 'chrono-node';

export const SYDNEY_TIMEZONE = 'Australia/Sydney';

export const formatToDateTimeLocal = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const convertToSydneyTime = (date: Date): Date => {
  return utcToZonedTime(date, SYDNEY_TIMEZONE);
};

export const convertFromSydneyTime = (date: Date): Date => {
  return zonedTimeToUtc(date, SYDNEY_TIMEZONE);
};

export const parseNaturalLanguage = (input: string): Date | null => {
  const now = new Date();
  const sydneyNow = convertToSydneyTime(now);
  
  const parsed = chrono.parseDate(input, sydneyNow, { forwardDate: true });
  
  if (!parsed) return null;
  
  return parsed;
};