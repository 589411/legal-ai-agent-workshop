import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const colors = {
  ink: "#18211d",
  muted: "#68726c",
  paper: "#fffefa",
  canvas: "#f1f0eb",
  line: "#d9ddd7",
  green: "#176b4d",
  greenSoft: "#e3f0e9",
  red: "#a23c35",
  redSoft: "#f7e7e4",
  amber: "#9a6518",
  amberSoft: "#f6ecd8",
  blue: "#335f82",
  blueSoft: "#e5edf3",
};

const font = '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif';
const serif = '"Noto Serif TC", "Songti TC", "PMingLiU", serif';

const seconds = (value: number, fps: number) => value * fps;

const enterProgress = (frame: number, fps: number, delay = 0, duration = 0.8) =>
  interpolate(
    frame,
    [seconds(delay, fps), seconds(delay + duration, fps)],
    [0, 1],
    {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

const FadeUp: React.FC<{
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, distance = 34, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = enterProgress(frame, fps, delay);
  return (
    <div
      style={{
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [distance, 0])}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const SceneShell: React.FC<{
  chapter: string;
  children: React.ReactNode;
  dark?: boolean;
}> = ({ chapter, children, dark = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rule = interpolate(frame, [0, seconds(1.1, fps)], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        background: dark ? colors.ink : colors.canvas,
        color: dark ? colors.paper : colors.ink,
        fontFamily: font,
        padding: "72px 96px 76px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 17,
          fontWeight: 700,
          color: dark ? "#a9b9af" : colors.muted,
        }}
      >
        <span>恩典法律事務所 · AI 工作台</span>
        <span>{chapter}</span>
      </div>
      <div
        style={{
          width: `${rule * 100}%`,
          height: 2,
          marginTop: 20,
          background: dark ? "#47715f" : colors.green,
        }}
      />
      <div style={{ flex: 1, minHeight: 0 }}>{children}</div>
    </AbsoluteFill>
  );
};

const Title: React.FC<{
  eyebrow: string;
  children: React.ReactNode;
  light?: boolean;
  width?: number;
}> = ({ eyebrow, children, light = false, width = 1200 }) => (
  <div style={{ maxWidth: width }}>
    <div
      style={{
        color: light ? "#8dc4aa" : colors.green,
        fontSize: 19,
        fontWeight: 800,
        marginBottom: 20,
      }}
    >
      {eyebrow}
    </div>
    <h1
      style={{
        margin: 0,
        fontFamily: serif,
        fontSize: 72,
        lineHeight: 1.22,
        fontWeight: 800,
        letterSpacing: 0,
      }}
    >
      {children}
    </h1>
  </div>
);

const OpeningScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const divider = interpolate(frame, [seconds(0.5, fps), seconds(1.7, fps)], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <SceneShell chapter="DAILY LEGAL RADAR" dark>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 570px", gap: 80, height: "100%", alignItems: "center" }}>
        <div>
          <FadeUp delay={0.2}>
            <div style={{ color: "#8dc4aa", fontSize: 21, fontWeight: 800, marginBottom: 22 }}>
              從預生成資料，到每天真正更新
            </div>
          </FadeUp>
          <FadeUp delay={0.55}>
            <h1 style={{ margin: 0, fontFamily: serif, fontSize: 94, lineHeight: 1.12, letterSpacing: 0 }}>
              法律資訊
              <br />
              如何自動進來？
            </h1>
          </FadeUp>
          <FadeUp delay={1.4}>
            <p style={{ margin: "34px 0 0", color: "#b7c2bc", fontSize: 28, lineHeight: 1.65 }}>
              官方來源 · 固定排程 · 可追溯摘要 · 律師確認
            </p>
          </FadeUp>
        </div>
        <div style={{ position: "relative", height: 600 }}>
          <div style={{ position: "absolute", top: 0, bottom: 0, left: 56, width: 2, background: "#385045", transform: `scaleY(${divider})`, transformOrigin: "top" }} />
          {[
            ["08:00", "取得官方更新", colors.blueSoft, colors.blue],
            ["08:03", "AI 去重與摘要", colors.amberSoft, colors.amber],
            ["08:10", "律師確認", colors.greenSoft, colors.green],
            ["08:15", "產生推播草稿", colors.redSoft, colors.red],
          ].map(([time, label, background, color], index) => (
            <FadeUp key={label} delay={1 + index * 0.45} distance={24}>
              <div style={{ display: "grid", gridTemplateColumns: "90px 1fr", alignItems: "center", gap: 22, marginBottom: 44 }}>
                <span style={{ color: "#93a199", fontSize: 17 }}>{time}</span>
                <div style={{ position: "relative", padding: "24px 28px", background, color, fontSize: 25, fontWeight: 800 }}>
                  <span style={{ position: "absolute", left: -67, top: 28, width: 18, height: 18, background: color, border: `5px solid ${colors.ink}`, borderRadius: "50%" }} />
                  {label}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </SceneShell>
  );
};

const ProblemScene: React.FC = () => (
  <SceneShell chapter="01 · 問題">
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
      <FadeUp>
        <Title eyebrow="PRE-GENERATED DATA">漂亮的畫面，不等於最新的資訊。</Title>
      </FadeUp>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 70 }}>
        <FadeUp delay={0.8}>
          <div style={{ minHeight: 260, padding: 38, background: colors.paper, border: `1px solid ${colors.line}` }}>
            <span style={{ display: "inline-block", padding: "7px 10px", background: colors.redSoft, color: colors.red, fontSize: 15, fontWeight: 800 }}>現在</span>
            <h2 style={{ fontSize: 34, margin: "28px 0 15px" }}>展示用 JSON</h2>
            <p style={{ margin: 0, color: colors.muted, fontSize: 24, lineHeight: 1.7 }}>內容固定、日期固定，需要人工改檔才能更新。</p>
          </div>
        </FadeUp>
        <FadeUp delay={1.15}>
          <div style={{ minHeight: 260, padding: 38, background: colors.paper, border: `1px solid ${colors.green}` }}>
            <span style={{ display: "inline-block", padding: "7px 10px", background: colors.greenSoft, color: colors.green, fontSize: 15, fontWeight: 800 }}>目標</span>
            <h2 style={{ fontSize: 34, margin: "28px 0 15px" }}>每天自動產生待審資料</h2>
            <p style={{ margin: 0, color: colors.muted, fontSize: 24, lineHeight: 1.7 }}>保留原文、網址、發布日期與抓取紀錄，再交給律師判斷。</p>
          </div>
        </FadeUp>
      </div>
    </div>
  </SceneShell>
);

const SourceScene: React.FC = () => {
  const sources = [
    { index: "01", title: "全國法規資料庫", detail: "法規異動 · 命令 · 行政規則 · 草案", tone: colors.green },
    { index: "02", title: "司法院開放資料", detail: "裁判書 · 判決案號 · 裁判日期", tone: colors.blue },
    { index: "03", title: "主管機關公告", detail: "金管會 · 數發部 · 智慧財產局 · 勞動部", tone: colors.amber },
    { index: "04", title: "國際官方來源", detail: "EUR-Lex · EU AI Office · EDPB · FTC", tone: colors.red },
  ];
  return (
    <SceneShell chapter="02 · 來源白名單">
      <div style={{ display: "grid", gridTemplateColumns: "580px 1fr", gap: 90, height: "100%", alignItems: "center" }}>
        <FadeUp>
          <Title eyebrow="TRUSTED SOURCES" width={560}>
            不讓 AI
            <br />
            漫遊整個網路
          </Title>
          <p style={{ margin: "35px 0 0", color: colors.muted, fontSize: 25, lineHeight: 1.65 }}>
            先定義可信來源，才談自動摘要。
          </p>
        </FadeUp>
        <div>
          {sources.map((source, index) => (
            <FadeUp key={source.index} delay={0.45 + index * 0.35} distance={25}>
              <div style={{ display: "grid", gridTemplateColumns: "70px 1fr 12px", gap: 20, alignItems: "center", padding: "27px 30px", marginBottom: 14, background: colors.paper, border: `1px solid ${colors.line}` }}>
                <span style={{ color: source.tone, fontSize: 17, fontWeight: 900 }}>{source.index}</span>
                <div>
                  <strong style={{ display: "block", fontSize: 27, marginBottom: 8 }}>{source.title}</strong>
                  <span style={{ color: colors.muted, fontSize: 18 }}>{source.detail}</span>
                </div>
                <span style={{ width: 12, height: 52, background: source.tone }} />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </SceneShell>
  );
};

const PipelineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const steps = [
    ["取得", "API / RSS / 公告頁"],
    ["保存", "原文、網址、時間"],
    ["去重", "URL、案號、內容雜湊"],
    ["摘要", "律師版、客戶版"],
    ["待審", "不直接對外發送"],
  ];
  const line = interpolate(frame, [seconds(1.1, fps), seconds(5.6, fps)], [0, 1], {
    easing: Easing.bezier(0.45, 0, 0.55, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <SceneShell chapter="03 · 資料管線" dark>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
        <FadeUp>
          <Title eyebrow="DAILY PIPELINE" light>每天早上，自動完成整理。</Title>
        </FadeUp>
        <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 24, marginTop: 90 }}>
          <div style={{ position: "absolute", top: 58, left: 110, right: 110, height: 4, background: "#3a4942" }}>
            <div style={{ width: `${line * 100}%`, height: "100%", background: "#70b792" }} />
          </div>
          {steps.map(([title, detail], index) => (
            <FadeUp key={title} delay={0.65 + index * 0.55} distance={30}>
              <div style={{ position: "relative", textAlign: "center" }}>
                <div style={{ position: "relative", zIndex: 2, width: 116, height: 116, display: "grid", placeItems: "center", margin: "0 auto 30px", background: index === 4 ? colors.green : "#26352e", border: "2px solid #5f7d6e", color: colors.paper, fontFamily: serif, fontSize: 30, fontWeight: 800 }}>
                  {String(index + 1).padStart(2, "0")}
                </div>
                <strong style={{ display: "block", fontSize: 29, marginBottom: 12 }}>{title}</strong>
                <span style={{ display: "block", color: "#a9b9af", fontSize: 18, lineHeight: 1.5 }}>{detail}</span>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </SceneShell>
  );
};

const RecordScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const typed = "員工使用外部 AI 工具處理客戶資料的內控風險";
  const visible = typed.slice(0, Math.floor(interpolate(frame, [seconds(1.1, fps), seconds(3.4, fps)], [0, typed.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })));
  return (
    <SceneShell chapter="04 · 可追溯紀錄">
      <div style={{ display: "grid", gridTemplateColumns: "630px 1fr", gap: 70, height: "100%", alignItems: "center" }}>
        <FadeUp>
          <Title eyebrow="TRACEABILITY" width={620}>每一則摘要，都能回到原始來源。</Title>
          <p style={{ margin: "32px 0 0", color: colors.muted, fontSize: 24, lineHeight: 1.7 }}>
            AI 產生的是閱讀輔助，不是新的法律依據。
          </p>
        </FadeUp>
        <FadeUp delay={0.65}>
          <div style={{ background: colors.paper, border: `1px solid ${colors.line}`, padding: 38, boxShadow: "0 24px 70px rgba(30,39,34,.10)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
              <span style={{ padding: "7px 10px", background: colors.redSoft, color: colors.red, fontSize: 15, fontWeight: 800 }}>高風險</span>
              <span style={{ color: colors.muted, fontSize: 16 }}>2026-06-24 · 08:03</span>
            </div>
            <h2 style={{ minHeight: 92, margin: "0 0 28px", fontSize: 32, lineHeight: 1.45 }}>{visible}<span style={{ color: colors.green }}>|</span></h2>
            {[
              ["來源", "主管機關官方公告"],
              ["發布日期", "2026-06-23"],
              ["原文網址", "保留，可直接開啟查證"],
              ["內容雜湊", "4e9a…c821"],
              ["審核狀態", "等待周律師確認"],
            ].map(([label, value], index) => (
              <FadeUp key={label} delay={2.1 + index * 0.25} distance={16}>
                <div style={{ display: "grid", gridTemplateColumns: "110px 1fr", padding: "13px 0", borderTop: `1px solid ${colors.line}`, fontSize: 18 }}>
                  <span style={{ color: colors.muted }}>{label}</span>
                  <strong>{value}</strong>
                </div>
              </FadeUp>
            ))}
          </div>
        </FadeUp>
      </div>
    </SceneShell>
  );
};

const ReviewScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const approve = enterProgress(frame, fps, 4.3, 0.65);
  return (
    <SceneShell chapter="05 · 人工確認">
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
        <FadeUp>
          <Title eyebrow="HUMAN IN THE LOOP">AI 可以整理，不能替律師承擔判斷。</Title>
        </FadeUp>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 160px 1fr", gap: 32, alignItems: "center", marginTop: 76 }}>
          <FadeUp delay={0.7}>
            <div style={{ padding: 40, background: colors.paper, border: `1px solid ${colors.line}`, minHeight: 250 }}>
              <span style={{ color: colors.blue, fontSize: 17, fontWeight: 800 }}>AI 已完成</span>
              <h2 style={{ fontSize: 32, margin: "25px 0 18px" }}>摘要、分類、風險標記</h2>
              <p style={{ margin: 0, color: colors.muted, fontSize: 22, lineHeight: 1.65 }}>產生律師版與客戶版草稿，保留官方來源。</p>
            </div>
          </FadeUp>
          <FadeUp delay={1.2}>
            <div style={{ textAlign: "center", color: colors.muted, fontSize: 60 }}>→</div>
          </FadeUp>
          <FadeUp delay={1.5}>
            <div style={{ padding: 40, background: colors.paper, border: `2px solid ${colors.green}`, minHeight: 250 }}>
              <span style={{ color: colors.green, fontSize: 17, fontWeight: 800 }}>律師要決定</span>
              <h2 style={{ fontSize: 32, margin: "25px 0 18px" }}>是否正確、相關、可分享</h2>
              <p style={{ margin: 0, color: colors.muted, fontSize: 22, lineHeight: 1.65 }}>核准後，才進入 LINE、Email 或客戶提醒。</p>
            </div>
          </FadeUp>
        </div>
        <div style={{ alignSelf: "flex-end", marginTop: 30, padding: "16px 28px", background: colors.green, color: "white", fontSize: 21, fontWeight: 800, opacity: approve, transform: `scale(${interpolate(approve, [0, 1], [0.92, 1])})` }}>
          ✓ 周律師已確認 · 08:10
        </div>
      </div>
    </SceneShell>
  );
};

const OutputScene: React.FC = () => (
  <SceneShell chapter="06 · 工作台輸出" dark>
    <div style={{ display: "grid", gridTemplateColumns: "520px 1fr", gap: 70, height: "100%", alignItems: "center" }}>
      <FadeUp>
        <Title eyebrow="REVIEWED OUTPUT" light width={520}>
          確認之後，
          <br />
          才能成為行動。
        </Title>
        <p style={{ margin: "35px 0 0", color: "#a9b9af", fontSize: 24, lineHeight: 1.7 }}>
          工作台保留審核者、送出時間與目的地。
        </p>
      </FadeUp>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {[
          ["法律雷達", "4 則更新", "2 則高風險", colors.blue],
          ["LINE 摘要", "5 行草稿", "尚未送出", colors.green],
          ["Email 快報", "3 位收件人", "等待秘書", colors.amber],
          ["稽核紀錄", "來源完整", "周律師已確認", colors.red],
        ].map(([title, primary, secondary, tone], index) => (
          <FadeUp key={title} delay={0.55 + index * 0.35} distance={24}>
            <div style={{ minHeight: 230, padding: 31, background: "#24312b", border: "1px solid #42534a" }}>
              <span style={{ display: "block", width: 42, height: 6, background: tone, marginBottom: 28 }} />
              <strong style={{ display: "block", fontSize: 27, marginBottom: 28 }}>{title}</strong>
              <span style={{ display: "block", fontFamily: serif, fontSize: 37, fontWeight: 800 }}>{primary}</span>
              <span style={{ display: "block", color: "#a9b9af", fontSize: 18, marginTop: 10 }}>{secondary}</span>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </SceneShell>
);

const BuildScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const command = "npm run legal:fetch";
  const typed = command.slice(0, Math.floor(interpolate(frame, [seconds(1.2, fps), seconds(2.8, fps)], [0, command.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })));
  return (
    <SceneShell chapter="07 · 具體實作">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 650px", gap: 70, height: "100%", alignItems: "center" }}>
        <FadeUp>
          <Title eyebrow="MVP IN DAYS">幾天內，可以做出真正會更新的版本。</Title>
          <div style={{ display: "grid", gap: 13, marginTop: 40, maxWidth: 760 }}>
            {["抓取官方法規與公告", "以關鍵字篩選與去重", "呼叫模型產生摘要草稿", "更新目前的法律雷達工作台"].map((item, index) => (
              <FadeUp key={item} delay={0.65 + index * 0.3} distance={18}>
                <div style={{ display: "grid", gridTemplateColumns: "36px 1fr", gap: 15, alignItems: "center", fontSize: 22 }}>
                  <span style={{ color: colors.green, fontWeight: 900 }}>✓</span><span>{item}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </FadeUp>
        <FadeUp delay={0.7}>
          <div style={{ background: colors.ink, color: colors.paper, padding: 35, minHeight: 420, boxShadow: "0 26px 70px rgba(30,39,34,.16)" }}>
            <div style={{ display: "flex", gap: 9, marginBottom: 38 }}>
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#d66b5e" }} />
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ddb25d" }} />
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#62a979" }} />
            </div>
            <div style={{ color: "#91a098", fontFamily: "monospace", fontSize: 18, lineHeight: 1.9 }}>
              <div>$ {typed}<span style={{ color: "#74c596" }}>▋</span></div>
              <FadeUp delay={3.1} distance={10}><div style={{ marginTop: 25, color: "#c9d2cd" }}>✓ 全國法規資料庫 · 12 則</div></FadeUp>
              <FadeUp delay={3.5} distance={10}><div style={{ color: "#c9d2cd" }}>✓ 主管機關公告 · 8 則</div></FadeUp>
              <FadeUp delay={3.9} distance={10}><div style={{ color: "#c9d2cd" }}>✓ 去重後保留 · 7 則</div></FadeUp>
              <FadeUp delay={4.3} distance={10}><div style={{ color: "#74c596" }}>→ 已寫入 data/generated/legal-updates.json</div></FadeUp>
            </div>
          </div>
        </FadeUp>
      </div>
    </SceneShell>
  );
};

const ClosingScene: React.FC = () => (
  <SceneShell chapter="THE PRINCIPLE" dark>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
      <FadeUp>
        <div style={{ color: "#8dc4aa", fontSize: 22, fontWeight: 800, marginBottom: 26 }}>法律 AI 的可靠性，不只來自模型</div>
      </FadeUp>
      <FadeUp delay={0.45}>
        <h1 style={{ margin: 0, maxWidth: 1450, fontFamily: serif, fontSize: 102, lineHeight: 1.14, letterSpacing: 0 }}>
          可信來源先進來，
          <br />
          AI 先整理，人再決定。
        </h1>
      </FadeUp>
      <FadeUp delay={1.4}>
        <div style={{ display: "flex", gap: 16, marginTop: 60 }}>
          {["來源可追溯", "內容可重跑", "動作可審核"].map((item) => (
            <span key={item} style={{ padding: "15px 22px", background: "#26362e", border: "1px solid #486252", color: "#c9d2cd", fontSize: 19, fontWeight: 700 }}>{item}</span>
          ))}
        </div>
      </FadeUp>
    </div>
  </SceneShell>
);

const sceneDuration = {
  opening: 8,
  problem: 8,
  sources: 10,
  pipeline: 10,
  record: 9,
  review: 9,
  output: 8,
  build: 8,
  closing: 5,
};

export const TOTAL_SECONDS = Object.values(sceneDuration).reduce((sum, value) => sum + value, 0);

export const LegalRadarVideo: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();
  const progress = frame / durationInFrames;
  let cursor = 0;
  const scene = (duration: number, component: React.ReactNode) => {
    const from = seconds(cursor, fps);
    cursor += duration;
    return (
      <Sequence key={from} from={from} durationInFrames={seconds(duration, fps)} premountFor={fps}>
        {component}
      </Sequence>
    );
  };

  return (
    <AbsoluteFill style={{ background: colors.canvas }}>
      {scene(sceneDuration.opening, <OpeningScene />)}
      {scene(sceneDuration.problem, <ProblemScene />)}
      {scene(sceneDuration.sources, <SourceScene />)}
      {scene(sceneDuration.pipeline, <PipelineScene />)}
      {scene(sceneDuration.record, <RecordScene />)}
      {scene(sceneDuration.review, <ReviewScene />)}
      {scene(sceneDuration.output, <OutputScene />)}
      {scene(sceneDuration.build, <BuildScene />)}
      {scene(sceneDuration.closing, <ClosingScene />)}
      <div style={{ position: "absolute", right: 0, bottom: 0, left: 0, height: 7, background: "rgba(104,114,108,.22)" }}>
        <div style={{ width: `${progress * 100}%`, height: "100%", background: colors.green }} />
      </div>
    </AbsoluteFill>
  );
};
