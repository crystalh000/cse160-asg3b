
// Import the drawPicture function from Picture.js
// import { drawPicture } from './Picture.js';

// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = `
    precision mediump float;
    attribute vec4 a_Position;
    attribute vec2 a_UV;
    varying vec2 v_UV;
    uniform mat4 u_ModelMatrix;
    uniform mat4 u_GlobalRotateMatrix;
    uniform mat4 u_ViewMatrix;
    uniform mat4 u_ProjectionMatrix;
    uniform float u_Size;
    void main() {
        gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
        v_UV = a_UV;
    }`

// Fragment shader program

var FSHADER_SOURCE =`
  precision mediump float;
  varying vec2 v_UV;
  uniform vec4 u_FragColor;
  uniform sampler2D u_Sampler0;
  uniform sampler2D u_Sampler1;
  uniform sampler2D u_Sampler2;
  uniform sampler2D u_Sampler3;
  uniform int u_whichTexture;
  void main() {
    if (u_whichTexture == -2) {
        gl_FragColor = u_FragColor;  // use color
    }else if (u_whichTexture == -1) {
        gl_FragColor = vec4(v_UV, 1.0, 1.0); // use UV debug color
    }else if (u_whichTexture == 0) {
        gl_FragColor = texture2D(u_Sampler0, v_UV); // use texture0
    } else if (u_whichTexture == 1) {
        gl_FragColor = texture2D(u_Sampler1, v_UV); // use texture1
    } else if (u_whichTexture == 2) {
        gl_FragColor = texture2D(u_Sampler2, v_UV); // use texture2 for sky
    } else if (u_whichTexture == 3) {
      gl_FragColor = texture2D(u_Sampler3, v_UV); // use texture3 for wall
  }
    else {
        gl_FragColor = vec4(1,0.2,0.2,1); // error, put reddish
    }
  }`

// Global Variables
let canvas;
let gl;
let a_Position;
let a_UV;
let u_FragColor;
let u_Size;
let u_ModelMatrix;
let u_ViewMatrix;
let u_ProjectionMatrix;
let u_GlobalRotateMatrix;
let u_Sampler0;
let u_Sampler1;
let u_Sampler2;
let u_Sampler3;


let g_yellowAngle = 0;
let g_magentaAngleL = 0;
let g_magentaAngleR = 0;
let g_footAngleR = 0;
let g_footAngleL = 0;
let g_footLiftR = 0;
let g_footLiftL = 0;
let g_globalAngle = 0; // Add this line
let g_yellowAnimation=false;
let g_magentaAnimation=false;
let g_runAnimation = false;
let g_pokeAnimation = false;
let maxSwingAngle = 25;
let maxLiftHeight = 0.1;
let g_armAngleR = 0;
let g_armAngleL = 0;
let g_bodyAngle = 0;
let g_headAngle = 0;
let g_headY = 0;
var g_jumpHeight = 0;
var animalXRotation = 0;
var animalYRotation = 0;



function setUpWebGL() {
   // Retrieve <canvas> element
   canvas = document.getElementById('webgl');

   // Get the rendering context for WebGL
   //gl = getWebGLContext(canvas);
   gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });

   if (!gl) {
     console.log('Failed to get the rendering context for WebGL');
     return;
   }
   gl.enable(gl.DEPTH_TEST);
   console.log("gl.COMPILE_STATUS:", gl.COMPILE_STATUS);
   if (!gl.COMPILE_STATUS) {
        console.log("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
   }
//    gl.getProgramParameter(program, gl.LINK_STATUS);
    console.log("gl.LINK_STATUS:", gl.LINK_STATUS);

  //  // Specify the depth function, the default is gl.LESS
  //  gl.depthFunc(gl.LEQUAL);

  //  // Clear the depth buffer
//    gl.clearDepth(1.0);
   gl.clear(gl.DEPTH_BUFFER_BIT);

}

function connectVariablesToGLSL() {
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }
  // // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of a_UV
  a_UV = gl.getAttribLocation(gl.program, 'a_UV');
  if (a_UV < 0) {
    console.log('Failed to get the storage location of a_UV');
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  // Get the storage location of u_ModelMatrix
  u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if (!u_ModelMatrix) {
    console.log('Failed to get the storage location of u_ModelMatrix');
    return;
  }

  u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
  if (!u_GlobalRotateMatrix) {
    console.log('Failed to get the storage location of u_GlobalRotateMatrix');
    return;
  }

  u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  if (!u_ViewMatrix) {
    console.log('Failed to get the storage location of u_ViewMatrix');
    return;
  }

  u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix');
  if (!u_ProjectionMatrix) {
    console.log('Failed to get the storage location of u_ProjectionMatrix');
    return;
  }

   // get the storage location of u_Sampler
   u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
   if (!u_Sampler0) {
     console.log('Failed to get the storage location of u_Sampler0');
     return;
   }

   // get the storage location of u_Sampler
   u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
   if (!u_Sampler1) {
     console.log('Failed to get the storage location of u_Sampler1');
     return;
   }

   u_Sampler2 = gl.getUniformLocation(gl.program, 'u_Sampler2');
   if (!u_Sampler2) {
     console.log('Failed to get the storage location of u_Sampler2');
     return;
   }

   u_Sampler3 = gl.getUniformLocation(gl.program, 'u_Sampler3');
   if (!u_Sampler3) {
     console.log('Failed to get the storage location of u_Sampler3');
     return;
   }

   u_whichTexture = gl.getUniformLocation(gl.program, 'u_whichTexture');
    if (!u_whichTexture) {  
        console.log('Failed to get the storage location of u_whichTexture');
        return;
    }
   
  var identityM = new Matrix4();
  gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
//   gl.uniformMatrix4fv(u_ViewMatrix, false, identityM.elements);
  
}

// Constants
const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;
const PICTURE = 3;

// Globals related to UI elements
let g_selectedColor = [1.0,1.0,1.0,1.0]; // Default white
let g_selectedSize = 5;
let g_selectedType = POINT;
let g_selectedSegments = 10;

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

function initTextures(gl,n) {
    var image = new Image();  // Create the image object
    if (!image) {
      console.log('Failed to create the image object');
      return false;
    }
    // Register the event handler to be called on loading an image
    image.onload = function(){ sendImageToTEXTURE0(image); };
    image.src = '../lib/fur.jpg';

    // add more textures loading
    var image1 = new Image();
    if (!image1) {
      console.log('Failed to create the image object');
      return false;
    }
    // Register the event handler to be called on loading an image
    image1.onload = function(){ sendImageToTEXTURE1(image1); };
    image1.src = "../lib/grass1.jpg";


    var image2 = new Image();
    if (!image2) {
      console.log('Failed to create the image object');
      return false;
    }
    // Register the event handler to be called on loading an image
    image2.onload = function(){ sendImageToTEXTURE2(image2); };
    image2.src = "../lib/sky1.jpg";


    var image3 = new Image();
    if (!image3) {
      console.log('Failed to create the image object');
      return false;
    }

    // Register the event handler to be called on loading an image
    image3.onload = function(){ sendImageToTEXTURE3(image3); };
    image3.src = "../lib/cottage_wall.jpg";

    return true;
}

// can use switch statements to make it work better for u
function sendImageToTEXTURE0(image) {
    var texture = gl.createTexture();   // Create a texture object
    if (!texture) {
      console.log('Failed to create the texture object');
      return false;
    }

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.uniform1i(u_Sampler0, 0);
    console.log('finished loadTexture');

}

function sendImageToTEXTURE1(image) {
    var texture = gl.createTexture();   // Create a texture object
    if (!texture) {
      console.log('Failed to create the texture object');
      return false;
    }

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.uniform1i(u_Sampler1, 1);
    console.log('finished loadTexture1');
}

function sendImageToTEXTURE2(image) {
    var texture = gl.createTexture();   // Create a texture object
    if (!texture) {
      console.log('Failed to create the texture object');
      return false;
    }

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.uniform1i(u_Sampler2, 2);
    console.log('finished loadTexture2');
}

function sendImageToTEXTURE3(image) {
  var texture = gl.createTexture();   // Create a texture object
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
  gl.activeTexture(gl.TEXTURE3);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  gl.uniform1i(u_Sampler3, 3);
  console.log('finished loadTexture3');
}

function main() {
  // Set up canvas and get gl variables
  setUpWebGL();

  // Set up GLSL shader programs and connect JS variables to GLSL
  connectVariablesToGLSL();

  // Set up actions for the HTML UI Elements
  addActionsForHTMLUI();

  // for keyboard input
  document.onkeydown = keydown;

  initTextures();

  // rotation of animal using mouse
  canvas.addEventListener('mousemove', function(event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    // Map the x and y positions to rotation angles
    g_globalAngle = (x / canvas.width) * 360; // Map x from [0, width] to [0, 360]

    // Redraw the scene
    renderAllShapes();
  });

  canvas.addEventListener('mousedown', function(event) {
    if(event.shiftKey) {
        // The shift key was held down during the click
        // Start the 'poke' animation
        g_pokeAnimation = true;
        //console.log("Poke animation started");
    }
  });
    // Specify the color for clearing <canvas>
    // gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearColor(30/255, 130/255, 76/255, 1.0); // make background green

    // Clear <canvas>
    // gl.clear(gl.COLOR_BUFFER_BIT);
    // renderAllShapes();
    requestAnimationFrame(tick);

}

var g_startTime=performance.now() / 1000.0;
var g_seconds=performance.now() / 1000.0 - g_startTime;
// called by browser repeatedly whenever it's time

function tick() {
  // print some debug information so we know we are running
  g_seconds = performance.now() / 1000.0 - g_startTime;
  console.log(performance.now());

  updateAnimationAngles();

  // draw everything
  renderAllShapes();
  // tell the browser to update again
  requestAnimationFrame(tick);
}


var g_shapesList = [];

// var g_points = [];  // The array for the position of a mouse press
// var g_colors = [];  // The array to store the color of a point
// var g_sizes = []; // The array to store the size of a point

function click(ev) {
  // Extract the event click and return it in WebGL
  let [x,y] = convertCoordinatesEventToGL(ev);

  // Create and store a new point object
  let point;
  if (g_selectedType == POINT) {
    point = new Point();
  } else if (g_selectedType == TRIANGLE) {
    point = new Triangle();
  } else if (g_selectedType == CIRCLE){
    point = new Circle();
    point.segments = g_selectedSegments;
  } else if (g_selectedType == PICTURE){
    point = new Picture();

  }
  point.position = [x,y];
  point.color = g_selectedColor.slice();
  point.size = g_selectedSize;
  g_shapesList.push(point);
  

  // // Store the coordinates to g_points array
  // g_points.push([x, y]);

  // g_colors.push(g_selectedColor.slice()); // forces a copy of all the elements in the array

  // Draw every shape that is supposed to be in the canvas
  renderAllShapes();

 
}

function convertCoordinatesEventToGL(ev) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  return([x,y]);
}

function updateAnimationAngles() {
  if (g_yellowAnimation) {
    g_yellowAngle = (15 * Math.sin(4* g_seconds));
  }
  if (g_magentaAnimation) {
    g_magentaAngleR = (25 * Math.sin(3 * g_seconds));
    g_magentaAngleL = (25 * Math.sin(3 * g_seconds));
  }
  if (g_runAnimation) {
    // Right foot
    var swingAngleR = Math.sin(4 * g_seconds) * maxSwingAngle;
    var liftHeightR = Math.abs(Math.sin(4 * g_seconds)) * maxLiftHeight;
    g_footAngleR = swingAngleR;
    g_footLiftR = liftHeightR;

    // Left foot
    var swingAngleL = Math.sin(4 * g_seconds + Math.PI) * maxSwingAngle; // Add phase offset
    var liftHeightL = Math.abs(Math.sin(4 * g_seconds + Math.PI)) * maxLiftHeight; // Add phase offset
    g_footAngleL = swingAngleL;
    g_footLiftL = liftHeightL;

    // Body rotation
    g_bodyAngle = Math.sin(4 * g_seconds) * 5; // Adjust the multiplier as needed

    // arm rotation
    g_armAngleL = Math.sin(4 * g_seconds) * maxSwingAngle;
    g_armAngleR = Math.sin(4 * g_seconds + Math.PI) * maxSwingAngle;
    
    // head animation
    g_headAngle = Math.sin(4* g_seconds) * 5;
    // g_headY = Math.sin(g_seconds) * angleAmplitude;

    // point ears back
    g_magentaAngleL = -35;
    g_magentaAngleR = -35;


  }

  if (g_pokeAnimation) {
    maxJumpHeight = 0.1;
    g_jumpHeight = Math.sin(4* g_seconds) * maxJumpHeight;
    console.log("Jump height: " + g_jumpHeight);
    if (g_jumpHeight < -1) {
      g_pokeAnimation = false;
      g_jumpHeight = 0;
    }
  }
  
}

function keydown(ev) {
  if (ev.keyCode == 39) { // The right arrow key was pressed
    g_eye[0] += 0.2;
  } 
  else if (ev.keyCode == 37) {
    g_eye[0] -= 0.2;
  }
  // Redraw the scene
  renderAllShapes();
  console.log(ev.keyCode);
}

var worldLayout = [];
for (var i = 0; i < 32; i++) {
    worldLayout[i] = [];
    for (var j = 0; j < 32; j++) {
        worldLayout[i][j] = Math.floor(Math.random() * 5); // Random height between 0 and 4
    }
}

// function drawWorld() {
//   for (var i = 0; i < 32; i++) {
//       for (var j = 0; j < 32; j++) {
//           for (var k = 0; k < worldLayout[i][j]; k++) {
//               var cube = new Cube();
//               cube.textureNum = 1; // Use the texture you want for the walls
//               cube.matrix.translate(i, k, j);
//               cube.render();
//           }
//       }
//   }
// }




var g_eye = [0,0,3];
var g_at = [0,0,-100];
var g_up = [0,1,0];

var g_camera = new Camera();
var g_map = [
    [1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1],
    [1,0,0,1,1,0,0,1],
    [1,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,1],
    [1,0,0,0,0,0,0,1]
];

function drawMap() {
    for(x=0; x < 32; x++) {
        for (y=0; y < 32; y++) {
            if (x == 1 || x == 31 || y == 0 || y == 31) {
                var body = new Cube();
                body.textureNum = 3;
                body.color = [0.8, 1.0, 1.0, 1.0];
                body.matrix.translate(0,-0.75,0);
                body.matrix.scale(0.4,0.4,0.4);
                body.matrix.translate(x-16,0,y-16);
                body.renderfast();
            }
        }
    }
}



function renderAllShapes() {
  // Check the time at the start of the function
  var startTime = performance.now();

  // makes viewing the blocks possible
  var projMat = new Matrix4();
  projMat.setPerspective(50, 1*canvas.width/canvas.height, 1, 100); // Near plane is 0.1, far plane is 50
  gl.uniformMatrix4fv(u_ProjectionMatrix, false, projMat.elements);
  
  var viewMat = new Matrix4();
//   viewMat.setLookAt(0,0,3, 0,0,-100, 0,1,0);
  viewMat.setLookAt(
    // g_camera.eye.x,g_camera.eye.y, g_camera.eye.z, 
    // g_camera.at.x, g_camera.at.y, g_camera.at.z, 
    // g_camera.up.x,g_camera.up.y, g_camera.up.z
    g_eye[0],g_eye[1],g_eye[2], g_at[0], g_at[1], g_at[2], g_up[0],g_up[1],g_up[2]
  );
gl.uniformMatrix4fv(u_ViewMatrix, false, viewMat.elements);

  // Pass the matrix to u_ModelMatrix.attribute
  var globalRotMat=new Matrix4().rotate(g_globalAngle, 0,1,0);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.clear(gl.COLOR_BUFFER_BIT);

  drawMap();
  
  // draw the floor 
  var floor = new Cube();
  floor.color = [1.0, 0.0, 0.0, 1.0];
  floor.textureNum = 1;
  floor.matrix.translate(0,-0.75,0.0);
  floor.matrix.scale(10,0,10);
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

// Set the text of a HTML element
function sendTextToHTML(text, htmlID) {
  var htmlElm = document.getElementById(htmlID);
  if (!htmlElm) {
    console.log("Failed to get " + htmlID + " from the HTML");
    return;
  }
  htmlElm.innerHTML = text;
}
