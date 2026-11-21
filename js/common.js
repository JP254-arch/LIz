// Shared by every page: builds the navigation + footer and sets the title.
const PAGES = [
  { id: "home",    file: "index.html",   label: "Home" },
  { id: "about",   file: "about.html",   label: "About Us" },
  { id: "gallery", file: "gallery.html", label: "Gallery" },
  { id: "mirror",  file: "mirror.html",  label: "Mirror" },
  { id: "love",    file: "love.html",    label: "Love" },
  // { id: "music",   file: "music.html",   label: "Music" },
];
const $ = id => document.getElementById(id);
const current = document.body.dataset.page;

document.title = (PAGES.find(p => p.id === current)?.label || "Home") + " · For " + CONFIG.herName;

const nav = document.createElement("nav");
PAGES.forEach(p => {
  const a = document.createElement("a");
  a.href = p.file; a.textContent = p.label;
  if (p.id === current) a.className = "on";
  nav.append(a);
});
document.body.prepend(nav);

const foot = document.createElement("footer");
foot.textContent = "Made with Love 💖💝 by " + CONFIG.yourName + " for " + CONFIG.herName;
document.body.append(foot);
