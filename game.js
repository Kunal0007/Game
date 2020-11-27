var userClickedPattern = []
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;
var started = false;

$(document).keydown(function() {
  if (!started) {
    $("h1").text("level " + level);
    nextSequence();
    started = true;
  }

});


function nextSequence() {

  userClickedPattern = [];

  level++;
  $("h1").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  // console.log(gamePattern);


}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

$(document).click(function(event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    // console.log("s");

    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
