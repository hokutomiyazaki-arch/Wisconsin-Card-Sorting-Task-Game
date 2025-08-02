# Wisconsin Card Sorting Task (WCST) - Web Version

認知的柔軟性と実行機能を評価する神経心理学的検査「ウィスコンシンカードソーティングタスク」のWeb版実装です。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 🎮 デモ

[ライブデモはこちら](#) <!-- GitHubPagesのURLに置き換えてください -->

## 📝 概要

このゲームは、プレイヤーの認知的柔軟性、ルール学習能力、注意の切り替え能力を測定するために設計されています。プレイヤーは提示されたカードを4つのターゲットカードのいずれかに分類しますが、分類ルールは明示されず、フィードバックから推測する必要があります。

### 特徴

- 🎯 **3つの分類ルール**: 色、形、数による分類
- 🔄 **ランダムなルール変更**: 5〜15回正解後に自動的にルールが変更
- ⏱️ **5分間のタイムアタック**: 時間内により多くのポイントを獲得
- 📊 **ポイントシステム**: 正解+1点、不正解-1点
- 📱 **レスポンシブデザイン**: スマートフォン、タブレット、PCに対応
- ✨ **視覚的フィードバック**: アニメーションによる即時フィードバック

## 🚀 使い方

### オンラインで遊ぶ

1. [デモページ](#)にアクセス
2. 「ゲームスタート」ボタンをクリック
3. 画面下部のテストカードを、上部の4枚のカードのいずれかにマッチング

### ローカルで実行

```bash
# リポジトリをクローン
git clone https://github.com/yourusername/wisconsin-card-sorting-task.git

# ディレクトリに移動
cd wisconsin-card-sorting-task

# ブラウザで開く
open index.html
```

## 🎯 ゲームルール

1. **目的**: 提示されたカードを正しいターゲットカードに分類する
2. **分類基準**: 色（赤、緑、青、黄）、形（●、★、▲、■）、数（1〜4）のいずれか
3. **ルールの発見**: フィードバックから現在の分類ルールを推測
4. **ルール変更**: 一定回数正解するとルールが予告なく変更される
5. **スコアリング**: 
   - 正解: +1点
   - 不正解: -1点
   - 5分間でより高いスコアを目指す

## 🛠️ 技術仕様

### 必要環境

- モダンWebブラウザ（Chrome, Firefox, Safari, Edge）
- JavaScript有効

### ファイル構成

```
wisconsin-card-sorting-task/
├── index.html      # メインファイル
├── README.md       # このファイル
└── LICENSE         # ライセンスファイル
```

### 実装詳細

- **Pure Vanilla JavaScript**: フレームワーク不使用
- **CSS3アニメーション**: スムーズな視覚効果
- **レスポンシブグリッド**: FlexboxとCSS Grid使用
- **モバイルファースト設計**: タッチデバイスに最適化

## 📊 評価指標

このタスクで測定される認知機能：

- **認知的柔軟性**: ルール変更への適応能力
- **実行機能**: 計画立案と戦略的思考
- **ワーキングメモリ**: 現在のルールの保持
- **注意の切り替え**: 新しいルールへの注意の移行
- **抑制制御**: 以前のルールへの固執を抑制

## 🔧 カスタマイズ

以下の要素は簡単にカスタマイズ可能です：

```javascript
// ゲーム時間の変更（秒単位）
let timeLeft = 300; // デフォルト: 5分

// ルール変更の頻度
nextRuleChange = Math.floor(Math.random() * 11) + 5; // 5〜15回

// カードの属性
const colors = ['red', 'green', 'blue', 'yellow'];
const shapes = ['●', '★', '▲', '■'];
const numbers = [1, 2, 3, 4];
```

## 🤝 貢献

プルリクエストを歓迎します！大きな変更を行う場合は、まずissueを開いて変更内容について議論してください。

1. プロジェクトをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. プルリクエストを開く

## 📜 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 🙏 謝辞

- オリジナルのWisconsin Card Sorting Testは、Esta A. BergとDavid A. Grantによって開発されました
- このWeb版は教育・研究目的で作成されています
- 臨床診断には使用しないでください

## 📧 連絡先

質問や提案がある場合は、[issue](https://github.com/yourusername/wisconsin-card-sorting-task/issues)を作成してください。

---

⭐ このプロジェクトが役立った場合は、スターをつけていただけると嬉しいです！
