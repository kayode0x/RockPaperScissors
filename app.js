const game = ()=>{ //main game functions that executes everything
    let pScore = 0; // sets the initial score of the player to 0
    let cScore = 0; // sets the initial score of the computer to 0
    let streaks = [] //sets the initial values to 0


    

    //start the game
    const startGame = ()=>{
        const playBtn = document.querySelector('.intro button');
        const scoreScreen = document.querySelector('.score')
        const introScreen = document.querySelector('.intro');
        const matchScreen = document.querySelector('.match');
        const height = document.querySelector('.game')
        height.style.height = window.innerHeight;

        const goTop = () => {
            windows.scrollTo(0, 0);
        }

        playBtn.addEventListener('click', ()=>{ 
            scoreScreen.classList.add('fadeIn');
            introScreen.classList.add('fadeOut');
            matchScreen.classList.add('fadeIn');
            goTop();
        });

    };

    //play the match
    const playMatch = ()=>{

        const playerName = document.querySelector('.player-score h3');
        const setName = document.querySelector('.setName');
        const optionsAll = document.querySelectorAll('.options button');
        const option = document.querySelector('.options');
        const playerHand = document.querySelector('.player-hand');
        const computerHand = document.querySelector('.computer-hand');
        const hands = document.querySelectorAll('.hands img');
        const selectRock = document.querySelector('.rock');
        const selectPaper = document.querySelector('.paper');
        const selectScissors = document.querySelector('.scissors');
        const winner = document.querySelector('.winner');

        const hideWinner = () => {
            winner.style.pointerEvents = 'none';
            winner.style.animation = 'hideAnimateWinner 1s ease-out forwards';
            playerHand.src = './assets/rock.png';
            computerHand.src = './assets/rock.png';
            option.style.animation = 'hideOption 1s ease-out forwards';
            
        } //fadeout the "winner or choose an option" and reset the hands img

        selectRock.addEventListener('click', () => {
            hideWinner();
        });

        selectPaper.addEventListener('click', () => {
            hideWinner();
        });

        selectScissors.addEventListener('click', () => {
            hideWinner();
        });

        hands.forEach(hand => {
            hand.addEventListener('animationend', function(){
                this.style.animation = '';
            }); //removes the animation

        }); //once the animation ends, remove it

        setName.addEventListener('click', () => {
            const playBtn = document.querySelector('.intro button');
            const getPlayerName = document.getElementById('name').value;
            const readyName = document.querySelector('.nameReady h2');
            const formReady = document.querySelector('.form');
            const nameReady = document.querySelector('.nameReady');
            const isEmpty = str => !str.trim().length;

            if (isEmpty(getPlayerName)) {
                playerName.textContent = "Me"; // if user clicks play without setting a name, set the name to "Me"
            } else {
                playerName.textContent = `${getPlayerName}`;
            }; //set the player name to whatever the player chose

            formReady.classList.add('fadeOut'); // fades the form out
            nameReady.classList.add('fadeIn'); //shows the name of the player after "check icon" has been clicked

            if (isEmpty(getPlayerName)) {
                readyName.textContent = "Hey there 👋"; //if the user tries to play with empty spaces, set the name to "Me" but greet with "Hey there"
            } else {
                readyName.textContent = `Hey, "${getPlayerName}" 👋`; //greet the player with the name chosen by the user
            };

            //add an animation to make the play button move

            playBtn.classList.remove('playNow'); //remove the regular play button (static color)
            playBtn.classList.add('playBtnAnim'); //add a new button to play with animation (glowing)

        });

        //computer options
        const computerOptions = ['rock', 'paper', 'scissors']; // computer options
        
        optionsAll.forEach(option =>{
            option.addEventListener('click', function(){
                computerNumber = Math.floor(Math.random() * 3);
                computerChoice = computerOptions[computerNumber]; //makes the computer pick a random choice
                
                setTimeout(() =>{
                    //call compare hands here
                    compareHands(this.textContent, computerChoice);

                    //update images
                    playerHand.src = `./assets/${this.textContent}.png`; //sets the image to what the player chose
                    computerHand.src = `./assets/${computerChoice}.png`; //sets the image to what the computer picked
                } ,2000); //wait for two seconds before displaying the images

                //animations
                playerHand.style.animation = 'shakePlayer 2s ease'; //animates the player hand
                computerHand.style.animation = 'shakeComputer 2s ease'; //animates the computer hand

            });
        });
        
    };

    const updateScore = ()=>{
        const playerScore = document.querySelector('.player-score p');
        const computerScore = document.querySelector('.computer-score p');
        const playerName = document.querySelector('.player-score');
        const computerName = document.querySelector('.computer-score');
        const streak = document.querySelector('.streak h2');
        

        const shakePlayerName = () => {
            playerName.style.animation = 'shakeNames 2s ease forwards';
            streak.textContent = "Player Streak 🔥"
            streak.style.animation = 'fadeStreak 2s ease forwards';
        }

        const shakeComputerName = () => {
            computerName.style.animation = 'shakeNames 2s ease forwards';
            streak.textContent = "Computer Streak 🔥"
            streak.style.animation = 'fadeStreak 2s ease forwards';
        }

        playerScore.textContent = Number(pScore);
        computerScore.textContent = Number(cScore);

        function countStreaks(array, what) {
            var count = 0;
            for (var i = 0; i < array.length; i++) {
                if (array[i] === what) {
                    count++;
                }
            }
            return count;
        }

        let x = Number(countStreaks(streaks, 1));
        let y = Number(countStreaks(streaks, 0));

        if (x === 1 && y === 1) {
            streaks = []
        } else if (x === 2 && y === 1) {
            streaks = []
        } else if (x === 1 && y === 2) {
            streaks = []
        };

        if (x === 3 && y < 3) {

            shakePlayerName();
            streaks = [];
        };

        if (y === 3 && x < 3) {

            shakeComputerName();
            streaks = [];
        };
        
    };


    const compareHands = (playerChoice, computerChoice) => {
        const winner = document.querySelector('.winner');

        const showWinner = () => {
            const option = document.querySelector('.options');

            winner.style.pointerEvents = 'all';
            winner.style.animation = 'showAnimateWinner 1s ease-in';
            option.style.animation = 'showOption 1s ease-in forwards';
        } //show the "winner or choose option" header

        //check for a tie
        if (playerChoice === computerChoice){
            updateScore(); //this function displays the new score
            winner.textContent = "It's a tie";
            showWinner(); //remember the "winner or choose option" header was hidden? now we show it
            return;
        }

        //check for rock
        if (playerChoice === 'rock'){
            if(computerChoice === 'scissors'){
                winner.textContent = "Player Wins"
                streaks.push(1);
                showWinner();
                pScore++; // increase the score
                updateScore(); //this function displays the new score
                return;
            } else {
                winner.textContent = "Computer Wins"
                streaks.push(0);
                showWinner();
                cScore++;
                updateScore();
                return;
            }
        }

        //check for paper
        if (playerChoice === 'paper') {
            if (computerChoice === 'scissors') {
                winner.textContent = "Computer Wins"
                streaks.push(0);
                showWinner();
                cScore++;
                updateScore();
                return;
            } else {
                winner.textContent = "Player Wins"
                streaks.push(1);
                showWinner();
                pScore++;
                updateScore();
                return;
            }
        }

        //check for scissors
        if (playerChoice === 'scissors') {
            if (computerChoice === 'rock') {
                winner.textContent = "Computer Wins"
                streaks.push(0);
                showWinner();
                cScore++;
                updateScore();
                return;
            } else {
                winner.textContent = "Player Wins"
                streaks.push(1);
                showWinner();
                pScore++;
                updateScore();
                return;
            }
        }

    }

    //call all the inner functions
    
    startGame();
    playMatch();
};

//call the main function
game();