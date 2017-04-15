

class Point {
	constructor(canvas, x, y) {
    this.canvas = canvas;
		this.x = x;
		this.y = y;
    this.r = 20;

    this.pressed = false;

    ellipse(x, y, this.r, this.r);
	}

  draw() {
    ellipse(this.x, this.y, this.r, this.r);
  }

	getX() {
		return this.x;
	}

	getY() {
		return this.y;
	}

  mouseDown() {
    if (dist(mouseX, mouseY, this.x, this.y) < this.r) {
      this.pressed = true;
      return true;
    }
    return false;
  }

  mouseUp() {
    if (dist(mouseX, mouseY, this.x, this.y) < this.r) {
      this.pressed = false;
      return true;
    }
    return false;
  }

  mouseMove() {

    console.log(this.pressed);
    if (this.pressed && dist(mouseX, mouseY, this.x, this.y) < this.r) {
      this.x = mouseX;
      this.y = mouseY;
      return true;
    }

    return false;
  }
}



// t = ((1 - t)^3)*P0 + 3t(1 - t)^2*P1 + 3t^2(1 - t)*P2 + t^3P3
class BezierCurve {
	constructor(canvas) {
		this.canvas = canvas;
    this.points = [];
	}

	setP0(x, y) {
		this.p0 = new Point(this.canvas, x, y);
    this.points.push(this.p0);
	}

	setP1(x, y) {
		this.p1 = new Point(this.canvas, x, y);
    this.points.push(this.p1);
	}

	setP2(x, y) {
		this.p2 = new Point(this.canvas, x, y);
    this.points.push(this.p2);
	}

	setP3(x, y) {
		this.p3 = new Point(this.canvas, x, y);
    this.points.push(this.p3);
	}

	bezier(t, c0, c1, c2, c3) {
		return (Math.pow(1 - t, 3) * c0) + (3*t*(Math.pow(1 - t, 2)*c1)) + (3*(Math.pow(t, 2))*(1 - t)*c2) + (Math.pow(t, 3)*c3);
	}

	showPoints() {
    for (var i = 0; i < this.points.length; i++) {
      var point = this.points[i];
      point.draw();
    }
	}

  mouseDownPoints() {
    for (var i = 0; i < this.points.length; i++) {
      var point = this.points[i];
      if (point.mouseDown()) return;
    }
  }

  mouseUpPoints() {
    for (var i = 0; i < this.points.length; i++) {
      var point = this.points[i];
      if (point.mouseUp()) return;
    }
  }

  mouseMovePoints() {
    for (var i = 0; i < this.points.length; i++) {
      var point = this.points[i];
      if (point.mouseMove()) return;
    }
  }

	drawCurve(step) {

		var x = (this.p0).getX();
		var y = (this.p0).getY();

    stroke(255, 0, 0);
    strokeWeight(1);

    bezier(this.p0.getX(), this.p0.getY(),
           this.p1.getX(), this.p1.getY(),
           this.p2.getX(), this.p2.getY(),
           this.p3.getX(), this.p3.getY());

    stroke(0, 0, 0);
    strokeWeight(1);

		for (var t = 0; t <= 1 + (step / 2); t = t + step) {
			var newX = this.bezier(t, this.p0.getX(), this.p1.getX(), this.p2.getX(), this.p3.getX());
			var newY = this.bezier(t, this.p0.getY(), this.p1.getY(), this.p2.getY(), this.p3.getY());


			line(x, y, newX, newY);

			x = newX;
			y = newY;
			// this.ctx.
		}


	}

}


// init();
var canvas;
var bezierCurve;
function setup() {

  canvas = createCanvas(800, 600);
  canvas.parent("canvas-container");
  bezierCurve = new BezierCurve(canvas);

 	bezierCurve.setP0(100,80);
 	bezierCurve.setP1(700,20);
 	bezierCurve.setP2(100,450);
 	bezierCurve.setP3(700,550);

}

function draw() {
  background(255);

  bezierCurve.drawCurve(0.2);
  bezierCurve.showPoints();
}

// When the user clicks the mouse
function mousePressed() {
  bezierCurve.mouseDownPoints();
}

// When the user clicks the mouse
function mouseDragged() {
  bezierCurve.mouseMovePoints();
}

// When the user clicks the mouse
function mouseReleased() {
  bezierCurve.mouseUpPoints();
}
