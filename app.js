let pageNumber = 0;
let pageNames = ["intro-page", "waiting-page", "end-page"];
let pages = pageNames.map((name) => document.getElementById(name));
pages[pageNumber].style.opacity = 1;

function transition() {
  pageNumber = (pageNumber + 1) % pages.length;

  if (pageNames[pageNumber] === "waiting-page") {
    startTimer();
  } else if (pageNames[pageNumber] === "end-page") {
    stopTimer();
  }

  pages.forEach((p, i) => {
    if (i === pageNumber) p.style.opacity = 1;
    else p.style.opacity = 0;
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
  let errorStr = ((diff - 60 * 1000) / (60 * 1000) * 100).toFixed(2) + "% error";
  let elapsedStr = (diff / 1000).toFixed(2) + "s";
  $("#time-taken").text(elapsedStr);
  $("#percent-error").text(errorStr);
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
setInterval(() => {
  let now = new Date();
  if (now > changeTime) {
    changeAnxietyInducingSentence();
    changeTime = new Date(now.getTime() + Math.random() * 5 * 1000 + 2000);
  }
}, 100);
