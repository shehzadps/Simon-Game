var buttonColors= ["red","blue","green","yellow"];
var gamePattern= [];
var userClickedPattern= [];

var level=0;
var started= false;
$(document).keydown(function(){
    if (started=== false){
        started= true;
        nextSequence();
    }
    
})


function nextSequence(){
    randomNumber= Math.floor(Math.random()*4);
    var randomChosenColor= buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    $("#"+ randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    level+=1;
    $("h1").html("Level "+ level);


}

var i=0;
$(".btn").click(function(){
    userChosenColour= this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    if (i< gamePattern.length-1){
        if (userChosenColour=== gamePattern[i]){
            i+=1;
        }
        else{
            // Game Over
            gameOver();
            
        }
    }
    else if(i== gamePattern.length-1){
        if (userChosenColour=== gamePattern[i]){
            i=0;
            var tout= setTimeout(nextSequence,1000);
            
        }
        else{
            // Game Over
            gameOver();            
        }
    }
    

})

function playSound(color){
    var aud= new Audio("sounds/" + color + ".mp3");
    aud.play();
}

function animatePress(color){
    $("#"+ color).addClass("pressed");
    var time= setTimeout(function(){
        $("#"+ color).removeClass("pressed");
    },100);

}

function gameOver(){
    i=0;
    level=0;
    gamePattern= [];
    userClickedPattern= [];
    started= false;

    var gover= new Audio("sounds/wrong.mp3");
    gover.play();

    $("h1").html("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");

    var tout= setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);

}