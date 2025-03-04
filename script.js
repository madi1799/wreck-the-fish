let score = 0;
let bossHealth = 20;
let bossActive = false;

const fish = document.getElementById("fish");
const boss = document.getElementById("boss");
const scoreText = document.getElementById("score");
const bossHealthContainer = document.getElementById("bossHealthContainer");
const bossHealthBar = document.getElementById("bossHealthBar");

// Sound Fix: Clone audio to prevent overlapping issues
function playSound(audioFile) {
    let sound = new Audio(audioFile);
    sound.play();
}

// Move the fish randomly
function moveFish() {
    if (!bossActive) {
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 100);
        fish.style.left = `${x}px`;
        fish.style.top = `${y}px`;
    }
}

// Handle fish click
fish.addEventListener("click", function() {
    if (!bossActive) {
        fish.src = "auch.png";  // Change to "auch" image
        playSound("auch.mp3");  // Play "auch" sound
        setTimeout(() => {
            fish.src = "fish.png";  // Change back to normal fish
        }, 200);

        score++;
        scoreText.textContent = "Score: " + score;
        moveFish();

        if (score % 20 === 0) {
            startBossFight();
        }
    }
});

// Start Boss Fight
function startBossFight() {
    bossActive = true;
    fish.style.display = "none"; // Hide fish
    boss.style.display = "block";
    bossHealthContainer.style.display = "block";
    bossHealth = 20;
    bossHealthBar.style.width = "100%";

    setTimeout(() => {
        if (bossActive) {
            bossDefeat(false);
        }
    }, 15000); // 15 sec timer
}

// Handle Boss Click
boss.addEventListener("click", function() {
    playSound("auch.mp3"); // Play same "auch" sound
    boss.src = "boss2.png"; // Change boss image
    setTimeout(() => {
        boss.src = "boss1.png"; // Change back
    }, 200);

    bossHealth--;
    bossHealthBar.style.width = (bossHealth / 20) * 100 + "%";

    if (bossHealth <= 0) {
        bossDefeat(true);
    }
});

// Boss Defeat
function bossDefeat(killed) {
    if (killed) {
        score += 30;
        scoreText.textContent = "Score: " + score;
    }
    bossActive = false;
    boss.style.display = "none";
    bossHealthContainer.style.display = "none";
    fish.style.display = "block";
    moveFish();

    // Make sure boss appears again at next 20 score
    if (score % 20 === 0) {
        startBossFight();
    }
}

// Set fish position when the page loads
window.onload = function() {
    moveFish();
};
