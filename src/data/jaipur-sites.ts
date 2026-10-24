export type SourceRecord = {
  code: string;
  title: string;
  publisher: string;
  url: string | null;
  verifiedAt: string | null;
  verifier: string;
  notes: string | null;
};

export type SiteRecord = {
  slug: string;
  nameEn: string;
  nameHi: string;
  summaryEn: string;
  summaryHi: string;
  narrativeEn: string;
  narrativeHi: string;
  lat: number;
  lng: number;
  city: string;
  areaEn: string;
  areaHi: string;
  unesco: boolean;
  unescoRef: string | null;
  imageUrl: string;
  imageCredit: string;
  dayHint: number;
};

export type EtiquetteRecord = {
  siteSlug: string;
  field:
    | "footwear"
    | "head_covering"
    | "photography"
    | "gendered_access"
    | "non_adherent_entry"
    | "offering_norms"
    | "quiet_hours";
  valueEn: string;
  valueHi: string;
  sourceCode: string | null;
  verifiedAt: string | null;
  status: "verified" | "unverified";
};

export type KnowledgeRecord = {
  siteSlug: string | null;
  claimEn: string;
  claimHi: string;
  sourceCode: string | null;
  verifiedAt: string | null;
  status: "verified" | "unverified";
  tags: string;
};

export const SOURCES: SourceRecord[] = [
  {
    code: "src_unesco_1338",
    title: "The Jantar Mantar, Jaipur",
    publisher: "UNESCO World Heritage Centre",
    url: "https://whc.unesco.org/en/list/1338",
    verifiedAt: "2010-07-31T00:00:00.000Z",
    verifier: "UNESCO World Heritage Committee, 34th session (decision 34 COM 8B.17)",
    notes: "Inscription year and OUV text taken from the official UNESCO listing page.",
  },
  {
    code: "src_unesco_247",
    title: "Hill Forts of Rajasthan",
    publisher: "UNESCO World Heritage Centre",
    url: "https://whc.unesco.org/en/list/247",
    verifiedAt: "2013-06-21T00:00:00.000Z",
    verifier: "UNESCO World Heritage Committee, 37th session (decision 37 COM 8B.31)",
    notes: "Serial cultural property of six Rajput hill forts, including Amber Fort.",
  },
  {
    code: "src_unesco_1605",
    title: "Jaipur City, Rajasthan",
    publisher: "UNESCO World Heritage Centre",
    url: "https://whc.unesco.org/en/list/1605",
    verifiedAt: "2019-07-06T00:00:00.000Z",
    verifier: "UNESCO World Heritage Committee, 43rd session",
    notes: "Walled city of Jaipur inscribed as a World Heritage property in 2019.",
  },
  {
    code: "src_unesco_1338_protection",
    title: "The Jantar Mantar, Jaipur — protection and management",
    publisher: "UNESCO World Heritage Centre",
    url: "https://whc.unesco.org/en/list/1338",
    verifiedAt: "2010-07-31T00:00:00.000Z",
    verifier: "UNESCO listing brief (protection section)",
    notes:
      "UNESCO states the observatory is protected under the Rajasthan Monuments Archaeological Site and Antiquities Act, 1961, and was designated a monument of national importance in 1968.",
  },
  {
    code: "src_culture_gov_247",
    title: "Hill Forts of Rajasthan",
    publisher: "Ministry of Culture, Government of India",
    url: "https://culture.gov.in/hill-forts-rajasthan",
    verifiedAt: "2013-06-21T00:00:00.000Z",
    verifier: "culture.gov.in listing page",
    notes: "Confirms 2013 inscription, criteria (ii)(iii).",
  },
  {
    code: "src_hindu_2013_forts",
    title: "Unesco declares 6 Rajasthan forts World Heritage Sites",
    publisher: "The Hindu",
    url: "https://www.thehindu.com/news/national/other-states/unesco-declares-6-rajasthan-forts-world-heritage-sites/article4838107.ece",
    verifiedAt: "2013-06-22T00:00:00.000Z",
    verifier: "The Hindu news report of the 37th WHC session",
    notes: "Names the six forts, including Amber (Jaipur).",
  },
  {
    code: "src_gi_blue_pottery",
    title: "Blue Pottery of Jaipur — Geographical Indication",
    publisher: "Geographical Indications Registry, Government of India",
    url: "https://search.ipindia.gov.in/GIRPublic/Application/Details/144",
    verifiedAt: "2008-09-09T00:00:00.000Z",
    verifier: "GI Registry application 144 (Blue Pottery of Jaipur)",
    notes: "GI status is a checkable public registry fact. Always open the registry entry rather than trusting a badge.",
  },
  {
    code: "src_gi_sanganeri",
    title: "Sanganeri Hand Block Printing — Geographical Indication",
    publisher: "Geographical Indications Registry, Government of India",
    url: "https://search.ipindia.gov.in/GIRPublic/Application/Details/142",
    verifiedAt: "2009-09-03T00:00:00.000Z",
    verifier: "GI Registry application 142",
    notes: "Registered GI for Sanganer hand block printing associated with the Jaipur region.",
  },
  {
    code: "src_visitor_amer_temple",
    title: "Independent visitor accounts of Shila Devi Temple rules inside Amer Fort",
    publisher: "Multiple visitor guides (not an official notice)",
    url: null,
    verifiedAt: "2024-06-26T00:00:00.000Z",
    verifier: "YatraSathi editorial — cross-read of visitor reports, not an ASI circular",
    notes:
      "Several independent visitor write-ups describe footwear, leather and camera restrictions at Shila Devi. This is not a retrieved official posted notice, so related etiquette stays unverified.",
  },
  {
    code: "src_general_temple_custom",
    title: "Widely observed Hindu temple visitor custom in Rajasthan",
    publisher: "Cultural practice (not a site gazette)",
    url: null,
    verifiedAt: null,
    verifier: "Unverified — practice, not a cited official order",
    notes: "Used only to label common custom. Never presented as a verified site by-law.",
  },
  {
    code: "src_general_mosque_custom",
    title: "Widely observed mosque visitor custom in India",
    publisher: "Cultural practice (not a site gazette)",
    url: null,
    verifiedAt: null,
    verifier: "Unverified — practice, not a cited official order",
    notes: "Shoes off, modest dress, and avoiding tourist visits during salah are common. Jaipur Jama Masjid-specific posted rules were not retrieved.",
  },
  {
    code: "src_unknown",
    title: "No retrieved primary source",
    publisher: "YatraSathi Pramaan",
    url: null,
    verifiedAt: null,
    verifier: "System",
    notes: "Placeholder for fields we refuse to invent.",
  },
];

