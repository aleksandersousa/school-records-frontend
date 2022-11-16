interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_REACT_APP_API_URL_DEVELOPMENT: string;
  readonly VITE_REACT_APP_API_URL_PRODUCTION: string;

  readonly VITE_BASE_API_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
