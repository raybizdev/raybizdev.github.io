# Ray的業務日嚐 — 新增文章 SOP

這份文件教你在不需要工程師的情況下，自己新增一篇文章、並讓它出現在首頁與文章列表。全程只要複製、改字、存檔。

---

## 網站檔案結構

```
website/
├── index.html        首頁（含精選文章卡片）
├── blog.html         文章列表頁（含搜尋、分類篩選）
├── about.html        關於頁
├── contact.html      聯絡頁
├── sitemap.xml       給 Google 看的頁面清單
├── robots.txt        搜尋引擎規則（通常不用動）
├── css/style.css     樣式（不用動）
├── js/script.js      互動效果（不用動）
├── images/           圖片放這裡
└── posts/            每篇文章各一個檔案
```

你平常只會動到三種檔案：`posts/` 裡的文章檔、`index.html`、`blog.html`。

**建議工具**：安裝免費的 VS Code 編輯器（有顏色標記，不易改錯）。臨時用電腦內建的文字編輯器也可以。

---

## 新增一篇文章：五個步驟

### 步驟 1｜複製一篇現有文章當範本

到 `posts/` 資料夾，複製一個現有檔案（例如 `negotiation-signals.html`），貼上後改成新檔名，用英文/數字，例如 `posts/how-to-follow-up.html`。

> 檔名規則：全小寫、用連字號 `-` 連接、不要空格與中文，例如 `client-trust.html`。

### 步驟 2｜打開新檔案，替換這幾個地方

用編輯器打開剛剛的新檔，依序把以下位置換成你的內容（其餘標籤不要動）：

| 要改的地方 | 說明 |
|---|---|
| `<title>...標題... | Ray的業務日嚐</title>` | 瀏覽器分頁標題 |
| `<meta name="description" content="...">` | 一句話摘要（給 Google 和社群預覽用） |
| `<meta property="og:title" content="...">` | 分享到社群時顯示的標題 |
| `<meta property="og:description" content="...">` | 分享到社群時顯示的描述 |
| `<link rel="canonical" href=".../新檔名.html">` | 把網址結尾改成你的新檔名 |
| `og:url` 那行的網址 | 同上，改成新檔名 |
| JSON-LD 區塊裡的 `headline`、`datePublished`、`articleSection`、`mainEntityOfPage` | 標題、發布日期(YYYY-MM-DD)、分類、網址 |
| `<span class="post-tag">分類</span>` | 文章分類標籤（見下方分類清單） |
| `<h1>...文章標題...</h1>` | 正文大標題 |
| `<div class="post-meta">日期 · 約 X 分鐘閱讀</div>` | 日期與閱讀時間 |
| `<article class="article-body">` 到 `</article>` 之間 | 文章正文（見下方排版元素） |

### 步驟 3｜存檔

存檔後，先雙擊這個檔案用瀏覽器打開，確認排版正常、沒有跑版。

### 步驟 4｜在首頁和列表頁加一張卡片

打開 `blog.html`（想同時放上首頁就再打開 `index.html`），找到 `<div class="post-grid"` 區塊，複製其中一整段卡片，貼到**最上面**（最新的放前面），改掉內容：

```html
<article class="post-card" data-cat="銷售策略">
  <div class="post-meta"><span class="post-tag">銷售策略</span>2026年X月X日 · 約 4 分鐘閱讀</div>
  <h3>你的文章標題</h3>
  <p>一到兩句摘要。</p>
  <a href="posts/你的新檔名.html" class="read-more">閱讀全文 →</a>
</article>
```

要改的地方：
- `data-cat="..."` 和 `<span class="post-tag">...</span>` → **兩個都要改成同一個分類**（篩選功能靠 `data-cat`，顯示靠 `post-tag`）
- 日期、閱讀時間、標題、摘要
- `href="posts/你的新檔名.html"` → 指向你剛建立的檔案

存檔，用瀏覽器打開 `blog.html` 確認新卡片出現、分類篩選和搜尋都正常。

### 步驟 4.5｜串接「上一篇／下一篇」導覽

每篇文章正文最後、返回連結之前，可放一段前後篇導覽（依發佈時間排序：較舊＝上一篇、較新＝下一篇）。新增一篇時要動兩個檔案：

1. **新文章頁**：加入指向「目前最新那篇（也就是新文章的前一篇）」的「上一篇」。因為它是最新，暫時沒有「下一篇」。
2. **前一篇文章頁**：把它的導覽補上「下一篇」，指向這篇新文章。

格式（只放存在的那一側，另一側整個 `<a>` 省略即可）：

```html
<nav class="post-nav">
  <a class="nav-prev" href="舊文章.html">
    <div class="nav-dir">← 上一篇</div>
    <div class="nav-title">舊文章標題</div>
  </a>
  <a class="nav-next" href="新文章.html">
    <div class="nav-dir">下一篇 →</div>
    <div class="nav-title">新文章標題</div>
  </a>
</nav>
```

系列文（pt.1 → pt.2 → pt.3）順著發佈時間串起來，讀者就能一路往下讀。這步交給我做也可以。

### 步驟 5｜把新文章加進 sitemap（幫助 Google 收錄）

打開 `sitemap.xml`，複製一段 `<url>...</url>`，貼上後改網址和日期：

```xml
<url>
  <loc>https://raybizdev.com/posts/你的新檔名.html</loc>
  <lastmod>2026-07-20</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

（網站正式網域為 `raybizdev.com`，各檔案裡的網址都已設定好，照上面格式沿用即可。）

---

## 分類清單（要用現有的，篩選才會生效）

- 銷售策略
- 陌生開發
- 客戶經營
- 團隊管理
- 個人成長
- 生產力/效率

一篇文章可掛多個分類：卡片的 `data-cat` 用逗號分隔（例如 `data-cat="個人成長,生產力/效率"`），並在 `post-meta` 放多個 `<span class="post-tag">` 標籤。

若要新增分類，除了文章與卡片外，還要到 `blog.html` 的 `filter-group` 區塊加一顆篩選按鈕。這步比較容易漏，若不確定就交給我加。

---

## 常用排版元素（貼在正文 `<article class="article-body">` 內）

```html
<h2>小標題</h2>

<p>一段內文文字。</p>

<blockquote>想強調的一句話，會顯示成引言區塊。</blockquote>

<ul>
  <li>條列重點一</li>
  <li>條列重點二</li>
</ul>
```

正文最上方通常保留這行返回連結：

```html
<a href="../blog.html" class="back-link">← 回到文章列表</a>
```

---

## 注意事項

- 改內容時**只動文字**，不要刪掉任何 `<...>` 標籤，也不要動 `<head>` 裡的結構，否則版面可能跑掉。
- 文章檔在 `posts/` 資料夾內，連結樣式（css、js、回首頁）都用 `../` 開頭；首頁和列表頁則不用。複製範本時保持原樣即可。
- 改壞了不用緊張——把整份檔案內容貼給我，我幫你檢查或修正。
- 目前是純靜態網站，改完檔案是改本機檔案。**部署上線後**，每次更新要重新上傳／推送才會生效（GitHub Pages / Netlify 都是這樣，這部分我可以幫你設定）。

---

## 交給我做也可以

不想自己改的時候，直接跟我說文章內容，我幫你建好頁面、加卡片、更新 sitemap。提醒一點：換新對話我不會記得網站細節，記得把最新的網站 zip 上傳給我，或固定在同一個對話／專案裡找我。
