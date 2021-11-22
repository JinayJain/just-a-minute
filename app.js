import { app } from "./firebase.js";
import {
  getDatabase,
  ref,
  push,
  set,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";

const ctx = document.getElementById("hist");
const histogram = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "Number of People",
        data: [],
        backgroundColor: "#5a9270dd",
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Histogram of Time Taken",
      },
    },
    scales: {
      x: {
        suggestedMin: 0,
        suggestedMax: 120,
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  },
});

const db = getDatabase(app);

let pageNumber = 0;
let pageNames = ["intro-page", "waiting-page", "end-page"];
let pages = pageNames.map((name) => document.getElementById(name));
pages[pageNumber].style.opacity = 1;
pages[pageNumber].style.zIndex = 1;

function transition() {
  pageNumber = (pageNumber + 1) % pages.length;

  if (pageNames[pageNumber] === "waiting-page") {
    startTimer();
  } else if (pageNames[pageNumber] === "end-page") {
    stopTimer();
  }

  pages.forEach((p, i) => {
    if (i === pageNumber) {
      p.style.opacity = 1;
      p.style.zIndex = 1;
    } else {
      p.style.opacity = 0;
      p.style.zIndex = 0;
    }
  });
}

let timerStart = new Date();
function startTimer() {
  console.log("Timer started.");
  timerStart = new Date();
}

function stopTimer() {
  console.log("Stopped timer.");
  let diff = new Date() - timerStart;
  let errorStr =
    (((diff - 60 * 1000) / (60 * 1000)) * 100).toFixed(2) + "% error";
  let elapsedSecs = diff / 1000;
  let elapsedStr = elapsedSecs.toFixed(2) + "s";
  $("#time-taken").text(elapsedStr);
  $("#percent-error").text(errorStr);

  // send results to the database
  const newResult = push(ref(db, "results"));
  set(newResult, {
    timeTaken: elapsedSecs,
  });

  updateChart();
}

function updateChart() {
  const dbRef = ref(db);
  get(child(dbRef, "results")).then((snapshot) => {
    if (snapshot.exists()) {
      const results = snapshot.val();

      const times = Object.values(results).map((r) => r.timeTaken);

      // create a histogram with bins of 0 to 120 seconds, with a bin size of 10 seconds
      const histData = {};
      for (let i = 0; i < 120; i++) {
        histData[i] = 0;
      }

      const binSize = 1;
      times.forEach((t) => {
        histData[Math.floor(t / binSize) * binSize] =
          (histData[Math.floor(t / binSize) * binSize] || 0) + 1;
      });

      const labels = Object.keys(histData).map((k) => k + "s");

      histogram.data.labels = labels;
      histogram.data.datasets[0].data = Object.values(histData);

      histogram.update();
    }
  });
}

function handleKeypress(ev) {
  if (ev.key === " ") {
    // transition to next page
    transition();
  }
}

let changeTime = new Date(0);
let lastChoice = -1;

// >:)
function changeAnxietyInducingSentence() {
  let fadeTime = 500;

  let choices = [
    "Are you done yet?",
    "Too soon. Or are you too late?",
    "Too late. Or are you too soon?",
    "I'm getting bored.",
    "It feels like we just started!",
    "So, how are you today?",
    "...",
    "That spacebar is looking quite tempting :)",
    "Let me know when you're done. I'm grabbing a coffee.",
  ];

  let randomChoice = Math.floor(Math.random() * choices.length);
  if (randomChoice == lastChoice)
    randomChoice = (randomChoice + 1) % choices.length;
  $("#anxiety-inducing-sentence")
    .fadeTo(fadeTime / 2 - 1, 0.01, () => {
      $("#anxiety-inducing-sentence").text(choices[randomChoice]);
    })
    .delay(1)
    .fadeTo(fadeTime / 2, 1);

  lastChoice = randomChoice;
}

document.addEventListener("keypress", handleKeypress);
let triggerButtons = document.querySelectorAll(".trigger-button");
triggerButtons.forEach((b) => {
  b.addEventListener("click", transition);
});
setInterval(() => {
  let now = new Date();
  if (now > changeTime) {
    changeAnxietyInducingSentence();
    changeTime = new Date(now.getTime() + Math.random() * 5 * 1000 + 2000);
  }
}, 100);
