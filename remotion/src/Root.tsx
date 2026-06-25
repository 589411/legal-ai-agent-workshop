import "./index.css";
import { Composition, Folder } from "remotion";
import { LegalRadarVideo, TOTAL_SECONDS } from "./Composition";
import { ChapterTransition, OpeningHook } from "./ShortVideos";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Lecture">
        <Composition id="OpeningHook" component={OpeningHook} durationInFrames={10 * 30} fps={30} width={1920} height={1080} />
        <Composition
          id="TransitionDailyRhythm"
          component={ChapterTransition}
          durationInFrames={4 * 30}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{ number: "01", eyebrow: "每日節奏", title: "從每日靈糧看工作流", subtitle: "固定內容，如何變成每天可靠運作的系統？", image: "fellowship-daily-rhythm.png", align: "right" }}
        />
        <Composition
          id="TransitionLegalRadar"
          component={ChapterTransition}
          durationInFrames={4 * 30}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{ number: "02", eyebrow: "案例一", title: "每日法律雷達", subtitle: "可信來源先進來，AI 先整理，律師再確認。", image: "law-office-stewardship.png" }}
        />
        <Composition
          id="TransitionIdentity"
          component={ChapterTransition}
          durationInFrames={4 * 30}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{ number: "03", eyebrow: "案例二", title: "LINE 身分與排程", subtitle: "先知道你是誰，才能決定你可以看什麼。", image: "legal-team-review.png" }}
        />
        <Composition
          id="TransitionBilling"
          component={ChapterTransition}
          durationInFrames={4 * 30}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{ number: "04", eyebrow: "案例三", title: "Time Record 到帳單", subtitle: "先確認服務時數，再產生可以審核的帳單草稿。", image: "legal-team-review.png", align: "right" }}
        />
        <Composition
          id="TransitionRollout"
          component={ChapterTransition}
          durationInFrames={4 * 30}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{ number: "05", eyebrow: "導入", title: "從 Demo 到內部流程", subtitle: "從低風險、可審核、容易有感的一條工作流開始。", image: "law-office-stewardship.png" }}
        />
      </Folder>
      <Folder name="Archive">
        <Composition id="LegalRadar" component={LegalRadarVideo} durationInFrames={TOTAL_SECONDS * 30} fps={30} width={1920} height={1080} />
      </Folder>
    </>
  );
};
