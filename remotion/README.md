# 每日法律雷達 Remotion 影片

講座使用的短影片組，規格為 1920 × 1080、30 fps：

- `OpeningHook`：10 秒開場
- `TransitionDailyRhythm`：每日節奏
- `TransitionLegalRadar`：每日法律雷達
- `TransitionIdentity`：LINE 身分分流
- `TransitionBilling`：服務時數與帳單
- `TransitionRollout`：30 天導入

原 75 秒教學型影片保留為 `LegalRadar`，不作為講座主體。

## 指令

```bash
npm install
npm run dev
npm run still
npm run render:short
npm run render
```

## Composition

- 短片程式：`src/ShortVideos.tsx`
- 封存長版程式：`src/Composition.tsx`
- 輸出：`out/opening-hook.mp4`、`out/transition-*.mp4`

## 使用原則

- 所有動畫由 Remotion frame 驅動。
- 影片無旁白，適合作為講座開場或章節轉場。
- 官方來源、AI 摘要與律師審核被清楚分開。
