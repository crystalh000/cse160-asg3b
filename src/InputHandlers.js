// function handleMouseClick(event) {
//     const rect = canvas.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;
  
//     // Convert click coordinates to world coordinates
//     const worldX = Math.floor((x / canvas.width) * worldSize);
//     const worldY = Math.floor((y / canvas.height) * worldSize);
  
//     // Check if a cube exists at the clicked position
//     const cubeIndex = cubesData.findIndex(cube => cube.x === worldX && cube.y === worldY);
  
//     if (cubeIndex !== -1) {
//       // Remove cube and update Bunnie's Happiness
//       cubesData.splice(cubeIndex, 1);
//       bunnyHappiness++;
//     }
//     document.getElementById('happinessCounter').innerText = bunnyHappiness;
//   }

// function handleMouseClick(event) {
//     const rect = canvas.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;
  
//     // Convert click coordinates to world coordinates
//     const worldX = Math.floor((x / canvas.width) * worldSize);
//     const worldY = Math.floor((y / canvas.height) * worldSize);
  
//     // Check if a cube exists at the clicked position
//     const cubeIndex = cubesData.findIndex(cube => cube.x === worldX && cube.y === worldY);
  
//     if (cubeIndex !== -1) {
//       // Remove cube and update Bunnie's Happiness
//       cubesData.splice(cubeIndex, 1);
//       bunnyHappiness++;
//     } else {
//       // Add a new cube at the clicked position
//       cubesData.push({ x: worldX, y: worldY, color: g_blockType });
//       bunnyHappiness++;
//     }
//     document.getElementById('happinessCounter').innerText = bunnyHappiness;
// }

// code gotten from Gemini
// function handleMouseClick(event) {
//     const rect = canvas.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;
  
//     // Convert click coordinates to world coordinates
//     const worldX = toGridCoordinates((x / canvas.width) * worldSize);
//     const worldY = toGridCoordinates((y / canvas.height) * worldSize);
  
//     // Find the closest block Y-coordinate
//     const closestY = findClosestBlockY(g_map[worldX], worldY);
  
//     if (g_buildMode === "build") {
//       addBlock(worldX, closestY, 0); // Assuming z-axis is 0 for the ground
//     } else if (g_buildMode === "destroy") {
//       removeBlock(worldX, closestY, 0);
//     }
  
//     document.getElementById('happinessCounter').innerText = bunnyHappiness;
//   }
function handleMouseClick(event) {
    console.log("mouse click");
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
  
    // Convert click coordinates to world coordinates
    const worldX = toGridCoordinates((x / canvas.width) * worldSize);
    const worldY = toGridCoordinates((y / canvas.height) * worldSize);
  
    // Check if worldX and worldY are within the bounds of the g_map array
    if (worldX >= 0 && worldX < g_map.length && worldY >= 0 && worldY < g_map[worldX].length) {
        // Find the closest block Y-coordinate
        const closestY = findClosestBlockY(g_map[worldX][worldY], worldY);
  
        if (g_buildMode === build) {
            console.log("attempting to build block");
          addBlock(worldX, closestY, 0); // Assuming z-axis is 0 for the ground
        } else if (g_buildMode === destroy) {
          removeBlock(worldX, closestY, 0);
          console.log("attempting to destroy block");
        }
    }
  
    document.getElementById('happinessCounter').innerText = bunnyHappiness;
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
            break;
        case 'f':
            g_buildMode = build;
            console.log("build mode activated through f");
            break;
        case 'v':
            g_buildMode = destroy;
            console.log("build mode activated through v");
            break;
        case '5':
            g_blockType = carrotBlock; // texture of carrotBlock which is 4
            break;
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
  
    document.getElementById('angleSlide').addEventListener('mousemove',  function() { g_globalAngle = this.value; renderAllShapes();  });
    
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

// the following is taken from referencing Bees in Hall of Fame and ChatGPT
function toGridCoordinates(value) {
    return Math.floor(value);
}

// Function to add a block
function addBlock(atX, closestY, atZ) {
    if (closestY < g_buildHeight - 1) {
        g_map[atZ][atX][closestY + 1] = g_blockType;
        bunnyHappiness++;
    }
    console.log("adding block");
}

// Function to remove a block
function removeBlock(atX, closestY, atZ) {
    if (closestY >= 0) {
        delete g_map[atZ][atX][closestY];
        bunnyHappiness++;
    }
}

// Function to find the closest block Y-coordinate
function findClosestBlockY(column, y) {
    var keys = Object.keys(column).map(key => parseInt(key)).sort((a, b) => a - b);
    var closestY = keys.find(key => key <= y);
    return closestY !== undefined ? closestY : -1;
}