import { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { Locale } from "@prisma/client";

function getLocale(request: NextRequest) {
  const locales = Object.values(Locale).map((locale) => locale.toLowerCase());
  const acceptLanguages = request.headers.get("accept-language");
  
  if (!acceptLanguages) {
    return Locale.ES.toLowerCase();
  }

  const headers = { "accept-language": acceptLanguages };

  const languages = new Negotiator({
    headers,
  }).languages();

  const defaultLocale = Locale.ES.toLowerCase();

  return match(languages, locales, defaultLocale);
}

export { getLocale };
