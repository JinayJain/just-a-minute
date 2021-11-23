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
        text: "Updated Nov 23, 2021, 2:11 PM EST",
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
    5: 697,
    6: 541,
    7: 396,
    8: 294,
    9: 238,
    10: 227,
    11: 191,
    12: 190,
    13: 152,
    14: 192,
    15: 139,
    16: 155,
    17: 175,
    18: 178,
    19: 190,
    20: 205,
    21: 218,
    22: 248,
    23: 251,
    24: 288,
    25: 289,
    26: 325,
    27: 356,
    28: 391,
    29: 418,
    30: 441,
    31: 480,
    32: 497,
    33: 542,
    34: 552,
    35: 600,
    36: 576,
    37: 684,
    38: 733,
    39: 772,
    40: 785,
    41: 917,
    42: 873,
    43: 897,
    44: 1001,
    45: 1026,
    46: 1104,
    47: 1231,
    48: 1232,
    49: 1291,
    50: 1439,
    51: 1428,
    52: 1566,
    53: 1701,
    54: 1755,
    55: 1915,
    56: 1948,
    57: 2070,
    58: 2233,
    59: 2786,
    60: 2690,
    61: 2378,
    62: 2325,
    63: 2146,
    64: 1938,
    65: 1888,
    66: 1788,
    67: 1549,
    68: 1473,
    69: 1437,
    70: 1278,
    71: 1193,
    72: 1054,
    73: 963,
    74: 917,
    75: 799,
    76: 699,
    77: 643,
    78: 606,
    79: 542,
    80: 475,
    81: 446,
    82: 409,
    83: 391,
    84: 340,
    85: 338,
    86: 236,
    87: 257,
    88: 230,
    89: 199,
    90: 198,
    91: 161,
    92: 154,
    93: 128,
    94: 135,
    95: 108,
    96: 91,
    97: 90,
    98: 87,
    99: 68,
    100: 64,
    101: 56,
    102: 67,
    103: 48,
    104: 47,
    105: 42,
    106: 41,
    107: 40,
    108: 37,
    109: 26,
    110: 29,
    111: 22,
    112: 20,
    113: 21,
    114: 19,
    115: 20,
    116: 12,
    117: 17,
    118: 13,
    119: 13,
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
