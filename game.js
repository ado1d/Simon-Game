var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var highScore = 0;
var allowRestart = true;  

function nextSequence() {
    userClickedPattern.length = 0;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);  // create flash effect

    playSound(randomChosenColor);
    $("h1").text("Level " + level);
    level++;
    highScore = Math.max(level - 1, highScore);
    $("h2").text("Highest Level " + highScore);
}

var button = $(".btn");
button.on("click touchstart", function(event) {
    var userChosenColor = this.classList[1];
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    console.log(userClickedPattern.length - 1);
    if (started) checkAnswer(userClickedPattern.length - 1);
});

// startt or restart the game
$(document).on("keydown touchstart", function() {
    if (!started && allowRestart) {  
        started = true;
        level = 0;  
        level++;
        nextSequence();
        userClickedPattern.length = 0;
        allowRestart = false;  
    }
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");
        console.log(currentLevel);
        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {  // Code for wrong answer
        console.log("wrong");
        playSound("wrong");

        $("h1").text("Game Over, Press Any Key or touch the screen to Restart");

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        // dely the restart to prevent immediate start
        setTimeout(function() {
            allowRestart = true;  
        }, 2000);  // 2 seconds delay before allowing restart

        startOver();
    }
}

function playSound(name) {
    var buttonAudio = new Audio("sounds/" + name + ".mp3");
    buttonAudio.play();
}

function animatePress(currentColor) {
    var button = $("." + currentColor);
    button.addClass("pressed");
    setTimeout(function() {
        button.removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
