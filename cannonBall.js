class CannonBall{
    constructor(x,y,r){
        var options = {
            isStatic: true
        }
        this.x = x;
        this.y = y;
        this.r = r;
        this.tragectory = [];
        this.body = Bodies.circle(x, y, r, options);
        World.add(world, this.body);
        this.image = loadImage("assets/cannonball.png");
    }
    display(){
        var pos = this.body.position
        if(this.body.velocity.x>0 && this.body.position.x>220){
            var position = [this.body.position.x, this.body.position.y]
            this.tragectory.push(position);
        }
        push()
        imageMode(CENTER);
        for(var i = 0; i < this.tragectory.length; i++){
            image(this.image, this.tragectory[i][0],this.tragectory[i][1],5,5);
        }
        image(this.image, pos.x, pos.y, this.r, this.r)
        pop()
    }
    
    shoot() {
        var newAngle = cannon.angle - 28;
        newAngle = newAngle *(3.14/180)
        var velocity = p5.Vector.fromAngle(newAngle);
        velocity.mult(0.5);
        Matter.Body.setStatic(this.body, false);
        Matter.Body.setVelocity(this.body, {
          x: velocity.x *(180/3.14), y: velocity.y * (180/3.14)});
      }

      remove(index){
          Matter.Body.setVelocity(this.body, {x:0, y:0});
          setTimeout(() => {
            Matter.World.remove(world, balls[index].body);
            delete balls[index];
          },1000)
      }

}

