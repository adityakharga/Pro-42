var monkey , monkey_running,bg,bgImage;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup,obstacleGroup;
var score;
var ground;
var gameState = "play";
var banana,bananaImage;
var obstacle,obstacleImage;
var survivalTime = 0;

function preload(){ 
monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
 
obstacleImage = loadImage("stone.png");  
bananaImage = loadImage("banana.png");
bgImage = loadImage("jungle.jpg"); 
bananaImage = loadImage("banana.png");
}

function setup() {
createCanvas(400,400);
  
bg = createSprite(200,215,400,400);
bg.addImage(bgImage);
bg.depth = 0.1;
bg.scale = 0.5;

  
monkey = createSprite(50,350,20,20); 
monkey.addAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
monkey.scale = 0.14;

ground = createSprite(200,390,900,10);
ground.visible = false;
ground.velocityX = -4;
ground.x = ground.width/2;
  
obstacleGroup = createGroup();
foodGroup = createGroup();

score = 0;
}

function draw() {
background("black")
stroke("white");
textSize(20);
fill("white");
survivalTime = Math.ceil(frameCount/frameRate());
text("Survival Time:"+survivalTime,240,20);
stroke("white");
textSize(20);
fill("white");
text("Score:"+score,20,20);
if(ground.x<0){
ground.x = ground.width/2;  
}
if(monkey.x<0){
monkey.x = 50;  
}
if(monkey.collide(obstacleGroup)){
  gameState = "end"
  monkey.scale = monkey.scale-0.001

}
  
if(gameState === "play"){
spawnBananas();
spawnObstacles();
if(keyDown("space") && monkey.y >= 325){
monkey.velocityY = -15;  
}
if(foodGroup.isTouching(monkey)){
monkey.scale = monkey.scale+0.001


}
if(foodGroup.isTouching(monkey)){
score = score+1;
}
console.log(score);
}
else if(gameState ==="end"){
monkey.velocityX = 0;
obstacle.velocityX = 0;
banana.velocityX = 0;
survivalTime = createSprite(310,10,180,25)
}
  
monkey.velocityY = monkey.velocityY + 0.8;
  
monkey.collide(ground);    
drawSprites();  
}
function spawnObstacles(){
if(frameCount%100===0){
obstacle = createSprite(400,350,10,10);  
obstacle.velocityX = -8;
obstacle.addImage(obstacleImage);
obstacle.scale = 0.2; 
obstacle.debug = true;
obstacle.setCollider("rectangle",0,0,400,400);
obstacleGroup.add(obstacle);

}  
}

function spawnBananas(){
if(frameCount%61===0){
banana = createSprite(400,300,10,10);  
banana.y = Math.round(random(200,300));
banana.velocityX = -8;
banana.addImage(bananaImage);
banana.scale = 0.1;
banana.debug = true;
banana.setCollider("rectangle",0,0,400,400);
foodGroup.add(banana);
}
}
function reset(){
score = 0;
}

