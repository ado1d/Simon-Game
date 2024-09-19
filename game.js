var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var highScore = 0;


function nextSequence() {
    userClickedPattern.length = 0;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
  
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);  //create flash effect
  
    playSound(randomChosenColor);
    $("h1").text("Level " + level);
    level++;
    highScore = Math.max(level - 1, highScore);
    $("h2").text("Highest Level " + highScore);
}
  

var button = $(".btn");
button.on("click", function(event) {
    var userChosenColor = this.classList[1];
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    console.log(userClickedPattern.length - 1);
    if (started)    checkAnswer(userClickedPattern.length - 1);

});

//start
$(document).on("keydown", function() {
    if (!started) {
        started = true;
        level++;
        nextSequence();
        userClickedPattern.length = 0;
    }
});


function checkAnswer (currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");
        console.log(currentLevel);
        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    
    }else {         //code for wrong
        console.log("wrong");
        playSound("wrong");

        $("h1").text("Game Over, Press Any Key to Restart");

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        starOver();
    }
}



function playSound(name) {
    var buttonAudio = new Audio("sounds/" + name + ".mp3");
    buttonAudio.play();
}

function animatePress(currentColor) {
    var button = $("." + currentColor);
    button.addClass("pressed");
    setTimeout (function() {
        button.removeClass("pressed");
    }, 100);
}


function starOver () {
    level = 0;
    gamePattern = [];
    started = false;
}