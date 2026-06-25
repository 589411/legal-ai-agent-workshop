import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const green = "#176b4d";
const ink = "#18211d";
const paper = "#fffefa";
const font = '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif';
const serif = '"Noto Serif TC", "Songti TC", serif';

const ease = Easing.bezier(0.16, 1, 0.3, 1);
const progress = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    easing: ease,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const OpeningHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const imageScale = interpolate(frame, [0, 10 * fps], [1.04, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleIn = progress(frame, 0.6 * fps, 1.7 * fps);
  const lineIn = progress(frame, 2.1 * fps, 3 * fps);
  const principleIn = progress(frame, 5.2 * fps, 6.2 * fps);
  const cover = interpolate(frame, [7.8 * fps, 9.5 * fps], [0, 1], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: ink, color: paper, fontFamily: font }}>
      <Img
        src={staticFile("law-office-stewardship.png")}
        style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${imageScale})` }}
      />
      <AbsoluteFill style={{ background: "linear-gradient(90deg, rgba(10,19,14,.96) 0%, rgba(10,19,14,.78) 44%, rgba(10,19,14,.12) 76%)" }} />
      <div style={{ position: "absolute", top: 88, left: 105, color: "#9ed3b9", fontSize: 20, fontWeight: 800 }}>
        AI × 法律服務 × 忠心管家
      </div>
      <div style={{ position: "absolute", left: 105, top: 265, width: 880, opacity: titleIn, transform: `translateY(${(1 - titleIn) * 45}px)` }}>
        <h1 style={{ margin: 0, fontFamily: serif, fontSize: 92, lineHeight: 1.14, letterSpacing: 0 }}>
          法律事務所
          <br />
          AI Agent 實戰課
        </h1>
      </div>
      <div style={{ position: "absolute", left: 105, top: 510, width: 710, height: 3, background: "#4c6357" }}>
        <div style={{ width: `${lineIn * 100}%`, height: "100%", background: "#8dc8a8" }} />
      </div>
      <div style={{ position: "absolute", left: 105, top: 555, opacity: principleIn, fontSize: 30, color: "#d2ddd7" }}>
        AI 先整理，人再決定。
      </div>
      <AbsoluteFill style={{ background: ink, opacity: cover }} />
    </AbsoluteFill>
  );
};

export type TransitionProps = {
  number: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  image: "fellowship-daily-rhythm.png" | "legal-team-review.png" | "law-office-stewardship.png";
  align?: "left" | "right";
};

export const ChapterTransition: React.FC<TransitionProps> = ({
  number,
  eyebrow,
  title,
  subtitle,
  image,
  align = "left",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = progress(frame, 0.2 * fps, 1.1 * fps);
  const rule = progress(frame, 0.7 * fps, 1.7 * fps);
  const exit = interpolate(frame, [3.1 * fps, 3.9 * fps], [1, 0], {
    easing: Easing.in(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const left = align === "left";

  return (
    <AbsoluteFill style={{ background: ink, color: paper, fontFamily: font, opacity: exit }}>
      <Img src={staticFile(image)} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${1.025 - enter * 0.025})` }} />
      <AbsoluteFill
        style={{
          background: left
            ? "linear-gradient(90deg, rgba(12,22,17,.96) 0%, rgba(12,22,17,.74) 48%, rgba(12,22,17,.08) 78%)"
            : "linear-gradient(270deg, rgba(12,22,17,.96) 0%, rgba(12,22,17,.74) 48%, rgba(12,22,17,.08) 78%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 120,
          [left ? "left" : "right"]: 110,
          width: 760,
          textAlign: left ? "left" : "right",
          opacity: enter,
          transform: `translateX(${(1 - enter) * (left ? -45 : 45)}px)`,
        }}
      >
        <div style={{ color: "#9ed3b9", fontSize: 18, fontWeight: 850 }}>{number} · {eyebrow}</div>
        <div style={{ width: `${rule * 100}%`, height: 3, margin: left ? "27px 0 38px" : "27px 0 38px auto", background: green }} />
        <h1 style={{ margin: 0, fontFamily: serif, fontSize: 80, lineHeight: 1.2, letterSpacing: 0 }}>{title}</h1>
        <p style={{ margin: "28px 0 0", color: "#c2cec7", fontSize: 27, lineHeight: 1.55 }}>{subtitle}</p>
      </div>
    </AbsoluteFill>
  );
};
