let health = 10;
let step = 0;

const gameOutput = document.getElementById("game-output");
const playerInput = document.getElementById("player-input");
const submitButton = document.getElementById("submit-button");
const restartButton = document.getElementById("restart-button");

const scenarios = [
  {
    question: "You are fighting for survival, make good decisions to get out of it. You start the game with 10 HP. You wake up in a dense forest. Do you go left or right? (left/right)",
    options: { left: "You chose the left path.", right: "You got attacked by a bear and lost." },
    healthEffects: { left: 0, right: -10 },
  },
  {
    question: "You're hungry. Do you forage for berries or climb a tree? (forage/climb)",
    options: { forage: "The berries were toxic. You lose 2 health.", climb: "You slipped and lost 3 health." },
    healthEffects: { forage: -2, climb: -3 },
  },
  {
    question: "Darkness falls and you need to make a camp. Do you light a fire or sleep in a tree? (fire/tree)",
    options: {
      fire: "The fire kept you warm but attracted predators. You lose 1 health.",
      tree: "You slept uncomfortably but stayed safe.",
    },
    healthEffects: { fire: -1, tree: 0 },
  },
  {
    question: "You hear a strange voice nearby. Do you investigate or stay hidden? (investigate/hide)",
    options: {
      investigate: "You found a rabbit and caught it for dinner. You gain 2 health.",
      hide: "You stayed hidden and the danger passed.",
    },
    healthEffects: { investigate: 2, hide: 0 },
  },
  {
    question: "You need to climb a hill to see your surroundings. Do you climb or choose the longer, safer path? (climb/safer)",
    options: {
      climb: "You slipped and hurt yourself. You lose 1 health.",
      safer: "The way around was longer but was worth it.",
    },
    healthEffects: { climb: -1, safer: 0 },
  },
  {
    question: "You see a village in the distance! Do you sprint to it or walk cautiously? (sprint/walk)",
    options: {
      sprint: "You were shot by village hunters who mistook you for a threat. You lose 9 health.",
      walk: "You made it to the village safely.",
    },
    healthEffects: { sprint: -9, walk: 0 },
  },
];

function updateGame(text) {
  gameOutput.innerHTML += `<p>${text}</p>`;
  gameOutput.scrollTop = gameOutput.scrollHeight; // Auto-scroll to the latest update
}

function processAnswer(answer) {
  if (step >= scenarios.length) return;

  const current = scenarios[step];
  const result = current.options[answer];
  if (result) {
    health += current.healthEffects[answer];
    updateGame(`${result} (Health: ${health})`);

    step++;
    if (health <= 0) {
      updateGame("You ran out of health. Game over!");
      endGame();
    } else if (step >= scenarios.length) {
      updateGame("Congratulations! You survived.");
      endGame();
    } else {
      setTimeout(() => updateGame(scenarios[step].question), 1000);
    }
  } else {
    updateGame("Invalid choice. Try again.");
  }
}

function endGame() {
  playerInput.disabled = true;
  submitButton.disabled = true;
  restartButton.style.display = "block";
}

function restartGame() {
  health = 10;
  step = 0;
  gameOutput.innerHTML = "";
  playerInput.disabled = false;
  submitButton.disabled = false;
  restartButton.style.display = "none";
  updateGame(scenarios[step].question);
}

submitButton.addEventListener("click", () => {
  const answer = playerInput.value.trim().toLowerCase();
  playerInput.value = "";
  processAnswer(answer);
});

restartButton.addEventListener("click", restartGame);

// Start the game
updateGame(scenarios[step].question);
