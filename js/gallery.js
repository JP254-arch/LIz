// ---------- Lightbox (tap a photo to see it big; swipe, arrows and Esc work) ----------
let lb, lbImg, lbCap, lbList = [], lbIdx = 0, touchX = 0;

function buildLightbox() {
  if (lb) return;
  lb = document.createElement("div");
  lb.className = "lb"; lb.hidden = true;
  lb.innerHTML =
    '<button class="lb-x" aria-label="Close">×</button>' +
    '<button class="lb-nav lb-prev" aria-label="Previous photo">‹</button>' +
    '<figure><img alt=""><figcaption></figcaption></figure>' +
    '<button class="lb-nav lb-next" aria-label="Next photo">›</button>';
  document.body.append(lb);
  lbImg = lb.querySelector("img");
  lbCap = lb.querySelector("figcaption");
  lb.querySelector(".lb-x").onclick = closeLightbox;
  lb.querySelector(".lb-prev").onclick = () => step(-1);
  lb.querySelector(".lb-next").onclick = () => step(1);
  lb.addEventListener("click", e => { if (e.target === lb) closeLightbox(); });
  lb.addEventListener("touchstart", e => { touchX = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", e => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  });
  document.addEventListener("keydown", e => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
}
function showPhoto() {
  const p = lbList[lbIdx];
  lbImg.src = p.src; lbImg.alt = p.caption; lbCap.textContent = p.caption;
  const multi = lbList.length > 1;
  lb.querySelectorAll(".lb-nav").forEach(b => b.style.display = multi ? "" : "none");
}
function step(n) { lbIdx = (lbIdx + n + lbList.length) % lbList.length; showPhoto(); }
function openLightbox(photo) {
  buildLightbox();
  lbList = CONFIG.photos.filter(p => p.src);
  lbIdx = Math.max(0, lbList.indexOf(photo));
  showPhoto();
  lb.hidden = false;
  document.body.classList.add("noscroll");
  lb.querySelector(".lb-x").focus();
}
function closeLightbox() { lb.hidden = true; document.body.classList.remove("noscroll"); }

// ---------- Grid ----------
function buildGallery() {
  $("grid").innerHTML = "";
  CONFIG.photos.forEach(p => {
    const d = document.createElement("div");
    d.className = "ph"; d.tabIndex = 0; d.setAttribute("role", "button");
    if (p.src) {
      const im = document.createElement("img");
      im.src = p.src; im.alt = p.caption; im.loading = "lazy"; d.append(im);
    } else {
      d.append(document.createTextNode("Tap to add a photo"));
    }
    const sp = document.createElement("span"); sp.textContent = p.caption; d.append(sp);

    const act = () => {
      if (p.src) { openLightbox(p); return; }
      const f = document.createElement("input"); f.type = "file"; f.accept = "image/*";
      f.onchange = () => {
        if (!f.files[0]) return;
        const r = new FileReader();
        r.onload = () => { p.src = r.result; buildGallery(); };
        r.readAsDataURL(f.files[0]);
      };
      f.click();
    };
    d.onclick = act;
    d.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); act(); } };
    $("grid").append(d);
  });
}
buildGallery();