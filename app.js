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
    5: 504,
    6: 401,
    7: 262,
    8: 198,
    9: 167,
    10: 156,
    11: 131,
    12: 132,
    13: 102,
    14: 141,
    15: 94,
    16: 103,
    17: 121,
    18: 131,
    19: 132,
    20: 148,
    21: 146,
    22: 184,
    23: 171,
    24: 222,
    25: 217,
    26: 247,
    27: 265,
    28: 295,
    29: 321,
    30: 318,
    31: 348,
    32: 392,
    33: 406,
    34: 416,
    35: 455,
    36: 406,
    37: 505,
    38: 529,
    39: 568,
    40: 566,
    41: 696,
    42: 629,
    43: 684,
    44: 750,
    45: 748,
    46: 830,
    47: 902,
    48: 917,
    49: 977,
    50: 1078,
    51: 1082,
    52: 1181,
    53: 1282,
    54: 1313,
    55: 1453,
    56: 1444,
    57: 1543,
    58: 1652,
    59: 2059,
    60: 2028,
    61: 1799,
    62: 1770,
    63: 1600,
    64: 1448,
    65: 1428,
    66: 1342,
    67: 1120,
    68: 1106,
    69: 1067,
    70: 946,
    71: 889,
    72: 773,
    73: 710,
    74: 675,
    75: 616,
    76: 528,
    77: 486,
    78: 452,
    79: 398,
    80: 357,
    81: 320,
    82: 306,
    83: 274,
    84: 250,
    85: 245,
    86: 189,
    87: 196,
    88: 167,
    89: 147,
    90: 140,
    91: 113,
    92: 111,
    93: 87,
    94: 98,
    95: 77,
    96: 69,
    97: 73,
    98: 55,
    99: 48,
    100: 48,
    101: 33,
    102: 48,
    103: 34,
    104: 34,
    105: 32,
    106: 32,
    107: 32,
    108: 27,
    109: 14,
    110: 17,
    111: 13,
    112: 15,
    113: 14,
    114: 14,
    115: 14,
    116: 7,
    117: 9,
    118: 11,
    119: 9,
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