export const SITES: SiteRecord[] = [
  {
    slug: "amer-fort",
    nameEn: "Amer Fort",
    nameHi: "आमेर दुर्ग",
    summaryEn:
      "A Rajput hill palace-fort above Maota Lake, inscribed in 2013 as part of the UNESCO serial property Hill Forts of Rajasthan.",
    summaryHi:
      "मावठा झील के ऊपर राजपूत पहाड़ी राजप्रासाद-दुर्ग। 2013 में यूनेस्को की क्रमबद्ध धरोहर ‘राजस्थान के पहाड़ी दुर्ग’ में शामिल।",
    narrativeEn:
      "Amer (Amber) Fort sits on a hill above Maota Lake, about 11 km north of Jaipur’s walled city. UNESCO does not list it as a stand-alone World Heritage Site. In June 2013 the World Heritage Committee inscribed a serial cultural property of six Rajput hill forts — Chittorgarh, Kumbhalgarh, Ranthambore, Gagron, Amber and Jaisalmer — under criteria (ii) and (iii). The palace-fort is a lived palimpsest of Rajput court architecture: courtyards, painted gateways such as Ganesh Pol, and the mirror-work rooms often called Sheesh Mahal. An active shrine, the Shila Devi temple, stands inside the complex. Palace courtyards are a monument visit; the shrine is a place of worship. Those are different kinds of respect. We do not publish crowd scores, paid-promotion badges or invented ratings.",
    narrativeHi:
      "आमेर दुर्ग मावठा झील के ऊपर पहाड़ी पर है, जयपुर की दीवारों वाले शहर से लगभग 11 किमी उत्तर में। यूनेस्को इसे अलग एकल विश्व धरोहर के रूप में सूचीबद्ध नहीं करता। जून 2013 में विश्व धरोहर समिति ने छह राजपूत पहाड़ी दुर्गों की क्रमबद्ध सांस्कृतिक संपत्ति अंकित की — चित्तौड़गढ़, कुंभलगढ़, रणथंभौर, गागरोन, आमेर और जैसलमेर — मानदंड (ii) और (iii) के अंतर्गत। शिला देवी मंदिर परिसर में सक्रिय पूजा स्थल है। प्रासाद के आंगन स्मारक हैं; मंदिर पूजा का स्थान है। हम भीड़ के अंक, प्रायोजित बैज या गढ़े हुए रेटिंग नहीं देते।",
    lat: 26.9859,
    lng: 75.8507,
    city: "Jaipur",
    areaEn: "Amer",
    areaHi: "आमेर",
    unesco: true,
    unescoRef: "247",
    imageUrl: "https://images.pexels.com/photos/19446861/pexels-photo-19446861.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageCredit: "Photo: Abhinav Sharma / Pexels",
    dayHint: 1,
  },
  {
    slug: "jantar-mantar",
    nameEn: "Jantar Mantar",
    nameHi: "जंतर मंतर",
    summaryEn:
      "An early-18th-century naked-eye observatory built for Sawai Jai Singh II. UNESCO World Heritage Site, inscribed 2010 (criteria iii, iv).",
    summaryHi:
      "सवाई जय सिंह द्वितीय के लिए बना प्रारंभिक 18वीं सदी का नग्न-नेत्र वेधशाला परिसर। 2010 में यूनेस्को विश्व धरोहर (मानदंड iii, iv)।",
    narrativeEn:
      "UNESCO describes the Jantar Mantar, Jaipur as an astronomical observation site built in the early 18th century with some twenty main fixed instruments — monumental masonry tools for positional astronomy with the naked eye. It is “the most significant and best preserved set of fixed monumental instruments built in India in the first half of the 18th century.” The Committee inscribed it on 31 July 2010 under criteria (iii) and (iv). The listing brief also records that the site is protected under the Rajasthan Monuments Archaeological Site and Antiquities Act, 1961, and was designated a monument of national importance in 1968. Instrument plasters and graduations have been repaired over a long period; UNESCO itself notes that authenticity is clearer for astronomical function than for every surface finish. We do not invent accuracy claims such as “two-second sundial” unless a cited instrument study is in the pack.",
    narrativeHi:
      "यूनेस्को जयपुर के जंतर मंतर को 18वीं सदी के आरंभ की खगोलीय वेधशाला बताता है, जिसमें लगभग बीस मुख्य स्थिर यंत्र हैं। 31 जुलाई 2010 को इसे मानदंड (iii) और (iv) के अंतर्गत अंकित किया गया। यह राजस्थान स्मारक अधिनियम, 1961 के अंतर्गत संरक्षित है और 1968 में राष्ट्रीय महत्व का स्मारक घोषित हुआ। हम बिना स्रोत के यंत्रों की सटीकता के दावे नहीं लिखते।",
    lat: 26.9248,
    lng: 75.8246,
    city: "Jaipur",
    areaEn: "Badi Chaupar / City Palace precinct",
    areaHi: "बड़ी चौपड़ / सिटी पैलेस परिसर",
    unesco: true,
    unescoRef: "1338",
    imageUrl: "https://images.pexels.com/photos/30358327/pexels-photo-30358327.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageCredit: "Photo: Sanket Sawale / Pexels",
    dayHint: 2,
  },
  {
    slug: "hawa-mahal",
    nameEn: "Hawa Mahal",
    nameHi: "हवा महल",
    summaryEn:
      "The Palace of Winds, a five-storey screen of jharokhas facing the street in Jaipur’s walled city, which UNESCO inscribed as Jaipur City, Rajasthan in 2019.",
    summaryHi:
      "हवा महल — दीवारों वाले जयपुर शहर की सड़क पर झरोखों की पाँच मंज़िला जाली। दीवारों वाला जयपुर शहर 2019 में यूनेस्को विश्व धरोहर बना।",
    narrativeEn:
      "Hawa Mahal stands on the edge of the palace precinct, looking onto the processional street of the walled city. The city of Jaipur — founded in 1727 under Sawai Jai Singh II as a planned capital — was inscribed by UNESCO in 2019 as “Jaipur City, Rajasthan.” That listing covers the historic urban ensemble, not Hawa Mahal as a separate World Heritage Site. Common guidebook numbers (storeys, window counts) vary; this pack does not freeze a window count without an architectural inventory in hand. Approach it as a street facade meant to let court women observe public life while remaining unseen — a spatial etiquette of looking, not a selfie wall.",
    narrativeHi:
      "हवा महल महल परिसर के किनारे, दीवारों वाले शहर की सड़क की ओर मुख किए खड़ा है। जयपुर शहर — 1727 में सवाई जय सिंह द्वितीय की नियोजित राजधानी — 2019 में ‘जयपुर सिटी, राजस्थान’ के रूप में यूनेस्को-अंकित हुआ। यह सूचीकरण पूरे ऐतिहासिक नगर समूह का है, हवा महल का अलग विश्व धरोहर दर्जा नहीं। बिना वास्तुकला सूची के हम खिड़कियों की संख्या नहीं गढ़ते।",
    lat: 26.9239,
    lng: 75.8267,
    city: "Jaipur",
    areaEn: "Badi Chaupar, Walled City",
    areaHi: "बड़ी चौपड़, दीवारों वाला शहर",
    unesco: true,
    unescoRef: "1605",
    imageUrl: "https://images.pexels.com/photos/32261823/pexels-photo-32261823.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageCredit: "Photo: urtimud.89 / Pexels",
    dayHint: 2,
  },
  {
    slug: "city-palace",
    nameEn: "City Palace",
    nameHi: "सिटी पैलेस",
    summaryEn:
      "The still-inhabited royal precinct at the heart of the 1727 planned city. Part of the walled city inscribed by UNESCO in 2019; palace museums are separately ticketed.",
    summaryHi:
      "1727 की नियोजित नगरी के हृदय में आज भी आवासित राजसी परिसर। 2019 की यूनेस्को धरोहर दीवारों वाले शहर का हिस्सा; संग्रहालय अलग टिकट से खुलते हैं।",
    narrativeEn:
      "City Palace is not a frozen museum city. Parts remain the residence of the Jaipur royal household while courtyards and museum galleries admit visitors on tickets issued by the palace trusts — a living split between home, shrine and display. Govind Dev Ji temple stands in the palace garden axis and draws large numbers of devotees, especially at aarti. UNESCO’s 2019 inscription is for Jaipur City as an urban plan (grid, bazaars, gates, pink-stucco civic identity), not a room-by-room inventory of the palace. Interior photography rules, dress expectations at shrines, and which courtyards are open change; we mark those operational facts unknown unless a dated official notice is in the pack.",
    narrativeHi:
      "सिटी पैलेस केवल संग्रहालय नहीं है। कुछ भाग जयपुर राजघराने का निवास है, कुछ आंगन और गैलरी टिकट से खुलते हैं। गोविंद देव जी मंदिर महल की बाग-अक्ष पर है। 2019 का यूनेस्को अंकितकरण जयपुर शहर की नगर योजना के लिए है, महल की प्रत्येक कक्ष-सूची के लिए नहीं।",
    lat: 26.9258,
    lng: 75.8237,
    city: "Jaipur",
    areaEn: "Walled City",
    areaHi: "दीवारों वाला शहर",
    unesco: true,
    unescoRef: "1605",
    imageUrl: "https://images.pexels.com/photos/32261804/pexels-photo-32261804.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageCredit: "Photo: urtimud.89 / Pexels",
    dayHint: 2,
  },
  {
    slug: "jaigarh-fort",
    nameEn: "Jaigarh Fort",
    nameHi: "जयगढ़ दुर्ग",
    summaryEn:
      "A military ridge fort above Amer, historically linked to the same Kachwaha defensive belt. Not named as its own UNESCO site.",
    summaryHi:
      "आमेर के ऊपर सैन्य कटक दुर्ग, कछवाहा रक्षा-शृंखला से जुड़ा। स्वयं का यूनेस्को नाम नहीं।",
    narrativeEn:
      "Jaigarh crowns the ridge above Amer Fort and is widely described as the arsenal and watch of the Kachwaha house. It is often visited on the same day as Amer. It is not one of the six forts named in the 2013 Hill Forts of Rajasthan inscription (those are Chittorgarh, Kumbhalgarh, Ranthambore, Gagron, Amber and Jaisalmer). Popular claims about the “Jaivana” cannon — largest, never fired, and so on — are tourist folklore until an ordnance or ASI inventory is cited. This pack therefore treats cannon superlatives as unknown.",
    narrativeHi:
      "जयगढ़ आमेर दुर्ग के ऊपर कटक पर है और कछवाहा घराने के तोपख़ाने-चौकी के रूप में जाना जाता है। 2013 की यूनेस्को सूची के छह नामित दुर्गों में यह शामिल नहीं। ‘जयवाण’ तोप के सबसे बड़े या कभी न दागे जाने जैसे दावे बिना आयुध-सूची के अज्ञात हैं।",
    lat: 26.9851,
    lng: 75.8456,
    city: "Jaipur",
    areaEn: "Amer ridge",
    areaHi: "आमेर कटक",
    unesco: false,
    unescoRef: null,
    imageUrl: "https://images.pexels.com/photos/18881274/pexels-photo-18881274.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageCredit: "Photo: Sid Dalal / Pexels",
    dayHint: 1,
  },
  {
    slug: "nahargarh-fort",
    nameEn: "Nahargarh Fort",
    nameHi: "नाहरगढ़ दुर्ग",
    summaryEn:
      "A hill fort on the northern rim of Jaipur, used historically as a retreat and defensive line. Not one of the six 2013 UNESCO hill forts.",
    summaryHi:
      "जयपुर के उत्तरी छोर का पहाड़ी दुर्ग, ऐतिहासिक रूप से विश्राम और रक्षा रेखा। 2013 के छह यूनेस्को दुर्गों में नहीं।",
    narrativeEn:
      "Nahargarh looks back over the pink grid of Jaipur. Like Jaigarh, it belongs to the same wider defensive landscape as Amer but is not named in the 2013 serial UNESCO listing. Sunset views are famous; fame is not a source. What we can say carefully is topographic: the fort sits on the Aravalli ridge north of the walled city and is a common evening viewpoint. Wildlife, film-shoot rules, and cafe hours are operational details we do not freeze without a dated notice.",
    narrativeHi:
      "नाहरगढ़ जयपुर के गुलाबी ग्रिड पर नज़र रखता है। यह आमेर के व्यापक रक्षा परिदृश्य का हिस्सा है, पर 2013 की यूनेस्को क्रमबद्ध सूची में नामित नहीं। सूर्यास्त के दृश्य प्रसिद्ध हैं; प्रसिद्धि स्रोत नहीं है।",
    lat: 26.9373,
    lng: 75.8155,
    city: "Jaipur",
    areaEn: "Aravalli ridge, north Jaipur",
    areaHi: "अरावली कटक, उत्तर जयपुर",
    unesco: false,
    unescoRef: null,
    imageUrl: "https://images.pexels.com/photos/35205707/pexels-photo-35205707.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageCredit: "Photo: Nitin Chauhan / Pexels",
    dayHint: 3,
  },
  {
    slug: "albert-hall",
    nameEn: "Albert Hall Museum",
    nameHi: "अल्बर्ट हॉल संग्रहालय",
    summaryEn:
      "Jaipur’s oldest government museum, housed in an Indo-Saracenic public building in Ram Niwas Garden. Not a UNESCO monument on its own.",
    summaryHi:
      "राम निवास बाग में इंडो-सारेसेनिक सार्वजनिक भवन में जयपुर का सबसे पुराना सरकारी संग्रहालय। स्वयं यूनेस्को स्मारक नहीं।",
    narrativeEn:
      "Albert Hall Museum (Government Central Museum) sits in Ram Niwas Garden south of the old walls. It is a 19th-century civic building in the Indo-Saracenic manner, used as a museum of decorative arts, crafts and antiquities. It is not individually inscribed by UNESCO. Object-level captions inside the galleries are the museum’s own scholarship; this app does not scrape or reinvent those labels. If you need a provenance for a particular artefact, ask the museum, not a chatbot.",
    narrativeHi:
      "अल्बर्ट हॉल संग्रहालय पुरानी दीवारों के दक्षिण राम निवास बाग में है। यह 19वीं सदी का इंडो-सारेसेनिक नागरिक भवन है। यह अलग से यूनेस्को-अंकित नहीं है। गैलरी की वस्तु-नामपट्टिकाएँ संग्रहालय की विद्या हैं; यह ऐप उन्हें गढ़ता नहीं।",
    lat: 26.9116,
    lng: 75.8195,
    city: "Jaipur",
    areaEn: "Ram Niwas Garden",
    areaHi: "राम निवास बाग",
    unesco: false,
    unescoRef: null,
    imageUrl: "https://images.pexels.com/photos/31739860/pexels-photo-31739860.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageCredit: "Photo: Anil Sharma / Pexels",
    dayHint: 3,
  },
  {
    slug: "jal-mahal",
    nameEn: "Jal Mahal",
    nameHi: "जल महल",
    summaryEn:
      "A palace sitting in Man Sagar Lake. Commonly viewed from the embankment. Interior public access is treated as unknown in this pack.",
    summaryHi:
      "मान सागर झील में स्थित महल। सामान्यतः तटबंध से देखा जाता है। आंतरिक सार्वजनिक प्रवेश इस पैक में अज्ञात है।",
    narrativeEn:
      "Jal Mahal appears to float on Man Sagar Lake, with the Aravalli ridge and Nahargarh behind it. Almost every visitor photograph is taken from the roadside embankment. Whether the interior is open to the general public on a given day is an operational fact we have not verified from an official ticket window or government order, so the pack answers “unknown — ask on the shore, do not trust a blog.” The building is not a separate UNESCO inscription.",
    narrativeHi:
      "जल महल मान सागर पर तैरता दिखाई देता है। अधिकतर चित्र तटबंध से लिए जाते हैं। किसी दिन आंतरिक प्रवेश खुला है या नहीं, यह हमें आधिकारिक टिकट-पटल से सत्यापित नहीं है — इसलिए उत्तर ‘अज्ञात’ है।",
    lat: 26.9534,
    lng: 75.836,
    city: "Jaipur",
    areaEn: "Man Sagar Lake",
    areaHi: "मान सागर झील",
    unesco: false,
    unescoRef: null,
    imageUrl: "https://images.pexels.com/photos/19149573/pexels-photo-19149573.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageCredit: "Photo: AXP Photography / Pexels",
    dayHint: 3,
  },
  {
    slug: "birla-mandir",
    nameEn: "Birla Mandir (Lakshmi Narayan)",
    nameHi: "बिड़ला मंदिर (लक्ष्मी नारायण)",
    summaryEn:
      "A 20th-century white-marble Lakshmi-Narayan temple below Moti Dungri. An active place of worship, not a ticketed monument.",
    summaryHi:
      "मोती डूंगरी के नीचे 20वीं सदी का सफेद संगमरमर लक्ष्मी-नारायण मंदिर। सक्रिय पूजा स्थल, टिकट वाला स्मारक नहीं।",
    narrativeEn:
      "Birla Mandir is a modern temple dedicated to Lakshmi and Narayan, built in white marble and used daily by worshippers. It is not a UNESCO property. Because it is a living temple, the relevant ethics are those of darshan: modest dress, shoes outside, phones down if asked. We have not retrieved a signed noticeboard photograph for every rule, so several etiquette fields stay unverified even though the custom is familiar. That gap is deliberate.",
    narrativeHi:
      "बिड़ला मंदिर लक्ष्मी-नारायण को समर्पित आधुनिक मंदिर है, दैनिक पूजा के साथ। यह यूनेस्को संपत्ति नहीं। जीवित मंदिर होने के कारण शिष्टाचार दर्शन का है। हर नियम का साइनबोर्ड हमें प्राप्त नहीं, इसलिए कई क्षेत्र असंपुष्ट रहेंगे।",
    lat: 26.8922,
    lng: 75.8155,
    city: "Jaipur",
    areaEn: "Moti Dungri",
    areaHi: "मोती डूंगरी",
    unesco: false,
    unescoRef: null,
    imageUrl: "/images/birla-mandir.jpg",
    imageCredit: "Illustration generated for YatraSathi (not a documentary photo)",
    dayHint: 3,
  },
  {
    slug: "govind-dev-ji",
    nameEn: "Govind Dev Ji Temple",
    nameHi: "गोविंद देव जी मंदिर",
    summaryEn:
      "A Krishna temple on the City Palace garden axis, among Jaipur’s most attended shrines. Living worship, not a museum.",
    summaryHi:
      "सिटी पैलेस बाग-अक्ष पर कृष्ण मंदिर, जयपुर के सबसे अधिक श्रद्धालुओं वाले स्थानों में। जीवित पूजा, संग्रहालय नहीं।",
    narrativeEn:
      "Govind Dev Ji is a Krishna temple closely tied to the Kachwaha court and to the daily rhythm of the City Palace precinct. Aarti crowds are part of the city’s soundscape. It is not separately inscribed by UNESCO (the 2019 listing is the city plan). Temple photography, footwear and offering rules belong to the shrine’s current sevayats; we do not invent a dress-code PDF. If a field is blank, ask at the threshold.",
    narrativeHi:
      "गोविंद देव जी कछवाहा दरबार और सिटी पैलेस की दैनिक लय से जुड़ा कृष्ण मंदिर है। यह अलग से यूनेस्को-अंकित नहीं। फोटो, जूते और चढ़ावे के नियम वर्तमान सेवायतों के हैं — दहलीज़ पर पूछें।",
    lat: 26.9265,
    lng: 75.8239,
    city: "Jaipur",
    areaEn: "City Palace gardens",
    areaHi: "सिटी पैलेस उद्यान",
    unesco: true,
    unescoRef: "1605",
    imageUrl: "/images/govind-dev-ji.jpg",
    imageCredit: "Illustration generated for YatraSathi (not a documentary photo)",
    dayHint: 2,
  },
  {
    slug: "jama-masjid",
    nameEn: "Jama Masjid, Jaipur",
    nameHi: "जामा मस्जिद, जयपुर",
    summaryEn:
      "The city’s congregational mosque in the walled city. Active worship. Site-specific posted rules were not retrieved; general mosque custom is labelled unverified.",
    summaryHi:
      "दीवारों वाले शहर की जामा (जमाअत) मस्जिद। सक्रिय इबादत। स्थल-विशेष सूचनापट नहीं मिला; सामान्य मस्जिद प्रथा असंपुष्ट चिह्नित है।",
    narrativeEn:
      "Jaipur’s Jama Masjid is a living congregational mosque in the old city, not a ticketed monument and not a UNESCO listing of its own (though it stands inside the 2019 walled-city property). Because we did not retrieve a dated, official visitor notice for this specific mosque, Pramaan will not recite Delhi Jama Masjid rules as if they applied here. Shoes-off and modest dress are widely observed mosque customs in India; they are tagged unverified for this building. Non-Muslim visiting hours, women’s galleries and photography are unknown until you ask the caretakers. Do not visit as a tourist during salah if you cannot be still.",
    narrativeHi:
      "जयपुर की जामा मस्जिद पुराने शहर की जीवित जमाअत मस्जिद है, टिकट स्मारक नहीं। इस भवन का आधिकारिक आगंतुक सूचनापट हमें नहीं मिला, इसलिए दिल्ली जामा मस्जिद के नियम यहाँ न थोपें। जूते उतारना व्यापक प्रथा है, पर यहाँ असंपुष्ट है। नमाज़ के समय पर्यटक बनकर न आएँ।",
    lat: 26.9255,
    lng: 75.8265,
    city: "Jaipur",
    areaEn: "Walled City",
    areaHi: "दीवारों वाला शहर",
    unesco: true,
    unescoRef: "1605",
    imageUrl: "/images/jama-masjid-jaipur.jpg",
    imageCredit: "Illustration generated for YatraSathi (not a documentary photo of this mosque)",
    dayHint: 2,
  },
  {
    slug: "galta-ji",
    nameEn: "Galta Ji",
    nameHi: "गलता जी",
    summaryEn:
      "A gorge temple complex with kunds (sacred tanks) east of the walled city, popularly called the Monkey Temple. Living pilgrimage landscape.",
    summaryHi:
      "दीवारों वाले शहर के पूर्व में कुंडों वाला घाटी मंदिर परिसर, लोक में मंकी टेम्पल। जीवित तीर्थ परिदृश्य।",
    narrativeEn:
      "Galta Ji (Galtaji) is a series of temples and kunds set in a rocky gorge. Rhesus macaques are part of the ecology; they are not an attraction to bait. The site is a pilgrimage landscape, not a zoo, and not a UNESCO monument. Water in the tanks is ritual and environmental — we make no claim that it is potable or medically pure. Footwear and photography around shrines follow temple custom; several fields remain unverified without a posted notice in the pack.",
    narrativeHi:
      "गलता जी चट्टानी घाटी में मंदिरों और कुंडों की शृंखला है। बंदर पारिस्थितिकी का हिस्सा हैं, चारे की चीज़ नहीं। यह तीर्थ है, चिड़ियाघर या यूनेस्को स्मारक नहीं। कुंड का जल पीने योग्य है, यह दावा हम नहीं करते।",
    lat: 26.9214,
    lng: 75.859,
    city: "Jaipur",
    areaEn: "Galta gorge, east Jaipur",
    areaHi: "गलता घाटी, पूर्व जयपुर",
    unesco: false,
    unescoRef: null,
    imageUrl: "/images/galta-ji.jpg",
    imageCredit: "Illustration generated for YatraSathi",
    dayHint: 3,
  },
  {
    slug: "panna-meena-kund",
    nameEn: "Panna Meena ka Kund",
    nameHi: "पन्ना मीना का कुंड",
    summaryEn:
      "A geometric stepwell near Amer. A water-harvesting structure and photograph site. Descent onto steps may be restricted; treat access as unknown without on-site signage.",
    summaryHi:
      "आमेर के पास ज्यामितीय बावड़ी। जल-संग्रह संरचना और चित्र स्थल। सीढ़ियों पर उतरना वर्जित हो सकता है; बिना सूचनापट के प्रवेश अज्ञात मानें।",
    narrativeEn:
      "Panna Meena ka Kund is a stepwell beside the Amer settlement, known for its zigzag symmetry. Stepwells in this region are historic water architecture. Whether visitors may walk down the steps is a safety and conservation decision that changes; some visitor reports say perimeter viewing only. That operational rule is unverified here. It is not a UNESCO inscription of its own.",
    narrativeHi:
      "पन्ना मीना का कुंड आमेर बस्ती के पास बावड़ी है। सीढ़ियों पर चलना सुरक्षित/अनुमत है या नहीं, यह बदलता रहता है — यहाँ असंपुष्ट। स्वयं यूनेस्को अंकितकरण नहीं।",
    lat: 26.9903,
    lng: 75.8619,
    city: "Jaipur",
    areaEn: "Amer",
    areaHi: "आमेर",
    unesco: false,
    unescoRef: null,
    imageUrl: "/images/panna-meena.jpg",
    imageCredit: "Illustration generated for YatraSathi",
    dayHint: 1,
  },
  {
    slug: "jagat-shiromani",
    nameEn: "Jagat Shiromani Temple",
    nameHi: "जगत शिरोमणि मंदिर",
    summaryEn:
      "A historic temple in Amer town, below the fort. Living shrine in a village street, not a palace museum.",
    summaryHi:
      "आमेर कस्बे में दुर्ग के नीचे ऐतिहासिक मंदिर। गाँव की गली का जीवित देवालय, प्रासाद-संग्रहालय नहीं।",
    narrativeEn:
      "Jagat Shiromani stands in Amer town rather than inside the ticketed fort. It is an active temple. We have not retrieved an ASI or trust notice for photography or offering rules, so those fields stay unverified or unknown. Combine a visit with Amer Fort only if you have time to switch from tourist pace to shrine pace.",
    narrativeHi:
      "जगत शिरोमणि आमेर कस्बे में है, टिकट दुर्ग के अंदर नहीं। सक्रिय मंदिर है। फोटो और चढ़ावे के आधिकारिक सूचनापट हमें नहीं मिले।",
    lat: 26.985,
    lng: 75.851,
    city: "Jaipur",
    areaEn: "Amer town",
    areaHi: "आमेर कस्बा",
    unesco: false,
    unescoRef: null,
    imageUrl: "/images/jagat-shiromani.jpg",
    imageCredit: "Illustration generated for YatraSathi",
    dayHint: 1,
  },
];

