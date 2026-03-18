# 縁陣（Enjin）ランディングページ

> 出会いが採用を変える。

## プロジェクト概要

採用支援サービス「縁陣（Enjin）」のランディングページです。  
採用の構造的課題（離職・ミスマッチ・主体性の欠如）を「出会いの設計」という切り口で解決するサービスの紹介LPです。

---

## 完成済み機能

- **全10セクション構成** のシングルページLP
  - SEC01: ヒーロービジュアル（グロー・サークルアニメーション）
  - SEC02: 採用の現実（数字・コスト内訳）
  - SEC03: 問題の本質（3つの穴・悪循環図・突破口）
  - SEC04: サービス詳細（タブ切り替え：Encounter / Immerse / Transform）
  - SEC05: 導入効果（Before / After カード）
  - SEC06: 根拠・実績（研究知見・創業者の言葉・先行モニター案内）
  - SEC07: 差別化（求人媒体・採用代行との違い）
  - SEC08: 実施体制（チームプロフィール）
  - SEC09: 料金・FAQ（アコーディオン）
  - SEC10: 最終CTA
- **ナビゲーション**: スクロールで背景半透明化
- **フローティングCTA**: スクロール400px以降に表示
- **カウンターアニメーション**: 33.8% が数字ロールアップ
- **スクロールRevealアニメーション**: IntersectionObserver による順次フェードイン
- **サービスタブ**: Encounter / Immerse / Transform の切り替え
- **FAQアコーディオン**: クリックで開閉
- **スムーススクロール**: アンカーリンク全対応
- **パララックス**: ヒーロー背景の軽い縦揺れ
- **コスト行ホバー**: 行ハイライト
- **レスポンシブ対応**: モバイル・タブレット・PC

---

## ファイル構成

```
index.html       メインLP（全セクション）
css/
  style.css      全スタイル（CSS変数・レスポンシブ含む）
js/
  main.js        インタラクション全般
README.md        本ドキュメント
```

---

## 主要エントリーポイント

| パス | 説明 |
|------|------|
| `index.html` | LP トップ（唯一のページ） |
| `index.html#sec01` | ヒーロー |
| `index.html#sec04` | サービス詳細 |
| `index.html#sec06` | 実績・根拠 |
| `index.html#sec09` | 料金・FAQ |
| `index.html#sec10` | お問い合わせCTA |

---

## 未実装 / 要対応事項

- [ ] Google フォームURLの差し替え（`https://forms.google.com/` → 実際の予約フォームURL）
- [ ] サービス資料PDFのリンク（`#sec04` → 実際のPDFファイルまたはダウンロードページ）
- [ ] OGP画像・Twitter Card メタタグの追加
- [ ] Google Analytics / タグマネージャーの設置
- [ ] ファビコン設定

---

## 推奨される次のステップ

1. `index.html` 内 `https://forms.google.com/` を実際の予約フォームURLに変更
2. OGPタグ・SNSシェア設定の追加
3. Googleアナリティクスによるアクセス計測
4. 問い合わせフォームページの別途作成（必要に応じて）
5. Publishタブからデプロイして公開URLを取得

---

## 技術スタック

- HTML5 / CSS3 / Vanilla JavaScript（ES5互換）
- Google Fonts: Noto Sans JP / Noto Serif JP
- Font Awesome 6.4.0（CDN）
- 外部ライブラリ不使用（軽量・高速）
- IntersectionObserver によるアニメーション制御

---

&copy; 2025 縁陣（Enjin）
