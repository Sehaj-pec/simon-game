var buttonColors=["red", "blue", "green", "yellow"];

var userClickedPattern=[];

var gamePattern=[];

var level=0;

var started=false;

$("*").keydown(function(){
    if(!started)
    {   $("level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
})


$(".btn").click(function() {

    var userChosenColor=$(this).attr("id");

    userClickedPattern.push(userChosenColor);

    console.log(userClickedPattern);

    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);   
});

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        console.log("success");

        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    
} 
 
function startOver()
{
    started=false;
    gamePattern=[];
    level=0;
    userClickedPattern=[];
}
 

function nextSequence(){
     
    userClickedPattern=[];

    level++;
    $("#level-title").text("Level "+level);

    var randomNumber= Math.floor(Math.random()*3)+1;

    var randomChosenColor=buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    console.log(gamePattern);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);


}

function playSound(name)
{
    var sound=new Audio("./sounds/"+name+".mp3");
    sound.play();
}


function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}


