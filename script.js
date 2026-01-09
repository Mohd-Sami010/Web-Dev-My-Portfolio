let skillsClicks = 0;
const skillsContainer = document.getElementById("skills-container");
const skillsLock = document.getElementById("skills-lock");

const projectsContainer = document.getElementById("project-container");

const achievementContainer = document.getElementById("achievement-container");


//Restore Unlock
if (localStorage.getItem("skillsUnlocked") === "true"){
    skillsContainer.classList.remove("locked");
    skillsContainer.classList.add("unlocked");
}
if (localStorage.getItem("projectsUnlocked") === "true"){
    projectsContainer.classList.add("unlocked");
}

// Click logic
skillsLock.addEventListener("click", () => {
    if (skillsContainer.classList.contains("unlocked")) return;

    skillsClicks++;
    if (skillsClicks >= 5){
        UnlockSkills();
    }
    skillsLock.innerHTML = `<p>Clicks: ${skillsClicks}/5</p>`;
})

function UnlockSkills(){
    skillsContainer.classList.remove("locked");
    skillsContainer.classList.add("unlocked");
    // localStorage.setItem("skillsUnlocked", "true");
    ShowAchievement("Clicker Game", "Click 5 times on Skills section.")
}

// Scroll unlock
window.addEventListener("scroll", () => {
    if (projectsContainer.classList.contains("unlocked")) return;

    const reachedBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight -5;
    if (reachedBottom) UnlockProjects();
})
function UnlockProjects(){
    projectsContainer.classList.add("unlocked");
    // localStorage.setItem("projectsUnlocked", "true");
    ShowAchievement("Doom Scroller", "Scroll to the buttom.")
}

// Notification
function ShowAchievement(title, description = "Achievement Unlocked") {
    const achievement = document.createElement("div");
    achievement.className = "achievement";

    achievement.innerHTML = `
        <div class="achievement-icon"></div>
        <div class="achievement-text">
            <small>${description}</small>
            <strong>${title}</strong>
        </div>
    `;

    achievementContainer.appendChild(achievement);

    // Auto-remove after animation completes
    setTimeout(() => {
        achievement.remove();
    }, 4000);
}
