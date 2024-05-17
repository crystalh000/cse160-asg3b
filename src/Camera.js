// // used Github Copilot (based on ChatGPT) to generate the following:
// class Camera {
//     constructor() {
//         //this.fov = 60;
//         this.eye = new Vector3(0, 0, 3);
//         this.at = new Vector3(0, 0, -100);
//         this.up = new Vector3(0, 1, 0);
//         // this.viewMatrix = new Matrix4().setLookAt(g_camera.eye.elements[0], g_camera.eye.elements[1], g_camera.eye.elements[2], g_camera.at.elements[0], g_camera.at.elements[1], g_camera.at.elements[2], g_camera.up.elements[0], g_camera.up.elements[1], g_camera.up.elements[2]);
//         // this.projectionMatrix = new Matrix4().setPerspective(this.fov, canvas.width / canvas.height, 0.1, 1000);
//         // this.viewMatrix = new Matrix4().setLookAt(this.eye.elements[0], this.eye.elements[1], this.eye.elements[2], this.at.elements[0], this.at.elements[1], this.at.elements[2], this.up.elements[0], this.up.elements[1], this.up.elements[2]);

//     }

//     forward() {
//         var f = this.at.subtract(this.eye);
//         f = f.divide(f.length());
//         this.at = this.at.add(f);
//         this.eye = this.eye.add(f);
//     }

//     back() {
//         var f = this.eye.subtract(this.at);
//         f = f.divide(f.length());
//         this.at = this.at.add(f);
//         this.eye = this.eye.add(f);
//     }

//     left() {
//         var f = this.eye.subtract(this.at);
//         f = f.divide(f.length());
//         var s = f.cross(this.up);
//         s = s.divide(s.length());
//         this.at = this.at.add(s);
//         this.eye = this.eye.add(s);
//     }

//     right() {
//         var f = this.eye.subtract(this.at);
//         f = f.divide(f.length());
//         var s = f.cross(this.up);
//         s = s.divide(s.length());
//         this.at = this.at.subtract(s);
//         this.eye = this.eye.subtract(s);
//     }

//     // updateViewMatrix() {
//     //     this.viewMatrix.setLookAt(this.eye.elements[0], this.eye.elements[1], this.eye.elements[2], this.at.elements[0], this.at.elements[1], this.at.elements[2], this.up.elements[0], this.up.elements[1], this.up.elements[2]);
//     // }
// // }
// class Camera {
//     constructor(canvas) {
//         if (!canvas) {
//             throw new Error("Canvas element must be provided to Camera constructor");
//         }
//         this.canvas = canvas;
//         this.eye = new Vector3([0, 0, 5]);
//         this.at = new Vector3([0, 0, -100]);
//         this.up = new Vector3([0, 1, 0]);
//         this.projectionMatrix = new Matrix4();
//         this.viewMatrix = new Matrix4();
//         this.projectionMatrix.setPerspective(50, this.canvas.width / this.canvas.height, 1, 100);
//         this.updateViewMatrix();
//     }

//     updateViewMatrix() {
//         this.viewMatrix.setLookAt(this.eye.elements[0], this.eye.elements[1], this.eye.elements[2], 
//                                   this.at.elements[0], this.at.elements[1], this.at.elements[2], 
//                                   this.up.elements[0], this.up.elements[1], this.up.elements[2]);
//     }

//     moveForward(distance) {
//         let forward = new Vector3();
//         forward.set(this.at).sub(this.eye).normalize().mul(distance);
//         this.eye.add(forward);
//         this.at.add(forward);
//         this.updateViewMatrix();
//     }

//     moveBackwards(distance) {
//         this.moveForward(-distance);
//     }

//     moveLeft(distance) {
//         let left = new Vector3();
//         left.set(this.at).sub(this.eye).normalize();
//         left.cross(this.up).normalize().mul(-distance);
//         this.eye.add(left);
//         this.at.add(left);
//         this.updateViewMatrix();
//     }

