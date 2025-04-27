var playing= false;
var score;
var action;
var timeRemaining;
var correctAns;
// if we click on the start/ reset

document.getElementById("startreset").onclick = function(){
    //if we are playing
    if(playing==true){
        //reload page
        location.reload();
    }
    //if we are not playing
    else{
        //change mode to playing true, to reset everytime
        playing=true;
        //reduce time by 1 sec in loops
            //timeleft ?
                //yes, continue
                //no, game over
        //generate new Q&A
        //set score to zero
        score = 1;
        document.getElementById("scorevalue").innerHTML = score;
        //show countdown box
        show("timeremaining");
        timeRemaining = 60;
        document.getElementById("startvalue").innerHTML = timeRemaining;
        //hide game over box
        hide("gameover");
        //change button to reset
        document.getElementById("startreset").innerHTML = "Reset Game";

        //start countdown
        startCountDown();

        //generate new q&A
        generateQA();

    }
}
    
function startCountDown(){
    action = setInterval(function(){
        timeRemaining -= 1;
        document.getElementById("startvalue").innerHTML = timeRemaining;
        if(timeRemaining == 0){
            //gameover
            //stop the counter
            stopCountDown();
            //game over message
            show("gameover");
            document.getElementById("gameover").innerHTML = "<p>Game over !!!</p> <p>Your score is "+ score +"</p>"

            //time box to disappear
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing=false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);
}

function stopCountDown(){
    clearInterval(action);
}

function hide(Id){
    document.getElementById(Id).style.display = "none";

}
function show(Id){
    document.getElementById(Id).style.display = "block";
    
}

function generateQA(){
    
    //Math.random() - gets a number between 0 and 1, 
    //multiply random() by 10, we will get 1 and 10 - so multiply it by 1 and 9 and add it with 1 

    //generate a number between 1 and 9, store it in a variable x
    var x = 1+ Math.round(9*Math.random());
    //generate a number between 1 and 9, store it in a variable y
    var y = 1+ Math.round(9*Math.random());

    correctAns = x*y;

    document.getElementById("question").innerHTML = x + "x" + y;

    //the position is decided between 1 and 4 ,
    var correctPosition = 1+ Math.round(3 * Math.random());
    document.getElementById("box"+correctPosition).innerHTML = correctAns;


    var answers = [correctAns];
    //fill other boxes with wrong answers
    for(i=1;i<5;i++){
        if(i!= correctPosition){
            //generate a wrong ans and place it in the box
            var wrongAns;
            do{
                wrongAns = 1+ Math.round(9 * Math.random()) * 1+ Math.round(9 * Math.random());
            }while(answers.indexOf(wrongAns)> -1)
            document.getElementById("box"+i).innerHTML = wrongAns; 
            answers.push(wrongAns);
        }
    }
}

for(i=1;i<5;i++){
    
    //clicking on a answer box and check if we are playing
    document.getElementById("box"+i).onclick = function(){
    if(playing==true){
        // if(document.getElementById("box1").innerHTML == correctAns){
        if(this.innerHTML == correctAns){
            score++;
            document.getElementById("scorevalue").innerHTML = score;
            //hide wrong box and show correct box
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct");
            }, 1000);

            //Generate new QA
            generateQA();
        }else{
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong");
            }, 1000);
        }
    }
}
}
//if we click on answer box
    //if we are playing
        //correct? increase score
            //show correct box for 1sec
            //generate new Q&A
        //wrong, show try again box for 1sec

