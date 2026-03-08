import { createContext, useContext, useState, useCallback } from "react";

type Language = "en" | "hi" | "gu";

type Translations = Record<string, Record<Language, string>>;

const translations: Translations = {
  // Navbar
  "nav.home": { en: "Home", hi: "होम", gu: "હોમ" },
  "nav.services": { en: "Services", hi: "सेवाएं", gu: "સેવાઓ" },
  "nav.categories": { en: "Categories", hi: "श्रेणियाँ", gu: "શ્રેણીઓ" },
  "nav.strategy": { en: "Strategy", hi: "रणनीति", gu: "વ્યૂહરચના" },
  "nav.freeTools": { en: "Free Tools", hi: "मुफ़्त उपकरण", gu: "મફત ટૂલ્સ" },
  "nav.academy": { en: "Academy", hi: "अकादमी", gu: "એકેડેમી" },
  "nav.blog": { en: "Blog", hi: "ब्लॉग", gu: "બ્લોગ" },
  "nav.contact": { en: "Contact", hi: "संपर्क", gu: "સંપર્ક" },
  "nav.getStarted": { en: "Get Started", hi: "शुरू करें", gu: "શરૂ કરો" },
  // Hero
  "hero.title": { en: "Digital Marketing Agency", hi: "डिजिटल मार्केटिंग एजेंसी", gu: "ડિજિટલ માર્કેટિંગ એજન્સી" },
  "hero.subtitle": { en: "in Ahmedabad", hi: "अहमदाबाद में", gu: "અમદાવાદમાં" },
  "hero.cta": { en: "Get Free Consultation", hi: "मुफ़्त परामर्श प्राप्त करें", gu: "મફત પરામર્શ મેળવો" },
  // Services
  "services.title": { en: "Our Services", hi: "हमारी सेवाएं", gu: "અમારી સેવાઓ" },
  "services.subtitle": { en: "Comprehensive digital solutions", hi: "व्यापक डिजिटल समाधान", gu: "વ્યાપક ડિજિટલ સમાધાન" },
  // About
  "about.title": { en: "About Us", hi: "हमारे बारे में", gu: "અમારા વિશે" },
  // Contact
  "contact.title": { en: "Contact Us", hi: "हमसे संपर्क करें", gu: "અમારો સંપર્ક કરો" },
  "contact.name": { en: "Your Name", hi: "आपका नाम", gu: "તમારું નામ" },
  "contact.email": { en: "Email Address", hi: "ईमेल पता", gu: "ઇમેઇલ સરનામું" },
  "contact.message": { en: "Message", hi: "संदेश", gu: "સંદેશ" },
  "contact.send": { en: "Send Message", hi: "संदेश भेजें", gu: "સંદેશ મોકલો" },
  // Footer
  "footer.rights": { en: "All rights reserved", hi: "सर्वाधिकार सुरक्षित", gu: "બધા અધિકારો સુરક્ષિત" },
  // Common
  "common.learnMore": { en: "Learn More", hi: "और जानें", gu: "વધુ જાણો" },
  "common.viewAll": { en: "View All", hi: "सभी देखें", gu: "બધા જુઓ" },
  "common.readMore": { en: "Read More", hi: "और पढ़ें", gu: "વધુ વાંચો" },
  // Quote Calculator
  "quote.title": { en: "Get Instant Quote", hi: "तुरंत कोटेशन प्राप्त करें", gu: "તાત્કાલિક ક્વોટ મેળવો" },
  "quote.subtitle": { en: "Select services and get an estimate", hi: "सेवाएं चुनें और अनुमान प्राप्त करें", gu: "સેવાઓ પસંદ કરો અને અંદાજ મેળવો" },
};

const LANGUAGE_LABELS: Record<Language, string> = {
  en: "EN",
  hi: "हि",
  gu: "ગુ",
};

type I18nContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languages: typeof LANGUAGE_LABELS;
};

const I18nContext = createContext<I18nContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
  languages: LANGUAGE_LABELS,
});

export const useI18n = () => useContext(I18nContext);

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("dibull-lang") as Language) || "en";
    }
    return "en";
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("dibull-lang", lang);
  }, []);

  const t = useCallback(
    (key: string) => translations[key]?.[language] || translations[key]?.en || key,
    [language]
  );

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, languages: LANGUAGE_LABELS }}>
      {children}
    </I18nContext.Provider>
  );
};
