/// <reference types="vite/client" />
declare global {
  interface ImportMetaEnv extends Readonly<Record<string, string>> {
    readonly VITE_APP_APIURL: string;
  }
}