//     moveRight(distance) {
//         this.moveLeft(-distance);
//     }

//     panLeft(angle) {
//         let rad = Math.PI * angle / 180;
//         this.rotateAroundUpVector(rad);
//     }

//     panRight(angle) {
//         this.panLeft(-angle);
//     }

//     rotateAroundUpVector(rad) {
//         let forward = new Vector3();
//         forward.set(this.at).sub(this.eye).normalize();
//         let right = new Vector3();
//         right.set(forward).cross(this.up).normalize().mul(Math.sin(rad));
//         let newForward = new Vector3();
//         newForward.set(forward).mul(Math.cos(rad)).add(right).normalize();
//         this.at.set(this.eye).add(newForward);
//         this.updateViewMatrix();
//     }
// }
class Camera {
    constructor(canvas) {
        if (!canvas) {
            throw new Error("Canvas element must be provided to Camera constructor");
        }
        this.canvas = canvas;
        this.eye = new Vector3([0, 0, 5]);
        this.at = new Vector3([0, 0, -100]);
        this.up = new Vector3([0, 1, 0]);
        this.projectionMatrix = new Matrix4();
        this.viewMatrix = new Matrix4();
        this.projectionMatrix.setPerspective(50, this.canvas.width / this.canvas.height, 1, 100);
        this.updateViewMatrix();
    }

    updateViewMatrix() {
        this.viewMatrix.setLookAt(this.eye.elements[0], this.eye.elements[1], this.eye.elements[2], 
                                  this.at.elements[0], this.at.elements[1], this.at.elements[2], 
                                  this.up.elements[0], this.up.elements[1], this.up.elements[2]);
    }
    moveForward(distance) {
        let forward = new Vector3();
        forward.set(this.at).sub(this.eye).normalize().mul(distance);
        this.eye.add(forward);
        this.at.add(forward);
        this.updateViewMatrix();
    }

    moveBackwards(distance) {
        this.moveForward(-distance);
    }

    moveLeft(distance) {
        let forward = new Vector3();
        forward.set(this.at).sub(this.eye).normalize();
        let left = Vector3.cross(this.up, forward); // Use the static cross function
        left.normalize();
        left.mul(distance);
        this.eye.add(left);
        this.at.add(left);
        this.updateViewMatrix();
    }

    // moveRight(distance) {
    //     let forward = new Vector3();
    //     forward.set(this.at).sub(this.eye).normalize();
    //     let right = Vector3.cross(this.up, forward); // Use the static cross function
    //     right.normalize();
    //     right.mul(distance);
    //     this.eye.add(right);
    //     this.at.add(right);
    //     this.updateViewMatrix();
    // }
    moveRight(distance) {
        let forward = new Vector3();
        forward.set(this.at).sub(this.eye).normalize();
        let right = Vector3.cross(forward, this.up); // Reverse the order of the cross product
        right.normalize();
        right.mul(distance);
        this.eye.add(right);
        this.at.add(right);
        this.updateViewMatrix();
    }

    panLeft(angle) {
        let forward = new Vector3();
        forward.set(this.at).sub(this.eye).normalize();
        let rotation = new Matrix4().setRotate(angle, this.up.elements[0], this.up.elements[1], this.up.elements[2]);
        let newForward = rotation.multiplyVector3(forward);
        this.at.set(this.eye).add(newForward);
        this.updateViewMatrix();
    }
    
    panRight(angle) {
        this.panLeft(-angle);
    }

    rotateAroundUpVector(rad) {
        let forward = new Vector3();
        forward.set(this.at).sub(this.eye).normalize();
        let right = new Vector3();
        right.set(forward).cross(this.up).normalize().mul(Math.sin(rad));
        let newForward = new Vector3();
        newForward.set(forward).mul(Math.cos(rad)).add(right).normalize();
        this.at.set(this.eye).add(newForward);
        this.updateViewMatrix();
    }
}
