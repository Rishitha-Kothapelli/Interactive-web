// NAVIGATION
document.querySelectorAll(".nav-buttons button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".section").forEach(sec =>
      sec.classList.add("hidden")
    );
    document.getElementById(btn.dataset.target).classList.remove("hidden");
  });
});

// QUIZ
const questions = [
  {
    q: "Which method selects an element by ID?",
    a: ["querySelector()", "getElementById()", "getElementsByClassName()"],
    correct: 1
  },
  {
    q: "Which language runs in browser?",
    a: ["Python", "Java", "JavaScript"],
    correct: 2
  },
  {
    q: "CSS is used for?",
    a: ["Structure", "Styling", "Database"],
    correct: 1
  },
  {
    q: "Which is NOT a JS framework?",
    a: ["React", "Angular", "Django"],
    correct: 2
  }
];

let index = 0, score = 0;

function loadQuiz() {
  const q = questions[index];
  document.getElementById("question").innerText = q.q;

  const ans = document.getElementById("answers");
  ans.innerHTML = "";

  q.a.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.innerText = opt;

    btn.onclick = () => {
      btn.style.background = i === q.correct ? "green" : "red";
      if (i === q.correct) score++;

      setTimeout(() => {
        index++;
        updateProgress();
        if (index < questions.length) loadQuiz();
        else showResult();
      }, 500);
    };

    ans.appendChild(btn);
  });
}

function updateProgress() {
  const percent = (index / questions.length) * 100;
  document.getElementById("progressBar").style.width = percent + "%";
}

function showResult() {
  const res = document.getElementById("result");
  res.classList.remove("hidden");
  res.innerHTML = `
    <h3>Score: ${score}/${questions.length}</h3>
    <button onclick="location.reload()">Restart</button>
  `;
}

// CAROUSEL
let current = 0, interval;

function initCarousel() {
  const slides = document.querySelector(".slides");
  const total = slides.children.length;
  const dotsContainer = document.getElementById("dots");

  function showSlide(i) {
    current = i;
    slides.style.transform = `translateX(-${i * 100}%)`;
    updateDots();
  }

  function updateDots() {
    [...dotsContainer.children].forEach((d, i) =>
      d.classList.toggle("active", i === current)
    );
  }

  for (let i = 0; i < total; i++) {
    const dot = document.createElement("span");
    dot.onclick = () => showSlide(i);
    dotsContainer.appendChild(dot);
  }

  document.getElementById("next").onclick = () =>
    showSlide((current + 1) % total);

  document.getElementById("prev").onclick = () =>
    showSlide((current - 1 + total) % total);

  function startAuto() {
    interval = setInterval(() => {
      showSlide((current + 1) % total);
    }, 5000);
  }

  function stopAuto() {
    clearInterval(interval);
  }

  const carousel = document.getElementById("carousel");
  carousel.addEventListener("mouseenter", stopAuto);
  carousel.addEventListener("mouseleave", startAuto);

  showSlide(0);
  startAuto();
}

// JOKE API
async function fetchJoke() {
  const box = document.getElementById("jokeBox");
  box.innerHTML = `<div class="spinner"></div>`;

  try {
    const res = await fetch("https://official-joke-api.appspot.com/random_joke");
    const data = await res.json();

    box.innerHTML = `<p>${data.setup}<br><strong>${data.punchline}</strong></p>`;
  } catch {
    box.innerHTML = `<p>⚠ Failed to fetch joke</p>`;
  }
}

document.getElementById("jokeBtn").addEventListener("click", fetchJoke);

// INIT
loadQuiz();
initCarousel();
fetchJoke();