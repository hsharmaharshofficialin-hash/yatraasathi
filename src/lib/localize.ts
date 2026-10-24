import { LANG_CODES, isLang, type Lang } from "@/data/languages";
import { SITE_COPY } from "@/data/content-i18n";
import { t } from "@/data/locales";
import type { EtiquetteOut, SiteOut } from "@/lib/types";

export function asLang(value: string | null | undefined): Lang {
  return isLang(value) ? value : "en";
}

export function siteName(
  site: Pick<SiteOut, "slug" | "nameEn" | "nameHi"> | undefined,
  lang: string,
): string {
  if (!site) return "";
  const code = asLang(lang);
  const copy = SITE_COPY[site.slug];
  if (copy?.name[code]) return copy.name[code] as string;
  if (code === "hi") return site.nameHi;
  return site.nameEn;
}

export function siteSummary(site: SiteOut, lang: string): string {
  const code = asLang(lang);
  const copy = SITE_COPY[site.slug];
  if (copy?.summary[code]) return copy.summary[code] as string;
  if (code === "hi") return site.summaryHi;
  return site.summaryEn;
}

export function siteNarrative(site: SiteOut, lang: string): string {
  const code = asLang(lang);
  const copy = SITE_COPY[site.slug];
  if (copy?.narrative[code]) return copy.narrative[code] as string;
  if (code === "hi") return site.narrativeHi;
  return site.narrativeEn;
}

export function siteArea(site: SiteOut, lang: string): string {
  const code = asLang(lang);
  const copy = SITE_COPY[site.slug];
  if (copy?.area[code]) return copy.area[code] as string;
  if (code === "hi") return site.areaHi;
  return site.areaEn;
}

export function etiquetteValue(row: EtiquetteOut, lang: string): string {
  const code = asLang(lang);
  if (code === "hi") return row.valueHi;
  if (code === "en") return row.valueEn;
  const table = ETIQUETTE_HINT[code];
  return table || row.valueEn;
}

const ETIQUETTE_HINT: Partial<Record<Lang, string>> = {
  bn: "এই ক্ষেত্রের সরকারি নোটিশ পাওয়া যায়নি। অজানা বৈধ। দোরগোড়ায় জিজ্ঞাসা করুন।",
  te: "ఈ అంశానికి అధికార నోటీసు లేదు. తెలియదు సరైనది. గడప వద్ద అడగండి.",
  mr: "या क्षेत्राची अधिकृत सूचना नाही. अज्ञात योग्य आहे. उंबरठ्यावर विचारा.",
  ta: "இந்தப் புலத்திற்கு அதிகார அறிவிப்பு இல்லை. தெரியாது சரியானது. வாயிலில் கேளுங்கள்.",
  gu: "આ ક્ષેત્રની અધિકૃત સૂચના નથી. અજ્ઞાત માન્ય છે. ઉંબરે પૂછો.",
  ur: "اس میدان کا سرکاری نوٹس نہیں ملا۔ نامعلوم درست ہے۔ دہلیز پر پوچھیں۔",
  kn: "ಈ ಕ್ಷೇತ್ರಕ್ಕೆ ಅಧಿಕೃತ ಸೂಚನೆ ಇಲ್ಲ. ತಿಳಿದಿಲ್ಲ ಸರಿ. ಹೊಸ್ತಿಲಲ್ಲಿ ಕೇಳಿ.",
  or: "ଏହି କ୍ଷେତ୍ରର ସରକାରୀ ନୋଟିସ୍ ନାହିଁ। ଅଜଣା ଠିକ୍। ଦ୍ୱାରରେ ପଚାରନ୍ତୁ।",
  ml: "ഈ മേഖലയ്ക്ക് ഔദ്യോഗിക നോട്ടീസ് ഇല്ല. അജ്ഞാതം ശരി. പടിക്കൽ ചോദിക്കുക.",
  pa: "ਇਸ ਖੇਤਰ ਦਾ ਅਧਿਕਾਰੀ ਨੋਟਿਸ ਨਹੀਂ। ਅਣਜਾਣ ਠੀਕ ਹੈ। ਦਹਲੀਜ਼ ’ਤੇ ਪੁੱਛੋ।",
  as: "এই ক্ষেত্ৰৰ চৰকাৰী নোটিচ নাই। অজ্ঞাত শুদ্ধ। দুৱাৰত সুধিব।",
  ne: "यस क्षेत्रको आधिकारिक सूचना छैन। अज्ञात ठीक हो। दैलोमा सोध्नुहोस्।",
  es: "No hay un aviso oficial recuperado para este campo. Desconocido es válido. Pregunte en el umbral.",
  fr: "Aucun avis officiel pour ce champ. Inconnu est valable. Demandez au seuil.",
  de: "Kein amtlicher Aushang für dieses Feld. Unbekannt gilt. Fragen Sie an der Schwelle.",
  pt: "Sem aviso oficial neste campo. Desconhecido é válido. Pergunte no limiar.",
  ar: "لا إعلان رسمي لهذا الحقل. غير معروف جائز. اسأل عند العتبة.",
  zh: "此栏没有检索到官方告示。未知有效。请在门槛处询问。",
  ja: "この項目の公式掲示は未取得です。不明は妥当です。敷居で尋ねてください。",
  ko: "이 항목의 공식 안내가 없습니다. 알 수 없음이 유효합니다. 문턱에서 물어보세요.",
  ru: "Официального объявления по этому полю нет. Неизвестно — допустимо. Спросите у порога.",
  it: "Nessun avviso ufficiale per questo campo. Sconosciuto è valido. Chiedi sulla soglia.",
  id: "Tidak ada pemberitahuan resmi untuk bidang ini. Tidak diketahui sah. Tanyakan di ambang.",
  tr: "Bu alan için resmi duyuru yok. Bilinmiyor geçerlidir. Eşikte sorun.",
  th: "ไม่มีประกาศทางการในช่องนี้ ไม่ทราบใช้ได้ ถามที่ธรณีประตู",
  vi: "Không có thông báo chính thức cho mục này. Không rõ là hợp lệ. Hỏi tại thềm.",
};

