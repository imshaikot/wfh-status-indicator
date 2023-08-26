import { getButtonElBySelector } from "./elements";
import { CAMERA_LABEL, MIC_LABEL } from "./selectors";

export const registerCameraButtonEvent = () => {
  const camera = getButtonElBySelector(CAMERA_LABEL);
  const mic = getButtonElBySelector(MIC_LABEL);
  if (camera) {
    camera.addEventListener("click", (e) => {
      console.log("Camera turned off!!!!");
    });
  }
  if (mic) {
    mic.addEventListener("click", (e) => {
      if (mic.getAttribute("data-is-muted") !== "true") {
        console.log("you are muted");
      } else {
        console.log("we can hear you!!!!!");
      }
    });
  }
};
