var PLAY=1;
var END=0;
var gameState=PLAY;
var bird,birdimg;
var restart
var count=0;
var ground;
var arrowimg;
var netimg;
var backgroundimg
function preload(){
birdimg=loadAnimation("sprites/bird1.png","sprites/bird2.png","sprites/bird3.png","sprites/bird4.png")
arrowimg=loadImage("sprites/arrow1.png")
netimg=loadImage("sprites/net1.png")
backgroundimg=loadImage("sprites/bg2.jpg")
}

function setup() {
  createCanvas(800,400);
  bird=createSprite(400,200,50,50)
  bird.addAnimation(birdimg)
  ground=createSprite(400,380,800,20);
  groupArrows=new Group()
  groupNets=new Group()
  restart = createSprite(200,340,20,20);
  restart.visible = false;
}

function draw() {
  background(0);


  if(gameState===PLAY){
    
    if(keyDown(UP_ARROW)){
      bird.y = bird.y-30
    } 
    if(keyDown(DOWN_ARROW)){
      bird.y=bird.y+30
    }
    ground.velocityX=-2
    if(ground.x<0){
      ground.x = ground.width/2;
    }
    bird.scale=0.2
    spawnarrows()
    spawnnets()
    if(groupArrows.isTouching(bird)|| groupNets.isTouching(bird)){
     gameState=END
    }
    
  }
  else if(gameState===END){
 ground.velocityX=0
 groupArrows.setVelocityEach(0)
 groupNets.setVelocityEach(0)
 groupArrows.setLifetimeEach(-1)
 groupNets.setLifetimeEach(-1)
 restart.visible = true;

 }
 reset()
 if(mousePressedOver(restart)) {
  reset();
}

  
  drawSprites();
}
function spawnarrows(){
  if (frameCount % 60 === 0) {
    var arrow = createSprite(0,200,40,10);
    groupArrows.add(arrow)
    arrow.addImage(arrowimg)
    arrow.y = Math.round(random(200,360));
    //arrow.setAnimation("cloud");
    arrow.scale = 0.5;
    arrow.velocityX = 3;
     arrow.lifetime = 267;
}
}
function spawnnets(){
  if (frameCount % 80 === 0) {
    var nets = createSprite(0,200,40,10);
    groupNets.add(nets)
    nets.addImage(netimg)
    nets.y = Math.round(random(0,200));
    //arrow.setAnimation("cloud");
    nets.scale = 0.5;
    nets.velocityX = 3;
    nets.lifetime = 267;
}
}
function reset(){
  gameState = PLAY;
  
  
  restart.visible = false;
  
  groupArrows.destroyEach();
  groupNets.destroyEach();
  
 
  //count = 0;
  
}