//Board
let board;
let boardwidth = 500;
let boardheight = 640;
let context;
// Bird
let birdWidth = 34;
let birdHeight=24;
let birdX =boardwidth/10;
let birdY =boardheight/2;
let birdimg;
let bird={
    x:birdX,
    y:birdY,
    width:birdWidth,
    height:birdHeight
}
//Pipes
let pipeArray =[];
let pipeWidth = 64;
let pipeHeight=512;
let pipeX = boardwidth;
let pipeY = 0;
let topPipeImg;
let bottomPipeImg;
//physics
let velocityX=-2;
let velocityY = 0;
let gravity=0.4;
let gameOver = false;
let score =0;
let yes= true;
let ans;
window.onload =function(){
    board = document.getElementById("board");
    board.height= boardheight;
    board.width=boardwidth;
    context = board.getContext("2d");
    //draw bird
// context.fillStyle="green";
// context.fillRect(bird.x,bird.y,bird.width,bird.height);
//Load img
birdimg = new Image();
birdimg.src="flappybird.png";
birdimg.onload=function(){
    context.drawImage(birdimg,bird.x,bird.y,bird.width,bird.height);
}
topPipeImg=new Image();
topPipeImg.src="toppipe.png";
bottomPipeImg=new Image();
bottomPipeImg.src="bottompipe.png";

requestAnimationFrame(update);
setInterval(placePipes,1700);
document.addEventListener("keydown",moveBird);
}
function update(){
    
    requestAnimationFrame(update);
    if(gameOver){
        return;
    }
    context.clearRect(0,0,board.width,board.height);
    velocityY+=gravity;
    bird.y= Math.max(bird.y + velocityY,0);
    context.drawImage(birdimg,bird.x,bird.y,bird.width,bird.height); 
    if(bird.y > board.height){
        gameOver = true;
    }  
    for(let i =0; i<pipeArray.length;i++){
        let pipe =pipeArray[i];
        pipe.x+=velocityX;
        context.drawImage(pipe.img,pipe.x,pipe.y,pipe.width,pipe.height);
     if (!pipe.passed && bird.x>pipe.x+pipe.width){
        score+=0.5;
        pipe.passed=true;
     }
         if(detectCollision(bird,pipe)){
            gameOver=true;
         }
    }
    while(pipeArray.length>0 && pipeArray[0].x<-pipeWidth){
        pipeArray.shift();
    }
    context.fillStyle="white";
    context.font="45px sans-serif";
    context.fillText(score,5,45);
    if (gameOver){
        context.fillText("GAME OVER",5,90);
    }
}

function placePipes(){
    if(gameOver){
        return;
    }
    randomPipeY=pipeY - pipeHeight/4-Math.random()*pipeHeight/2;
    let openingSpace =board.height/4;
    let topPipe = {
        img :topPipeImg,
        x:pipeX,
        y:randomPipeY,
        width:pipeWidth,
        height: pipeHeight,
        passed :false
}

pipeArray.push(topPipe);

let bottomPipe = {
    img :bottomPipeImg,
    x:pipeX,
    y:randomPipeY+pipeHeight+openingSpace,
    width:pipeWidth,
    height: pipeHeight,
    passed :false
}
pipeArray.push(bottomPipe);
}
function moveBird(e){
    if(e.code=="space"|| e.code == "ArrowUp"|| e.code == "KeyX"){
        velocityY =-6;
        if(gameOver){
            prompt("Do You Want To Play Again :");
           ans= confirm("Click Ok TO Continue : ");
           if(ans==true){
            bird.y = birdY;
                    pipeArray=[];
                    score=0;
                    gameOver=false;
        }
        else{
             return score;
        }
        }
     
        
    }


}
function detectCollision(a,b){
    return a.x < b.x +b.width&&
           a.x +a.width >b.x &&
           a.y<b.y + b.height &&
           a.y +a.height >b.y;
}
