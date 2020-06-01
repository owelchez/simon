const characters = ["link", "zelda", "epona", "ganon"];
var level = 0;
var pattern = [characters[getRandomNumber()]];
var choices = [];

start();

function start(){
  $(document).one("keypress", function(){
    $("#level-title").text("Level " + ++level);
    var character = pattern;
    clickBtnAnimation(character);
  })
}

function playSound(character){
  var audio = new Audio('./assets/sounds/' + character + '.wav');
  audio.play();
}

function gameOver(){
  console.log("You have failed!");
  start();
}
// compare two arrays to match


function checkClickInput(character, pattern){
  //console.log("Pattern.length " + pattern.length);
  for(i = 0; i < pattern.length; i++){

  }
}

function getCharactersClicks(){
  console.log(pattern);
  console.log(choices);
  console.log(level);
  for(i=0; i<pattern.length;i++){
    if(choices[i] != pattern[i]){
      gameOver();
    }else{
      $(".btn").one("click", function(){

      })
    }
  }
}


$(".btn").one("click", function(e){
  if(level < 1){
    gameOver();
  }
  var character = $(this).attr("id");
  stepLevel(character);
})

function stepLevel(e){
  clickBtnAnimation(e);
  playSound(e);
  choices.push(e);
  getCharactersClicks();
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
