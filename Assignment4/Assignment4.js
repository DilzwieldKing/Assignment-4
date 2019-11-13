//Joseph Eiles
//3152600
//Assignment 4

//Sources:
//Keyboard events: https://javascript.info/keyboard-events
//Mouse coordinates: https://stackoverflow.com/questions/7608814/how-to-get-the-exact-mouse-down-coordinate-why-my-code-does-not-work
//Add event listener for mouse: https://stackoverflow.com/questions/12886286/addeventlistener-for-keydown-on-canvas
//Class code referenced for event keycode: https://canvas.ocadu.ca/courses/30133/modules/items/248169
//Previous assignment that was used for reference: https://codepen.io/JosephME/pen/KrmVMQ?editors=0010

//Global Variables
var canvas;
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var w = 600;
var h = 600;

//Array where projectiles are pushed
var composition = [];

//Class that represents a projectile that moves in the canvas
class projectile {
    //Class constructor with variables
    constructor(x, speedx, y, speedy, r, s, e, c, a)
    {
        this.x = x;
        this.speedx = speedx;
        this.y = y;
        this.speedy = speedy;
        this.r = r;
        this.s = s;
        this.e = e;
        this.c = c;
        this.a = a;
    }
    //Updates x and y coordinates, detects collision with canvas edge
    updateData()
    {
        this.x += this.speedx;
        this.y += this.speedy;

        if(this.x+this.r > w || this.x-this.r < 0){this.speedx *= -1};
        if(this.y+this.r > h || this.y-this.r < 0){this.speedy *= -1};
    }
    //Draws the projectile
    drawCircle()
    {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, this.s, this.e);
        ctx.fillStyle = 'red';
        ctx.fill();
    }    
}

//initialization calls
setupCanvas();
animationLoop();

//Setup canvas initial state
function setupCanvas(){
    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext("2d");
    canvas.style = "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto";
    canvas.style.border = "6px solid red";    
    canvas.width = w;
    canvas.height = h;
    //Captures mousedown events
    canvas.addEventListener('mousedown', function(event) {
        mousePressed(event);
    }, false);
    //Captures keyboard events
    document.addEventListener('keydown', function(event) {
        console.log("clicked" + event.keyCode);
        
        //If up arrow pressed, increase speed
        if (event.keyCode == 38){

            for(var i = 0; i < composition.length; i++) 
            {
                composition[i].speedx += 0.5;
                composition[i].speedy += 0.5; 
            }
            console.log("speed up");
        }
        //If down arrow pressed, decrease speed
        else if(event.keyCode == 40)
        {
            //Loop through all projectiles, speed cannot go under zero
            for(var i = 0; i < composition.length; i++) 
            {
                if (composition[i].speedx >= 0.5)
                {
                    composition[i].speedx -= 0.5;
                }
                if (composition[i].speedy >= 0.5)
                {
                    composition[i].speedy -= 0.5; 
                }
            }
            console.log("speed down");
        }
    }, false);
}

//When the mouse is clicked, creates a new projectile at mouse coordinates
function mousePressed(e){
  console.log("Clicked" +  e.offsetX + " " + e.offsetY);
    projSpawn(1,e.offsetX, e.offsetY);
    
}

//Creates a projectile
function projSpawn(num, x, y){
    for(var i = 0; i < num; i++){
        var newProj = new projectile( 
            x,
            random(10)+2,
            y,
            random(10)+2,
            random(20)+10,
            0,
            2*Math.PI,
            200,
            0.5
            );
        //Pushes new projectile into the array
        composition.push(newProj);
    }
}

//Clears canvas and redraws all projectiles currently in the array
function animationLoop(){
    clear();
    //For each ball in the collection call the class methods
    for(var i = 0; i < composition.length; i++)
    {
        var currentProj = composition[i];
        currentProj.drawCircle();
        currentProj.updateData();
    }
    requestAnimationFrame(animationLoop); 
}

//Generates a number within a range
function random(range){
    var r = Math.random()*range;
    return r
}

//Generates a negative number within a range
function nRandom(range){
	var r = Math.random()*range - (range/2); 
	return r
}

//Clears the canvas
function clear(){
	ctx.clearRect(0, 0, w, h); 
}