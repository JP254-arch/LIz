$("cap").textContent = CONFIG.mirrorCaption;
let stream = null;

// Turns the browser's error into a message she can actually act on
function cameraHelp(e) {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    return "This browser can’t open the camera here. If you opened the link inside WhatsApp, Instagram or another app, tap the ⋮ menu and choose “Open in Chrome” (or Safari).";
  }
  switch (e && e.name) {
    case "NotAllowedError":
    case "SecurityError":
      return "Camera access was blocked. Tap the lock icon next to the address, open Permissions, set Camera to Allow, then reload this page and try again.";
    case "NotFoundError":
    case "OverconstrainedError":
      return "No camera was found on this device.";
    case "NotReadableError":
    case "AbortError":
      return "The camera is being used by another app. Close it (video calls, camera apps), then try again.";
    default:
      return "The camera couldn’t start. Reload the page and allow camera access when asked.";
  }
}

$("cam").onclick = async () => {
  if (stream) {
    stream.getTracks().forEach(t => t.stop());
    stream = null; $("vid").srcObject = null;
    $("cam").textContent = "Turn on the mirror";
    return;
  }
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
    $("vid").srcObject = stream;
    $("vid").play().catch(() => {});
    $("cam").textContent = "Turn off the mirror";
    $("cam-msg").textContent = "";
  } catch (e) {
    $("cam-msg").textContent = cameraHelp(e);
  }
};