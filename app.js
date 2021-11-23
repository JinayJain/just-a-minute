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
    5: 117,
    6: 77,
    7: 52,
    8: 45,
    9: 20,
    10: 35,
    11: 13,
    12: 27,
    13: 19,
    14: 11,
    15: 22,
    16: 21,
    17: 23,
    18: 30,
    19: 21,
    20: 28,
    21: 32,
    22: 37,
    23: 27,
    24: 46,
    25: 48,
    26: 47,
    27: 48,
    28: 53,
    29: 57,
    30: 53,
    31: 61,
    32: 59,
    33: 77,
    34: 71,
    35: 82,
    36: 88,
    37: 89,
    38: 93,
    39: 115,
    40: 97,
    41: 121,
    42: 110,
    43: 124,
    44: 137,
    45: 141,
    46: 166,
    47: 161,
    48: 145,
    49: 171,
    50: 215,
    51: 201,
    52: 240,
    53: 264,
    54: 261,
    55: 277,
    56: 285,
    57: 314,
    58: 328,
    59: 390,
    60: 416,
    61: 359,
    62: 326,
    63: 324,
    64: 277,
    65: 250,
    66: 244,
    67: 216,
    68: 191,
    69: 187,
    70: 155,
    71: 171,
    72: 149,
    73: 143,
    74: 131,
    75: 109,
    76: 97,
    77: 91,
    78: 84,
    79: 89,
    80: 63,
    81: 55,
    82: 45,
    83: 50,
    84: 52,
    85: 50,
    86: 39,
    87: 37,
    88: 23,
    89: 26,
    90: 26,
    91: 21,
    92: 9,
    93: 15,
    94: 17,
    95: 11,
    96: 5,
    97: 11,
    98: 12,
    99: 9,
    100: 10,
    101: 7,
    102: 6,
    103: 3,
    104: 7,
    105: 4,
    106: 7,
    107: 9,
    108: 7,
    109: 6,
    110: 3,
    111: 2,
    112: 4,
    113: 1,
    114: 2,
    115: 1,
    116: 2,
    117: 5,
    118: 1,
    119: 0,
  };
  const labels = Object.keys(histData).map((k) => k + "s");

  histogram.data.labels = labels;
  histogram.data.datasets[0].data = Object.values(histData);
  histogram.data.datasets[0].backgroundColor = Object.keys(histData).map(
    (v) => {
      if (v == 65) {
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
