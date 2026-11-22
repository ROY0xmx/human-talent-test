(() => {
  "use strict";
  const talentStart = document.getElementById("talentStartBtn");
  const selectedStart = document.getElementById("startBtn");
  if (!talentStart || !selectedStart) return;
  talentStart.addEventListener("click", () => {
    selectedStart.click();
  });
})();
