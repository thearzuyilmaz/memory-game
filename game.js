var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;
var started = false;

// Game Start
$(document).keypress(function() {

    if (!started){

        $("#level-title").text("Level " + level); 
        nextSequence(); 
        started = true;
    }
});

// pops a new color
function nextSequence(){

    level++;
    userClickedPattern = []; // new empty pattern for the user

    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    //Selecting random button and animating
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    
    });


function checkAnswer(indexClicked){

    if ( userClickedPattern[indexClicked] === gamePattern[indexClicked] ){
        if (gamePattern.length === userClickedPattern.length){
            // success, continue to the next level after waiting 1000 sec
            setTimeout(function () {
                nextSequence();
                }, 1000);
        } // otherwise, just wait for the next click
    } else {
        gameOver();
        startOver(); // reset variables
    }
} 



function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function gameOver(){

    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
        $("body").removeClass("game-over");
        }, 200); 
    
    }


    
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
$("#" + currentColour).addClass('pressed');   
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
        }, 100);
}





