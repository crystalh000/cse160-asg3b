function handleMouseClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
  
    // Convert click coordinates to world coordinates
    const worldX = Math.floor((x / canvas.width) * worldSize);
    const worldY = Math.floor((y / canvas.height) * worldSize);
  
    // Check if a cube exists at the clicked position
    const cubeIndex = cubesData.findIndex(cube => cube.x === worldX && cube.y === worldY);
  
    if (cubeIndex !== -1) {
      // Remove cube and update Bunnie's Happiness
      cubesData.splice(cubeIndex, 1);
      if (bunniesHappiness < 20) {
        bunniesHappiness++;
      }
    }
    document.getElementById('happinessCounter').innerText = bunniesHappiness;
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