//Raycasting demystified by http://www.playfuljs.com/a-first-person-engine-in-265-lines/
//Didn't read their source code though! Compare it; it's probably not the same.

//Should be externally modified
Map = {
    data: undefined, //see getData for format
    size: NaN //Square map
    getData = function(x,y) { //do not externally modify!
        return this.data[(x * this.size) + y]; 
    }
}
//Map.algaeGrid = new Uint8Array(Map.size * Map.size); //To be done externally
Player = {
    x: NaN,
    y: NaN,
    direction: NaN
}
Frame = undefined;

var isFrameOld;
onMessage = function(e) {
    switch(e.data[0]) {
        case "stateChange":
            isFrameOld = true;
            break;
        case "getFrame":
            if (isFrameOld) render(100); //distance in map data points
            isFrameOld = false
            postMessage(["draw", Frame]);
            break;z
    }
};

render = function(distance) {
    var rays = [];
    for (var a = 0; a < Frame.width; a++) {
        rays[a] = new Ray(90 + Player.direction - (a * 180 / Frame.width), distance); //Where 180 is the FOV
    }
};
Ray = function(direction, distance) {
    this.points = [];
    this.visData = [];
    direction = direction % 360;
    var quadrant = {};
    switch (Math.floor(direction / 90)) {
        case 0:
            if (direction == 0) {
                quadrant.y = 0;
            } else {
                quadrant.y = 1;
            }
            quadrant.x = 1;
            break;
        case 1:
            if (direction == 90) {
                quadrant.x = 0;
            } else {
                quadrant.x = -1;
            }
            quadrant.y = 1;
            break;
        case 2:
            if (direction == 180) {
                quadrant.y = 0;
            } else {
                quadrant.y = -1;
            }
            quadrant.x = -1;
            break;
        case 3:
            if (direction == 270) {
                quadrant.x = 0;
            } else {
                quadrant.x = 1;
            }
            quadrant.y = -1;
    }
    direction = direction / 180 * Math.PI;
    var b = true;
    var currentPoint = new Point(Player.x, Player.y);
    var nextX;
    var nextY;
    for (var a = 0; b; a++) {
        if (quadrant.x == 0 || quadrant.y == 0) {
            if (direction.x == 0) {
                nextX = new Point(currentPoint.x, Infinity * quadrant.y);
                nextY = new Point
            } else {
                nextY = new Point(Infinity * quadrant.x, quadrant.y);
            }
        } else {
            if (currentPoint.x % 1 == 0) {
                nextX = new Point(currentPoint.x + quadrant.x, currentPoint.y + (Math.sin(direction) * quadrant.x / Math.cos(direction));//here
            } else {
                nextX = new Point((quadrant.x == 1) ? Math.ceil(currentPoint.x) : Math.floor(currentPoint.x), undefined); //here
            }
        }
    }
};
Point = function(x, y) {
    this.x = x;
    this.y = y;
    var xDist = Math.abs(Player.x - x);
    var yDist = Math.abs(Player.y - y);
    this.distance = Math.sqrt((xDist * xDist) + (yDist * yDist));
    //add this.data with the data point?
};
