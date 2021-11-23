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

  updateChart(elapsedSecs);
}

function updateChart(myTime) {
  // i've had to freeze this to reduce data usage, fixing soon.
  let histData = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 187,
    6: 125,
    7: 76,
    8: 65,
    9: 49,
    10: 56,
    11: 35,
    12: 45,
    13: 32,
    14: 24,
    15: 41,
    16: 35,
    17: 40,
    18: 47,
    19: 36,
    20: 47,
    21: 58,
    22: 62,
    23: 49,
    24: 68,
    25: 82,
    26: 80,
    27: 74,
    28: 96,
    29: 103,
    30: 93,
    31: 101,
    32: 123,
    33: 139,
    34: 138,
    35: 144,
    36: 138,
    37: 167,
    38: 167,
    39: 172,
    40: 180,
    41: 238,
    42: 200,
    43: 218,
    44: 260,
    45: 262,
    46: 291,
    47: 311,
    48: 287,
    49: 316,
    50: 379,
    51: 354,
    52: 405,
    53: 432,
    54: 464,
    55: 482,
    56: 483,
    57: 554,
    58: 564,
    59: 672,
    60: 724,
    61: 600,
    62: 564,
    63: 521,
    64: 497,
    65: 453,
    66: 432,
    67: 357,
    68: 334,
    69: 346,
    70: 287,
    71: 287,
    72: 243,
    73: 218,
    74: 216,
    75: 169,
    76: 170,
    77: 137,
    78: 150,
    79: 131,
    80: 115,
    81: 101,
    82: 87,
    83: 83,
    84: 89,
    85: 77,
    86: 59,
    87: 54,
    88: 48,
    89: 39,
    90: 43,
    91: 35,
    92: 25,
    93: 27,
    94: 29,
    95: 20,
    96: 15,
    97: 15,
    98: 18,
    99: 13,
    100: 13,
    101: 13,
    102: 9,
    103: 7,
    104: 12,
    105: 8,
    106: 11,
    107: 10,
    108: 10,
    109: 6,
    110: 7,
    111: 4,
    112: 4,
    113: 3,
    114: 3,
    115: 4,
    116: 3,
    117: 7,
    118: 4,
    119: 1,
  };
  const labels = Object.keys(histData).map((k) => k + "s");

  histogram.data.labels = labels;
  histogram.data.datasets[0].data = Object.values(histData);
  histogram.data.datasets[0].backgroundColor = Object.keys(histData).map(
    (v) => {
      if (v == Math.floor(myTime)) {
        return "#496ad6";
      }
      return "#5a9270dd";
    }
  );

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
