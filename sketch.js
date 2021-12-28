const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
var backgroundImg;
var tower, towerImg;
var cannon
var cannonBall
var angle;
var balls = []
var boats = []

function preload() {
 backgroundImg = loadImage("assets/background.gif");
 towerImg = loadImage("assets/tower.png");
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
  var options = {
    isStatic: true
  }
 ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
 tower = Bodies.rectangle(160,350,150,310, options);
 World.add(world, tower);
 World.add(world, ground);
 
 angleMode(DEGREES);
 angle = 20;
 cannon = new Cannon(175, 112, 130, 100, angle);
 
 //cannonBall = new CannonBall(cannon.x, cannon.y, 30);

}

function draw() {
  background(189);
  image(backgroundImg, 600, 300, 1200, 600);
 rect(ground.position.x, ground.position.y, width *2, 1);
 imageMode(CENTER);
 image(towerImg, tower.position.x, tower.position.y, 150, 310);
  Engine.update(engine);
  cannon.display();

  showBoats()

  
  //cannonBall.display();
  for (var i = 0; i<balls.length; i++){
    showCannonballs(balls[i],i)
    collissionWithBoat(i);
  }
}

function keyReleased(){
  if(keyCode == DOWN_ARROW){
    balls[balls.length - 1].shoot(); 
  }
}

function keyPressed(){
  if(keyCode == DOWN_ARROW){
    var cannonBall = new CannonBall(cannon.x, cannon.y, 30);
    balls.push(cannonBall)
  }
}

function showCannonballs(ball, i){
  if(ball){
    ball.display()
  if(ball.body.position.x >= width || ball.body.position.y > height - 50){
    ball.remove(index);
  }
  }
}

function showBoats(){
  if(boats.length > 0){
    if(boats[boats.length - 1] == undefined || boats[boats.length - 1].body.position.x < width - 300){
      var position = random([-40,-60,-70,-20])
      boat = new Boat(width, height-100, 170, 170, position)
      boats.push(boat);
    }

  
  for(var i = 0; i < boats.length; i++){
    if(boats[i]){
      Matter.Body.setVelocity(boats[i].body, {x:-0.9, y:0})
      boats[i].display();
    }
  }
  }
else{
  boat = new Boat(width, height - 60, 170, 170, -80);
  boats.push(boat);
}
  }

function collissionWithBoat(index){
  for(var i = 0; i < boats.length; i++){
    if(balls[index] !== undefined && boats[i] !== undefined){
      var collission = Matter.SAT.collides(balls[index].body, boats[i].body);
      if(collission.collided){
        boats[i].remove(i);
        Matter.World.remove(world, balls[index].body);
        delete balls[index];
      }
    }
  }
}
 