export function packMessage(lang: string, kind: "unknown" | "inferred" | "plain1" | "plain2"): string {
  const code = asLang(lang);
  return PACK_MSG[kind][code] || PACK_MSG[kind].en;
}

const PACK_MSG: Record<"unknown" | "inferred" | "plain1" | "plain2", Record<Lang, string>> = {
  unknown: Object.fromEntries(
    LANG_CODES.map((code) => [
      code,
      code === "hi"
        ? "इस प्रश्न का सत्यापित उत्तर ज्ञान पैक में नहीं है। स्थल पर पूछें, या स्रोत वाला प्रश्न पूछें — यूनेस्को सूची, संरक्षण क़ानून, या यह ऐप क्या नहीं करता।"
        : code === "en"
          ? "This pack has no verified answer to that question. Ask on site, or ask something a source here can hold — a UNESCO listing, a protection law, or what this software refuses to do."
          : t(code, "unknownValid") + " " + t(code, "openAsk"),
    ]),
  ) as Record<Lang, string>,
  inferred: Object.fromEntries(
    LANG_CODES.map((code) => [
      code,
      code === "hi"
        ? "इससे यह अनुमान लगता है कि आमेर का संरक्षण एक अकेले स्मारक की नहीं, छह राजपूत पहाड़ी दुर्गों की क्रमबद्ध संपत्ति के रूप में देखा गया है।"
        : "From those two verified listings it follows that Amer is conserved as one member of a serial group of six Rajput hill forts, not as a stand-alone UNESCO monument.",
    ]),
  ) as Record<Lang, string>,
  plain1: Object.fromEntries(
    LANG_CODES.map((code) => [
      code,
      code === "hi"
        ? "स्थानीय लोग कहते हैं कि आमेर भारत का सबसे सुंदर दुर्ग है और हर आगंतुक को हाथी की सवारी लेनी चाहिए।"
        : "Locals say Amer is India’s most beautiful fort and every visitor should take the elephant ride.",
    ]),
  ) as Record<Lang, string>,
  plain2: Object.fromEntries(
    LANG_CODES.map((code) => [
      code,
      code === "hi"
        ? "जल महल के अंदर हमेशा टिकट से घूमा जा सकता है, और जंतर मंतर की धूपघड़ी दो सेकंड तक सटीक है।"
        : "You can always tour inside Jal Mahal on a ticket, and the Jantar Mantar sundial is accurate to two seconds.",
    ]),
  ) as Record<Lang, string>,
};

PACK_MSG.unknown.es =
  "Este paquete no tiene una respuesta verificada. Pregunte en el lugar, o algo que una fuente pueda sostener — una lista UNESCO, una ley de protección, o lo que este software rechaza.";
PACK_MSG.unknown.fr =
  "Ce paquet n’a pas de réponse vérifiée. Demandez sur place, ou quelque chose qu’une source peut porter — une liste UNESCO, une loi de protection, ou ce que ce logiciel refuse.";
PACK_MSG.unknown.de =
  "Dieses Paket hat keine geprüfte Antwort. Fragen Sie vor Ort — eine UNESCO-Liste, ein Schutzgesetz, oder was diese Software ablehnt.";
