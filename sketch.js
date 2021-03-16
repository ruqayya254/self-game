const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var girl,clouds,day
var bullet
var l=3 ;
var PLAY=0;
var END=1;
var gameState=PLAY;
var score=0
function preload(){
backgroundImage=loadImage("day.jpg")
cloudsImage=loadImage("clouds.png")
girlImage=loadImage("girl.png")
bulletImage=loadImage("bullet.png")
}

function setup(){
  var canvas = createCanvas(1200,500);
  engine = Engine.create();
  world = engine.world;
  ground=createSprite(600,150,1200,20)
  ground.addImage(backgroundImage)
  ground.velocityX=-3
  ground.scale=9;
  girl=createSprite(150,450,10,10) 
  girl.addImage(girlImage)
  girl.scale=0.2

  cloudsGroup=new Group();
  bulletsGroup=new Group();
  
}
function draw(){
  background("white");
  Engine.update(engine);
  if (gameState===PLAY){

if(ground.x<0){
  ground.x=ground.width/2

}

if(keyDown("left_arrow")){
  girl.x = girl.x - 3;
}

if(keyDown("right_arrow")){
  girl.x = girl.x + 3;
}

if (keyWentDown("space")){
  bullet=createSprite(girl.x,girl.y)
  bullet.addImage(bulletImage)
  bullet.scale=0.05;
  bullet.velocityY=-4
  bulletsGroup.add(bullet)
}

spawnClouds();
  }

if(cloudsGroup.isTouching(girl)){
  l=l-1
  cloudsGroup.destroyEach();
}

if (gameState===END){
  ground.velocityX=0;
  cloudsGroup.setVelocityYEach(0);
  l=0
}

if(cloudsGroup.isTouching(bulletsGroup)){
  cloudsGroup.destroyEach()
score=score+10
}

drawSprites()
textSize(28)
stroke("yellow")
fill("black")
text("Score:"+score,800,50)

textSize(28)
stroke("yellow")
fill("black")
text("Lives:"+l,130,50)

if (l===0){
  gameState=END;
  fill("black")
  textSize(40)
  stroke("red")
  text("GAME OVER",470,200)

}

}
function spawnClouds(){
  if(frameCount%60===0){
  clouds=createSprite(800,50,10,20)
  clouds.x=Math.round(random(10,1000))
  clouds.addImage(cloudsImage)
  clouds.scale=0.3
  clouds.velocityY=3;
  cloudsGroup.add(clouds)
}}