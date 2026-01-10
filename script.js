let skillsClicks = 0;
const skillsContainer = document.getElementById("skills-container");
const skillsLock = document.getElementById("skills-lock");

const projectsContainer = document.getElementById("project-container");
const journeyContainer = document.getElementById("journey-container");

const journeyQuestions = [
    {
        question: "What is Neural Prison in my projects?",
        options: [
            "Neural Network",
            "Video Game",
            "AI in python",
            "Coding Language"
        ],
        answer: 1
    },
    {
        question: "Which library I used to output coloured text in Python?",
        options: [
            "colorama",
            "colourama",
            "colours",
            "pycolors"
        ],
        answer: 0
    }
];
let currentJourneyQuestion = 0;
let correctJourneyAnswers = 0;

const journeyLock = document.getElementById("journey-lock");
const questionText = document.getElementById("question-text");
const optionButtons = document.querySelectorAll(".option-btn");
const quizFeedback = document.getElementById("quiz-feedback");

const unlockState = {
    skills: false,
    projects: false,
    journey: false
};
const contactContainer = document.getElementById("contact-container");

const achievementContainer = document.getElementById("achievement-container");


//Restore Unlock
if (localStorage.getItem("skillsUnlocked") === "true") {
    skillsContainer.classList.remove("locked");
    skillsContainer.classList.add("unlocked");
    unlockState.skills = true;
}
if (localStorage.getItem("projectsUnlocked") === "true") {
    projectsContainer.classList.remove("locked");
    projectsContainer.classList.add("unlocked");
    unlockState.projects = true;
}
if (localStorage.getItem("journeyUnlocked") === "true") {
    journeyContainer.classList.remove("locked");
    journeyContainer.classList.add("unlocked")
    unlockState.journey = true
}
if (localStorage.getItem("contactUnlocked") === "true") {
    contactContainer.classList.remove("locked");
    contactContainer.classList.add("unlocked")
}

// Click logic
skillsLock.addEventListener("click", () => {
    if (skillsContainer.classList.contains("unlocked")) return;

    skillsClicks++;
    if (skillsClicks >= 5) {
        UnlockSkills();
    }
    skillsLock.innerHTML = `<p>Clicks: ${skillsClicks}/5</p>`;
})

function UnlockSkills() {
    localStorage.setItem("skillsUnlocked", "true");

    skillsContainer.classList.remove("locked");
    skillsContainer.classList.add("unlocked");

    ShowAchievement("Cookie Clicker", "Click 5 times on Skills section.")

    unlockState.skills = true;
    CheckContactUnlock();
}

// Scroll unlock
window.addEventListener("scroll", () => {
    if (projectsContainer.classList.contains("unlocked")) return;

    const reachedBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 5;
    if (reachedBottom) UnlockProjects();
})
function UnlockProjects() {
    projectsContainer.classList.add("unlocked");
    localStorage.setItem("projectsUnlocked", "true");
    ShowAchievement("Doom Scroller", "Scrolled to the buttom.")

    unlockState.projects = true;
    CheckContactUnlock();
}

// Journey
function LoadJourneyQuestion() {
    const q = journeyQuestions[currentJourneyQuestion];
    questionText.innerHTML = `<h3>${q.question}</h3>`;
    quizFeedback.textContent = "";

    optionButtons.forEach((btn, index) => {
        btn.textContent = q.options[index];
        btn.onclick = () => CheckJourneyAnswer(index);
    });
}
function CheckJourneyAnswer(selectedIndex) {
    const correctIndex = journeyQuestions[currentJourneyQuestion].answer;

    if (selectedIndex === correctIndex) {
        correctJourneyAnswers++;
        quizFeedback.textContent = "✔ Correct!";
        quizFeedback.style.color = "#4ec9b0";

        currentJourneyQuestion++;

        if (correctJourneyAnswers >= 2) {
            UnlockJourney();
        } else {
            setTimeout(LoadJourneyQuestion, 800);
        }
    } else {
        quizFeedback.textContent = "✖ Wrong answer. Try again.";
        quizFeedback.style.color = "#ce9178";
    }
}
function UnlockJourney() {
    journeyContainer.classList.remove("locked");
    journeyContainer.classList.add("unlocked");

    localStorage.setItem("journeyUnlocked", "true");
    ShowAchievement(
        "Big Brain",
        "Remember project details."
    );

    unlockState.journey = true;
    CheckContactUnlock();
}

// Contact Me
function CheckContactUnlock() {

    const reachedBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 5;
    const allSectionUnlocked = unlockState.skills && unlockState.projects && unlockState.journey;

    if (allSectionUnlocked && reachedBottom) {
        console.log("Check");
        UnlockContact();
    }
}
function UnlockContact() {
    if (!contactContainer.classList.contains("locked")) return;

    contactContainer.classList.remove("locked");
    contactContainer.classList.add("unlocked");

    ShowAchievement(
        "Main Character",
        "You unlocked the ending."
    );
    localStorage.setItem("contactUnlocked", "true");
}


// Notification
function ShowAchievement(title, description = "Achievement Unlocked") {
    const achievement = document.createElement("div");
    achievement.className = "achievement";

    achievement.innerHTML = `
        <div class="achievement-icon"><img src="Images/trophy-icon.png" alt=""></div>
        <div class="achievement-text">
            <small>${description}</small>
            <strong>${title}</strong>
        </div>
    `;
    const sound = new Audio("Images/Audios/steam-achievement.mp3");
    sound.play()
    achievementContainer.appendChild(achievement);

    // Auto-remove after animation completes
    setTimeout(() => {
        achievement.remove();
    }, 10000); //4000
}
setInterval(CheckContactUnlock, 500);

if (journeyContainer.classList.contains("locked")) {
    LoadJourneyQuestion();
}
