import en from "../locales/en.json";
import ja from "../locales/ja.json";
import fr from "../locales/fr.json";
// import de from "../locales/de.json";
// import es from "../locales/es.json";
// import hi from "../locales/hi.json";

export const messages = {
  en,
  ja,
  fr,
  // de,
  // es,
  // hi,
};

export type Language = keyof typeof messages;