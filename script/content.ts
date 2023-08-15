
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.data === "Hello from popup!") {
    console.log("Received message from popup:", message.data);
  }
});


export default (navigator as any).bluetooth.requestDevice({
    filters: [{ namePrefix: "Triones" }],
    optionalServices: [],
}).catch((err: any) => console.log(err));