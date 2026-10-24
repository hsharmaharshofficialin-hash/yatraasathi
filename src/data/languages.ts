export const LANG_CODES = [
  "en",
  "hi",
  "bn",
  "te",
  "mr",
  "ta",
  "gu",
  "ur",
  "kn",
  "or",
  "ml",
  "pa",
  "as",
  "ne",
  "es",
  "fr",
  "de",
  "pt",
  "ar",
  "zh",
  "ja",
  "ko",
  "ru",
  "it",
  "id",
  "tr",
  "th",
  "vi",
] as const;

export type Lang = (typeof LANG_CODES)[number];

export type LangMeta = {
  code: Lang;
  name: string;
  native: string;
  region: "india" | "world";
  dir: "ltr" | "rtl";
  speech: string;
};

export const LANGUAGES: LangMeta[] = [
  { code: "en", name: "English", native: "English", region: "india", dir: "ltr", speech: "en-IN" },
  { code: "hi", name: "Hindi", native: "हिन्दी", region: "india", dir: "ltr", speech: "hi-IN" },
  { code: "bn", name: "Bengali", native: "বাংলা", region: "india", dir: "ltr", speech: "bn-IN" },
  { code: "te", name: "Telugu", native: "తెలుగు", region: "india", dir: "ltr", speech: "te-IN" },
  { code: "mr", name: "Marathi", native: "मराठी", region: "india", dir: "ltr", speech: "mr-IN" },
  { code: "ta", name: "Tamil", native: "தமிழ்", region: "india", dir: "ltr", speech: "ta-IN" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી", region: "india", dir: "ltr", speech: "gu-IN" },
  { code: "ur", name: "Urdu", native: "اردو", region: "india", dir: "rtl", speech: "ur-IN" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ", region: "india", dir: "ltr", speech: "kn-IN" },
  { code: "or", name: "Odia", native: "ଓଡ଼ିଆ", region: "india", dir: "ltr", speech: "or-IN" },
  { code: "ml", name: "Malayalam", native: "മലയാളം", region: "india", dir: "ltr", speech: "ml-IN" },
  { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ", region: "india", dir: "ltr", speech: "pa-IN" },
  { code: "as", name: "Assamese", native: "অসমীয়া", region: "india", dir: "ltr", speech: "as-IN" },
  { code: "ne", name: "Nepali", native: "नेपाली", region: "india", dir: "ltr", speech: "ne-NP" },
  { code: "es", name: "Spanish", native: "Español", region: "world", dir: "ltr", speech: "es-ES" },
  { code: "fr", name: "French", native: "Français", region: "world", dir: "ltr", speech: "fr-FR" },
  { code: "de", name: "German", native: "Deutsch", region: "world", dir: "ltr", speech: "de-DE" },
  { code: "pt", name: "Portuguese", native: "Português", region: "world", dir: "ltr", speech: "pt-BR" },
  { code: "ar", name: "Arabic", native: "العربية", region: "world", dir: "rtl", speech: "ar-SA" },
  { code: "zh", name: "Chinese", native: "中文", region: "world", dir: "ltr", speech: "zh-CN" },
  { code: "ja", name: "Japanese", native: "日本語", region: "world", dir: "ltr", speech: "ja-JP" },
  { code: "ko", name: "Korean", native: "한국어", region: "world", dir: "ltr", speech: "ko-KR" },
  { code: "ru", name: "Russian", native: "Русский", region: "world", dir: "ltr", speech: "ru-RU" },
  { code: "it", name: "Italian", native: "Italiano", region: "world", dir: "ltr", speech: "it-IT" },
  { code: "id", name: "Indonesian", native: "Bahasa Indonesia", region: "world", dir: "ltr", speech: "id-ID" },
  { code: "tr", name: "Turkish", native: "Türkçe", region: "world", dir: "ltr", speech: "tr-TR" },
  { code: "th", name: "Thai", native: "ไทย", region: "world", dir: "ltr", speech: "th-TH" },
  { code: "vi", name: "Vietnamese", native: "Tiếng Việt", region: "world", dir: "ltr", speech: "vi-VN" },
];

const LANG_SET = new Set<string>(LANG_CODES);

export function isLang(value: string | null | undefined): value is Lang {
  return Boolean(value && LANG_SET.has(value));
}

export function langMeta(code: string): LangMeta {
  return LANGUAGES.find((row) => row.code === code) || LANGUAGES[0];
}

export function speechCode(code: string): string {
  return langMeta(code).speech;
}
