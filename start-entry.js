(() => {
  "use strict";
  const quickStart = document.getElementById("quickStartBtn");
  const startButton = document.getElementById("startBtn");
  if (quickStart && startButton) {
    quickStart.addEventListener("click", () => startButton.click());
  }
})();
