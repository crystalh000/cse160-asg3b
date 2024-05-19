

function handleMouseClick(event) {
    // console.log("mouse click");
    // const rect = canvas.getBoundingClientRect();
    // const x = event.clientX - rect.left;
    // const y = event.clientY - rect.top;
    // console.log(`Screen coordinates: (${x}, ${y})`);
    // // Convert click coordinates to world coordinates
    // const worldX = toGridCoordinates((x / canvas.width) * worldSize);
    // const worldY = toGridCoordinates((y / canvas.height) * worldSize);
    // console.log(`World coordinates: (${worldX}, ${worldY})`);

    // // Check if worldX and worldY are within the bounds of the g_map array
    // if (worldX >= 0 && worldX < g_map.length && worldY >= 0 && worldY < g_map[worldX].length) {
    //     // Find the closest block Y-coordinate
    //     const closestY = findClosestY(g_map[worldX][worldY], 0); // Assuming 0 for the ground level
    //     console.log(`Closest block Y-coordinate: ${closestY}`);

    //     if (g_buildMode === BUILD_MODE) {
    //         console.log("attempting to build block");
    //         addBlock(worldX, closestY + 1, worldY); // Assuming z-axis is worldY
    //     } else if (g_buildMode === DESTROY_MODE) {
    //         console.log("attempting to destroy block");
    //         removeBlock(worldX, closestY, worldY);
    //     }
    // }

    

    document.getElementById('happinessCounter').innerText = bunnyHappiness;
    renderAllShapes(); // Re-render the scene after adding or removing a block
}
  
  // code given from ChatGPT
  function handleKeyDown(event) {
    const speed = 0.1;
    const alpha = 45 * Math.PI / 180; // convert to radians
    switch (event.key) {
        case 'w':
            g_camera.moveForward(speed);
            break;
        case 's':
            g_camera.moveBackwards(speed);
            break;
        case 'a':
            g_camera.moveLeft(speed);
            break;
        case 'd':
            g_camera.moveRight(speed);
            break;
        case 'q':
            g_camera.panLeft(alpha);
            break;
        case 'e':
            g_camera.panRight(alpha);
            break;
        case 't':
            g_buildMode = none;
            pickBlock();
            break;
        case 'b':
            g_buildMode = BUILD_MODE;
            g_blockType = carrotBlock;
            console.log("build mode activated through b");
            pickBlock(); 
            console.log("attempting to select blocks");
            break;
        case 'v':
            g_buildMode = DESTROY_MODE;
            console.log("destroy mode activated through v");
            pickBlock(); 
            break;
        // case '5':
        //     g_blockType = carrotBlock; // texture of carrotBlock which is 4
        //     pickBlock(); 
        //     break;
    }
  }


// Set up actions for the HTML UI elements
function addActionsForHTMLUI() {

    document.getElementById('animationYellowOffButton').onclick = function() {g_yellowAnimation=false;};
    document.getElementById('animationYellowOnButton').onclick = function() {g_yellowAnimation=true;};
  
  
    document.getElementById('animationMagentaOffButton').onclick = function() {g_magentaAnimation=false;};
    document.getElementById('animationMagentaOnButton').onclick = function() {g_magentaAnimation=true;};
    
    document.getElementById('animationRunOffButton').onclick = function() {g_runAnimation=false;};
    document.getElementById('animationRunOnButton').onclick = function() {g_runAnimation=true;};
  
    document.getElementById('yellowSlide').addEventListener('mousemove', function() { g_yellowAngle = this.value; renderAllShapes(); });
    document.getElementById('magentaSlide').addEventListener('mousemove', function() { g_magentaAngleR = this.value; g_magentaAngleL = this.value; renderAllShapes(); });
  
    document.getElementById('angleSlide').addEventListener('mousemove',  function() { g_globalAngle = this.value; renderAllShapes(); pickBlock(); });
    
  }
  

// Set the text of a HTML element
function sendTextToHTML(text, htmlID) {
    var htmlElm = document.getElementById(htmlID);
    if (!htmlElm) {
      console.log("Failed to get " + htmlID + " from the HTML");
      return;
    }
    htmlElm.innerHTML = text;
  }

  function convertCoordinatesEventToGL(ev) {
    var x = ev.clientX; // x coordinate of a mouse pointer
    var y = ev.clientY; // y coordinate of a mouse pointer
    var rect = ev.target.getBoundingClientRect();
  
    x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
    y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
  
    return([x,y]);
  }

