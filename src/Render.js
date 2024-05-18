// g_map = [
//     [1,1,1,1,1,1,1,1],
//     [1,0,0,0,0,0,0,1],
//     [1,0,0,0,0,0,0,1],
//     [1,0,0,1,1,0,0,1],
//     [1,0,0,0,0,0,0,1],
//     [1,0,0,0,0,0,0,1],
//     [1,0,0,0,1,0,0,1],
//     [1,0,0,0,0,0,0,1]
// ];

// g_map = new Array(worldSize).fill(null).map(() => new Array(worldSize).fill(0));

g_map = [];

// following functions from a friend who helped walk me through a more efficient way of using the map
// so i can add and delete blocks because what i was doing for wasn't working..
function makeMap(map, mapSize) {
    for (r = 0; r < mapSize; r++) {
      map.push([]);       
      for (c = 0; c < mapSize; c++) {
        map[r].push({});   
      }
    }
}

function clearMap() {
    g_map = [];
    makeMap(g_map, 64);  // 32 x 32 matrix filled with empty dictionaries {} used to store 3rd dimension
    var block = new Cube();
    
}

function initMap() {
    clearMap();
    addBees(1,1); // testing
    addWalls();
}

// code below from Microsoft Copilot
function drawMap() {
    if (!g_mapInitialized) {
      initMap();
      g_mapInitialized = true;
    }
  
    var block = new Cube();
  
    for (var z = 0; z < 32; z++) {
      for (var x = 0; x < 32; x++) {
        for (var y in g_map[z][x]) {
          if (g_map[z][x].hasOwnProperty(y)){
            block.textureNum = g_map[z][x][y];
  
            block.matrix.setIdentity();
            block.matrix.translate(0, -0.75, 0);
            block.matrix.scale(0.5, 0.5, 0.5);
            block.matrix.translate(x - 16, y, z - 16);
            block.render();
          }
        }
      }
    }
  }

