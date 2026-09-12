export interface WeddingData {
  groomName: string;
  brideName: string;
  groomFamilyTitle: string;
  brideFamilyTitle: string;
  initials: string;
  weddingDateGregorian: string; // e.g. "May 24, 2026"
  weddingDateEthiopian: string; // e.g. "ግንቦት 16/2018 ዓ.ም"
  weddingTime: string; // e.g. "ከምሽቱ 12:00 ሰዓት"
  receptionStartTime: string;
  venueName: string;
  venueAddress: string;
  venueCoordinates: {
    lat: number;
    lng: number;
  };
  mapLink: string;
  mapEmbedUrl: string;
  scriptureText: string;
  scriptureCitation: string;
  invitationNote: string;
  telegramBotUrl: string;
  contactPhone?: string;
  heroPhoto: string;
  traditionalPhoto: string;
  detailPhoto: string;
  coverPhoto?: string;
  maxGuestsAllowed: number;
}

export interface TimelineItem {
  id: string;
  time: string;
  title: string;
  subtitle?: string;
  icon: 'car' | 'utensils' | 'camera' | 'church' | 'cake' | 'music' | 'heart';
}

export interface RSVPSubmission {
  id: string;
  fullName: string;
  attending: 'yes' | 'no';
  guestCount: number;
  message: string;
  createdAt: string;
}
