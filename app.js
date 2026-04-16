let words = [];
let filtered = [];
let index = 0;

// Load CSV
fetch("words.csv")
  .then(res => res.text())
  .then(data => {
    words = parseCSV(data);
    filtered = [...words];
    index = 0;
    showWord();
  });

function parseCSV(text) {
  return text.trim().split("\n").map(line => {
    const [word, meaning] = line.split(",");
    return { word, meaning };
  });
}

function showWord() {
  if (filtered.length === 0) {
    document.getElementById("word").textContent = "No results";
    document.getElementById("meaning").textContent = "";
    return;
  }

  const item = filtered[index];
  document.getElementById("word").textContent = item.word;
  document.getElementById("meaning").textContent = item.meaning;
}

// Navigation
function nextWord() {
  if (index < filtered.length - 1) {
    index++;
    showWord();
  }
}

function prevWord() {
  if (index > 0) {
    index--;
    showWord();
  }
}

function randomWord() {
  index = Math.floor(Math.random() * filtered.length);
  showWord();
}

// Search
document.getElementById("search").addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase();

  filtered = words.filter(w =>
    w.word.toLowerCase().includes(q)
  );

  index = 0;
  showWord();
});

// Swipe support
let startX = 0;
let endX = 0;

const card = document.getElementById("card");

card.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

card.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const diff = endX - startX;

  if (Math.abs(diff) < 50) return; // ignore small moves

  if (diff < 0) {
    nextWord(); // swipe left
  } else {
    prevWord(); // swipe right
  }
}