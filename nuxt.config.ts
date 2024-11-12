import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-06",
  devtools: { enabled: true },
  typescript: {
    shim: false, // 型定義ファイルを生成しない
    strict: true, // 厳格な型チェックを有効化
    typeCheck: true, // 型チェックを有効化
  },
});
