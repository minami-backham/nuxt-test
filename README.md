# Version

Node: v20.13.1

# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## ディレクトリ構造

/components
--/Chart
---/LineChart.vue - 折れ線グラフ描画用コンポーネント
--/Qr
---/QrCodeGenerator.vue - QR コード生成用コンポーネント
/composables
--/useWeather.ts - 気象データ取得用カスタムフック
/pages
--/index.vue - ログイン画面
--/tower_charts
---/index.vue - グラフ一覧画面（メイン画面）
/public - 静的ファイル
/server - サーバー関連ファイル
--/api - API エンドポイント
---/weather.ts - 気象データ取得用 API
/types - 型定義ファイル
--/weatherTypes.ts - 気象データ用型定義
