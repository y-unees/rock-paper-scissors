let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const nextBtn = document.querySelector("#next");

const userScorePara = document.querySelector(".user-score");
const compScorePara = document.querySelector(".comp-score");

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    return options[Math.floor(Math.random() * 3)];
};

const highlightWinner = (userWin, compChoice, userChoice) => {
    if(userWin) {
        choices.forEach(choice => {
            if (choice.id === userChoice) {
                choice.style.boxShadow = `0 0 15px #AAB99A`;
            } else if (choice.id === compChoice) {
                // pass
            } else {
                choice.classList.add("hidden");
            };
        });
    } else {
        choices.forEach(choice => {
            if (choice.id === userChoice) {
                // pass
            } else if (choice.id === compChoice) {
                choice.style.boxShadow = `0 0 15px #AAB99A`;
            } else {
                choice.classList.add("hidden");
            };
        });
    };
};

const highlightDrawn = (userChoice, compChoice) => {
    choices.forEach(choice => {
        if (choice.id === userChoice) {
            choice.style.boxShadow = `0 0 15px #AAB99A`;
        } else if (choice.id === compChoice) {
            choice.style.boxShadow = `0 0 15px #AAB99A`;
        } else {
            choice.classList.add("hidden");
        };
    });
}

const playGame = (userChoice) => {
    const compChoice = genCompChoice();

    disableChoices();
    
    if (userChoice === compChoice) {
        displayResult("Game is drawn, play again.", "#cccccc");
        highlightDrawn(userChoice, compChoice);
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compChoice === "scissors" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
        highlightWinner(userWin, compChoice, userChoice);
    };
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

const disableChoices = () => {
    choices.forEach(choice => choice.style.pointerEvents = "none");
};

const enableChoices = () => {
    choices.forEach(choice => choice.style.pointerEvents = "auto");
};

const resetChoices = () => {
    choices.forEach(choice => {
        choice.classList.remove("hidden");
        choice.style.boxShadow = "none";
        choice.style.transition = "transform 0.3s ease, box-shadow 0.3s ease"; 
    });
};

const displayResult = (text, color) => {
    msg.innerText = text;
    msg.style.color = color;
    msgContainer.style.display = "block";
};

const showWinner = (userWin, userChoice, compChoice) => {
    setTimeout(() =>{
        if (userWin) {
            userScore++;
            userScorePara.innerText = userScore;
            displayResult(`You win! ${userChoice} beats ${compChoice}.`, "#90EE90");
        } else {
            compScore++;
            compScorePara.innerText = compScore;
            displayResult(`You lose! ${compChoice} beats ${userChoice}.`, "#FF7F7F");
        };
    }, 300);
};

nextBtn.addEventListener("click", () => {
    resetChoices(); 
    enableChoices();
    msgContainer.style.display = "none"; 
});