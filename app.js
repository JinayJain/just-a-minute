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
    provider: new ReCaptchaV3Provider(
        "6LeaL1IdAAAAAJN9p1V7Mc6BQMFntamwBJ8t-0Pe"
    ),
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
        5: 950,
        6: 735,
        7: 571,
        8: 420,
        9: 372,
        10: 328,
        11: 269,
        12: 274,
        13: 222,
        14: 261,
        15: 207,
        16: 231,
        17: 251,
        18: 253,
        19: 252,
        20: 290,
        21: 291,
        22: 329,
        23: 323,
        24: 402,
        25: 376,
        26: 404,
        27: 452,
        28: 498,
        29: 532,
        30: 564,
        31: 607,
        32: 621,
        33: 684,
        34: 706,
        35: 762,
        36: 726,
        37: 843,
        38: 922,
        39: 941,
        40: 985,
        41: 1091,
        42: 1086,
        43: 1132,
        44: 1227,
        45: 1246,
        46: 1365,
        47: 1465,
        48: 1465,
        49: 1574,
        50: 1738,
        51: 1742,
        52: 1908,
        53: 2002,
        54: 2114,
        55: 2290,
        56: 2333,
        57: 2481,
        58: 2659,
        59: 3324,
        60: 3206,
        61: 2790,
        62: 2720,
        63: 2524,
        64: 2300,
        65: 2234,
        66: 2110,
        67: 1872,
        68: 1774,
        69: 1718,
        70: 1507,
        71: 1394,
        72: 1239,
        73: 1145,
        74: 1055,
        75: 935,
        76: 841,
        77: 781,
        78: 712,
        79: 633,
        80: 591,
        81: 539,
        82: 493,
        83: 457,
        84: 403,
        85: 402,
        86: 288,
        87: 318,
        88: 275,
        89: 246,
        90: 242,
        91: 199,
        92: 192,
        93: 167,
        94: 162,
        95: 133,
        96: 121,
        97: 115,
        98: 99,
        99: 86,
        100: 77,
        101: 75,
        102: 86,
        103: 62,
        104: 60,
        105: 56,
        106: 49,
        107: 52,
        108: 50,
        109: 36,
        110: 37,
        111: 27,
        112: 28,
        113: 28,
        114: 29,
        115: 26,
        116: 17,
        117: 23,
        118: 17,
        119: 16,
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
