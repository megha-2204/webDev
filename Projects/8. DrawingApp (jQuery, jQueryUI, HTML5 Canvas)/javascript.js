$(function(){
    $("#slider").slider({
        min: 3,
        max: 30,
        slide: function(event, ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
        }
    });


//declare variables
    
    //paintingerasing or not    
    var paint = false;
    //painting or erasing
    var paint_erase = "paint";
    //get the canvas and context
    var canvas = document.getElementById("paint");
    var ctx = canvas.getContext("2d");
    //get the canvas container
    var container = $("#container");
    //mouse position
    var mouse = {x:0, y:0};


//onload load saved work from localStorage
if(localStorage.getItem("imgCanvas")!=null){
    // window.alert("x is there and it is qual to  "+localStorage.getItem("x"));
    var img = new Image();
    img.onload= function(){
        ctx.drawImage(img, 0, 0);
    }
    img.src= localStorage.getItem("imgCanvas")
};

    //set drawing parameters (lineWidth, lineJoin, lineCap)
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    //click inside container
    container.mousedown(function(e){
        paint = true;
        // window.alert(paint);
        ctx.beginPath();
        //distance between the container and the left border of the box
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        ctx.moveTo(mouse.x,mouse.y);
    });
    container.mousemove(function(e){
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if(paint == true){
            if(paint_erase == "paint"){
                //get color input
                ctx.strokeStyle = $("#paintColor").val();
            }else{
                //white color (to erase)
                ctx.strokeStyle = "white";
            }
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    });
    container.mouseup(function(){
        paint= false;
    });

    container.mouseleave(function(){
        paint= false;
    });
//move the mouse while holding mouse key
//mouse up->we are not paintingerasing anymore
//if we leave the container we are not paintingerasing anymore
//click on the reset button
$("#reset").click(function(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    paint_erase= "paint";
    $("#erase").removeClass("eraseMode");
});
//click on save button
//store data forever
// localStorage
$("#save").click(function(){
    if(typeof(localStorage)!= null){
        localStorage.setItem("imgCanvas", canvas.toDataURL());
        // window.alert(localStorage.getItem("imgCanvas"));
    }else{
        window.alert("Your device or the browser is not supporting")
    }
});
//stores data for the session
sessionStorage
//click on the erase button
$("#erase").click(function(){
    if(paint_erase == "paint"){
        paint_erase = "erase";
    }else{
        paint_erase = "paint";
    }
    $(this).toggleClass("eraseMode");
});
//change color input
$("#paintColor").change(function(){
    $("#circle").css("background-color", $(this).val());
});
//change lineWidth using slider
$("#slider").slider({
    min: 3,
    max: 30,
    slide: function(event, ui){
        $("#circle").height(ui.value);
        $("#circle").width(ui.value);

        ctx.lineWidth = ui.value;
    }
});
//functions    


});





/*
    var canvas = document.getElementById("paint");
    //canvas: refers to the canvas element in your HTML.
    var context = canvas.getContext('2d');
    //context: is the tool you use to draw on that canvas.
    
    context.beginPath();
    //It tells the canvas: “I’m about to draw something new.”
    //This prevents your new shape from being connected to any previous drawings.
    
    context.lineWidth = 40;
    // sets the thickness of the line
    
    context.strokeStyle = 'green';
    //the stroke will be in green color
    
    context.lineCap = "round";
    //controls the shape of the line end
    
    context.lineJoin = "round";
    //controls how two lines are joined at an angle
    
    context.moveTo(50, 50);
    //starting point of the line
    context.lineTo(200,200);
    //**Draws a line from the current point (50, 50) to (200, 200)
    context.lineTo(400,100);
    //(50, 50) → (200, 200) → (400, 100)
    
    context.stroke();
    //renders the outline */