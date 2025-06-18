//click on start reset button
    //start - playing?
        //yes
            //reload page
        //no
            //show trials left
            //change button to reset game
            //1. create a random fruit
            //2. move fruit down one step every 30 seconds
                //is fruit too low?
                    //no -> repeat number 2
                    //yes -> any trials left?
                        //yes. remove one heart, repear number 1
                        //no. show game over page, button to start game
//slice a fruit
    //place a sound
    //explode fruit

var playing=false;
var score;
var trials;
var step;
var action;
var fruitList = ['cherries','grapes','icons','oranges','pineapple','watermelon'];
$(function(){
    $("#startreset").on('click',function(){
        if(playing==true){
            location.reload();
        }
        else{
            playing=true;
            //set the score to zero, using jquery
            score=0;
            $("#scorevalue").html(score);
            
            //show trialsLeft
            $("#trialsLeft").show();
            trials=3;
            addHearts();
            $("#startreset").html("Reset Game");

            //start sending fruits
            startActions();
        }
    });

$("#fruit001").on('mouseover',function(){
    score++;
    $("#scorevalue").html(score);

    // document.getElementById("audio").play();
    $("#audio")[0].play(); //play sound

    //make the fruit stop going down and hide it
    // stopAction();
    clearInterval(action);

    //hide it through animation
    $("#fruit001").hide("explode", 500) //slicing the fruit

    //send new fruit
    // startActions(); //to wait until the animation is finished, we need to have time interval
    setTimeout(startActions, 500);
});

//functions

function addHearts(){
    $("#trialsLeft").empty();
    for(i=0;i<trials;i++){
        $("#trialsLeft").append('<img src="images/icons.png" class="life">');
    }
}

function startActions(){

    //generates the fruit
    $("#fruit001").show();
    chooseFruit();
    //randomly positioning the fruit horizontally and vertically, positioning the fruit inside the container
    $("#fruit001").css({'left' : Math.round(550*Math.random()), 'top': -50});    

    //generate a random step, between 1 and 6
    step = 1 + Math.round(7 * Math.random());
    //change step, move fruit down by 1 step every 10ms
    action = setInterval(function(){
        //makes the fruit to go down in terms of fruits top
        $("#fruit001").css('top',$("#fruit001").position().top + step);

        //check if the fruit is too low
        if($("#fruit001").position().top > $("#fruitsContainer").height()){
            //check if any trials there
            if(trials>1){
                //generate a new fruit
                $("#fruit001").show();
                chooseFruit();
                //randomly positioning the fruit horizontally and vertically, positioning the fruit inside the container
                $("#fruit001").css({'left' : Math.round(550*Math.random()), 'top': -50});    
            
                //generate a random step, between 1 and 6
                step = 1 + Math.round(5 * Math.random());

                //reduce the trials by one
                trials--;

                addHearts();

                //hide game over box
                $("#gameover").hide();
            }else{
                //gameover
                playing=false;
                $("#startreset").html("Start Game");
                $("#gameover").show();
                $("#gameover").html('<p>Game over!!!</p><p>Your score is ' + score + '</p>');
                $("#trialsLeft").hide();
                stopAction();
            }
        }
    },10);
}

function chooseFruit(){
    //generates a random fruit
    $("#fruit001").attr('src', 'images/' + fruitList[Math.round(5 * Math.random())] + '.png');
    
}

//stop dropping the fruit
function stopAction(){
        clearInterval(action);
        $("#fruit001").hide();
}
});