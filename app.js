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
                text: "Updated Nov 23, 2021, 8:13 PM EST",
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
        5: 798,
        6: 600,
        7: 458,
        8: 337,
        9: 276,
        10: 254,
        11: 219,
        12: 208,
        13: 171,
        14: 210,
        15: 157,
        16: 184,
        17: 200,
        18: 206,
        19: 211,
        20: 233,
        21: 246,
        22: 275,
        23: 281,
        24: 330,
        25: 327,
        26: 351,
        27: 389,
        28: 435,
        29: 467,
        30: 497,
        31: 524,
        32: 544,
        33: 597,
        34: 616,
        35: 675,
        36: 639,
        37: 749,
        38: 808,
        39: 846,
        40: 865,
        41: 984,
        42: 946,
        43: 988,
        44: 1098,
        45: 1111,
        46: 1213,
        47: 1324,
        48: 1322,
        49: 1394,
        50: 1562,
        51: 1562,
        52: 1702,
        53: 1837,
        54: 1905,
        55: 2079,
        56: 2098,
        57: 2255,
        58: 2403,
        59: 3003,
        60: 2917,
        61: 2571,
        62: 2505,
        63: 2289,
        64: 2086,
        65: 2044,
        66: 1917,
        67: 1677,
        68: 1604,
        69: 1546,
        70: 1380,
        71: 1269,
        72: 1130,
        73: 1034,
        74: 971,
        75: 856,
        76: 753,
        77: 702,
        78: 648,
        79: 562,
        80: 520,
        81: 485,
        82: 438,
        83: 409,
        84: 363,
        85: 365,
        86: 262,
        87: 279,
        88: 249,
        89: 210,
        90: 220,
        91: 176,
        92: 168,
        93: 145,
        94: 147,
        95: 120,
        96: 97,
        97: 94,
        98: 91,
        99: 77,
        100: 67,
        101: 64,
        102: 70,
        103: 55,
        104: 56,
        105: 48,
        106: 45,
        107: 44,
        108: 41,
        109: 27,
        110: 32,
        111: 25,
        112: 23,
        113: 22,
        114: 22,
        115: 21,
        116: 14,
        117: 17,
        118: 14,
        119: 15,
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
