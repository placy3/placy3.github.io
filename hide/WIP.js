// $(document).keydown(function (event) {
//     console.log(event.keyCode);     // BTW, 116 = F5
// });

var myGamePiece;

var r = 10;
var SPEED = 4;

function startGame() {
    myGameArea.start();
    myGamePiece = new component(r, "black", 240, 400);
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 480;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        // this.interval = setInterval(updateGameArea, 20);
        window.requestAnimationFrame(updateGameArea);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");            
        })
    }, 
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(radius, color, x, y) {
    this.gamearea = myGameArea;
    this.r = radius;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }    
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;    
    if (myGameArea.keys && myGameArea.keys[32]){    //空格
        SPEED = 1.25;  //按住空格低速移动
    }else{
        SPEED = 4;
    }

    if (myGameArea.keys && (myGameArea.keys[37] || myGameArea.keys[65])) {myGamePiece.speedX = -SPEED; }
    if (myGameArea.keys && (myGameArea.keys[39] || myGameArea.keys[68])) {myGamePiece.speedX = SPEED; }
    if (myGameArea.keys && (myGameArea.keys[38] || myGameArea.keys[87])) {myGamePiece.speedY = -SPEED; }
    if (myGameArea.keys && (myGameArea.keys[40] || myGameArea.keys[83])) {myGamePiece.speedY = SPEED; }
    myGamePiece.newPos();    
    myGamePiece.update();

    requestAnimationFrame(updateGameArea);
}