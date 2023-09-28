import { parseISO } from 'date-fns';
import format from 'date-fns/format';

// ex: Jul 30, 2023
// ex: 13:00
export const convertDateTime = (dateTimeStr: string) => {
  const dateTime = parseISO(dateTimeStr);
  const formattedDate = format(dateTime, 'LLL dd, yyyy');
  const formattedTime = format(dateTime, 'HH:mm');
  return { date: formattedDate, time: formattedTime };
};

export const timestampToDate = (timeStamp: number) => {
  const dateObject = new Date(timeStamp * 1000);

  // Format the Date object in "YYYY-MM-DD" format
  const formattedDate = format(dateObject, 'yyyy-MM-dd');

  return formattedDate;
};
