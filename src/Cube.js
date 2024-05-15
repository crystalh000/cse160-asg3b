class Cube {
    constructor () {
        this.type = 'cube';
        this.color = [1.0, 1.0, 1.0, 1.0];
        this.matrix = new Matrix4();
        this.textureNum = -1;
    }
    render() {
        // rendering the other faces using 3DUV done using Copilot
        var rgba = this.color;
        gl.uniform1i(u_whichTexture, this.textureNum);
        // var size = this.size;

        // Pass the color of a point to u_FragColor variable 
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);    

        // rewrote the below part to use 3DUV properly using Microsoft Copilot because i was having drawing issues


        // Draw front face
        // drawTriangle3DUV([0, 0, 0, 1, 1, 0, 1, 0, 0], [0, 0, 1, 1, 1, 0]);
        // drawTriangle3DUV([0, 0, 0, 0, 1, 0, 1, 1, 0], [0, 0, 0, 1, 1, 1]);

        // // Draw top face
        // gl.uniform4f(u_FragColor, rgba[0]* 0.9, rgba[1]* 0.9, rgba[2]* 0.9, rgba[3]);
        // drawTriangle3DUV([0, 1, 0, 0, 1, 1, 1, 1, 1], [0, 0, 0, 1, 1, 1]);
        // drawTriangle3DUV([0, 1, 0, 1, 1, 1, 1, 1, 0], [0, 0, 1, 1, 1, 0]);

        // // Draw left face
        // gl.uniform4f(u_FragColor, rgba[0]* 0.8, rgba[1]* 0.8, rgba[2]* 0.8, rgba[3]);
        // drawTriangle3DUV([0, 0, 0, 0, 0, 1, 0, 1, 1], [0, 0, 1, 0, 1, 1]);
        // drawTriangle3DUV([0, 0, 0, 0, 1, 1, 0, 1, 0], [0, 0, 1, 1, 0, 1]);

        // // Draw right face
        // gl.uniform4f(u_FragColor, rgba[0]* 0.7, rgba[1]* 0.7, rgba[2]* 0.7, rgba[3]);
        // drawTriangle3DUV([1, 0, 0, 1, 0, 1, 1, 1, 1], [0, 0, 1, 0, 1, 1]);
        // drawTriangle3DUV([1, 0, 0, 1, 1, 1, 1, 1, 0], [0, 0, 1, 1, 0, 1]);

        // // Draw bottom face
        // gl.uniform4f(u_FragColor, rgba[0]* 0.6, rgba[1]* 0.6, rgba[2]* 0.6, rgba[3]);
        // drawTriangle3DUV([0, 0, 0, 0, 0, 1, 1, 0, 1], [0, 0, 0, 1, 1, 1]);
        // drawTriangle3DUV([0, 0, 0, 1, 0, 1, 1, 0, 0], [0, 0, 1, 1, 0, 1]);

        // // Draw back face
        // gl.uniform4f(u_FragColor, rgba[0]* 0.5, rgba[1]* 0.5, rgba[2]* 0.5, rgba[3]);
        // drawTriangle3DUV([0, 0, 1, 0, 1, 1, 1, 1, 1], [0, 0, 0, 1, 1, 1]);
        // drawTriangle3DUV([0, 0, 1, 1, 1, 1, 1, 0, 1], [0, 0, 1, 1, 0, 1]);

        // Draw front face
        drawTriangle3DUV([0, 0, 0, 1, 1, 0, 1, 0, 0], [0, 1, 1, 0, 1, 1]);
        drawTriangle3DUV([0, 0, 0,  0, 1, 0,  1, 1, 0], [0, 1, 0, 0, 1, 0]);

        // Draw top face
        gl.uniform4f(u_FragColor, rgba[0]* 0.9, rgba[1]* 0.9, rgba[2]* 0.9, rgba[3]);
        drawTriangle3DUV([0, 1, 0, 0, 1, 1, 1, 1, 1], [0, 0, 0, 1, 1, 1]);
        drawTriangle3DUV([0, 1, 0, 1, 1, 1, 1, 1, 0], [0, 0, 1, 1, 1, 0]);


        // Draw left face
        gl.uniform4f(u_FragColor, rgba[0]* 0.8, rgba[1]* 0.8, rgba[2]* 0.8, rgba[3]);
        drawTriangle3DUV([0, 0, 0, 0, 0, 1, 0, 1, 1], [1, 0, 1, 1, 0, 1]);
        drawTriangle3DUV([0, 0, 0, 0, 1, 1, 0, 1, 0], [1, 0, 0, 1, 0, 0]);

        // Draw right face
        gl.uniform4f(u_FragColor, rgba[0]* 0.7, rgba[1]* 0.7, rgba[2]* 0.7, rgba[3]);
        drawTriangle3DUV([1, 0, 0, 1, 0, 1, 1, 1, 1], [0, 0, 0, 1, 1, 1]);
        drawTriangle3DUV([1, 0, 0, 1, 1, 1, 1, 1, 0], [0, 0, 1, 1, 1, 0]);

        // Draw bottom face
        gl.uniform4f(u_FragColor, rgba[0]* 0.6, rgba[1]* 0.6, rgba[2]* 0.6, rgba[3]);
        drawTriangle3DUV([0, 0, 0, 0, 0, 1, 1, 0, 1], [1, 1, 1, 0, 0, 0]);
        drawTriangle3DUV([0, 0, 0, 1, 0, 1, 1, 0, 0], [1, 1, 0, 0, 0, 0]);

        // Draw back face
        gl.uniform4f(u_FragColor, rgba[0]* 0.5, rgba[1]* 0.5, rgba[2]* 0.5, rgba[3]);
        drawTriangle3DUV([0, 0, 1, 0, 1, 1, 1, 1, 1], [1, 0, 1, 1, 0, 1]);
        drawTriangle3DUV([0, 0, 1, 1, 1, 1, 1, 0, 1], [1, 0, 0, 1, 0, 0]);

    }

    // renderfast() {
    //     var rgba = this.color;
    //     gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    //     gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
    //     var allverts = [];
        
    //     // // front of cube
    //     allverts = allverts.concat([0, 0, 0,   1, 1, 0,   1, 0, 0]);
    //     allverts = allverts.concat([0, 0, 0,   0, 1, 0,   1, 1, 0]);
        
    //     // top of cube
    //     allverts = allverts.concat([0,1,0,   0,1,1,   1,1,1]);
    //     allverts = allverts.concat([0,1,0, 1,1,1, 1,1,0]);

    //     // right of cube
    //     allverts = allverts.concat([1,1,0, 1,1,1, 1,0,0]);
    //     allverts=allverts.concat([1,0,0, 1,1,1,  1,0,1]);

    //     // left of cube
    //     allverts=allverts.concat([0,1,0,  0,1,1, 0,0,0]);
    //     allverts=allverts.concat([0,0,0, 0,1,1, 0,0,1]);
    
    //     // bottom of cube
    //     allverts = allverts.concat([0,0,1, 1,1,1, 1,0,1]);
    //     allverts = allverts.concat([0,0,1, 0,1,1, 1,1,1]);
    //     drawTriangle3D(allverts);
    // }   
    // renderfast() {
    //     var rgba = this.color;
    //     gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    //     gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
    //     var allverts = [];
    //     // front of cube
    //     allverts = allverts.concat([0, 0, 0,   1, 0, 0,   1, 1, 0]);
    //     allverts = allverts.concat([0, 0, 0,   1, 1, 0,   0, 1, 0]);
        
    //     // top of cube
    //     allverts = allverts.concat([0, 1, 0,   1, 1, 0,   1, 1, 1]);
    //     allverts = allverts.concat([0, 1, 0,   1, 1, 1,   0, 1, 1]);

    //     // right of cube
    //     allverts = allverts.concat([1, 0, 0,   1, 0, 1,   1, 1, 1]);
    //     allverts = allverts.concat([1, 0, 0,   1, 1, 1,   1, 1, 0]);

    //     // left of cube
    //     allverts = allverts.concat([0, 0, 0,   0, 0, 1,   0, 1, 1]);
    //     allverts = allverts.concat([0, 0, 0,   0, 1, 1,   0, 1, 0]);

    //     // bottom of cube
    //     allverts = allverts.concat([0, 0, 0,   1, 0, 0,   1, 0, 1]);
    //     allverts = allverts.concat([0, 0, 0,   1, 0, 1,   0, 0, 1]);

    //     // back of cube
    //     allverts = allverts.concat([0, 0, 1,   1, 0, 1,   1, 1, 1]);
    //     allverts = allverts.concat([0, 0, 1,   1, 1, 1,   0, 1, 1]);

    //     drawTriangle3D(allverts);
    //     // front of cube
    //     // allverts = allverts.concat([0, 0, 0,   1, 0, 0,   1, 1, 0]);
    //     // allverts = allverts.concat([0, 0, 0,   1, 1, 0,   0, 1, 0]);
        
    //     // // top of cube
    //     // allverts = allverts.concat([0, 1, 0,   1, 1, 0,   1, 1, 1]);
    //     // allverts = allverts.concat([0, 1, 0,   1, 1, 1,   0, 1, 1]);
    
    //     // // right of cube
    //     // allverts = allverts.concat([1, 0, 0,   1, 0, 1,   1, 1, 1]);
    //     // allverts = allverts.concat([1, 0, 0,   1, 1, 1,   1, 1, 0]);
    
    //     // // left of cube
    //     // allverts = allverts.concat([0, 0, 0,   0, 1, 0,   0, 1, 1]);
    //     // allverts = allverts.concat([0, 0, 0,   0, 1, 1,   0, 0, 1]);
    
    //     // // bottom of cube
    //     // allverts = allverts.concat([0, 0, 0,   1, 0, 0,   1, 0, 1]);
    //     // allverts = allverts.concat([0, 0, 0,   1, 0, 1,   0, 0, 1]);
    
    //     // // back of cube
    //     // allverts = allverts.concat([0, 0, 1,   1, 0, 1,   1, 1, 1]);
    //     // allverts = allverts.concat([0, 0, 1,   1, 1, 1,   0, 1, 1]);
    
    //     // drawTriangle3D(allverts);
    // }

    // used Gemini to assist with the renderfast() function
    renderfast() {
        var rgba = this.color;
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        var allverts = [];
      
        // front face (triangle 1)
        // allverts = allverts.concat([0, 0, 0, 1, 0, 0, 0, 1, 0]);
        // // front face (triangle 2)
        // allverts = allverts.concat([0, 0, 0, 1, 1, 0, 1, 0, 0]);
      
        // // back face (triangle 1)
        // allverts = allverts.concat([1, 0, 1, 0, 0, 1, 0, 1, 1]);
        // // back face (triangle 2)
        // allverts = allverts.concat([0, 0, 1, 0, 1, 1, 1, 1, 1]);
      
        // // top face (triangle 1)
        // allverts = allverts.concat([0, 1, 0, 1, 1, 0, 1, 1, 1]);
        // // top face (triangle 2)
        // allverts = allverts.concat([0, 1, 0, 0, 1, 1, 1, 1, 1]);
      
        // // bottom face (triangle 1)
        // allverts = allverts.concat([0, 0, 0, 1, 0, 0, 1, 0, 1]);
        // // bottom face (triangle 2)
        // allverts = allverts.concat([0, 0, 0, 0, 0, 1, 1, 0, 1]);
      
        // // right face (triangle 1)
        // allverts = allverts.concat([1, 0, 0, 1, 1, 0, 1, 1, 1]);
        // // right face (triangle 2)
        // allverts = allverts.concat([1, 0, 0, 1, 0, 1, 1, 1, 1]);
      
        // // left face (triangle 1)
        // allverts = allverts.concat([0, 0, 0, 0, 1, 0, 0, 1, 1]);
        // // left face (triangle 2)
        // allverts = allverts.concat([0, 0, 0, 0, 0, 1, 0, 1, 1]);
        // Assuming you have an array to store all cube vertices
        var allverts = [];

        // Front face (counter-clockwise order)
        allverts = allverts.concat([0, 0, 0,  // bottom-left
                                    1, 0, 0,  // bottom-right
                                    1, 1, 0]); // top-right

        // Front face (continued, second triangle)
        allverts = allverts.concat([0, 0, 0,  // bottom-left
                                    1, 1, 0,  // top-right
                                    0, 1, 0]); // top-left 

        // Back face (counter-clockwise order)
        allverts = allverts.concat([1, 0, 1,  // bottom-left
                                    0, 0, 1,  // bottom-right
                                    0, 1, 1]); // top-right

        // Back face (continued, second triangle)
        allverts = allverts.concat([1, 0, 1,  // bottom-left
                                    0, 1, 1,  // top-right
                                    1, 1, 1]); // top-left 

        // Top face (counter-clockwise order)
        allverts = allverts.concat([0, 1, 0,  // bottom-left
                                    1, 1, 0,  // bottom-right
                                    1, 1, 1]); // top-right

        // Top face (continued, second triangle)
        allverts = allverts.concat([0, 1, 0,  // bottom-left
                                    1, 1, 1,  // top-right
                                    0, 1, 1]); // top-left 

        // Bottom face (counter-clockwise order)
        allverts = allverts.concat([0, 0, 0,  // bottom-left
                                    1, 0, 0,  // bottom-right
                                    1, 0, 1]); // top-right

        // Bottom face (continued, second triangle)
        allverts = allverts.concat([0, 0, 0,  // bottom-left
                                    1, 0, 1,  // top-right
                                    0, 0, 1]); // top-left 

        // Right face (counter-clockwise order)
        allverts = allverts.concat([1, 0, 0,  // bottom-left
                                    1, 1, 0,  // bottom-right
                                    1, 1, 1]); // top-right

        // Right face (continued, second triangle)
        allverts = allverts.concat([1, 0, 0,  // bottom-left
                                    1, 1, 1,  // top-right
                                    1, 0, 1]); // top-left 

        // Left face (counter-clockwise order)
        allverts = allverts.concat([0, 0, 0,  // bottom-left
                                    0, 1, 0,  // bottom-right
                                    0, 1, 1]); // top-right

        // Left face (continued, second triangle)
        allverts = allverts.concat([0, 0, 0,  // bottom-left
                                    0, 1, 1,  // top-right
                                    0, 0, 1]); // top-left 

        // Assuming you have a function to bind and draw attributes and buffers
        // drawTriangle3D(allverts);
        for (var i = 0; i < allverts.length; i += 9) {
            drawTriangle3D(allverts.slice(i, i + 9));
          }
      }
      
    drawCube(M, color) {
        // Set the color uniform variable
        gl.uniform4fv(u_FragColor, color);

        // Set the model matrix uniform variable
        gl.uniformMatrix4fv(u_ModelMatrix, false, M.elements);

        // Draw the cube
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);    
        
        // Change lighting using uniform4f

         // Draw front face
        drawTriangle3D([0, 0, 0, 1, 1, 0, 1, 0, 0]);
        drawTriangle3D([0, 0, 0, 0, 1, 0, 1, 1, 0]);

        // Draw top face
        gl.uniform4f(u_FragColor, color[0]* 0.9, color[1]* 0.9, color[2]* 0.9, color[3]);
        drawTriangle3D([0, 1, 0, 1, 1, 0, 1, 1, 1]);
        drawTriangle3D([0, 1, 0, 0, 1, 1, 1, 1, 1]);

        // Draw left face
        gl.uniform4f(u_FragColor, color[0]* 0.8, color[1]* 0.8, color[2]* 0.8, color[3]);
        drawTriangle3D([0, 0, 0, 0, 1, 0, 0, 1, 1]);
        drawTriangle3D([0, 0, 0, 0, 0, 1, 0, 1, 1]);

        // Draw right face
        gl.uniform4f(u_FragColor, color[0]* 0.7, color[1]* 0.7, color[2]* 0.7, color[3]);

        drawTriangle3D([1, 0, 0, 1, 1, 0, 1, 1, 1]);
        drawTriangle3D([1, 0, 0, 1, 0, 1, 1, 1, 1]);

        // Draw bottom face
        gl.uniform4f(u_FragColor, color[0]* 0.6, color[1]* 0.6, color[2]* 0.6, color[3]);

        drawTriangle3D([0, 0, 0, 1, 0, 0, 1, 0, 1]);
        drawTriangle3D([0, 0, 0, 0, 0, 1, 1, 0, 1]);

        // Draw back face
        gl.uniform4f(u_FragColor, color[0]* 0.5, color[1]* 0.5, color[2]* 0.5, color[3]);

        drawTriangle3D([0, 0, 1, 1, 1, 1, 1, 0, 1]);
        drawTriangle3D([0, 0, 1, 0, 1, 1, 1, 1, 1]);
    }
}