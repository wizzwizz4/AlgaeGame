//Raycasting demystified by http://www.playfuljs.com/a-first-person-engine-in-265-lines/
//Didn't read their source code though! This was all hand-coded in the browser.

(Map = {
    algaeGrid: undefined,
    size: NaN
}).algaeGrid = new Uint8Array(Map.size * Map.size);
Player = {
    x: NaN,
    y: NaN,
    direction: NaN
}
Frame = undefined;
onMessage = function(e) {
    switch(e.data[0]) {
        case "stateChange":
            render();
            break;
        case "getFrame":
            postMessage(["draw", Frame]);
            break;
    }
};

render = function() {
    var rays = [];
    for (var a = 0; a < Frame.width; a++) {
        rays[a] = new Ray(90-(a*(180/Frame.width)))
    }
};
Ray = function(direction) {
    
};
