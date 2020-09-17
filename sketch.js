var monkey, monkey_running;
var invisibleGround, groundImage;

var bananaGroup, bananaImage;
var stoneGroup, stoneimage;

var backgroundimage, background_;

var score;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var gameover, gameover_;

var score;

function preload(){
   monkey_running = loadAnimation ("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  
  backgroundimage = loadImage("jungle.jpg");
  
  gameover = loadImage("gameover.jpg");
  
  stoneimage = loadImage("stone.png");
  
}
function setup() {
  createCanvas(800, 400);
  
   invisibleground = createSprite(400, 380, 800, 20);
  invisibleground.velocityX = -10;
  invisibleground.visible = false;
  
  background_ = createSprite(200, 200, 20, 20);
  background_.addImage(backgroundimage);
  background_.velocityX = -8;
  
  monkey = createSprite(50, 350, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  bananaGroup = new Group();
  stoneGroup = new Group();
  
  score = 0;
  
}

function draw() {
  background("white");
  
  if(gameState === PLAY){
    if(keyDown("space")){
         monkey.velocityY = -7;
       }
    //to add gravity to the monkey
     monkey.velocityY = monkey.velocityY+0.5;
    
    if(monkey.isTouching(bananaGroup)){
      score = score+1;
      growth();
      bananaGroup.destroyEach();
    }
    if(background_.x<400){
      background_.x = background_.width/2;
    }
    if(invisibleground<400){
      invisibleground.x = invisibleground.width/2;
    }
    Bananas();
    Rocks();
    if(monkey.isTouching(stoneGroup)){
      gameState = END;
      monkey.scale = 0.1;
    }
    
  }
  else if(gameState === END){
    background_.velocityX = 0;
    stoneGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    stoneGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    gameover_ = createSprite(400, 200, 50, 50);
    gameover_.addImage(gameover);
    gameover_.visible = true;
    gameover_.scale = 0.3;
    monkey.destroy();
    bananaGroup.destroyEach();
    stoneGroup.destroyEach();
  }
    
    monkey.collide(invisibleground)
    drawSprites();
  text("Score: "+ score, 500,50);
  }
  

function Bananas() {
  if (frameCount % 60 === 0) {
    var banana = createSprite(800,120,40,10);
    banana.y = Math.round(random(40,320));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    banana.lifetime = 400;
    
    bananaGroup.add(banana);
  }
}
function Rocks () {
  if(frameCount % 200 === 0) {
    var obstacle = createSprite(600,375,10,40);
    obstacle.velocityX = -4;
    obstacle.addImage(stoneimage);
    
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    
    stoneGroup.add(obstacle);
  }
}
  
function growth(){
    switch(score){
        case 10: monkey.scale =  0.12;
        break;
        case 20: monkey.scale = 0.14;
        break;
        case 30: monkey.scale = 0.16;
        break;
        case 40: monkey.scale = 0.18;
        break;
        case 50: monkey.scale = 0.2;
        break;
        default:break;
        
    }
}