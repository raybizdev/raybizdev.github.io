# GitHub Pages 部署 SOP（純 GitHub，一個平台搞定）

這份教你把「Ray的業務日嚐」放上 GitHub Pages，讓網站有公開網址，而且之後改內容能自動上線。全程用網頁操作，不需要安裝任何程式、不用打指令。

先建立一個觀念：**GitHub 是存放檔案的地方，GitHub Pages 是它附帶的免費網站主機功能。** 把檔案放上 GitHub、再打開 Pages 開關，網站就上線了；之後每次在 GitHub 上改檔案，網站會自動更新。

---

## 一次性設定（第一次約 20–40 分鐘）

### 步驟 1｜註冊 GitHub 帳號

到 https://github.com ，用 Email 註冊一個免費帳號。這步請自己完成（帳號密碼不要給任何人代填）。

> 記住你設定的**使用者名稱（username）**，等一下網址會用到。建議取好記、專業一點的，例如 `raybiz`。

### 步驟 2｜建立一個 Repository（存放網站的空間）

1. 登入後，點右上角「+」→「New repository」。
2. **Repository name** 填 `你的username.github.io`（整串都要，例如 `raybiz.github.io`）。
   - 這個特殊命名會讓你的網址變成最乾淨的 `https://你的username.github.io`。
3. 選 **Public**（公開，免費方案必須公開；只是原始碼公開，訪客看到的仍是正常網站）。
4. 其他不用動，點 **Create repository**。

### 步驟 3｜上傳網站檔案

1. 進到剛建立的 repository 頁面，點 **「uploading an existing file」** 連結（或「Add file」→「Upload files」）。
2. 打開你電腦上解壓縮後的網站資料夾，**把裡面的檔案和子資料夾全選，一起拖進**網頁的上傳區。
   - ⚠️ 重點：拖的是資料夾**裡面**的東西（`index.html`、`posts`、`css`… 那一層），不要把最外層那個資料夾整個拖進去，否則網址會多一層、打不開。
3. 等檔案都出現在清單後，頁面下方 **Commit changes** 綠色按鈕，點下去。

### 步驟 4｜打開 GitHub Pages 開關

1. 在 repository 頁面上方點 **Settings**（設定）。
2. 左側選單找到 **Pages**。
3. 「Build and deployment」→ Source 選 **Deploy from a branch**；Branch 選 **main**、資料夾選 **/(root)**，按 **Save**。
4. 等 1–2 分鐘，重新整理這個 Pages 頁面，最上方會出現你的網址：`https://你的username.github.io`。點開就是你的網站，全世界都連得到了。

完成！網站正式上線。

---

## 日常更新內容（設定好之後，超簡單）

你有兩種改法，**推薦第一種，完全在瀏覽器完成、不碰電腦檔案**。

### 方法 A｜直接在 GitHub 網站上改（最省事）

1. 到你的 repository，點進要改的檔案（例如 `blog.html`）。
2. 點右上角**鉛筆圖示（Edit）**。
3. 在網頁裡改文字，改好後拉到最下面點 **Commit changes**。
4. 約 30 秒到 1 分鐘後，網站自動更新上線，不用做任何額外動作。

新增文章也一樣：用「Add file」→「Create new file」或「Upload files」把新的 `posts/xxx.html` 放進去，再照《新增文章SOP》改 `index.html`、`blog.html`、`sitemap.xml` 的卡片與連結即可。

### 方法 B｜改本機檔案再上傳

在電腦上照《新增文章SOP》改好檔案，再回到 repository 用「Add file」→「Upload files」把改過的檔案拖上去、Commit。系統會用新檔覆蓋舊檔。

---

## 綁定自己的網域 raybizdev.com（確認網站沒問題後再做）

建議先用 `.github.io` 網址把每一頁點過、確認排版正常，再綁網域正式公開。

### 步驟 1｜在 GitHub 設定網域

1. Repository → **Settings** → **Pages**。
2. 「Custom domain」欄位填 `raybizdev.com`，按 **Save**。
   - GitHub 會自動在 repository 建立一個 `CNAME` 檔案，這是正常的，不要刪。

### 步驟 2｜到網域註冊商設定 DNS

登入你買網域的地方，找到 DNS 設定，新增以下紀錄：

| 類型 | 名稱/主機 | 值 |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | 你的username.github.io |

（這四個 A 紀錄是 GitHub Pages 的官方 IP，四筆都要加。）

### 步驟 3｜等待生效並開啟 HTTPS

DNS 生效通常幾分鐘到幾小時。生效後回到 Settings → Pages，把 **Enforce HTTPS** 打勾，網站就會是 `https://raybizdev.com`。

> 這幾步若卡住，把畫面截圖給我，我幫你看是哪裡設定不對。

---

## 這套的額外好處：版本紀錄

每次 Commit 都會被記錄下來。萬一哪次改壞了，可以到 repository 的 **Commits**（提交紀錄）找到上一個正常版本還原，等於有一個「後悔藥」，這是拖拉式部署沒有的安全網。

---

## 注意事項

- Repository 命名一定要 `你的username.github.io` 這串完整格式，網址才會乾淨；打錯可以到 Settings 改名或重建。
- 上傳時記得是資料夾**內容**那一層（有 `index.html` 的那層），不要多包一層。
- 檔案裡的網址已全部設成正式網域 `https://raybizdev.com`（`sitemap.xml`、`robots.txt`、各頁 canonical / og:url）。在還沒綁網域、只用 `.github.io` 測試的階段，這些網址暫時對不上是正常的，不影響瀏覽，等網域綁好就一致了。
- 聯絡頁與電子報是示範表單，靜態網站不會真的收到訊息。想真的收信之後可以接免費表單服務（Formspree 等），這部分我可以幫你設定。

---

## 找我幫忙時

我可以幫你改檔案、產生新版本，但**最後 Commit / 上傳到 GitHub 那步要你自己做**（我沒有你的 GitHub 帳號權限）。找我改之前，把最新版網站打包 zip 給我，我以最新版為準修改，避免蓋掉你自己的更新。
