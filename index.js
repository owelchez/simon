const characters = ["link", "zelda", "epona", "ganon"];
var level = 0;
var pattern = [characters[getRandomNumber()]];
var choices = [];

start();

function start(){
  $(document).one("keypress", function(){
    $("#level-title").text("Level " + ++level);
    btnTimeout(pattern[pattern.length-1]);
    checkClicks();
  })
}

function checkClicks(){
  for(i=0; i<pattern.length; i++){
    $('.btn').one('click', function(e){
      var character = $(this).attr("id");
      playSound(character);
      btnTimeout(character);
      choices.push(character);
      if(choices[level-1] != pattern[level-1]){
        gameOver();
      } else {
        levelUpTitle();
      }
    })
  }
}

function levelUpTitle(){
  setTimeout(function(){ $("#level-title").text("Level " + ++level); }, 800);
  choices = [];
  pattern.push(characters[getRandomNumber()]);
  playSound(pattern[pattern.length-1]);
  btnTimeout(pattern[pattern.length-1]);
}

$(".btn").one("click", function(e){
  clickBtnAnimation($(this).attr("id"));
  if(level < 1){
    gameOver();
  }
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
  $("#" + character).addClass("pressed-" + character);
  setTimeout(function(){ $("#" + character).removeClass("pressed-" + character); }, 300);
}

function getRandomNumber(){
  var randomNumber = Math.random();
  randomNumber = (randomNumber * 4);
  randomNumber = Math.floor(randomNumber);
  return randomNumber;
}
