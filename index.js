$(document).ready(function() {
  const characters = ["link", "zelda", "epona", "ganon"];
  var level = 0;
  var index = 0;
  var pattern = [characters[getRandomNumber()]];
  var choices = [];

    $(document).one("keypress", function(){
      $("#level-title").text("Level " + ++level);
      clickBtnAnimation(pattern[pattern.length-1])
    })

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

  function nextLevel(){
    level++;
    choices = [];
    index = 0;
    pattern.push(characters[getRandomNumber()])
    levelUpTitle();
  }

  function levelUpTitle(){
    $("#level-title").text("Level " + level);
    setTimeout(function(){ clickBtnAnimation(pattern[pattern.length-1])}, 200);
  }

  $(".btn").click(function(e){
    var clicked = this.id;
    clickBtnAnimation(clicked);
    if(level < 1){
      gameOver();
    }
    checkClicks(clicked);
  })

  function btnTimeout(character){
    setTimeout(function(){ clickBtnAnimation(character); }, 300);
  }

  function gameOver(){
    console.log("You have failed!");
    //location.reload(); // This is temporary
  }

  function playSound(character){
    var audio = new Audio('./assets/sounds/' + character + '.wav');
    audio.play();
  }

  function removeEventListener(){
    $(".btn").click(function(){
      $(".btn").off("click");
    })
  }

  function clickBtnAnimation(character){
    playSound(character);
    $("#" + character).addClass("pressed-" + character);
    setTimeout(function(){ $("#" + character).removeClass("pressed-" + character); }, 100);
  }

  function getRandomNumber(){
    var randomNumber = Math.random();
    randomNumber = (randomNumber * 4);
    randomNumber = Math.floor(randomNumber);
    return randomNumber;
  }
});
