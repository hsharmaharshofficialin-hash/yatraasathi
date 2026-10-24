export type VichaarItem = {
  id: string;
  kind: "gi" | "guide" | "homestay";
  titleEn: string;
  titleHi: string;
  holderEn: string;
  holderHi: string;
  evidenceEn: string;
  evidenceHi: string;
  sourceTitle: string;
  sourceUrl: string | null;
  verifiedAt: string | null;
  mock: boolean;
};

export const VICHAAR: VichaarItem[] = [
  {
    id: "gi-blue-pottery",
    kind: "gi",
    titleEn: "Blue Pottery of Jaipur",
    titleHi: "जयपुर की ब्लू पॉटरी",
    holderEn: "Geographical Indication — goods, not a shop",
    holderHi: "भौगोलिक उपदर्शन — वस्तु, दुकान नहीं",
    evidenceEn:
      "GI application 144, Blue Pottery of Jaipur, Geographical Indications Registry, Government of India. A GI names a place-linked craft. It does not certify the stall in front of you. Open the registry.",
    evidenceHi:
      "जीआई आवेदन 144, ब्लू पॉटरी ऑफ़ जयपुर, भारत सरकार। जीआई स्थान-जुड़ी शिल्प का नाम है, सामने की दुकान का प्रमाणपत्र नहीं। रजिस्ट्री खोलें।",
    sourceTitle: "GI Registry application 144",
    sourceUrl: "https://search.ipindia.gov.in/GIRPublic/Application/Details/144",
    verifiedAt: "2008-09-09T00:00:00.000Z",
    mock: false,
  },
  {
    id: "gi-sanganeri",
    kind: "gi",
    titleEn: "Sanganeri Hand Block Printing",
    titleHi: "सांगानेरी हस्त ब्लॉक छपाई",
    holderEn: "Geographical Indication — goods, not a shop",
    holderHi: "भौगोलिक उपदर्शन — वस्तु, दुकान नहीं",
    evidenceEn:
      "GI application 142, Sanganeri Hand Block Printing. Check the registry before trusting a ‘GI certified’ hang-tag in a bazaar.",
    evidenceHi:
      "जीआई आवेदन 142, सांगानेरी हस्त ब्लॉक प्रिंटिंग। बाज़ार के ‘जीआई सर्टिफाइड’ टैग से पहले रजिस्ट्री देखें।",
    sourceTitle: "GI Registry application 142",
    sourceUrl: "https://search.ipindia.gov.in/GIRPublic/Application/Details/142",
    verifiedAt: "2009-09-03T00:00:00.000Z",
    mock: false,
  },
  {
    id: "guide-mock",
    kind: "guide",
    titleEn: "Sample licensed guide card",
    titleHi: "नमूना लाइसेंसी गाइड कार्ड",
    holderEn: "Name withheld — mock record",
    holderHi: "नाम नहीं — मॉक रिकॉर्ड",
    evidenceEn:
      "MOCK. A real guide badge must show a licence number you can verify with Rajasthan Tourism / the issuing office. This row exists to design the evidence drawer, not to recommend a person.",
    evidenceHi:
      "मॉक। वास्तविक गाइड बैज पर लाइसेंस नंबर हो जिसे राजस्थान पर्यटन/जारी कार्यालय से जाँचा जा सके। यह पंक्ति डिज़ाइन के लिए है, व्यक्ति की सिफारिश नहीं।",
    sourceTitle: "No live licence register connected",
    sourceUrl: null,
    verifiedAt: null,
    mock: true,
  },
  {
    id: "homestay-mock",
    kind: "homestay",
    titleEn: "Sample recognised homestay",
    titleHi: "नमूना मान्य होमस्टे",
    holderEn: "Address withheld — mock record",
    holderHi: "पता नहीं — मॉक रिकॉर्ड",
    evidenceEn:
      "MOCK. A recognised homestay would open a government or hotel-classification letter with a number and date. We have not attached a real property.",
    evidenceHi:
      "मॉक। मान्य होमस्टे सरकारी/वर्गीकरण पत्र खोलेगा — नंबर और तारीख के साथ। यहाँ कोई वास्तविक संपत्ति नहीं।",
    sourceTitle: "No live homestay register connected",
    sourceUrl: null,
    verifiedAt: null,
    mock: true,
  },
];