PACK_MSG.unknown.pt =
  "Este pacote não tem resposta verificada. Pergunte no local — uma lista UNESCO, uma lei de proteção, ou o que este software recusa.";
PACK_MSG.unknown.ar =
  "لا إجابة موثّقة في هذه الحزمة. اسأل في الموقع — قائمة يونسكو أو قانون حماية أو ما يرفضه هذا البرنامج.";
PACK_MSG.unknown.zh = "知识包没有已核实的答案。请现场询问——联合国教科文组织名录、保护法，或本软件拒绝回答的内容。";
PACK_MSG.unknown.ja = "このパックに検証済みの答えはありません。現地で尋ねてください。UNESCO登録、保護法、または本ソフトが拒むこと。";
PACK_MSG.unknown.ko = "이 팩에 검증된 답이 없습니다. 현장에서 물어보세요. 유네스코 등재, 보호법, 또는 이 소프트웨어가 거부하는 것.";
PACK_MSG.unknown.ru =
  "В пакете нет проверенного ответа. Спросите на месте — список ЮНЕСКО, закон об охране или то, от чего программа отказывается.";
PACK_MSG.unknown.bn =
  "এই প্যাকে যাচাইকৃত উত্তর নেই। স্থানে জিজ্ঞাসা করুন — ইউনেস্কো তালিকা, সংরক্ষণ আইন, বা যা এই সফটওয়্যার করে না।";
PACK_MSG.unknown.ta =
  "இந்தப் பொதியில் சரிபார்க்கப்பட்ட பதில் இல்லை. இடத்திலேயே கேளுங்கள் — யுனெஸ்கோ பட்டியல் அல்லது பாதுகாப்புச் சட்டம்.";
PACK_MSG.unknown.te =
  "ఈ ప్యాక్‌లో ధృవీకరించిన సమాధానం లేదు. స్థలంలో అడగండి — యునెస్కో జాబితా లేదా రక్షణ చట్టం.";
PACK_MSG.unknown.ur =
  "اس پیک میں تصدیق شدہ جواب نہیں۔ مقام پر پوچھیں — یونیسکو فہرست یا تحفظ کا قانون۔";
PACK_MSG.inferred.es =
  "De esas dos inscripciones verificadas se sigue que Amer se conserva como miembro de un grupo seriado de seis fuertes rajput, no como monumento UNESCO aislado.";
PACK_MSG.inferred.fr =
  "De ces deux inscriptions vérifiées il suit qu’Amer est conservé comme membre d’un groupe sériel de six forts rajputs, non comme monument UNESCO isolé.";
PACK_MSG.inferred.zh = "由这两条已核实名录可知，Amber 是六个拉杰普特山堡系列遗产之一，而非单独的教科文组织古迹。";
PACK_MSG.inferred.ar = "من القيدتين الموثقتين يتبع أن عامر عضو في مجموعة متسلسلة من ستة حصون راجبوت، لا أثراً منفرداً لليونسكو.";
PACK_MSG.inferred.ja = "二つの検証済み記載から、アメールは単独のユネスコ記念物ではなく、六つのラージプート丘陵要塞の一連の一員として保全されています。";
PACK_MSG.plain1.es = "La gente del lugar dice que Amer es el fuerte más hermoso de la India y que todo visitante debe montar el elefante.";
PACK_MSG.plain1.fr = "Les habitants disent qu’Amer est le plus beau fort d’Inde et que chaque visiteur doit faire l’éléphant.";
PACK_MSG.plain1.zh = "当地人说琥珀堡是印度最美的城堡，每位游客都该骑大象。";
PACK_MSG.plain1.ar = "يقول السكان إن عامر أجمل حصن في الهند وإن على كل زائر ركوب الفيل.";
PACK_MSG.plain1.ja = "地元の人はアメールがインドで最も美しい砦で、誰もが象に乗るべきだと言います。";
PACK_MSG.plain2.es = "Siempre se puede recorrer el interior de Jal Mahal con entrada, y el reloj de sol de Jantar Mantar es preciso a dos segundos.";
PACK_MSG.plain2.fr = "On peut toujours visiter l’intérieur du Jal Mahal avec un billet, et le cadran de Jantar Mantar est précis à deux secondes.";
PACK_MSG.plain2.zh = "贾尔玛哈尔内部总能凭票参观，简塔曼塔日晷精确到两秒。";
PACK_MSG.plain2.ar = "يمكن دائماً دخول جال محل بتذكرة، ومزولة جنتر منتر دقيقة حتى ثانيتين.";
PACK_MSG.plain2.ja = "ジャル・マハル内部は常にチケットで見学でき、ジャンタル・マンタルの日時計は2秒精度です。";
