export type CrowdBand = "low" | "medium" | "high";

export type CrowdEvent = {
  id: string;
  nameEn: string;
  nameHi: string;
  month: number;
  day?: number;
  windowDays: number;
  band: CrowdBand;
  basisEn: string;
  basisHi: string;
  mock: boolean;
};

export const CROWD_EVENTS: CrowdEvent[] = [
  {
    id: "jlf",
    nameEn: "Jaipur Literature Festival window",
    nameHi: "जयपुर साहित्य महोत्सव अवधि",
    month: 1,
    windowDays: 10,
    band: "high",
    basisEn:
      "The Jaipur Literature Festival is a public, recurring January event. This barometer only flags the calendar window; it does not count people at gates.",
    basisHi:
      "जयपुर साहित्य महोत्सव जनवरी का सार्वजनिक आयोजन है। यह केवल कैलेंडर खिड़की है, द्वार पर भीड़ गिनती नहीं।",
    mock: false,
  },
  {
    id: "holi",
    nameEn: "Holi",
    nameHi: "होली",
    month: 3,
    windowDays: 4,
    band: "high",
    basisEn: "Lunar festival; Gregorian date moves. Treat the whole colour-play week as busy in the old city.",
    basisHi: "चंद्र त्योहार; तारीख खिसकती है। रंगों वाले सप्ताह को पुराने शहर में व्यस्त मानें।",
    mock: false,
  },
  {
    id: "gangaur",
    nameEn: "Gangaur",
    nameHi: "गणगौर",
    month: 3,
    windowDays: 8,
    band: "high",
    basisEn: "Rajasthan’s Gangaur processions concentrate in Jaipur after Holi. Calendar-based, not GPS.",
    basisHi: "राजस्थान की गणगौर यात्राएँ होली के बाद जयपुर में केंद्रित। कैलेंडर आधारित, GPS नहीं।",
    mock: false,
  },
  {
    id: "teej",
    nameEn: "Teej",
    nameHi: "तीज",
    month: 8,
    windowDays: 5,
    band: "high",
    basisEn: "Monsoon Teej processions in Jaipur. Date follows the lunar calendar.",
    basisHi: "जयपुर की मानसून तीज यात्राएँ। तिथि चंद्र कैलेंडर से।",
    mock: false,
  },
  {
    id: "diwali",
    nameEn: "Diwali / Deepavali window",
    nameHi: "दीपावली अवधि",
    month: 10,
    windowDays: 8,
    band: "high",
    basisEn: "National holiday cluster. Bazaars busy; some shrines packed. Not a live sensor.",
    basisHi: "राष्ट्रीय अवकाश समूह। बाज़ार व्यस्त; कुछ देवालय घने। यह सेंसर नहीं।",
    mock: false,
  },
  {
    id: "newyear",
    nameEn: "Gregorian New Year evenings",
    nameHi: "नए साल की शामें",
    month: 12,
    day: 31,
    windowDays: 3,
    band: "medium",
    basisEn: "Viewpoint forts are often busy on 31 Dec–1 Jan. Outlook only.",
    basisHi: "31 दिस–1 जन को दृश्य दुर्ग अक्सर व्यस्त। केवल संकेत।",
    mock: false,
  },
];

export function crowdForDate(isoDate: string): {
  band: CrowdBand;
  events: CrowdEvent[];
  basisEn: string;
  basisHi: string;
} {
  const date = new Date(isoDate);
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hit = CROWD_EVENTS.filter((event) => {
    if (event.day) {
      const start = event.day - Math.floor(event.windowDays / 2);
      const end = event.day + Math.ceil(event.windowDays / 2);
      return event.month === month && day >= start && day <= end;
    }
    return event.month === month;
  });
  if (hit.some((e) => e.band === "high")) {
    return {
      band: "high",
      events: hit,
      basisEn: hit.map((e) => e.basisEn).join(" "),
      basisHi: hit.map((e) => e.basisHi).join(" "),
    };
  }
  if (hit.length) {
    return {
      band: "medium",
      events: hit,
      basisEn: hit.map((e) => e.basisEn).join(" "),
      basisHi: hit.map((e) => e.basisHi).join(" "),
    };
  }
  return {
    band: "low",
    events: [],
    basisEn: "No festival or holiday window from this small calendar matches today. That is not a live crowd count.",
    basisHi: "इस छोटे कैलेंडर की कोई त्योहार खिड़की आज से नहीं मिलती। यह जीवित भीड़ गिनती नहीं।",
  };
}
