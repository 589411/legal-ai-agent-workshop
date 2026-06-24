import "./index.css";
import { Composition } from "remotion";
import { LegalRadarVideo, TOTAL_SECONDS } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="LegalRadar"
      component={LegalRadarVideo}
      durationInFrames={TOTAL_SECONDS * 30}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
