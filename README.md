# 🚀 Startup Notes｜創業筆記

收集中英文的創業主題 **影片與 Podcast**，快速整理成 Markdown 筆記。

- 每集一個檔案：`notes/en/`（英文）、`notes/zh/`（中文）；用 `類型` 欄位區分「影片」或「Podcast」
- 摘要依字幕或逐字稿（多為自動產生；純音訊 Podcast 用 Whisper 轉錄）整理，可能有少量誤差，細節請以原始內容為準。
- 最後更新：2026-11-08
- 🌐 網頁版：https://allenyummy.github.io/startup-notes/

> 網站由 `scripts/build.py` 讀取 `notes/**/*.md` 產生 `notes.json`，push 到 `main` 後 GitHub Actions 會自動部署。本機預覽：`python3 scripts/build.py && python3 -m http.server -d _site`。

## 📚 影片索引

### English
| # | 影片 | 講者 / 頻道 | 長度 | 主題 |
|---|---|---|---|---|
| 1 | [How to Start a Startup — Lecture 1](notes/en/01-sam-altman-how-to-start-a-startup-lecture1.md) | Sam Altman, Dustin Moskovitz | 43:53 | 總論：點子、產品、團隊、執行 |
| 2 | [How to Get and Evaluate Startup Ideas](notes/en/02-yc-how-to-get-and-evaluate-startup-ideas.md) | Jared Friedman (YC) | 32:22 | 點子的 4 錯誤 / 10 問題 / 7 方法 |
| 3 | [Before the Startup](notes/en/03-paul-graham-before-the-startup.md) | Paul Graham | 48:21 | 創業的反直覺清單 |
| 4 | [How to Succeed with a Startup](notes/en/04-sam-altman-how-to-succeed-with-a-startup.md) | Sam Altman | 16:07 | 口碑產品、真假趨勢、動能 |
| 5 | [One Order of Operations for Starting a Startup](notes/en/05-michael-seibel-order-of-operations.md) | Michael Seibel, Dalton Caldwell | 15:37 | 問題 → 夥伴 → MVP |
| 6 | [How to Get and Test Startup Ideas](notes/en/06-michael-seibel-how-to-get-and-test-ideas.md) | Michael Seibel | 6:21 | 問題本、精挑早期用戶 |
| 7 | [How To Build A Tech Startup With No Technical Skills](notes/en/07-yc-business-founders-need-technical-cofounders.md) | Michael Seibel, Dalton Caldwell | 15:14 | 非技術創辦人怎麼找技術合夥人 |
| 8 | [2/20/200 Startup Idea Validation Framework](notes/en/08-rob-walling-2-20-200-validation-framework.md) | Rob Walling | 13:24 | Bootstrap 式點子驗證 |
| 9 | [AI proof businesses worth building in 2027](notes/en/09-my-first-million-ai-proof-businesses-2027.md) | My First Million (Sam Parr, Shaan Puri) | 29:45 | AI 搶不走的生意：社群、信任市集、鯨魚客戶 |

### 中文
| # | 影片 | 頻道 | 長度 | 主題 |
|---|---|---|---|---|
| 1 | [五位創業老闆創業精華](notes/zh/01-我媽叫我不要創業-五位老闆創業精華.md) | 我媽叫我不要創業 | 9:35 | 小本創業、開店算數、現金流 |
| 2 | [Anything You Want：微型創業者必修的 8 堂課](notes/zh/02-張修修-anything-you-want-8堂課.md) | 張修修的不正常人生 | 15:46 | 一人公司、Derek Sivers 書摘 |
| 3 | [創業，你一定要正確認識天使投資人](notes/zh/03-理財小時候-識富天使會-正確認識天使投資人.md) | 理財小時候 ft. 識富天使會 | 34:35 | 天使十字訣、估值 |
| 4 | [創業一定要募資嗎？募資完整旅程](notes/zh/04-天使下凡要幹嘛-創業一定要募資嗎.md) | 天使下凡要幹嘛 | 34:35 | 融資輪次、募資計畫、紅線 |
| 5 | [連續創業失敗的教訓！PopDaily 創辦人 Kim](notes/zh/05-查理的創業化合物-PopDaily創辦人Kim連續創業.md) | 查理的創業化合物 | 1:26:22 | 連續創業、驕傲、覆盤 |
| 6 | [我一整年創業失敗的經驗](notes/zh/06-好葉-一整年創業失敗的經驗.md) | Better Leaf 好葉 | 21:36 | 年度覆盤、團隊、小而美 |
| 7 | [🎙️ AI 預測叫瓦斯 ft. 好守氣創辦人 Eric](notes/zh/07-創業新聲帶-好守氣-AI預測叫瓦斯.md) | 創業新聲帶（Meet 創業小聚） | 56:23 | 傳統產業 × AI、IoT 轉平台、B2B2C |

