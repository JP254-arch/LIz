$("letter").textContent = CONFIG.letter;
let ri = -1;
function nextReason() {
  const el = $("reason"); el.style.opacity = 0;
  setTimeout(() => {
    ri = (ri + 1) % CONFIG.reasons.length;
    el.textContent = CONFIG.reasons[ri];
    el.style.opacity = 1;
  }, 250);
}
$("next").onclick = nextReason;
nextReason();