function renderAllShapes() {
    var startTime = performance.now();
  
    // Update and set the view and projection matrices using the camera
    gl.uniformMatrix4fv(u_ProjectionMatrix, false, g_camera.projectionMatrix.elements);
    gl.uniformMatrix4fv(u_ViewMatrix, false, g_camera.viewMatrix.elements);
  
    // Pass the global rotation matrix
    var globalRotMat = new Matrix4().rotate(g_globalAngle, 0, 1, 0);
    gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);
  
    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
  
    drawMap();
    // drawCubes();
    // generateRandomCubes();
    // initializeCubes();
    //drawCubes();
    
    // draw the floor 
    var floor = new Cube();
    floor.color = [1.0, 0.0, 0.0, 1.0];
    floor.textureNum = 1;
    floor.matrix.translate(0,-0.75,0.0);
    floor.matrix.scale(12,0,12);
    floor.matrix.translate(-0.5,0,-0.5);
    floor.render();
  
  
    // draw the sky 
    var sky = new Cube();
    sky.color = [1.0,0.0,0.0,1.0];
    sky.textureNum = 2;
    sky.matrix.scale(25,25,25);
    sky.matrix.translate(-0.5,-0.5,-0.5);
    sky.render();
  
  
    // draw the body cube
    // body.color = [1.0, 0.0, 0.0, 1.0];
    body = new Cube();
    body.color = [251/255, 231/255, 239/255, 1.0];
    body.textureNum = 0;
    body.matrix.translate(-0.25+0.0001, -0.75 + 0.2 + g_jumpHeight , 0.0);
    body.matrix.rotate(g_bodyAngle, 0, 0, 1);
    var bodyCoordinatesMat=new Matrix4(body.matrix);
    body.matrix.scale(0.5, 0.5, 0.5); // Adjusted scale to be the same in all dimensions
    body.render();
  
    // right foot
    var footR = new Cube();
    footR.color = [251/255, 231/255, 239/255, 1.0];
    footR.matrix.translate(0.15,-0.7 + g_jumpHeight,0.16); 
  
    // Move the foot up by the lift amount
    footR.matrix.translate(0, g_footLiftR, 0.01);
  
    // Rotate the foot
    footR.matrix.rotate(g_footAngleR, 1, 0, 0);
  
    // Scale the foot
    footR.matrix.scale(0.08,0.17,0.1);
  
    // Render the foot
    footR.render();
  
    // Left foot
    var footL = new Cube();
    footL.color = [251/255, 231/255, 239/255, 1.0];
    footL.matrix.translate(-0.2,-0.7 + g_jumpHeight,0.15); 
  
    // Move the foot up by the lift amount
    footL.matrix.translate(0, g_footLiftL, 0.01);
  
    // Rotate the foot
    footL.matrix.rotate(g_footAngleL, 1, 0, 0);
  
    // Scale the foot
    footL.matrix.scale(0.08,0.17,0.1);
  
    // Render the foot
    footL.render();
  
  
  
    // left arm
    var armL = new Cube();
    armL.color = [251/255, 231/255, 239/255, 1.0];
    armL.matrix.set(bodyCoordinatesMat); // Start with the head's transformations
    // armL.matrix.translate(-0.1,0.1,0.1);
    armL.matrix.translate(-0.1, 0.65, 0.1);
    armL.matrix.rotate(-g_armAngleL,1,0,0); // Rotate around the x-axis
    // armL.matrix.translate(-0.35,-0.45,-0.1); // for the pivot
    armL.matrix.translate(0, -0.55, 0);
    armL.matrix.scale(0.1,0.4,0.15);
    armL.render();
  
  
    // armR.render();
    var armR = new Cube();
    armR.color = [251/255, 231/255, 239/255, 1.0];
    armR.matrix.set(bodyCoordinatesMat); // Start with the head's transformations
    // armL.matrix.translate(-0.1,0.1,0.1);
    armR.matrix.translate(0.5, 0.65, 0.1);
    armR.matrix.rotate(-g_armAngleR,1,0,0); // Rotate around the x-axis
    // armL.matrix.translate(-0.35,-0.45,-0.1); // for the pivot
    armR.matrix.translate(0, -0.55, 0);
    armR.matrix.scale(0.1,0.4,0.15);
    armR.render();
    
  
    // draw the rabbit head
    var yellow = new Cube();
    yellow.color = [251/255, 231/255, 239/255, 1.0];
    yellow.textureNum = 0;
    yellow.matrix.set(bodyCoordinatesMat); // Start with the same transformation matrix as the head
    yellow.matrix.translate(0.25,0.455,0.001);
    // yellow.matrix.rotate(-5,1,0,0); // rotate the arm
    yellow.matrix.rotate(-g_yellowAngle,1,0,0);
    yellow.matrix.rotate(g_headAngle,0,1,0);
    
    var yellowCoordinatesMat=new Matrix4(yellow.matrix);
    yellow.matrix.scale(0.45,0.45,0.45);
    yellow.matrix.translate(-0.5, 0 + 0.1,0);
    yellow.render();
  
    // draw tail 
    var tail = new Cube();
    // yellow.color = [1,1,0,1];
    tail.color = [250/255,248/255,246/255, 1.0];
    tail.matrix.set(bodyCoordinatesMat); // Start with the same transformation matrix as the head
    tail.matrix.translate(0.195,0.1,0.5);
    // yellow.matrix.rotate(-5,1,0,0); // rotate the arm
    tail.matrix.scale(0.1,0.1,0.1);
    tail.render();
  
  
    // draw cone hat on top
    var radius = 0.5; // Set the radius of the cone
    var height = 1; // Set the height of the cone
    var segments = 20; // Set the number of segments of the cone
    var cone = new Cone(radius, height, segments); // Set the radius, height, and segments as per your requirements
    cone.color = [137/255, 196/255, 244/255, 1.0];  // Set the color of the cone
    cone.matrix.set(yellowCoordinatesMat); // Start with the same transformation matrix as the head
    cone.matrix.translate(0, 0.46, 0.18); // Adjust the position so the cone is on top of the head
    cone.matrix.rotate(-90,1,0,0); // Adjust the size of the cone
  
    cone.matrix.scale(0.2, 0.2, 0.2); // Adjust the size of the cone
    cone.render();
  
    // Right ear
    var earR = new Cube();
    earR.color = [251/255, 231/255, 239/255, 1.0];
    // earR.matrix = new Matrix4(yellowCoordinatesMat);
    earR.matrix.set(yellowCoordinatesMat); // Start with the head's transformations
  
    earR.matrix.translate(0.10,0.45,0.01);
    earR.matrix.rotate(-g_magentaAngleR,1,0,0);
    earR.matrix.scale(0.1,0.41,0.1);
    earR.render();
  
    // Left ear
    var earL = new Cube();
    earL.color = [251/255, 231/255, 239/255, 1.0];
    // earL.matrix = new Matrix4(yellowCoordinatesMat);
    earL.matrix.set(yellowCoordinatesMat); // Start with the head's transformations
  
    earL.matrix.translate(-0.2,0.45,0.01); 
    earL.matrix.rotate(-g_magentaAngleL,1,0,0);
    earL.matrix.scale(0.1,0.41,0.1);
    earL.render();
  
    // check the time at the end of the function and show on web page
    var duration = performance.now() - startTime;
    // sendTextToHTML("numdot: " + len + " ms: " + Math.floor(duration) + " fps: " + Math.floor(1000/duration), "numdot");
    // sendTextToHTML("ms: " + Math.floor(duration) + " fps: " + Math.floor(1000/duration)/10);
    sendTextToHTML("ms: " + Math.floor(duration) + " fps: " + Math.floor(1000/duration)/10, "performance");
  }