const ETIQUETTE_FIELDS = [
  "footwear",
  "head_covering",
  "photography",
  "gendered_access",
  "non_adherent_entry",
  "offering_norms",
  "quiet_hours",
] as const;

function unknownEtiquette(siteSlug: string, field: (typeof ETIQUETTE_FIELDS)[number], en: string, hi: string): EtiquetteRecord {
  return {
    siteSlug,
    field,
    valueEn: en,
    valueHi: hi,
    sourceCode: "src_unknown",
    verifiedAt: null,
    status: "unverified",
  };
}

export const ETIQUETTE: EtiquetteRecord[] = [
  {
    siteSlug: "amer-fort",
    field: "footwear",
    valueEn:
      "Courtyards of the palace-fort are a monument walk: shoes are generally kept on. The Shila Devi shrine inside the complex is a temple — visitor reports say footwear (and often leather) is left outside the sanctum. We do not have the temple’s own posted notice in this pack.",
    valueHi:
      "प्रासाद के आंगन स्मारक हैं — आमतौर पर जूते पहने रहते हैं। परिसर का शिला देवी मंदिर देवालय है; आगंतुक कहते हैं गर्भगृह के बाहर जूते (और अक्सर चर्म वस्तुएँ) छूटते हैं। मंदिर का अपना सूचनापट इस पैक में नहीं है।",
    sourceCode: "src_visitor_amer_temple",
    verifiedAt: "2024-06-26T00:00:00.000Z",
    status: "unverified",
  },
  {
    siteSlug: "amer-fort",
    field: "head_covering",
    valueEn: "No retrieved official rule requires a head covering in the palace courtyards. Temple rooms may expect uncovered heads or modest dress — unknown without the shrine notice.",
    valueHi: "प्रासाद आंगनों में सिर ढकने का आधिकारिक नियम हमें नहीं मिला। मंदिर कक्षों की अपेक्षा अज्ञात है।",
    sourceCode: "src_unknown",
    verifiedAt: null,
    status: "unverified",
  },
  {
    siteSlug: "amer-fort",
    field: "photography",
    valueEn:
      "Still photography is widely reported as allowed in most palace courtyards; tripods, drones and some video may need extra permission. Visitor reports say cameras and phones are not allowed inside the Shila Devi sanctum. Not an ASI circular in this pack.",
    valueHi:
      "अधिकतर प्रासाद आंगनों में स्थिर फोटो की अनुमति बताई जाती है; ट्राइपॉड, ड्रोन, कुछ वीडियो के लिए अलग अनुमति। शिला देवी गर्भगृह में कैमरा/फोन मना बताए जाते हैं। यह पैक में ASI परिपत्र नहीं।",
    sourceCode: "src_visitor_amer_temple",
    verifiedAt: "2024-06-26T00:00:00.000Z",
    status: "unverified",
  },
  {
    siteSlug: "amer-fort",
    field: "gendered_access",
    valueEn: "No retrieved source describes gendered exclusion from the palace-fort public route.",
    valueHi: "प्रासाद के सार्वजनिक मार्ग से किसी लिंग को वंचित रखने का स्रोत हमें नहीं मिला।",
    sourceCode: "src_unknown",
    verifiedAt: null,
    status: "unverified",
  },
  {
    siteSlug: "amer-fort",
    field: "non_adherent_entry",
    valueEn: "The fort is a public monument visit. The inner shrine is a Hindu temple; non-Hindus are commonly welcomed if they follow shrine rules, but that welcome is custom, not a cited by-law here.",
    valueHi: "दुर्ग सार्वजनिक स्मारक है। आंतरिक मंदिर हिंदू देवालय है; अन्य पंथ के आगंतुक प्रायः नियम मानकर आते हैं — यहाँ यह उपनियम-उद्धृत नहीं।",
    sourceCode: "src_visitor_amer_temple",
    verifiedAt: "2024-06-26T00:00:00.000Z",
    status: "unverified",
  },
  {
    siteSlug: "amer-fort",
    field: "offering_norms",
    valueEn: "Offerings belong at the shrine, not on palace balconies. Exact accepted offerings at Shila Devi are unknown in this pack — follow the temple counter.",
    valueHi: "चढ़ावा मंदिर में, प्रासाद की बालकनियों पर नहीं। शिला देवी पर स्वीकृत चढ़ावा इस पैक में अज्ञात है।",
    sourceCode: "src_unknown",
    verifiedAt: null,
    status: "unverified",
  },
  {
    siteSlug: "amer-fort",
    field: "quiet_hours",
    valueEn: "No official quiet-hours timetable retrieved. The shrine has its own aarti rhythm; keep voices low there regardless of fort opening hours.",
    valueHi: "आधिकारिक मौन-घंटे नहीं मिले। मंदिर की आरती की लय अलग है — वहाँ स्वर धीमा रखें।",
    sourceCode: "src_unknown",
    verifiedAt: null,
    status: "unverified",
  },
  {
    siteSlug: "jantar-mantar",
    field: "footwear",
    valueEn: "This is an outdoor observatory monument, not a temple. No retrieved rule requires removing shoes on the instrument plaza.",
    valueHi: "यह खुली वेधशाला स्मारक है, मंदिर नहीं। यंत्र चौक पर जूते उतारने का नियम नहीं मिला।",
    sourceCode: "src_unknown",
    verifiedAt: null,
    status: "unverified",
  },
  {
    siteSlug: "jantar-mantar",
    field: "head_covering",
    valueEn: "No head-covering rule retrieved. A hat for sun is practical, not ritual.",
    valueHi: "सिर ढकने का नियम नहीं मिला। धूप टोपी व्यावहारिक है, धार्मिक नहीं।",
    sourceCode: "src_unknown",
    verifiedAt: null,
    status: "unverified",
  },
  {
    siteSlug: "jantar-mantar",
    field: "photography",
    valueEn: "Visitor photography is commonly practised on the plaza. Climbing or walking on instrument surfaces is a conservation harm, not a photo tip. Drone rules are unknown here.",
    valueHi: "चौक पर फोटो आम है। यंत्रों पर चढ़ना संरक्षण-हानि है। ड्रोन नियम अज्ञात।",
    sourceCode: "src_unknown",
    verifiedAt: null,
    status: "unverified",
  },
  {
    siteSlug: "jantar-mantar",
    field: "gendered_access",
    valueEn: "No gendered restriction retrieved for the monument.",
    valueHi: "स्मारक पर लिंग आधारित रोक नहीं मिली।",
    sourceCode: "src_unknown",
    verifiedAt: null,
    status: "unverified",
  },
  {
    siteSlug: "jantar-mantar",
    field: "non_adherent_entry",
    valueEn: "A scientific monument open as a ticketed historic site. Not a consecrated temple.",
    valueHi: "टिकट वाला वैज्ञानिक-ऐतिहासिक स्मारक, प्रतिष्ठित मंदिर नहीं।",
    sourceCode: "src_unesco_1338",
    verifiedAt: "2010-07-31T00:00:00.000Z",
    status: "verified",
  },
  {
    siteSlug: "jantar-mantar",
    field: "offering_norms",
    valueEn: "Not a shrine. Do not leave flowers, oil or coins on the yantras.",
    valueHi: "यह देवालय नहीं। यंत्रों पर फूल, तेल या सिक्के न छोड़ें।",
    sourceCode: "src_unknown",
    verifiedAt: null,
    status: "unverified",
  },
  {
    siteSlug: "jantar-mantar",
    field: "quiet_hours",
    valueEn: "Unknown. UNESCO notes tourism pressure as a management challenge; keep off the instruments even when the plaza is busy.",
    valueHi: "अज्ञात। यूनेस्को पर्यटन दबाव को चुनौती मानता है; भीड़ में भी यंत्रों पर न चढ़ें।",
    sourceCode: "src_unesco_1338",
    verifiedAt: "2010-07-31T00:00:00.000Z",
    status: "verified",
  },
  {
    siteSlug: "jama-masjid",
    field: "footwear",
    valueEn: "Widely observed mosque custom in India is to remove shoes before the prayer hall or courtyard carpet. A Jaipur Jama Masjid posted notice was not retrieved.",
    valueHi: "भारत में मस्जिद की व्यापक प्रथा है नमाज़ हाल/आंगन से पहले जूते उतारना। जयपुर जामा मस्जिद का सूचनापट नहीं मिला।",
    sourceCode: "src_general_mosque_custom",
    verifiedAt: null,
    status: "unverified",
  },
  {
    siteSlug: "jama-masjid",
    field: "head_covering",
    valueEn: "Many Indian mosques ask women visitors to cover hair; men should not wear caps inside as fashion. This mosque’s own rule is unknown — carry a scarf and follow the caretaker.",
    valueHi: "कई मस्जिदों में महिला आगंतुकों से बाल ढकने को कहा जाता है। इस मस्जिद का अपना नियम अज्ञात है — स्कार्फ रखें, मुतवल्ली की बात मानें।",
    sourceCode: "src_general_mosque_custom",
    verifiedAt: null,
    status: "unverified",
  },
  {
    siteSlug: "jama-masjid",
    field: "photography",
    valueEn: "Unknown for this building. Never photograph people in prayer without clear permission. Do not assume Delhi Jama Masjid camera fees apply.",
    valueHi: "इस भवन के लिए अज्ञात। नमाज़ पढ़ते लोगों का बिना अनुमति चित्र न लें। दिल्ली की कैमरा फीस यहाँ न मानें।",
    sourceCode: "src_unknown",
    verifiedAt: null,
    status: "unverified",
  },
  {
    siteSlug: "jama-masjid",
    field: "gendered_access",
    valueEn: "Unknown. Some mosques have separate women’s areas or limit tourist entry at Jumu’ah. Ask; do not push past a barrier.",
    valueHi: "अज्ञात। कुछ मस्जिदों में महिलाएँ अलग क्षेत्र या जुमे पर पर्यटक सीमा। पूछें; बाधा पार न करें।",
    sourceCode: "src_unknown",
    verifiedAt: null,
    status: "unverified",
  },
  {
    siteSlug: "jama-masjid",
    field: "non_adherent_entry",
    valueEn: "Unknown for tourist hours. Non-Muslim visitors are often welcomed between prayers if dressed modestly; this is custom, not a retrieved fatwa or notice for Jaipur.",
    valueHi: "पर्यटक घंटे अज्ञात। नमाज़ के बीच सादे वस्त्र में ग़ैर-मुस्लिम आगंतुक अक्सर स्वागत योग्य — यह प्रथा है, जयपुर का उद्धृत फ़तवा नहीं।",
    sourceCode: "src_general_mosque_custom",
    verifiedAt: null,
    status: "unverified",
  },
  {
    siteSlug: "jama-masjid",
    field: "offering_norms",
    valueEn: "This is not a temple. Do not bring puja trays. If you wish to give, ask whether a sadaqah box exists; do not leave cash on carpets.",
    valueHi: "यह मंदिर नहीं, पूजा की थाली न लाएँ। देना हो तो पूछें कि सदक़ा पेटी है या नहीं।",
    sourceCode: "src_general_mosque_custom",
    verifiedAt: null,
    status: "unverified",
  },
  {
    siteSlug: "jama-masjid",
    field: "quiet_hours",
    valueEn: "Salah times are quiet hours in practice. Tourist wandering during prayer is disrespect, even if no sign says so.",
    valueHi: "नमाज़ के समय व्यवहार में मौन घंटे हैं। बिना तख्ती के भी नमाज़ के बीच पर्यटन असम्मान है।",
    sourceCode: "src_general_mosque_custom",
    verifiedAt: null,
    status: "unverified",
  },
  {
    siteSlug: "govind-dev-ji",
    field: "footwear",
    valueEn: "Hindu temple custom: shoes off before the shrine floor. Not a retrieved temple circular.",
    valueHi: "हिंदू मंदिर प्रथा: गर्भगृह तल से पहले जूते उतरते हैं। मंदिर परिपत्र नहीं मिला।",
    sourceCode: "src_general_temple_custom",
    verifiedAt: null,
    status: "unverified",
  },
  {
    siteSlug: "govind-dev-ji",
    field: "head_covering",
    valueEn: "Unknown. Modest dress covering shoulders and knees is the safer custom.",
    valueHi: "अज्ञात। कंधे और घुटने ढकना सुरक्षित प्रथा है।",
    sourceCode: "src_general_temple_custom",
    verifiedAt: null,
    status: "unverified",
  },
  {
    siteSlug: "govind-dev-ji",
    field: "photography",
    valueEn: "Unknown. Many Krishna temples forbid sanctum photography, especially during aarti. Assume no until a sevak says yes.",
    valueHi: "अज्ञात। कई कृष्ण मंदिर गर्भगृह फोटो मना करते हैं, आरती में विशेषकर। जब तक सेवक हाँ न कहे, ना मानें।",
    sourceCode: "src_unknown",
    verifiedAt: null,
    status: "unverified",
  },
  {
    siteSlug: "govind-dev-ji",
    field: "gendered_access",
    valueEn: "Unknown. Queue lines may be separated at peak aarti; follow marshals.",
    valueHi: "अज्ञात। भीड़ वाली आरती में पंक्तियाँ अलग हो सकती हैं।",
    sourceCode: "src_unknown",
    verifiedAt: null,
    status: "unverified",
  },
  {
    siteSlug: "govind-dev-ji",
    field: "non_adherent_entry",
    valueEn: "Unknown official policy. Visitors of other faiths commonly enter Indian temple courtyards if they follow dress and shoe rules; sanctum limits vary.",
    valueHi: "आधिकारिक नीति अज्ञात। अन्य पंथ के आगंतुक प्रायः वस्त्र-जूता नियम मानकर आंगन में आते हैं।",
    sourceCode: "src_general_temple_custom",
    verifiedAt: null,
    status: "unverified",
  },
  {
    siteSlug: "govind-dev-ji",
    field: "offering_norms",
    valueEn: "Unknown exact list. Follow the temple counter; do not push flowers onto the deity yourself if a priest is receiving bhog.",
    valueHi: "सूची अज्ञात। मंदिर काउंटर देखें; पुजारी भोग ले रहे हों तो स्वयं मूर्ति पर फूल न धक्का दें।",
    sourceCode: "src_unknown",
    verifiedAt: null,
    status: "unverified",
  },
  {
    siteSlug: "govind-dev-ji",
    field: "quiet_hours",
    valueEn: "Aarti is loud by design (bells, singing). The quiet obligation is on visitors: no phone calls in the shrine.",
    valueHi: "आरती घंटियों से मुखर होती है। मौन आगंतुक पर है: मंदिर में फोन कॉल नहीं।",
    sourceCode: "src_unknown",
    verifiedAt: null,
    status: "unverified",
  },
  {
    siteSlug: "birla-mandir",
    field: "footwear",
    valueEn: "Temple custom: remove shoes before the marble mandapa. Unverified by a photographed notice in this pack.",
    valueHi: "मंदिर प्रथा: संगमरमर मंडप से पहले जूते उतरते हैं। इस पैक में सूचनापट चित्र नहीं।",
    sourceCode: "src_general_temple_custom",
    verifiedAt: null,
    status: "unverified",
  },
  {
    siteSlug: "birla-mandir",
    field: "head_covering",
    valueEn: "Unknown. Modest clothing is expected in practice.",
    valueHi: "अज्ञात। व्यवहार में सादे वस्त्र अपेक्षित।",
    sourceCode: "src_general_temple_custom",
    verifiedAt: null,
    status: "unverified",
  },
  {
    siteSlug: "birla-mandir",
    field: "photography",
    valueEn: "Unknown. Exterior photographs are common; sanctum rules must be read on site.",
    valueHi: "अज्ञात। बाहरी चित्र आम हैं; गर्भगृह नियम स्थल पर पढ़ें।",
    sourceCode: "src_unknown",
    verifiedAt: null,
    status: "unverified",
  },
  {
    siteSlug: "birla-mandir",
    field: "gendered_access",
    valueEn: "No retrieved gendered exclusion for the public temple.",
    valueHi: "सार्वजनिक मंदिर पर लिंग रोक नहीं मिली।",
    sourceCode: "src_unknown",
    verifiedAt: null,
    status: "unverified",
  },
  {
    siteSlug: "birla-mandir",
    field: "non_adherent_entry",
    valueEn: "Unknown official text. Modern Birla temples are often open to visitors of all faiths who follow temple etiquette.",
    valueHi: "आधिकारिक पाठ अज्ञात। आधुनिक बिड़ला मंदिर प्रायः शिष्टाचार मानने वाले सभी पंथ के आगंतुकों के लिए खुले बताए जाते हैं।",
    sourceCode: "src_general_temple_custom",
    verifiedAt: null,
    status: "unverified",
  },
  {
    siteSlug: "birla-mandir",
    field: "offering_norms",
    valueEn: "Unknown. Use the official counter; do not improvise aarti trays from the street.",
    valueHi: "अज्ञात। आधिकारिक काउंटर से लें।",
    sourceCode: "src_unknown",
    verifiedAt: null,
    status: "unverified",
  },
  {
    siteSlug: "birla-mandir",
    field: "quiet_hours",
    valueEn: "Unknown timetable. Keep voices low in the sanctum always.",
    valueHi: "समय-सारिणी अज्ञात। गर्भगृह में स्वर हमेशा धीमा।",
    sourceCode: "src_unknown",
    verifiedAt: null,
    status: "unverified",
  },
];

