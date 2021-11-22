import { app } from "./firebase.js";
import {
  getDatabase,
  ref,
  push,
  set,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js";

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
const firestore = getFirestore();

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

  // update socials links
  let errorSecs = Math.abs(elapsedSecs - 60).toFixed(2);
  let twitterLink = `https://twitter.com/intent/tweet?text=I%20can%20estimate%20a%20minute%20within%20${errorSecs}%20seconds.%20See%20if%20you%20can%20beat%20my%20time!%0A%0Ahttps%3A//jinay.dev/just-a-minute/`;
  document.getElementById("twitter-share").href = twitterLink;
  let linkedInLink = `https://www.linkedin.com/shareArticle?mini=true&url=https%3A//jinay.dev/just-a-minute/&title=The%20Minute%20Challenge&summary=I%20can%20estimate%20a%20minute%20within%20${errorSecs}%20seconds.%20See%20if%20you%20can%20beat%20my%20time!%0A%0A&source=`;
  document.getElementById("linkedin-share").href = linkedInLink;

  // send results to the database
  const newResult = push(ref(db, "results"));
  set(newResult, {
    timeTaken: elapsedSecs,
  });

  updateChart();
}

function updateChart() {
  // i've had to freeze this to reduce data usage, fixing soon.
  let histData = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 52,
    6: 35,
    7: 26,
    8: 19,
    9: 9,
    10: 16,
    11: 4,
    12: 11,
    13: 6,
    14: 6,
    15: 10,
    16: 9,
    17: 10,
    18: 12,
    19: 7,
    20: 14,
    21: 11,
    22: 14,
    23: 9,
    24: 15,
    25: 22,
    26: 22,
    27: 22,
    28: 18,
    29: 18,
    30: 24,
    31: 19,
    32: 23,
    33: 32,
    34: 29,
    35: 27,
    36: 37,
    37: 35,
    38: 36,
    39: 40,
    40: 30,
    41: 34,
    42: 33,
    43: 47,
    44: 53,
    45: 56,
    46: 50,
    47: 57,
    48: 50,
    49: 53,
    50: 64,
    51: 74,
    52: 91,
    53: 86,
    54: 88,
    55: 117,
    56: 99,
    57: 112,
    58: 122,
    59: 136,
    60: 162,
    61: 138,
    62: 102,
    63: 105,
    64: 93,
    65: 86,
    66: 76,
    67: 68,
    68: 65,
    69: 66,
    70: 47,
    71: 50,
    72: 59,
    73: 52,
    74: 44,
    75: 38,
    76: 27,
    77: 32,
    78: 25,
    79: 31,
    80: 18,
    81: 29,
    82: 12,
    83: 17,
    84: 16,
    85: 19,
    86: 14,
    87: 12,
    88: 7,
    89: 10,
    90: 4,
    91: 8,
    92: 5,
    93: 6,
    94: 11,
    95: 4,
    96: 1,
    97: 3,
    98: 5,
    99: 3,
    100: 3,
    101: 3,
    102: 3,
    103: 2,
    104: 2,
    105: 0,
    106: 3,
    107: 1,
    108: 0,
    109: 2,
    110: 1,
    111: 0,
    112: 1,
    113: 1,
    114: 1,
    115: 0,
    116: 1,
    117: 3,
    118: 0,
    119: 0,
    120: 0,
  };
  const labels = Object.keys(histData).map((k) => k + "s");

  histogram.data.labels = labels;
  histogram.data.datasets[0].data = Object.values(histData);

  histogram.update();
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
