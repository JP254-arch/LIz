$("cap").textContent = CONFIG.mirrorCaption;
let stream = null;
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
    $("cam").textContent = "Turn off the mirror";
    $("cam-msg").textContent = "";
  } catch (e) {
    $("cam-msg").textContent = "The camera isn’t available. Open this page over https (or from your own computer) and allow camera access.";
  }
};
