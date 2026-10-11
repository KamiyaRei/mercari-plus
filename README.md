# Mercari Plus

**An unofficial userscript that makes browsing Mercari easier and more convenient.**

[English](#english) · [日本語](#日本語)

## English

Mercari Plus is a browsing enhancement project for buyers on [Mercari Japan](https://jp.mercari.com/). It starts with a simple auction filter and is intended to grow into a broader collection of useful browsing features.

**Current version: 1.1.** Only auction hiding is implemented today. Features listed in the roadmap are planned, not available yet.

### Features in 1.1

- Hide auction listings while keeping fixed-price listings visible.
- Show or hide auctions using a floating gavel button.
- Remember your preference between visits.
- Display a count of detected auctions in the loaded page (badge capped at `99+`).
- Process dynamically loaded cards and navigation within Mercari.

### Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) for your browser.
2. Open [mercari-plus.user.js](https://raw.githubusercontent.com/KamiyaRei/mercari-plus/main/mercari-plus.user.js) and confirm installation in Tampermonkey.
3. If the installation screen does not open, create a new script in Tampermonkey, replace the editor contents with the full contents of `mercari-plus.user.js`, and save.
4. Open or reload [Mercari Japan](https://jp.mercari.com/).

### Updates

Version 1.1 includes explicit GitHub update and download URLs. Tampermonkey can check for newer versions and install them according to your update settings.

If you pasted version 1.0 manually and it has no update source, install the current script from the link above once to enable future update checks.

### Usage

Auction hiding is enabled by default. Click the floating gavel button near the bottom-right corner to toggle it.

- **Red button:** auctions are hidden.
- **Muted button:** auctions are shown.
- **Badge:** detected auctions currently in the loaded DOM, not the total number across all search results.

The button tooltip shows the current state and count. The interface is currently in English.

### Scope and limitations

Mercari Plus only changes the page display in your browser. Version 1.1 makes no additional requests to Mercari and provides no crawling, automatic purchases, bidding, or messaging. It stores only the toggle preference in the site's local storage.

Auction detection currently relies on listing text matching `現在` followed by a yen symbol and on Mercari's existing card structure. Changes to the site may require updates. Filtering applies to matching listing cards; it is not an item-page purchase control.

Mercari Plus is not affiliated with, endorsed by, or an official product of Mercari. Review Mercari's current terms of use before using or sharing the tool.

### Roadmap

Planned in this order, subject to change:

1. NEW and viewed-item markers.
2. Price-change markers for previously seen items.
3. Minimum, median, and maximum prices for visible fixed-price results.
4. Keyboard shortcut and Tampermonkey menu entry.
5. Title keyword filtering.
6. Promoted / PR listing filtering.
7. Compact grid mode.
8. Seller-rating and low-review-count highlights on item pages.
9. A possible Manifest V3 browser extension and wider distribution.

Title, promotion, layout, and seller features require verification of Mercari's current DOM before implementation. Any future history or price tracking will be limited to items actually viewed or opened by the user.

### Project files

| File | Purpose |
| --- | --- |
| `mercari-plus.user.js` | Complete, ready-to-install userscript |
| `README.md` | English and Japanese guide |
| `CHANGELOG.md` | Version history |
| `LICENSE` | MIT license for original project code |
| `LICENSES/Apache-2.0.txt` | License for the Material Symbols icon |

No build step or external runtime dependency is required. For development, preserve the working filter, verify new selectors on the live site, and keep code comments and interface text in English.

### Feedback

Report problems or suggestions in [Issues](https://github.com/KamiyaRei/mercari-plus/issues). For filtering problems, include the script version, browser, page URL, expected behavior, and a screenshot or relevant DOM excerpt with personal information removed.

### License

Original project code is licensed under [MIT](LICENSE). The inline Material Symbols Outlined "gavel" icon comes from [Google Material Design Icons](https://github.com/google/material-design-icons) and is licensed under [Apache 2.0](LICENSES/Apache-2.0.txt).

## 日本語

**メルカリをより快適で使いやすくする非公式ユーザースクリプト。**

Mercari Plusは、[メルカリ](https://jp.mercari.com/)で商品を探す購入者向けの閲覧支援プロジェクトです。まずはオークション商品の非表示機能から始め、今後は商品探しに役立つ機能を追加していく予定です。

**現在のバージョン：1.1。** 現在実装されているのはオークション商品の非表示機能のみです。ロードマップの機能は今後の予定であり、まだ利用できません。

### バージョン1.1の機能

- オークション商品を非表示にし、通常の定額商品を表示。
- 画面上のハンマーボタンで表示・非表示を切り替え。
- 設定を保存し、次回のアクセス時にも適用。
- 読み込み済みのページ内で検出したオークション商品の件数を表示（バッジは最大 `99+`）。
- 追加読み込みされた商品カードや、サイト内の画面遷移に対応。

### インストール

1. ブラウザーに[Tampermonkey](https://www.tampermonkey.net/)をインストールします。
2. [mercari-plus.user.js](https://raw.githubusercontent.com/KamiyaRei/mercari-plus/main/mercari-plus.user.js)を開き、Tampermonkeyのインストール画面で確定します。
3. インストール画面が開かない場合は、Tampermonkeyで新しいスクリプトを作成し、エディターの内容を `mercari-plus.user.js` の全文に置き換えて保存します。
4. [メルカリ](https://jp.mercari.com/)を開くか、ページを再読み込みします。

### 更新

バージョン1.1では、GitHubの更新確認URLとダウンロードURLを明示しています。Tampermonkeyの更新設定に従って、新しいバージョンの確認・更新ができます。

バージョン1.0を手動で貼り付けて使用していて、更新元が設定されていない場合は、上記のリンクから最新版を一度インストールしてください。

### 使い方

初期設定ではオークション商品を非表示にします。画面右下付近のハンマーボタンをクリックすると切り替えられます。

- **赤いボタン：** オークション商品を非表示。
- **薄い色のボタン：** オークション商品を表示。
- **バッジ：** 現在読み込み済みのDOM内で検出した件数。検索結果全体の件数ではありません。

ボタンのツールチップにも状態と件数を表示します。現在の操作画面は英語です。

### 動作範囲と制限

Mercari Plusは、ブラウザー内のページ表示だけを変更します。バージョン1.1ではメルカリへの追加リクエストを行わず、巡回収集、自動購入、自動入札、自動メッセージ送信の機能もありません。サイトのローカルストレージには、表示切り替えの設定のみを保存します。

オークションの判定には、商品カード内の「現在」に続く円記号と、現在のカード構造を使用しています。サイトの変更により、スクリプトの更新が必要になる場合があります。対象は商品一覧のカードであり、商品詳細ページの購入操作を制限するものではありません。

Mercari Plusはメルカリの公式製品ではなく、メルカリとの提携や承認を受けたものでもありません。利用・共有の前に、メルカリの最新の利用規約を確認してください。

### ロードマップ

以下の順序で追加を検討しています。予定は変更される場合があります。

1. 未閲覧・閲覧済み商品のマーク。
2. 過去に見た商品の価格変更マーク。
3. 表示中の定額商品の最低価格・中央値・最高価格。
4. キーボードショートカットとTampermonkeyメニュー。
5. 商品名のキーワードフィルター。
6. 広告・PR商品のフィルター。
7. コンパクトな商品グリッド。
8. 商品詳細ページでの出品者評価・評価件数の強調表示。
9. Manifest V3ブラウザー拡張への移行と公開範囲の拡大。

商品名、広告、レイアウト、出品者に関する機能は、実装前にサイトのDOMを確認します。将来の履歴・価格記録も、ユーザーが実際に見た、または開いた商品のみを対象とします。

### ファイル構成と開発

スクリプト本体は `mercari-plus.user.js` です。変更履歴は [CHANGELOG.md](CHANGELOG.md)、本プロジェクトのライセンスは [LICENSE](LICENSE)、アイコンのライセンスは [LICENSES/Apache-2.0.txt](LICENSES/Apache-2.0.txt) にまとめています。

ビルド作業や外部の実行時依存関係は不要です。既存のフィルター動作を維持し、新しいセレクターは実際のサイトで確認してから使用します。コード内のコメントと操作画面の文言は英語に統一します。

### 不具合報告・提案

[Issues](https://github.com/KamiyaRei/mercari-plus/issues)から報告できます。フィルターの問題については、スクリプトのバージョン、ブラウザー、ページURL、期待した動作、個人情報を除いたスクリーンショットやDOM情報を添えてください。

### ライセンス

本プロジェクトの独自コードは[MITライセンス](LICENSE)です。埋め込みのMaterial Symbols Outlined「gavel」アイコンは[Google Material Design Icons](https://github.com/google/material-design-icons)のもので、[Apache 2.0](LICENSES/Apache-2.0.txt)に従います。
