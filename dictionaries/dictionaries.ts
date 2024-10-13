import "server-only";

const dictionaries = {
  header: async (lang: "en" | "es") => {
    if (lang === "en") {
      return await import(`./layout/header/en.json`).then(
        (module) => module.default
      );
    } else {
      return await import(`./layout/header/es.json`).then(
        (module) => module.default
      );
    }
  },
  home: async (lang: "en" | "es") => {
    if (lang === "en") {
      return await import(`./pages/home/en.json`).then(
        (module) => module.default
      );
    } else {
      return await import(`./pages/home/es.json`).then(
        (module) => module.default
      );
    }
  },
};

export const getDictionary = async (lang: "header" | "home", key: "en" | "es") =>
  await dictionaries[lang](key);