const remainingSlugs = [
  "hawa-mahal",
  "city-palace",
  "jaigarh-fort",
  "nahargarh-fort",
  "albert-hall",
  "jal-mahal",
  "galta-ji",
  "panna-meena-kund",
  "jagat-shiromani",
] as const;

const genericMonument: Record<(typeof ETIQUETTE_FIELDS)[number], [string, string]> = {
  footwear: [
    "No retrieved rule requires removing shoes on outdoor monument paths. If a shrine is present, treat it as a temple and look for a shoe rack.",
    "बाहरी स्मारक पथ पर जूते उतारने का नियम नहीं मिला। यदि देवालय हो तो जूता-रैक देखें।",
  ],
  head_covering: [
    "No head-covering by-law retrieved for this monument.",
    "इस स्मारक पर सिर ढकने का उपनियम नहीं मिला।",
  ],
  photography: [
    "Personal still photography is commonly practised at outdoor viewpoints. Drones, tripods and professional shoots often need extra permits in Rajasthan — not verified here for this site. Never photograph people at worship without permission.",
    "बाहरी दृश्यों पर व्यक्तिगत फोटो आम है। ड्रोन/ट्राइपॉड/व्यावसायिक शूट के लिए राजस्थान में अक्सर अलग अनुमति — यहाँ सत्यापित नहीं। पूजा करते लोगों का बिना अनुमति चित्र न लें।",
  ],
  gendered_access: [
    "No gendered public-access restriction retrieved.",
    "सार्वजनिक प्रवेश पर लिंग रोक नहीं मिली।",
  ],
  non_adherent_entry: [
    "Ticketed or open civic monuments are generally visitable regardless of faith. Inner working shrines are different — ask there.",
    "टिकट/नगर स्मारक प्रायः पंथ निरपेक्ष घूमे जा सकते हैं। आंतरिक सक्रिय देवालय अलग हैं — वहाँ पूछें।",
  ],
  offering_norms: [
    "Not a designated offering site in this pack. Do not leave food, oil or plastic on historic masonry.",
    "इस पैक में निर्धारित चढ़ावा स्थल नहीं। चिनाई पर भोजन, तेल, प्लास्टिक न छोड़ें।",
  ],
  quiet_hours: [
    "No quiet-hours timetable retrieved.",
    "मौन-घंटों की सारिणी नहीं मिली।",
  ],
};