// the following is heavily inspired from a friend's which I took to understand carefully before implementing something similar
// just so i can add and delete blocks within a 2D --> 3D world

function toGridCoordinates(value) { // add depth and exponential scaling
    return Math.floor(value);
    // if (value < -8) {
    //     return 0;
    //   }
    //   else {
    //     return Math.round((value + 8) * 2);
    //   }
}

function addBlock(atX, closestY, atZ) {
    
    // if (closestY < g_buildHeight - 1) {
    //     g_map[atX][atZ][closestY] = g_blockType;
    //     //g_map[z][x][0] = darkRock;
    //     bunnyHappiness++;
    //     console.log(`Added block at (${atX}, ${closestY}, ${atZ})`);
    // } else {
    //     console.log(`Failed to add block at (${atX}, ${closestY}, ${atZ})`);
    // }
    let atX = toGridCoordinates(g_camera.at.elements[0]);
    let atY = toGridCoordinates(g_camera.at.elements[1]); // so we can get to the center of Y
    let atZ = toGridCoordinates(g_camera.at.elements[2] - 2);
    
    g_map[atZ][atX][atY] = g_blockType;

    bunnyHappiness++;
    console.log(`Added block at (${atZ}, ${atX}, ${atY})`);
}




// Function to remove a block
function removeBlock(atX, closestY, atZ) {
    if (closestY >= 0) {
        g_map[atX][atZ][closestY] = 0;
        bunnyHappiness++;
        console.log(`Removed block at (${atX}, ${closestY}, ${atZ})`);
    } else {
        console.log(`Failed to remove block at (${atX}, ${closestY}, ${atZ})`);
    }
}

// Function to find the closest block Y-coordinate
// function findClosestBlockY(column, y) {
//     var keys = Object.keys(column).map(key => parseInt(key)).sort((a, b) => a - b);
//     var closestY = keys.find(key => key <= y);
//     return closestY !== undefined ? closestY : -1;
// }

// finds the closest block based on the camera view (so we can delete and add blocks that are clsest to us)

// takes in a map and the targetY value and returns the 
function findClosestY(mapPlane, targetY) {
    const mapVals = Object.keys(mapPlane);
    // if there are no keys return -1
    if (mapVals.length === 0) {
        return -1;
    }
    // convert the vals to numbers
    const numericKeys = mapVals.map(key => parseInt(key));
    let closestBlock = -1;

    // Iterate over the keys to find the nearest one
    numericKeys.forEach(key => {
        if (key <= targetY && key > closestBlock) {
            closestBlock = key;
        }
    });

  // If no nearest key is found, return -1
    return closestBlock === undefined ? -1 : closestBlock;

}

// helps us decide and pinpoint the area in which we want to add or remove a block
function pickBlock() {
    if (g_buildMode == BUILD_MODE || g_buildMode == DESTROY_MODE) {
        // let atX = toGridCoordinates(g_camera.at.elements[0]);
        // let atY = toGridCoordinates(g_camera.at.elements[1] - 16); // so we can get to the center of Y
        // let atZ = toGridCoordinates(g_camera.at.elements[2]);
        // let xz_plane = g_map[atZ][atX];
        // let closestBlockY = findClosestY(xz_plane, atY); // helps find the closest block which we use by finding the closest y
        // if (atX < 32 && atZ < 32) {
        //     g_selectedBlock = [atZ, atX, closestBlockY];
        // }
        let atX = toGridCoordinates(g_camera.at.elements[0]); // cast to int
        let atY = toGridCoordinates(g_camera.at.elements[1]); // so we can get to the center of Y
        let atZ = toGridCoordinates(g_camera.at.elements[2] - 2 );
        let xz_plane = g_map[atZ][atX];
        //let closestBlockY = findClosestY(xz_plane, atY); // helps find the closest block which we use by finding the closest y
        // if (atX < 32 && atZ < 32) {
            //g_selectedBlock = [atZ, atX, closestBlockY];
            g_selectedBlock = [atZ, atX, atY];
        // }
    }
    else {
        g_selectedBlock = null; // don't do anything
    }
}