## 🧭 跨影片共同主題（Cross-cutting Takeaways）

1. **從問題開始，不是從點子開始**
   Seibel（問題本、頻率 × 強度）、Jared Friedman（避免 SISP）、Paul Graham（不要刻意想點子）、Rob Walling（「告訴我解決誰的什麼問題」）都說同一件事。
2. **點子不值錢，執行與迭代才值錢**
   Derek Sivers 的「點子是乘數、執行是價值」；Twitch 從 Justin.tv 變形而來；MVP 不要愛上它。
3. **先讓一小群人「愛」你的產品**
   Sam Altman：好到讓人主動告訴朋友 = 80% 的工作；早期用戶要手動招募、精挑細選。
4. **團隊 / 人劍合一是早期最重要的變數**
   YC 的 founder-market fit ＝ 識富天使會的「人劍合一」；非技術創辦人最該做的是找到技術合夥人，而不是外包。
5. **驗證要真實「閉環」**
   天使投資人看「剛需 + 閉環」；Rob Walling 的 11–40 個 Yes；不要只做簡報就去找投資人。
6. **募資不是目的，也不是必須**
   中文兩集募資影片都強調：能自主營運可以不募資；拿錢後的唯一任務是讓估值變高；估值不是越高越好；要讓自己「有得選」。
7. **小而美 / 一人公司也是一條路**
   Derek Sivers、好葉都提醒：不是每家公司都要做大，先想清楚自己要的生活。
9. **AI 時代的護城河：社群、信任、關係**
   My First Million：技術不再是護城河，付費同儕社群、經過審核的市集和鯨魚客戶，AI 都複製不了。
8. **心態：反直覺、謙卑、持續覆盤**
   Paul Graham 的反直覺清單；PopDaily Kim 兩次因驕傲重摔；好葉的逐月覆盤。

## 🗂️ 待整理清單（候選影片）
- [ ] Paul Graham On Startups, Ambition, and Great Founders — https://www.youtube.com/watch?v=5bxp78i96S8
- [ ] 為什麼 90% 創業者會失敗？Mark Cuban 的建議 — https://www.youtube.com/watch?v=18m0tLm1m-4
- [ ] 被欠錢、創業失敗、中年失業，我學到了什麼?（老魚）— https://www.youtube.com/watch?v=7vXtvbafXMU
- [ ] 沒錢沒經驗也能創業！？白手起家老闆十年經驗大公開（Willy）— https://www.youtube.com/watch?v=QbqkoXb_Yjg
- [ ] Pick One Idea and Go Deep（YC）— https://www.youtube.com/watch?v=R56RJFZBasQ
- [ ] 3 個募資的策略 — Velodash CEO Molly（熱情實驗室）— https://www.youtube.com/watch?v=5FimmylOFDM

## 🎙️ 純音訊 Podcast 怎麼轉錄
用 [whisper.cpp](https://github.com/ggerganov/whisper.cpp) 在本機轉逐字稿（1 小時節目約 4 分鐘）：

```bash
brew install whisper-cpp ffmpeg
scripts/transcribe.sh <音檔 URL 或檔案> zh "節目與專有名詞提示"
```

## ✍️ 新增筆記的格式
複製 [`TEMPLATE.md`](TEMPLATE.md)，放到 `notes/en/` 或 `notes/zh/`，並更新上方索引。
