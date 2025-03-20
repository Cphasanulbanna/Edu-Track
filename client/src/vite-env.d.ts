/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_CAPTCHA_SITE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
