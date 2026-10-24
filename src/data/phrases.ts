export type Phrase = {
  id: string;
  region: string;
  register: "formal" | "warm" | "market";
  en: string;
  hi: string;
  pronunciation: string;
  audio: "human" | "tts";
  reviewed: boolean;
  note: string;
};

export const PHRASES: Phrase[] = [
  {
    id: "greet-formal",
    region: "Jaipur / Dhundhar",
    register: "formal",
    en: "Ram-ram. I would like to visit with respect.",
    hi: "राम-राम। मैं आदर के साथ आना चाहता/चाहती हूँ।",
    pronunciation: "raam-raam. main aadar ke saath aana chaahataa/chaahatii hoon",
    audio: "tts",
    reviewed: true,
    note: "Hand-curated greeting. Gendered Hindi verb — pick the form that fits you.",
  },
  {
    id: "shoes",
    region: "Jaipur / Dhundhar",
    register: "formal",
    en: "Where should I leave my shoes?",
    hi: "जूते कहाँ उतारूँ?",
    pronunciation: "joote kahaan utaaroon?",
    audio: "tts",
    reviewed: true,
    note: "Use at any shrine threshold.",
  },
  {
    id: "photo-ask",
    region: "Jaipur / Dhundhar",
    register: "warm",
    en: "May I take a photograph? I will not if you prefer not.",
    hi: "क्या मैं चित्र ले सकता/सकती हूँ? अगर आप न चाहें तो नहीं लूँगा/लूँगी।",
    pronunciation: "kyaa main chitra le saktaa/saktii hoon?",
    audio: "tts",
    reviewed: true,
    note: "Ask people, not only buildings.",
  },
  {
    id: "water",
    region: "Jaipur / Dhundhar",
    register: "market",
    en: "Is this drinking water?",
    hi: "क्या यह पीने का पानी है?",
    pronunciation: "kyaa yeh peene kaa paanii hai?",
    audio: "tts",
    reviewed: true,
    note: "Never assume kund or cooler water is potable.",
  },
  {
    id: "price",
    region: "Jaipur / Dhundhar",
    register: "market",
    en: "What is the price? I am not in a hurry to bargain unkindly.",
    hi: "दाम क्या है? मैं बिना सम्मान के मोल-भाव नहीं करूँगा/करूँगी।",
    pronunciation: "daam kyaa hai?",
    audio: "tts",
    reviewed: false,
    note: "Unreviewed phrasing — a native speaker has not signed this register yet.",
  },
  {
    id: "mosque",
    region: "Jaipur / Dhundhar",
    register: "formal",
    en: "Is it permitted to enter between prayers?",
    hi: "क्या नमाज़ के बीच प्रवेश उचित है?",
    pronunciation: "kyaa namaaz ke beech pravesh uchit hai?",
    audio: "tts",
    reviewed: true,
    note: "Ask the caretaker; do not recite Delhi rules.",
  },
  {
    id: "guide",
    region: "Jaipur / Dhundhar",
    register: "formal",
    en: "May I see your guide licence number?",
    hi: "क्या मैं आपका गाइड लाइसेंस नंबर देख सकता/सकती हूँ?",
    pronunciation: "kyaa main aapka guide licence number dekh saktaa/saktii hoon?",
    audio: "tts",
    reviewed: true,
    note: "A licence number is checkable. A smile is not a credential.",
  },
  {
    id: "help",
    region: "Jaipur / Dhundhar",
    register: "warm",
    en: "I need help. Please call 112.",
    hi: "मुझे मदद चाहिए। कृपया 112 मिलाएँ।",
    pronunciation: "mujhe madad chaahiye. kripayaa ek-ek-do milaayen",
    audio: "tts",
    reviewed: true,
    note: "This app still cannot place the call for you.",
  },
];