// function drawCubes() {
//     for (const cube of cubesData) {
//       const block = new Cube();
//       block.color = cube.color;
//       block.textureNum = -2;
//       block.matrix.translate(cube.x - 16, 0.1, cube.y - 16);
//       block.matrix.scale(0.1, 0.1, 0.1);
//       block.render();
//     }
// }


// function drawWorld(pixels) {
//     const centerX = 16;
//     const centerY = 16;
//     let radius = 0;
//     let angle = 0;
  
//     for (let i = 0; i < 32 * 32; i++) {
//       const x = Math.floor(centerX + radius * Math.cos(angle));
//       const y = Math.floor(centerY + radius * Math.sin(angle));
  
//       // Ensure x and y are within the bounds of the world
//       if (x >= 0 && x < 32 && y >= 0 && y < 32) {
//         const index = (y * 32 + x) * 4;
//         const r = pixels[index];
//         const g = pixels[index + 1];
//         const b = pixels[index + 2];
  
//         const color = [r / 255, g / 255, b / 255, 1.0];
//         const block = new Cube();
//         block.color = color;
//         block.textureNum = -2; // Use color instead of texture
//         block.matrix.translate(x - 16, 0, y - 16); // Adjust translation to center the world
//         block.render();
//       }
  
//       angle += Math.PI / 16;
//       radius += 0.1;
//     }
//   }


function addBees(x,z) {
    g_map[z][x][0] = carrotBlock; // just for testing
}


function addWalls() {
    for(let x = 0; x < 32; x++) {
        for (let y = 0; y < 32; y++) {
            if (x == 1 || x == 31 || y == 0 || y == 31) {
                g_map[y][x][0] = 3; // set the texture number to 3 for the walls
            }
        }
    }
}

//   function generateRandomCubes() {
//     cubesData = [];
//     const worldSize = 16;
//     for (let i = 0; i < numCubes; i++) {
//       const x = Math.floor(Math.random() * worldSize);
//       const y = Math.floor(Math.random() * worldSize);
//       cubesData.push({ x: x, y: y, color: [1, 1, 1, 1] });
//     }
//   }

// function initializeCubes() {
//     for (let i = 0; i < numCubes; i++) {
//       const x = Math.floor(Math.random() * worldSize);
//       const y = Math.floor(Math.random() * worldSize);
//       const color = [Math.random(), Math.random(), Math.random(), 1]; // Random color for each cube
  
//       // Store cube data
//       cubesData.push({ x, y, color });
//     }
//   }

// taken from Microsoft Copilot
function generateRandomCubes() {
    cubesData = [];
    for (let i = 0; i < numCubes; i++) {
        const x = Math.floor(Math.random() * worldSize);
        const y = Math.floor(Math.random() * worldSize);
        cubesData.push({ x: x, y: y, color: [1, 1, 1, 1] });
    }
}