for (const slug of remainingSlugs) {
  for (const field of ETIQUETTE_FIELDS) {
    const already = ETIQUETTE.some((row) => row.siteSlug === slug && row.field === field);
    if (already) continue;
    const [en, hi] = genericMonument[field];
    ETIQUETTE.push(unknownEtiquette(slug, field, en, hi));
  }
}

export const KNOWLEDGE: KnowledgeRecord[] = [
  {
    siteSlug: "jantar-mantar",
    claimEn:
      "The Jantar Mantar, Jaipur, is an astronomical observation site built in the early 18th century. It includes a set of some twenty main fixed instruments.",
    claimHi:
      "जयपुर का जंतर मंतर 18वीं सदी के आरंभ में बनी खगोलीय वेधशाला है। इसमें लगभग बीस मुख्य स्थिर यंत्र हैं।",
    sourceCode: "src_unesco_1338",
    verifiedAt: "2010-07-31T00:00:00.000Z",
    status: "verified",
    tags: "jantar mantar observatory instruments 18th century jai singh unesco",
  },
  {
    siteSlug: "jantar-mantar",
    claimEn:
      "UNESCO inscribed The Jantar Mantar, Jaipur on the World Heritage List on 31 July 2010 under criteria (iii) and (iv).",
    claimHi:
      "यूनेस्को ने जयपुर के जंतर मंतर को 31 जुलाई 2010 को मानदंड (iii) और (iv) के अंतर्गत विश्व धरोहर सूची में अंकित किया।",
    sourceCode: "src_unesco_1338",
    verifiedAt: "2010-07-31T00:00:00.000Z",
    status: "verified",
    tags: "jantar mantar unesco 2010 inscription criteria iii iv",
  },
  {
    siteSlug: "jantar-mantar",
    claimEn:
      "UNESCO describes the Jaipur observatory as the most significant and best preserved set of fixed monumental instruments built in India in the first half of the 18th century, designed for naked-eye positional astronomy.",
    claimHi:
      "यूनेस्को जयपुर वेधशाला को 18वीं सदी के पूर्वार्ध में भारत में बने स्थिर स्मारकीय यंत्रों का सबसे महत्त्वपूर्ण और सर्वाधिक संरक्षित समूह बताता है, नग्न नेत्र स्थिति-खगोल के लिए।",
    sourceCode: "src_unesco_1338",
    verifiedAt: "2010-07-31T00:00:00.000Z",
    status: "verified",
    tags: "jantar mantar naked eye instruments preservation",
  },
  {
    siteSlug: "jantar-mantar",
    claimEn:
      "The Jantar Mantar is protected under the Rajasthan Monuments Archaeological Site and Antiquities Act, 1961, and was designated a monument of national importance in 1968.",
    claimHi:
      "जंतर मंतर राजस्थान स्मारक पुरातत्त्व स्थल एवं प्राचीन वस्तु अधिनियम, 1961 के अंतर्गत संरक्षित है और 1968 में राष्ट्रीय महत्व का स्मारक घोषित हुआ।",
    sourceCode: "src_unesco_1338_protection",
    verifiedAt: "2010-07-31T00:00:00.000Z",
    status: "verified",
    tags: "jantar mantar protection act 1961 national importance 1968",
  },
  {
    siteSlug: "jantar-mantar",
    claimEn:
      "UNESCO notes that tourism development and nearby urban change are management challenges for the property, and that authenticity is generally clearer for astronomical function than for every plaster or graduation after long repair.",
    claimHi:
      "यूनेस्को कहता है कि पर्यटन और आसपास का नगर विकास प्रबंधन चुनौतियाँ हैं, और लंबी मरम्मत के बाद प्रत्येक प्लास्टर/अंकन की प्रामाणिकता खगोलीय कार्य जितनी स्पष्ट नहीं।",
    sourceCode: "src_unesco_1338",
    verifiedAt: "2010-07-31T00:00:00.000Z",
    status: "verified",
    tags: "jantar mantar authenticity conservation tourism",
  },
  {
    siteSlug: "amer-fort",
    claimEn:
      "Amer (Amber) Fort in Jaipur is one of six forts inscribed in 2013 as the UNESCO World Heritage serial property Hill Forts of Rajasthan, under criteria (ii) and (iii).",
    claimHi:
      "जयपुर का आमेर (अंबर) दुर्ग 2013 में यूनेस्को विश्व धरोहर क्रमबद्ध संपत्ति ‘राजस्थान के पहाड़ी दुर्ग’ के छह दुर्गों में से एक है, मानदंड (ii) और (iii)।",
    sourceCode: "src_unesco_247",
    verifiedAt: "2013-06-21T00:00:00.000Z",
    status: "verified",
    tags: "amer amber fort unesco 2013 hill forts rajasthan",
  },
  {
    siteSlug: "amer-fort",
    claimEn:
      "The six forts named in the Hill Forts of Rajasthan World Heritage listing are Chittorgarh, Kumbhalgarh, Ranthambore (Sawai Madhopur), Gagron (Jhalawar), Amber (Jaipur) and Jaisalmer.",
    claimHi:
      "राजस्थान के पहाड़ी दुर्ग सूची के छह नाम: चित्तौड़गढ़, कुंभलगढ़, रणथंभौर (सवाई माधोपुर), गागरोन (झालावाड़), आमेर (जयपुर) और जैसलमेर।",
    sourceCode: "src_hindu_2013_forts",
    verifiedAt: "2013-06-22T00:00:00.000Z",
    status: "verified",
    tags: "hill forts six chittorgarh kumbhalgarh ranthambore gagron amber jaisalmer",
  },
  {
    siteSlug: "amer-fort",
    claimEn:
      "UNESCO’s Hill Forts of Rajasthan property was inscribed at the 37th session of the World Heritage Committee in Phnom Penh in June 2013.",
    claimHi:
      "यूनेस्को की यह संपत्ति जून 2013 में नॉम पेन्ह में विश्व धरोहर समिति के 37वें सत्र में अंकित हुई।",
    sourceCode: "src_unesco_247",
    verifiedAt: "2013-06-21T00:00:00.000Z",
    status: "verified",
    tags: "unesco 37th session 2013 phnom penh hill forts",
  },
  {
    siteSlug: "hawa-mahal",
    claimEn:
      "The historic walled city of Jaipur was inscribed on the UNESCO World Heritage List in 2019 as Jaipur City, Rajasthan. Hawa Mahal stands inside that urban ensemble; it is not listed as a separate World Heritage Site in this pack.",
    claimHi:
      "जयपुर का ऐतिहासिक दीवारों वाला शहर 2019 में ‘जयपुर सिटी, राजस्थान’ के रूप में यूनेस्को विश्व धरोहर बना। हवा महल उसी नगर समूह में है; इस पैक में वह अलग विश्व धरोहर नहीं।",
    sourceCode: "src_unesco_1605",
    verifiedAt: "2019-07-06T00:00:00.000Z",
    status: "verified",
    tags: "hawa mahal jaipur city unesco 2019 walled city",
  },
  {
    siteSlug: "city-palace",
    claimEn:
      "Jaipur was founded as a planned capital in the early 18th century under Sawai Jai Singh II. UNESCO’s 2019 inscription recognises the walled city as an urban plan, not a room-by-room catalogue of City Palace interiors.",
    claimHi:
      "जयपुर 18वीं सदी के आरंभ में सवाई जय सिंह द्वितीय की नियोजित राजधानी के रूप में बसा। 2019 का यूनेस्को अंकितकरण नगर योजना का है, सिटी पैलेस के कमरों की सूची का नहीं।",
    sourceCode: "src_unesco_1605",
    verifiedAt: "2019-07-06T00:00:00.000Z",
    status: "verified",
    tags: "city palace jaipur planned city 1727 jai singh unesco 2019",
  },
  {
    siteSlug: "govind-dev-ji",
    claimEn:
      "Govind Dev Ji temple stands within the historic urban ensemble of Jaipur’s walled city, which UNESCO inscribed in 2019. The temple itself is not a separate World Heritage listing in this pack.",
    claimHi:
      "गोविंद देव जी मंदिर जयपुर के दीवारों वाले शहर के ऐतिहासिक नगर समूह में है, जिसे यूनेस्को ने 2019 में अंकित किया। मंदिर स्वयं अलग विश्व धरोहर नहीं।",
    sourceCode: "src_unesco_1605",
    verifiedAt: "2019-07-06T00:00:00.000Z",
    status: "verified",
    tags: "govind dev ji temple walled city unesco 2019",
  },
  {
    siteSlug: "jama-masjid",
    claimEn:
      "Jaipur’s Jama Masjid stands inside the walled city inscribed by UNESCO in 2019 as Jaipur City, Rajasthan. The mosque is not a separate World Heritage listing in this pack.",
    claimHi:
      "जयपुर की जामा मस्जिद 2019 में अंकित दीवारों वाले शहर में है। मस्जिद अलग विश्व धरोहर सूची नहीं।",
    sourceCode: "src_unesco_1605",
    verifiedAt: "2019-07-06T00:00:00.000Z",
    status: "verified",
    tags: "jama masjid jaipur walled city unesco 2019",
  },
  {
    siteSlug: "jaigarh-fort",
    claimEn:
      "Jaigarh Fort is not one of the six forts named in the 2013 UNESCO Hill Forts of Rajasthan inscription (Chittorgarh, Kumbhalgarh, Ranthambore, Gagron, Amber, Jaisalmer).",
    claimHi:
      "जयगढ़ दुर्ग 2013 की यूनेस्को सूची के छह नामित दुर्गों (चित्तौड़गढ़, कुंभलगढ़, रणथंभौर, गागरोन, आमेर, जैसलमेर) में नहीं है।",
    sourceCode: "src_hindu_2013_forts",
    verifiedAt: "2013-06-22T00:00:00.000Z",
    status: "verified",
    tags: "jaigarh not unesco six forts amber nearby",
  },
  {
    siteSlug: "nahargarh-fort",
    claimEn:
      "Nahargarh Fort is not one of the six forts named in the 2013 UNESCO Hill Forts of Rajasthan inscription.",
    claimHi:
      "नाहरगढ़ दुर्ग 2013 की यूनेस्को पहाड़ी दुर्ग सूची के छह नामों में नहीं है।",
    sourceCode: "src_hindu_2013_forts",
    verifiedAt: "2013-06-22T00:00:00.000Z",
    status: "verified",
    tags: "nahargarh not unesco six forts",
  },
  {
    siteSlug: null,
    claimEn:
      "YatraSathi does not publish restaurant rankings, hotel star ratings, paid ‘top 10’ lists, or crowd scores from location tracking. Unknown is a valid answer.",
    claimHi:
      "यात्रासथी रेस्तराँ रैंकिंग, होटल स्टार, सशुल्क टॉप-10 या लोकेशन ट्रैकिंग से भीड़ अंक नहीं छापता। अज्ञात एक वैध उत्तर है।",
    sourceCode: "src_unknown",
    verifiedAt: null,
    status: "verified",
    tags: "ratings reviews restaurants hotels ranking policy unknown",
  },
  {
    siteSlug: null,
    claimEn:
      "Emergency number 112 in India is a public telephone service. This software cannot dispatch police, ambulance or fire crews, cannot guarantee a tower connection, and cannot stay on the line for you.",
    claimHi:
      "भारत में 112 सार्वजनिक टेलीफोन सेवा है। यह सॉफ़्टवेयर पुलिस, एम्बुलेंस या अग्नि चालक दल नहीं भेज सकता, टॉवर कनेक्शन की गारंटी नहीं दे सकता।",
    sourceCode: "src_unknown",
    verifiedAt: null,
    status: "verified",
    tags: "sos 112 emergency dispatch safety",
  },
];

