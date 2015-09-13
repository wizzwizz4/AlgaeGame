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
            break;
    }
};

render = function(distance) {
    var rays = [];
    for (var a = 0; a < Frame.width; a++) {
        rays[a] = new Ray(90 + Player.direction - (a * 180 / Frame.width), distance);
    }
};
Ray = function(direction, distance) {
    this.points = [];
    this.visData = [];
    direction = direction % 360;
    var b = true;
    var currentPoint = {};
    currentPoint.x = Player.x;
    currentPoint.y = Player.y;
    for (var a = 0; b; a++) {
        //nextX = 
    }
};