function initializeCubes() {
    cubesData = [];
    for (let i = 0; i < numCubes; i++) {
        const x = Math.floor(Math.random() * worldSize);
        const y = Math.floor(Math.random() * worldSize);
        const color = [Math.random(), Math.random(), Math.random(), 1]; // Random color for each cube

        // Store cube data
        cubesData.push({ x, y, color });
    }
}

// function drawCubes() {
//     for (const cube of cubesData) {
//         const block = new Cube();
//         block.color = cube.color;
//         block.textureNum = -2;
//         block.matrix.translate(cube.x - 16, 0.1, cube.y - 16);
//         block.matrix.scale(0.1, 0.1, 0.1);
//         block.render();
//     }
// }

// function drawCubes() {
//     const block = new Cube();  // Create a single Cube object
//     for (const cube of cubesData) {
//         block.color = cube.color;
//         block.textureNum = -2;
//         block.matrix.setTranslate(cube.x - 16, 0.1, cube.y - 16);
//         block.matrix.scale(0.1, 0.1, 0.1);
//         block.render();
//     }
// }

function drawCubes() {
    const block = new Cube();  // Create a single Cube object
    for (let x = 0; x < worldSize; x++) {
        for (let y = 0; y < worldSize; y++) {
            for (let z = 0; z < g_buildHeight; z++) {
                if (g_map[x][y][z] !== 0) {
                    block.textureNum = getTextureForBlockType(g_map[x][y][z]);
                    block.matrix.setTranslate(x - 16, z * 0.1, y - 16);
                    block.matrix.scale(0.1, 0.1, 0.1);
                    block.render();
                }
            }
        }
    }
}



// function drawMap() {
//     const block = new Cube();  // Create a single Cube object
  
//     for (let x = 0; x < worldSize; x++) {
//       for (let y = 0; y < worldSize; y++) {
//         for (let z = 0; z < g_buildHeight; z++) {
//           const blockType = g_map[x][y][z];
  
//           if (blockType !== 0) {
//             // Set texture based on blockType (assuming getTextureForBlockType works)
//             block.textureNum = getTextureForBlockType(blockType);
  
//             // Adjust translation for z-axis (modify based on your drawing logic)
//             block.matrix.setTranslate(x - 16, z * 0.4, y - 16); // Assuming 0.4 is the scale for each block unit
//             block.matrix.scale(0.4, 0.4, 0.4);
  
//             block.renderfast();
//           }
//         }
//       }
//     }
//   }

  function getTextureForBlockType(blockType) {
    switch (blockType) {
      case 0: // Empty cell
        return 0; // Assuming texture ID 0 represents an empty texture
      case 1: // Grass block
        return 1; // Assuming texture ID 1 represents a grass texture
      case 2: // Dirt block
        return 2; // Assuming texture ID 2 represents a dirt texture
      case 3: // Carrot block
        return 3; // Assuming texture ID 3 represents a carrot texture
      case 4:
        return
        default:
        console.warn("Unknown block type:", blockType);
        return 0; // Or return a default texture ID for unknown types
    }
  }


// function drawMap() {
//     const block = new Cube();  // Create a single Cube object
//     for(x=0; x < 32; x++) {
//         for (y=0; y < 32; y++) {
//             if (x == 1 || x == 31 || y == 0 || y == 31) {
//                 block.textureNum = 3;
//                 block.matrix.setTranslate(x-16,0,y-16);
//                 block.matrix.scale(0.4,0.4,0.4);
//                 block.renderfast();
//             }
//         }
//     }
// }

// function drawMap() {
//     const block = new Cube();  // Create a single Cube object
//     for(x=0; x < 32; x++) {
//         for (y=0; y < 32; y++) {
//             if (x == 1 || x == 31 || y == 0 || y == 31) {
//                 block.textureNum = 3;
//                 block.matrix.setTranslate(x-16,0,y-16);
//                 block.matrix.scale(0.4,0.4,0.4);
//                 block.renderfast();
//             }
//         }
//     }
// }
