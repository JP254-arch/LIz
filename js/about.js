$("s-intro").textContent = CONFIG.storyIntro;
CONFIG.story.forEach(s => {
  const d = document.createElement("div"); d.className = "t";
  const sm = document.createElement("small"); sm.textContent = s.when;
  const p = document.createElement("div");    p.textContent = s.text;
  d.append(sm, p);
  $("timeline").append(d);
});

// Each chapter fades in as she scrolls to it (skipped if animations are turned off)
const chapters = [...document.querySelectorAll(".timeline .t")];
if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  chapters.forEach(el => el.classList.add("reveal"));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  chapters.forEach(el => io.observe(el));
}