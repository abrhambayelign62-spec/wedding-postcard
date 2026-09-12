import { WeddingData } from '../types';

export function createGoogleCalendarUrl(wedding: WeddingData): string {
  // May 24, 2026 12:00 PM (12:00 PM or 5:00 PM Ethiopian evening reception)
  // Date: 2026-05-24T12:00:00 to 2026-05-24T23:00:00 (EAT / UTC+3)
  const startIso = '20260524T090000Z'; // 12:00 EAT is 09:00 UTC
  const endIso = '20260524T200000Z';   // 23:00 EAT is 20:00 UTC

  const title = encodeURIComponent(`${wedding.groomName} እና ${wedding.brideName} የሰርግ ስነስርዓት`);
  const details = encodeURIComponent(
    `የ${wedding.groomName} እና ${wedding.brideName} የሰርግ ግብዣ እና የእራት ፕሮግራም\nቦታ፦ ${wedding.venueName}\nቀን፦ ${wedding.weddingDateEthiopian} (${wedding.weddingDateGregorian})\n${wedding.scriptureText}`
  );
  const location = encodeURIComponent(`${wedding.venueName}, ${wedding.venueAddress}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
}

export function downloadIcsFile(wedding: WeddingData) {
  const title = `${wedding.groomName} እና ${wedding.brideName} የሰርግ ስነስርዓት`;
  const description = `የ${wedding.groomName} እና ${wedding.brideName} የጋብቻ ስነ-ስርዓትና የእራት ግብዣ። ቦታ፦ ${wedding.venueName}`;
  const location = `${wedding.venueName}, ${wedding.venueAddress}`;

  const icsData = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//YeneSerg//Habesha Wedding Invitation//AM',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:wedding-adane-bitaniya-2026@yeneserg.com',
    'DTSTAMP:20260524T090000Z',
    'DTSTART:20260524T090000Z',
    'DTEND:20260524T200000Z',
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Wedding-${wedding.groomName}-${wedding.brideName}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
