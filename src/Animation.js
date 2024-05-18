
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