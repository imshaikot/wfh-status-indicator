import { CreateUI } from "./create-ui";
import { registerCameraButtonEvent } from "./events";
import { DATA_INPUT_ID } from "../constants";

// https://googlechrome.github.io/samples/web-bluetooth/get-devices.html
// chrome://flags/#enable-web-bluetooth-new-permissions-backend
// await navigator.bluetooth.getDevices()

window.onload = () => {
  const ui = new CreateUI();
  console.log("content script loaded");
  registerCameraButtonEvent();

  let input = document.getElementById("wfh");
  if (!input) {
    input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("id", DATA_INPUT_ID);
    input.setAttribute("value", "hello world!!");

    document.body.appendChild(input);
  }

  input.addEventListener("change", async ({ target }: any) => {
    console.log("**************", target.value);
    await (navigator as any).bluetooth.requestDevice({
      filters: [{ namePrefix: "Triones" }],
      optionalServices: ["0000ffd5-0000-1000-8000-00805f9b34fb"],
    });
  });
};
