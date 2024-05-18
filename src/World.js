
// function tick() {
//   renderAllShapes();
//   requestAnimationFrame(tick);
// }

  // // rotation of animal using mouse
  // canvas.addEventListener('mousemove', function(event) {
  //   var rect = canvas.getBoundingClientRect();
  //   var x = event.clientX - rect.left;
  //   var y = event.clientY - rect.top;

  //   // Map the x and y positions to rotation angles
  //   g_globalAngle = (x / canvas.width) * 360; // Map x from [0, width] to [0, 360]

  //   // Redraw the scene
  //   renderAllShapes();
  // });

  // canvas.addEventListener('mousedown', function(event) {
  //   if(event.shiftKey) {
  //       // The shift key was held down during the click
  //       // Start the 'poke' animation
  //       g_pokeAnimation = true;
  //       //console.log("Poke animation started");
  //   }
  // });
    // Specify the color for clearing <canvas>
    // gl.clearColor(0.0, 0.0, 0.0, 1.0);
    //gl.clearColor(30/255, 130/255, 76/255, 1.0); // make background green

    // Clear <canvas>
    // gl.clear(gl.COLOR_BUFFER_BIT);
    // renderAllShapes();
    //requestAnimationFrame(tick);

  var g_startTime=performance.now() / 1000.0;
  var g_seconds=performance.now() / 1000.0 - g_startTime;
  // called by browser repeatedly whenever it's time

function tick() {
  updateAnimationAngles();
  // draw everything
  renderAllShapes();
  // tell the browser to update again
  requestAnimationFrame(tick);
}


var g_shapesList = [];

// function click(ev) {
//   // Extract the event click and return it in WebGL
//   let [x,y] = convertCoordinatesEventToGL(ev);

//   // Create and store a new point object
//   let point;
//   if (g_selectedType == POINT) {
//     point = new Point();
//   } else if (g_selectedType == TRIANGLE) {
//     point = new Triangle();
//   } else if (g_selectedType == CIRCLE){
//     point = new Circle();
//     point.segments = g_selectedSegments;
//   } else if (g_selectedType == PICTURE){
//     point = new Picture();

//   }
//   point.position = [x,y];
//   point.color = g_selectedColor.slice();
//   point.size = g_selectedSize;
//   g_shapesList.push(point);
  

//   // // Store the coordinates to g_points array
//   // g_points.push([x, y]);

//   // g_colors.push(g_selectedColor.slice()); // forces a copy of all the elements in the array

//   // Draw every shape that is supposed to be in the canvas
//   renderAllShapes();

 
// }




// var worldLayout = [];
// for (var i = 0; i < 32; i++) {
//     worldLayout[i] = [];
//     for (var j = 0; j < 32; j++) {
//         worldLayout[i][j] = Math.floor(Math.random() * 5); // Random height between 0 and 4
//     }
// }

var g_eye = [0,0,3];
var g_at = [0,0,-100];
var g_up = [0,1,0];
//canvas = document.getElementById('webgl');
// g_camera = new Camera(canvas);


function main() {
  // Set up canvas and get gl variables
  setUpWebGL();
  g_camera = new Camera(canvas); // recommended from ChatGPT
  connectVariablesToGLSL();
  //canvas = document.getElementById('webgl');
  canvas = document.getElementById('webgl');
  if (canvas) {
    canvas.addEventListener('click', handleMouseClick);
    canvas.addEventListener('mousedown', function(event) {
      if(event.shiftKey) {
          // The shift key was held down during the click
          // Start the 'poke' animation
          g_pokeAnimation = true;
          //console.log("Poke animation started");
      }
    });
  } else {
    console.error('Cannot find canvas element');
  }
  //canvas.addEventListener('click', handleMouseClick);
  document.addEventListener('keydown', handleKeyDown);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  
  generateRandomCubes();
  initializeCubes();

  // Set up actions for the HTML UI Elements
  addActionsForHTMLUI();
  initTextures();
  // // for keyboard input
  // document.onkeydown = keydown;


  var tick = function() {
    updateAnimationAngles();
    renderAllShapes();
    requestAnimationFrame(tick);
  }

  tick();
}