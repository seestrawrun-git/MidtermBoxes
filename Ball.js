class Ball {
    constructor(paddle) {
    this.radius = 15;
    this.size = this.radius * 2;
    this.location = createVector(paddle.location.x + (paddle.width/2), paddle.location.y - (this.radius));
    this.color = color(128, 0, 128);
    this.velocity = createVector(5, -5)
    this.paddle = paddle

    }

    bouncePaddle() {
        //we are within the width of the paddle
        if(this.location.x + this.radius >= this.paddle.location.x && 
            this.location.x - this.radius <= this.paddle.location.x + this.paddle.width) {
            // console.log("calling");
                    if(this.location.y + this.radius > this.paddle.location.y) {
                        this.reverse("y");
                        this.location.y = this.paddle.location.y - this.radius - 1;                    
                    }
            }
    }

    bounceEdge() {
        if(this.location.x + this.radius >= width) { //look at the right
            this.reverse("x");
        } else if( this.location.x - this.radius <= 0) { //look at the left
            this.reverse("x");
        } else if(this.location.y - this.radius <= 0) { //check the top
            this.reverse("y");
        }
    }
    display() {
        fill(this.color);
        ellipse(this.location.x, this.location.y, this.size);
    }

    update() {
        this.location.add(this.velocity);
    }

    reverse(coordinate) {
        this.velocity[coordinate] *= -1;

    }

    belowBottom() {
        return this.location.y - this.radius > height
    }
}