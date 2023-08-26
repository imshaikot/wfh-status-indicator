import { CreateUI } from "./create-ui";
import { getButtonPanel } from "./elements";
import { registerCameraButtonEvent } from "./events";
import { DATA_INPUT_ID, HAS_JOINED_INPUT_ID } from "../constants";

// https://googlechrome.github.io/samples/web-bluetooth/get-devices.html
// chrome://flags/#enable-web-bluetooth-new-permissions-backend
// await navigator.bluetooth.getDevices()

const toBuffer = (bytes: string[]) =>
  new Uint8Array(bytes.map((byte) => Number(byte)));

const connections = {
  device: null,
};

window.onload = () => {
  const ui = new CreateUI();
  console.log("content script loaded");
  registerCameraButtonEvent();

  let input = document.getElementById(DATA_INPUT_ID);
  if (!input) {
    input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("id", DATA_INPUT_ID);
    input.setAttribute("value", "hello world!!");
  }

  let has_joined_input = document.getElementById(HAS_JOINED_INPUT_ID);
  if (!has_joined_input) {
    has_joined_input = document.createElement("input");
    has_joined_input.setAttribute("type", "hidden");
    has_joined_input.setAttribute("id", HAS_JOINED_INPUT_ID);
    has_joined_input.setAttribute("value", "false");

    document.body.appendChild(input);
    document.body.appendChild(has_joined_input);
  }

  console.log("**************");

  input.addEventListener("change", async ({ target }: any) => {
    const devices = await (navigator as any).bluetooth.getDevices();

    if (devices.length) {
      connections.device = devices[0];
      return;
    }

    const cb = async () => {
      (navigator as any).bluetooth
        .requestDevice({
          filters: [{ namePrefix: "Triones" }],
          optionalServices: ["0000ffd5-0000-1000-8000-00805f9b34fb"],
        })
        .then((d: any) => {
          connections.device = d;
        })
        .finally(() => {
          document.removeEventListener("click", cb);
        });
    };
    document.addEventListener("click", cb);
    // await (navigator as any).bluetooth.requestDevice({
    //   filters: [{ namePrefix: "Triones" }],
    //   optionalServices: ["0000ffd5-0000-1000-8000-00805f9b34fb"],
    // });
  });
};

document.addEventListener("wfh-joined", async () => {
  console.log("****************", "Yay joined");
  if (connections.device) {
    const device = await (connections.device as any).gatt.connect();
    const BTServices = await device.getPrimaryServices();
    const characteristic = await BTServices[0].getCharacteristic(
      "0000ffd9-0000-1000-8000-00805f9b34fb"
    );
    await characteristic.writeValueWithoutResponse(
      toBuffer(["0xCC", "0x23", "0x33"])
    );
  }
});

document.addEventListener("wfh-left", async () => {
  console.log("****************", "Oh o left");
  if (connections.device) {
    const device = await (connections.device as any).gatt.connect();
    const BTServices = await device.getPrimaryServices();
    const characteristic = await BTServices[0].getCharacteristic(
      "0000ffd9-0000-1000-8000-00805f9b34fb"
    );
    await characteristic.writeValueWithoutResponse(
      toBuffer(["0xCC", "0x24", "0x33"])
    );
  }
});
