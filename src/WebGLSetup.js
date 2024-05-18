function setUpWebGL() {
    // Retrieve <canvas> element
    canvas = document.getElementById('webgl');
    gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
    if (!gl) {
      console.log('Failed to get the rendering context for WebGL');
      return;
    }
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.DEPTH_BUFFER_BIT);
    // generate initial random cubes
    generateRandomCubes();
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