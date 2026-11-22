(() => {
  "use strict";

  function installStartEntry() {
    const home = document.getElementById("homeScreen");
    const grid = home && home.querySelector(".talent-grid");
    const startButton = document.getElementById("startBtn");
    if (!home || !startButton) return;

    // Make the existing test-length selector usable even if an old stylesheet hides it.
    const controls = home.querySelector(".home-controls");
    if (controls) controls.style.setProperty("display", "block", "important");

    let wrap = document.querySelector(".quick-start-wrap");
    let quickStart = document.getElementById("quickStartBtn");
    if (!wrap || !quickStart) {
      wrap = document.createElement("div");
      wrap.className = "quick-start-wrap";
      quickStart = document.createElement("button");
      quickStart.id = "quickStartBtn";
      quickStart.type = "button";
      quickStart.innerHTML = '<span>开始测试</span><span aria-hidden="true">→</span>';
      wrap.append(quickStart);
      if (grid) grid.insertAdjacentElement("afterend", wrap);
      else home.prepend(wrap);
    }

    // A fixed, high-contrast CTA stays visible on long mobile pages and above browser UI.
    wrap.style.setProperty("position", "fixed", "important");
    wrap.style.setProperty("z-index", "99999", "important");
    wrap.style.setProperty("left", "50%", "important");
    wrap.style.setProperty("bottom", "calc(env(safe-area-inset-bottom, 0px) + 18px)", "important");
    wrap.style.setProperty("transform", "translateX(-50%)", "important");
    wrap.style.setProperty("width", "min(calc(100vw - 32px), 560px)", "important");
    wrap.style.setProperty("margin", "0", "important");
    wrap.style.setProperty("padding", "0", "important");
    wrap.style.setProperty("display", "block", "important");
    wrap.style.setProperty("visibility", "visible", "important");
    wrap.style.setProperty("opacity", "1", "important");
    wrap.style.setProperty("pointer-events", "auto", "important");
    quickStart.style.setProperty("display", "flex", "important");
    quickStart.style.setProperty("width", "100%", "important");
    quickStart.style.setProperty("min-height", "60px", "important");
    quickStart.style.setProperty("align-items", "center", "important");
    quickStart.style.setProperty("justify-content", "center", "important");
    quickStart.style.setProperty("gap", "12px", "important");
    quickStart.style.setProperty("border", "0", "important");
    quickStart.style.setProperty("border-radius", "18px", "important");
    quickStart.style.setProperty("background", "linear-gradient(100deg,#e77b67,#ee9a78)", "important");
    quickStart.style.setProperty("color", "#fff", "important");
    quickStart.style.setProperty("font-size", "19px", "important");
    quickStart.style.setProperty("font-weight", "800", "important");
    quickStart.style.setProperty("box-shadow", "0 8px 26px rgba(80,45,35,.3)", "important");
    quickStart.style.setProperty("cursor", "pointer", "important");
    document.body.style.setProperty("padding-bottom", "100px", "important");

    if (!quickStart.dataset.startBound) {
      quickStart.addEventListener("click", () => startButton.click());
      quickStart.dataset.startBound = "true";
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installStartEntry, { once: true });
  } else {
    installStartEntry();
  }
})();
