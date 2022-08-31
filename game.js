// variables for the aplication

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

//start the game

$(document).keypress(function() {
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }

});

// code for the behaviour of the buttons when clicked

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

//function to check the answer


function checkAnswer(currentLevel) {

  //if the answer sequence is correct

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {

        nextSequence();

      }, 1000);
    }
  } else {

    // if the answer sequence is wrong

    playSound("wrong");

    $("body").addClass("game-over apply-shake");
    setTimeout(function() {

      $("body").removeClass("game-over");

    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }

}

//function that defines the sequence of the numbers created by the game Pattern

function nextSequence() {

  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);


}

// function that plays the sound of the specified colour when the button with the same name is pressed

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

//function for the pressed animation of the button

function animatePress(currentColor) {


  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {

    $("#" + currentColor).removeClass("pressed");

  }, 100);

}

//function to start the game Over

function startOver() {

  gamePattern = [];

  level = 0;

  started = false;

}