export const DEFAULT_ITINERARY = [
  { dayNumber: 1, siteSlug: "amer-fort", notes: "Fort first, shrine pace at Shila Devi." },
  { dayNumber: 1, siteSlug: "jaigarh-fort", notes: "Ridge walk after Amer." },
  { dayNumber: 1, siteSlug: "panna-meena-kund", notes: "View from the rim unless signage allows steps." },
  { dayNumber: 1, siteSlug: "jagat-shiromani", notes: "Amer town temple — shoes off." },
  { dayNumber: 2, siteSlug: "city-palace", notes: "Living palace; check which courtyards are open." },
  { dayNumber: 2, siteSlug: "jantar-mantar", notes: "Do not climb the yantras." },
  { dayNumber: 2, siteSlug: "hawa-mahal", notes: "Street facade of the 2019 walled city." },
  { dayNumber: 2, siteSlug: "govind-dev-ji", notes: "Aarti crowds; phones down until asked." },
  { dayNumber: 2, siteSlug: "jama-masjid", notes: "Not a monument hop during salah." },
  { dayNumber: 3, siteSlug: "nahargarh-fort", notes: "Evening ridge; no wildlife baiting." },
  { dayNumber: 3, siteSlug: "jal-mahal", notes: "Embankment view; interior access unknown." },
  { dayNumber: 3, siteSlug: "albert-hall", notes: "Ask the museum for object provenance." },
  { dayNumber: 3, siteSlug: "birla-mandir", notes: "Living temple below Moti Dungri." },
  { dayNumber: 3, siteSlug: "galta-ji", notes: "Kunds and monkeys — do not feed." },
];
