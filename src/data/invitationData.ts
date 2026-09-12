import { WeddingData, TimelineItem } from '../types';
import heroImg from '../assets/images/wedding_couple_hero_1789230334723.jpg';
import kabaImg from '../assets/images/wedding_couple_kaba_1789230349780.jpg';
import ringsImg from '../assets/images/wedding_rings_hands_1789230368181.jpg';
import coverImg from '../assets/images/wedding_cover_white_bg_1789232910132.jpg';

export const DEFAULT_WEDDING_DATA: WeddingData = {
  groomName: 'አዳነ',
  brideName: 'ቢታንያ',
  groomFamilyTitle: 'የአቶ አዳነ አረጋ',
  brideFamilyTitle: 'የወ/ሪት ቢታንያ መስፍን',
  initials: 'AB',
  weddingDateGregorian: 'May 24, 2026',
  weddingDateEthiopian: 'ግንቦት 16/2018 ዓ.ም',
  weddingTime: 'ከምሽቱ 12:00 ሰዓት',
  receptionStartTime: '12:00',
  venueName: 'ንፋስ ስልክ የካቶሊክ አዳራሽ',
  venueAddress: 'East West | Gofa Mebrat, XP9X+MV5, Addis Ababa, Ethiopia',
  venueCoordinates: {
    lat: 9.0054,
    lng: 38.7636,
  },
  mapLink: 'https://maps.google.com/?q=Gofa+Mebrat+East+West+Addis+Ababa',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15762.651713508684!2d38.7506!3d9.0054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef51a2d1d%3A0x6b44a4907174cb8a!2sGofa%20Mebrat%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1716550000000!5m2!1sen!2set',
  scriptureText: 'እግዚአብሔር ነገርን ሁሉ በጊዜው ውብ አድርጎ ሰራው፡፡',
  scriptureCitation: 'መክ 3:11',
  invitationNote: 'የክብር እንግዳችን እንድትሆኑ በታላቅ ደስታና ፍቅር ጋብዘንዎታል፡፡ በዚህ ዕለት በአዳራሽ በምሽቱ 12:00 ሰዓት ጀምሮ በምናደርገው የእራት ግብዣ ላይ እንድትገኙልን በአክብሮት ጠርተንዎታል፡፡ የመግቢያ ካርድ እንዳይለይዎ፤ ይቅርታ ጋር ለልጆች ቦታ አላዘጋጀንም !!!',
  telegramBotUrl: 'https://t.me/YeneSergBot',
  contactPhone: '+251 91 123 4567',
  heroPhoto: heroImg,
  traditionalPhoto: kabaImg,
  detailPhoto: ringsImg,
  coverPhoto: coverImg,
  maxGuestsAllowed: 2,
};

export const DEFAULT_TIMELINE: TimelineItem[] = [
  {
    id: '1',
    time: 'ከ 5:30 ሰዓት',
    title: 'ጉዞ ወደ ሙሽሪት ቤት',
    subtitle: 'የሙሽራው አጃቢዎች ጉዞና አቀባበል',
    icon: 'car',
  },
  {
    id: '2',
    time: 'ከ 7:30 ሰዓት',
    title: 'የጋብቻ ስነ-ስርዓት እና ጸሎት',
    subtitle: 'የቀለበት ማሰርና የስነስርዓት ጸሎት',
    icon: 'church',
  },
  {
    id: '3',
    time: 'ከ 9:30 ሰዓት',
    title: 'የፎቶ ፕሮግራም',
    subtitle: 'ከቤተሰብና ጓደኞች ጋር የማስታወሻ ፎቶ',
    icon: 'camera',
  },
  {
    id: '4',
    time: 'ከምሽቱ 12:00 ሰዓት',
    title: 'የእራት ፕሮግራም',
    subtitle: 'ንፋስ ስልክ የካቶሊክ አዳራሽ',
    icon: 'utensils',
  },
  {
    id: '5',
    time: 'ከምሽቱ 2:00 ሰዓት',
    title: 'የኬክ ቆረሳ እና የደስታ ጭፈራ',
    subtitle: 'ሙዚቃ፣ የባህል እስክስታና የምስጋና ፕሮግራም',
    icon: 'cake',
  },
];
