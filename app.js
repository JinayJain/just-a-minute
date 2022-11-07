import { app } from "./firebase.js";
import {
  getDatabase,
  ref,
  push,
  set,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
} from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app-check.js";

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LeaL1IdAAAAAJN9p1V7Mc6BQMFntamwBJ8t-0Pe"),
});

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
      subtitle: {
        display: true,
        text: "Updated Nov 28, 2021, 3:32 PM EST",
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
    5: 1617,
    6: 1272,
    7: 990,
    8: 714,
    9: 640,
    10: 564,
    11: 442,
    12: 464,
    13: 350,
    14: 387,
    15: 332,
    16: 359,
    17: 377,
    18: 400,
    19: 366,
    20: 409,
    21: 427,
    22: 480,
    23: 451,
    24: 524,
    25: 539,
    26: 548,
    27: 614,
    28: 662,
    29: 685,
    30: 738,
    31: 772,
    32: 795,
    33: 883,
    34: 898,
    35: 933,
    36: 918,
    37: 1071,
    38: 1148,
    39: 1195,
    40: 1264,
    41: 1385,
    42: 1388,
    43: 1455,
    44: 1577,
    45: 1626,
    46: 1737,
    47: 1833,
    48: 1878,
    49: 2022,
    50: 2210,
    51: 2261,
    52: 2453,
    53: 2631,
    54: 2767,
    55: 2960,
    56: 3135,
    57: 3314,
    58: 3562,
    59: 4545,
    60: 4428,
    61: 3701,
    62: 3617,
    63: 3298,
    64: 3035,
    65: 2912,
    66: 2690,
    67: 2439,
    68: 2259,
    69: 2175,
    70: 1940,
    71: 1780,
    72: 1589,
    73: 1480,
    74: 1348,
    75: 1201,
    76: 1073,
    77: 1001,
    78: 916,
    79: 834,
    80: 745,
    81: 689,
    82: 620,
    83: 582,
    84: 527,
    85: 492,
    86: 377,
    87: 383,
    88: 358,
    89: 310,
    90: 313,
    91: 268,
    92: 232,
    93: 210,
    94: 211,
    95: 184,
    96: 153,
    97: 138,
    98: 133,
    99: 105,
    100: 104,
    101: 89,
    102: 103,
    103: 76,
    104: 74,
    105: 73,
    106: 62,
    107: 68,
    108: 62,
    109: 44,
    110: 52,
    111: 36,
    112: 41,
    113: 40,
    114: 42,
    115: 31,
    116: 24,
    117: 28,
    118: 25,
    119: 21,
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

document.addEventListener("keydown", handleKeypress);
let triggerButtons = document.querySelectorAll(".trigger");
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
