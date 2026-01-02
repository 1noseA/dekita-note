# できたノート 実装計画書

localStorage を活用した、日々の「できたこと」を記録する Web アプリケーションの実装計画です。

## 技術スタック
- **Frontend**: Vite + React + TypeScript
- **Styling**: TailwindCSS + shadcn/ui + Lucide React
- **Routing**: React Router
- **Persistence**: localStorage

## 主要コンポーネント
1.  **Storage Layer (`src/lib/storage.ts`)**: `AppStorage` 型に基づいたデータの読み書きを担当。
2.  **Color Engine (`src/lib/color-engine.ts`)**: 記録内容からカレンダーに表示する色を算出。
3.  **App Context (`src/context/AppStoreContext.tsx`)**: ログインユーザーの状態とデータの同期を管理。

## 画面設計
- `LandingPage`: 未ログイン時の概要説明。
- `CalendarPage`: 月間の色の変化をグラフィカルに表示。
- `RecordEditorPage`: 3つの基本項目 + 追加可能な実績入力フォーム。
- `SettingsPage`: 表示項目のトグル設定。

## 検証計画
- ユーザー切り替え (user_1, user_2) でデータが混ざらないことを確認。
- ページリロード後もデータが保持されていることを確認。
- 記録保存後、カレンダーの色が正しく更新されることを確認。
