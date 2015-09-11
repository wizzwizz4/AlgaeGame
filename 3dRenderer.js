//Raycasting demystified by http://www.playfuljs.com/a-first-person-engine-in-265-lines/
//Didn't read their source code though! Compare it; it's probably not the same.

//Should be externally modified
Map = {
    algaeGrid: undefined,
    size: NaN
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
            if (isFrameOld) render();
            isFrameOld = false
            postMessage(["draw", Frame]);
            break;
    }
};

render = function() {
    var rays = [];
    for (var a = 0; a < Frame.width; a++) {
        rays[a] = new Ray(90 + Player.direction - (a * 180 / Frame.width))
    }
};
Ray = function(direction) {
    //Sort this next!
};
