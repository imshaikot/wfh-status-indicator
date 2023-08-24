import {
  CAMERA_LABEL,
  MIC_LABEL,
  LEAVE_CALL_SELECTOR,
  LEAVE_CALL_SELECTOR_CONTENT,
} from "./selectors";

export const getButtonElBySelector = (
  btnSelectors: typeof CAMERA_LABEL | typeof MIC_LABEL
) => {
  const buttons = Array.from(
    document.querySelectorAll(`[role=button][aria-label]`)
  );
  return buttons.find((button) => {
    const label = (button.getAttribute("aria-label") || "").toLowerCase();
    return btnSelectors.some((camera_label) => label.includes(camera_label));
  });
};

export const getLeaveButton = () => {
  const iconButtons = document.querySelectorAll(LEAVE_CALL_SELECTOR);
  for (let i = 0; iconButtons.length > 0; i++) {
    if (iconButtons[i].textContent === LEAVE_CALL_SELECTOR_CONTENT) {
      return iconButtons[i];
    }
  }
  return null;
};
