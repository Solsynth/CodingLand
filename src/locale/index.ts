import { createI18n } from "vue-i18n"
import enUS from "@/locale/en-US"

export const locale = createI18n({
  locale: navigator.language,
  fallbackLocale: "en-US",
  messages: {
    "en-US": enUS
  }
})