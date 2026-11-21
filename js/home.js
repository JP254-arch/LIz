// Her photo (top left)
if (CONFIG.profilePhoto) {
  const av = $("avatar");
  av.src = CONFIG.profilePhoto;
  av.alt = CONFIG.herName;
  av.hidden = false;
}

$("h-title").textContent = "Hello, " + CONFIG.herName + " ♥";
$("h-sub").textContent = CONFIG.tagline;

// Adds whole calendar months to a date (Jan 31 + 1 month = Feb 28/29, not Mar 3)
function addMonths(date, n) {
  const d = new Date(date), day = d.getDate();
  d.setDate(1);
  d.setMonth(d.getMonth() + n);
  d.setDate(Math.min(day, new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()));
  return d;
}

// Live "together since" counter: months, days, hours, minutes, seconds
function tick() {
  const start = new Date(CONFIG.startDate + "T00:00:00"), now = new Date();
  if (isNaN(start)) return;

  let months = 0, left = 0;
  if (now > start) {
    months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    if (addMonths(start, months) > now) months--;
    left = Math.floor((now - addMonths(start, months)) / 1000);
  }
  const d = Math.floor(left / 86400); left -= d * 86400;
  const h = Math.floor(left / 3600);  left -= h * 3600;
  const m = Math.floor(left / 60);    left -= m * 60;

  $("counter").innerHTML = [[months, "months"], [d, "days"], [h, "hours"], [m, "minutes"], [left, "seconds"]]
    .map(x => `<div><b>${x[0]}</b><span>${x[1]}</span></div>`).join("");
}
tick(); setInterval(tick, 1000);

// Floating hearts
setInterval(() => {
  const h = document.createElement("div");
  h.className = "heart"; h.textContent = "♥";
  h.style.left = Math.random() * 100 + "%";
  h.style.fontSize = 14 + Math.random() * 26 + "px";
  h.style.animationDuration = 4 + Math.random() * 4 + "s";
  $("hero").append(h);
  setTimeout(() => h.remove(), 8500);
}, 450);