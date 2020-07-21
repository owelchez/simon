// Wait for document to finish loading before running code
$(document).ready(function() {
  const characters = ["link", "zelda", "navi", "ganon"];
  var level = 0;
  var index = 0;
  var pattern = [characters[getRandomNumber()]];
  var choices = [];

//  Start game on keyboard key press
    $(document).one("keypress", function(){
      $("#level-title").text("Level " + ++level);
      clickBtnAnimation(pattern[pattern.length-1])
    })

// Start game by clicking on button "HERE"
    $(".start").one("click", function(){
      $("#level-title").text("Level " + ++level);
      clickBtnAnimation(pattern[pattern.length-1])
    })

// Compares array's index for equality, if not equal = game over
  function checkClicks(buttonClicked){
    choices.push(buttonClicked);

      if(choices[index] == pattern[index]){
        if(choices.length == pattern.length){
          setTimeout(function(){nextLevel()}, 2000);
        }
        index++;
      } else {
        index = 0;
        gameOver();
      }
  }

// Add a new level and update arrays choices and pattern
  function nextLevel(){
    level++;
    choices = [];
    index = 0;
    pattern.push(characters[getRandomNumber()])
    levelUpTitle();
  }

// Update level title and triggers new button animation
  function levelUpTitle(){
    $("#level-title").text("Level " + level);
    setTimeout(function(){ clickBtnAnimation(pattern[pattern.length-1])}, 200);
  }

// Listens to any clicks on buttons of characters
  $(".btn").click(function(e){
    var clicked = this.id;
    clickBtnAnimation(clicked);
    if(level < 1){
      gameOver();
    }
    checkClicks(clicked);
  })

// IT'S A SECRET
  $('.secret').click(function(){
    playSound("secret");
  })

// Shows gameover image and plays devil laughter then reloads page
  function gameOver(){
    $('.elements-container').hide();
    $("#level-title").text("You have lost the Triforce");
    document.body.style.backgroundImage = "url('./assets/images/gameover-bg.jpg')";
    playSound("gameover");
    setTimeout(function(){ location.reload(); }, 8000)
  }

// A function to play many characters sounds
  function playSound(character){
    var audio = new Audio('./assets/sounds/' + character + '.wav');
    audio.play();
  }

// Adds click animations to buttons
  function clickBtnAnimation(character){
    playSound(character);
    $("#" + character).addClass("pressed-" + character);
    setTimeout(function(){ $("#" + character).removeClass("pressed-" + character); }, 500);
  }

// Creates a random number from 1 to 4
  function getRandomNumber(){
    var randomNumber = Math.random();
    randomNumber = (randomNumber * 4);
    randomNumber = Math.floor(randomNumber);
    return randomNumber;
  }
});
