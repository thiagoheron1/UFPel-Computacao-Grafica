

class Utils {
    constructor() {
        let MatType = Float32Array;
        this.m4 = {

            projection: function (width, height, depth) {
                // Note: This matrix flips the Y axis so 0 is at the top.
                //console.log("[projection] > Starting...");
                return [
                    2 / width, 0, 0, 0,
                    0, -2 / height, 0, 0,
                    0, 0, 2 / depth, 0,
                    -1, 1, 0, 1,
                ];
            },

            multiply: function (a, b) {
                //console.log("[multiply] > Starting...");
                var a00 = a[0 * 4 + 0];
                var a01 = a[0 * 4 + 1];
                var a02 = a[0 * 4 + 2];
                var a03 = a[0 * 4 + 3];
                var a10 = a[1 * 4 + 0];
                var a11 = a[1 * 4 + 1];
                var a12 = a[1 * 4 + 2];
                var a13 = a[1 * 4 + 3];
                var a20 = a[2 * 4 + 0];
                var a21 = a[2 * 4 + 1];
                var a22 = a[2 * 4 + 2];
                var a23 = a[2 * 4 + 3];
                var a30 = a[3 * 4 + 0];
                var a31 = a[3 * 4 + 1];
                var a32 = a[3 * 4 + 2];
                var a33 = a[3 * 4 + 3];
                var b00 = b[0 * 4 + 0];
                var b01 = b[0 * 4 + 1];
                var b02 = b[0 * 4 + 2];
                var b03 = b[0 * 4 + 3];
                var b10 = b[1 * 4 + 0];
                var b11 = b[1 * 4 + 1];
                var b12 = b[1 * 4 + 2];
                var b13 = b[1 * 4 + 3];
                var b20 = b[2 * 4 + 0];
                var b21 = b[2 * 4 + 1];
                var b22 = b[2 * 4 + 2];
                var b23 = b[2 * 4 + 3];
                var b30 = b[3 * 4 + 0];
                var b31 = b[3 * 4 + 1];
                var b32 = b[3 * 4 + 2];
                var b33 = b[3 * 4 + 3];
                return [
                    b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
                    b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
                    b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
                    b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
                    b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
                    b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
                    b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
                    b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
                    b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
                    b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
                    b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
                    b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
                    b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
                    b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
                    b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
                    b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
                ];
            },

            translation: function (tx, ty, tz) {
                //console.log("[translation] > Starting...");
                return [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    tx, ty, tz, 1,
                ];
            },

            xRotation: function (angleInRadians) {
                //console.log("[xRotation] > Starting...");
                var c = Math.cos(angleInRadians);
                var s = Math.sin(angleInRadians);

                return [
                    1, 0, 0, 0,
                    0, c, -s, 0,
                    0, s, c, 0,
                    0, 0, 0, 1,
                ];
            },

            yRotation: function (angleInRadians) {
                //console.log("[yRotation] > Starting...");
                var c = Math.cos(angleInRadians);
                var s = Math.sin(angleInRadians);

                return [
                    c, 0, s, 0,
                    0, 1, 0, 0,
                    -s, 0, c, 0,
                    0, 0, 0, 1,
                ];
            },

            zRotation: function (angleInRadians) {
                //console.log("[zRotation] > Starting...");
                var c = Math.cos(angleInRadians);
                var s = Math.sin(angleInRadians);

                return [
                    c, -s, 0, 0,
                    s, c, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1,
                ];
            },

            scaling: function (sx, sy, sz) {
                //console.log("[scalling] > Starting...");
                return [
                    sx, 0, 0, 0,
                    0, sy, 0, 0,
                    0, 0, sz, 0,
                    0, 0, 0, 1,
                ];
            },

            translate: function (m, tx, ty, tz) {
                //console.log("[translate] > Starting...");
                return this.multiply(m, this.translation(tx, ty, tz));
            },

            xRotate: function (m, angleInRadians) {
                //console.log("[xRotate] > Starting...");
                return this.multiply(m, this.xRotation(angleInRadians));
            },

            yRotate: function (m, angleInRadians) {
                //console.log("[yRotate] > Starting...");
                return this.multiply(m, this.yRotation(angleInRadians));
            },

            zRotate: function (m, angleInRadians) {
                //console.log("[zRotate] > Starting...");
                return this.multiply(m, this.zRotation(angleInRadians));
            },

            scale: function (m, sx, sy, sz) {
                //console.log("[scale] > Starting...");
                return this.multiply(m, this.scaling(sx, sy, sz));
            },

            perspective: function (fieldOfViewInRadians, aspect, near, far, dst) {
                dst = dst || new MatType(16);
                var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
                var rangeInv = 1.0 / (near - far);

                dst[0] = f / aspect;
                dst[1] = 0;
                dst[2] = 0;
                dst[3] = 0;
                dst[4] = 0;
                dst[5] = f;
                dst[6] = 0;
                dst[7] = 0;
                dst[8] = 0;
                dst[9] = 0;
                dst[10] = (near + far) * rangeInv;
                dst[11] = -1;
                dst[12] = 0;
                dst[13] = 0;
                dst[14] = near * far * rangeInv * 2;
                dst[15] = 0;

                return dst;
            },

            inverse: function (m) {
                var m00 = m[0 * 4 + 0];
                var m01 = m[0 * 4 + 1];
                var m02 = m[0 * 4 + 2];
                var m03 = m[0 * 4 + 3];
                var m10 = m[1 * 4 + 0];
                var m11 = m[1 * 4 + 1];
                var m12 = m[1 * 4 + 2];
                var m13 = m[1 * 4 + 3];
                var m20 = m[2 * 4 + 0];
                var m21 = m[2 * 4 + 1];
                var m22 = m[2 * 4 + 2];
                var m23 = m[2 * 4 + 3];
                var m30 = m[3 * 4 + 0];
                var m31 = m[3 * 4 + 1];
                var m32 = m[3 * 4 + 2];
                var m33 = m[3 * 4 + 3];
                var tmp_0 = m22 * m33;
                var tmp_1 = m32 * m23;
                var tmp_2 = m12 * m33;
                var tmp_3 = m32 * m13;
                var tmp_4 = m12 * m23;
                var tmp_5 = m22 * m13;
                var tmp_6 = m02 * m33;
                var tmp_7 = m32 * m03;
                var tmp_8 = m02 * m23;
                var tmp_9 = m22 * m03;
                var tmp_10 = m02 * m13;
                var tmp_11 = m12 * m03;
                var tmp_12 = m20 * m31;
                var tmp_13 = m30 * m21;
                var tmp_14 = m10 * m31;
                var tmp_15 = m30 * m11;
                var tmp_16 = m10 * m21;
                var tmp_17 = m20 * m11;
                var tmp_18 = m00 * m31;
                var tmp_19 = m30 * m01;
                var tmp_20 = m00 * m21;
                var tmp_21 = m20 * m01;
                var tmp_22 = m00 * m11;
                var tmp_23 = m10 * m01;

                var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
                    (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
                var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
                    (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
                var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
                    (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
                var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
                    (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

                var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

                return [
                    d * t0,
                    d * t1,
                    d * t2,
                    d * t3,
                    d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
                        (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
                    d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
                        (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
                    d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
                        (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
                    d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
                        (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),
                    d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
                        (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
                    d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
                        (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
                    d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
                        (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
                    d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
                        (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),
                    d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
                        (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
                    d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
                        (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
                    d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
                        (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
                    d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
                        (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02)),
                ];
            },

            cross: function (a, b) {
                return [
                    a[1] * b[2] - a[2] * b[1],
                    a[2] * b[0] - a[0] * b[2],
                    a[0] * b[1] - a[1] * b[0],
                ];
            },

            subtractVectors: function (a, b) {
                return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
            },

            normalize: function (v) {
                var length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
                // make sure we don't divide by 0.
                if (length > 0.00001) {
                    return [v[0] / length, v[1] / length, v[2] / length];
                } else {
                    return [0, 0, 0];
                }
            },

            lookAt: function (cameraPosition, target, up, m4) {
                var zAxis = m4.normalize(m4.subtractVectors(cameraPosition, target));
                var xAxis = m4.normalize(m4.cross(up, zAxis));
                var yAxis = m4.normalize(m4.cross(zAxis, xAxis));

                return [
                    xAxis[0], xAxis[1], xAxis[2], 0,
                    yAxis[0], yAxis[1], yAxis[2], 0,
                    zAxis[0], zAxis[1], zAxis[2], 0,
                    cameraPosition[0],
                    cameraPosition[1],
                    cameraPosition[2],
                    1,
                ];
            },

            transformVector: function (m, v) {
                var dst = [];
                for (var i = 0; i < 4; ++i) {
                    dst[i] = 0.0;
                    for (var j = 0; j < 4; ++j) {
                        dst[i] += v[j] * m[j * 4 + i];
                    }
                }
                return dst;
            },
        }
    }
    radToDeg(r) {
        return r * 180 / Math.PI;
    }

    degToRad(d) {
        return d * Math.PI / 180;
    }

    ruleOfThree(maxValue, maxPercentage, minValue) {
        return (minValue * maxPercentage) / maxValue;
    }
};


class ObjectF {
    constructor(x = 0, y = 0, z = 0) {

        this.matrix = [];
        this.translation = [x, y, z];
        this.rotation = [utils.degToRad(0), utils.degToRad(180), utils.degToRad(0)];
        this.scale = [-1, 1, 1];
        this.color = [Math.random(), Math.random(), Math.random(), 1];

    }
};


class Camera {
    constructor(width, height, depth) {

        this.canvasWidth = width;
        this.canvasHeight = height;
        this.canvasDepth = depth;

        this.aspect = this.canvasWidth / this.canvasHeight;
        this.zNear = 0;
        this.zFar = 2000;
        this.target = [0, 0, 0];
        this.up = [0, 1, 0];

        this.positionCamera = [0, 0, -200];
        this.zoom = 100;

        this.perspectiveCamera = [0, 0, -200];
        this.xRotation = utils.degToRad(0);
        this.yRotation = utils.degToRad(0);
        this.zRotation = utils.degToRad(180)

    }

    selectCamera(typeCamera) {
        if (typeCamera == "projection") {
            return this.createCameraProjection();
        } else if (typeCamera == "perspective") {
            return this.createCameraPerspective();
        } else if (typeCamera == "lookAt") {
            return this.createCameraLookAt();
        } else if (typeCamera == "followObject") {
            console.log("Camera FollowObject");
        } else {
            console.log("Undefined Camera");
        }
    }

    createCameraProjection() {
        console.log("[Camera][Projection] > Running...");
        return utils.m4.projection(this.canvasWidth, this.canvasHeight, this.canvasDepth);
    }

    createCameraPerspective() {

        var cameraMatrix = utils.m4.lookAt(this.perspectiveCamera, this.target, this.up, utils.m4);

        this.worldMatrix = utils.m4.zRotation(this.zRotation);
        this.worldMatrix = utils.m4.xRotate(this.worldMatrix, this.xRotation);
        this.worldMatrix = utils.m4.yRotate(this.worldMatrix, this.yRotation);

        this.worldMatrix = utils.m4.translate(this.worldMatrix, -300, -180, 200);
        this.worldMatrix = utils.m4.translate(this.worldMatrix, -this.positionCamera[0], this.positionCamera[1], -this.positionCamera[2]);

        let matrix = []
        var viewMatrix = utils.m4.inverse(cameraMatrix);
        this.fieldOfViewsPerspective = utils.degToRad(this.zoom);
        let perspectiveMatrix = utils.m4.perspective(this.fieldOfViewsPerspective, this.aspect, this.zNear, this.zFar);
        matrix = utils.m4.multiply(perspectiveMatrix, viewMatrix);
        matrix = utils.m4.multiply(matrix, this.worldMatrix);
        return matrix;
    }

    createCameraLookAt() {
        var lookAtCamera = [this.positionCamera[0], this.positionCamera[1], this.positionCamera[2]]
        var cameraMatrix = utils.m4.lookAt(lookAtCamera, this.target, this.up, utils.m4);

        this.worldMatrix = utils.m4.zRotation(this.zRotation);
        this.worldMatrix = utils.m4.xRotate(this.worldMatrix, this.xRotation);
        this.worldMatrix = utils.m4.yRotate(this.worldMatrix, this.yRotation);
        this.worldMatrix = utils.m4.translate(this.worldMatrix, -300, -180, 0);

        let matrix = []
        var viewMatrix = utils.m4.inverse(cameraMatrix);
        this.fieldOfViewsPerspective = utils.degToRad(this.zoom);
        let perspectiveMatrix = utils.m4.perspective(this.fieldOfViewsPerspective, this.aspect, this.zNear, this.zFar);
        matrix = utils.m4.multiply(perspectiveMatrix, viewMatrix);
        matrix = utils.m4.multiply(matrix, this.worldMatrix);
        return matrix;

    }

    updateCameraPosition(index, webGL) {
        //console.log("[WebGL][updatePosition] > Running...");
        return function (event, ui) {
            webGL.camera.positionCamera[index] = ui.value;
            webGL.drawScene();
        };
    }

    updateCameraZoom(webGL) {
        //console.log("[WebGL][updatePosition] > Running...");
        return function (event, ui) {
            webGL.camera.zoom = ui.value;
            webGL.drawScene();
        };
    }

    updateRotationX(webGL) {
        //console.log("[WebGL][updatePosition] > Running...");
        return function (event, ui) {
            webGL.camera.xRotation = utils.degToRad(ui.value);
            webGL.drawScene();

        };
    }

    updateRotationY(webGL) {
        //console.log("[WebGL][updatePosition] > Running...");
        return function (event, ui) {
            webGL.camera.yRotation = utils.degToRad(ui.value);
            webGL.drawScene();

        };
    }

    updateRotationZ(webGL) {
        //console.log("[WebGL][updatePosition] > Running...");
        return function (event, ui) {
            webGL.camera.zRotation = utils.degToRad(ui.value);
            webGL.drawScene();

        };
    }

    updateBezierQuadratic(webGL) {
        var points = [
            {
                "x": webGL.camera.positionCamera[0],
                "y": webGL.camera.positionCamera[1],
            },
            {
                "x": 150,
                "y": 150,
            },
            {
                "x": 300,
                "y": 0,
            },
        ];

        return function (event, ui) {
            
    
            var T = ui.value;
            webGL.camera.positionCamera[0] = -((1.0 - T) * (1.0 - T) * points[0].x + 2.0 * (1.0 - T) * T * points[1].x + T * T * points[2].x);
            webGL.camera.positionCamera[1] = -((1.0 - T) * (1.0 - T) * points[0].y + 2.0 * (1.0 - T) * T * points[1].y + T * T * points[2].y);         
            webGL.drawScene();

        };
    }

}


class WebGL {
    constructor() {
        this.gl = this.connectWebGL();

        // Source
        this.vertexShaderSource = `#version 300 es

        in vec4 a_position;
        in vec4 a_color;
        
        uniform mat4 u_matrix;
        
        out vec4 v_color;
        
        void main() {
        
          gl_Position = u_matrix * a_position;
        
        
          v_color = a_color;
        }`
        this.fragmentShaderSource = `#version 300 es

        precision highp float;
        
        in vec4 v_color;
        out vec4 outColor;
        
        void main() {
          outColor = v_color;
        }
        `;

        // Shaders
        this.vertexShader = this.createShader(this.gl.VERTEX_SHADER, this.vertexShaderSource);
        this.fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, this.fragmentShaderSource);
        this.program = this.createProgram(this.vertexShader, this.fragmentShader)

        // Attributes and Uniforms
        this.positionAttributeLocation = this.gl.getAttribLocation(this.program, "a_position");
        this.colorAttributeLocation = this.gl.getAttribLocation(this.program, "a_color");
        this.matrixLocation = this.gl.getUniformLocation(this.program, "u_matrix");
        this.colorLocation = this.gl.getUniformLocation(this.program, "u_color");
        this.positionBuffer = this.gl.createBuffer();

        // Binds
        this.vao = this.createVertexArrayObject();
        this.setGeometry();
        this.setColors();


        // Objects and Commands
        this.listObjects = [new ObjectF(180, 180, 0)];
        this.indexObject = 0;
        this.listCommands = [];
        this.runCommand = 0;

        // Camera
        this.camera = new Camera(this.gl.canvas.clientWidth, this.gl.canvas.clientHeight, 400);
        this.currentCamera = "projection"

        // runAllCommands
        this.drawScene();
    }

    // WebGL - Configurations
    connectWebGL() {
        /** @type {HTMLCanvasElement} */
        //console.log("[WebGL][connectWebGL] > Running...");
        var canvas = document.querySelector("#canvas");
        var gl = canvas.getContext("webgl2");
        if (!gl) {
            return;
        }
        return gl;
    }

    createShader(type, source) {
        //console.log("[WebGL][createShader] > Running...");

        var shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        var success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
        if (success) {
            //console.log("[WebGL][createShader][" + type + "] > Success!");
            return shader;
        }

        //console.log(this.gl.getShaderInfoLog(shader));
        this.gl.deleteShader(shader);
    }

    createProgram(vertexShader, fragmentShader) {
        //console.log("[WebGL][createProgram] > Running...");
        var program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
        var success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
        if (success) {
            //console.log("[createProgram] > Success!");
            return program;
        }
    }

    createVertexArrayObject() {
        //console.log("[WebGL][createVertexArrayObject] > Running...");
        var vao = this.gl.createVertexArray();
        this.gl.bindVertexArray(vao);
        return vao
    }

    setGeometry() {
        //console.log("[WebGL][setGeometry] > Running...");
        var positionBuffer = this.gl.createBuffer();
        this.gl.enableVertexAttribArray(this.positionAttributeLocation);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        this.gl.bufferData(
            this.gl.ARRAY_BUFFER,
            new Float32Array([

                0, 0, 0,
                30, 0, 0,
                0, 150, 0,
                0, 150, 0,
                30, 0, 0,
                30, 150, 0,


                30, 0, 0,
                100, 0, 0,
                30, 30, 0,
                30, 30, 0,
                100, 0, 0,
                100, 30, 0,


                30, 60, 0,
                67, 60, 0,
                30, 90, 0,
                30, 90, 0,
                67, 60, 0,
                67, 90, 0,


                0, 0, 30,
                30, 0, 30,
                0, 150, 30,
                0, 150, 30,
                30, 0, 30,
                30, 150, 30,


                30, 0, 30,
                100, 0, 30,
                30, 30, 30,
                30, 30, 30,
                100, 0, 30,
                100, 30, 30,


                30, 60, 30,
                67, 60, 30,
                30, 90, 30,
                30, 90, 30,
                67, 60, 30,
                67, 90, 30,


                0, 0, 0,
                100, 0, 0,
                100, 0, 30,
                0, 0, 0,
                100, 0, 30,
                0, 0, 30,


                100, 0, 0,
                100, 30, 0,
                100, 30, 30,
                100, 0, 0,
                100, 30, 30,
                100, 0, 30,


                30, 30, 0,
                30, 30, 30,
                100, 30, 30,
                30, 30, 0,
                100, 30, 30,
                100, 30, 0,


                30, 30, 0,
                30, 30, 30,
                30, 60, 30,
                30, 30, 0,
                30, 60, 30,
                30, 60, 0,


                30, 60, 0,
                30, 60, 30,
                67, 60, 30,
                30, 60, 0,
                67, 60, 30,
                67, 60, 0,


                67, 60, 0,
                67, 60, 30,
                67, 90, 30,
                67, 60, 0,
                67, 90, 30,
                67, 90, 0,


                30, 90, 0,
                30, 90, 30,
                67, 90, 30,
                30, 90, 0,
                67, 90, 30,
                67, 90, 0,


                30, 90, 0,
                30, 90, 30,
                30, 150, 30,
                30, 90, 0,
                30, 150, 30,
                30, 150, 0,


                0, 150, 0,
                0, 150, 30,
                30, 150, 30,
                0, 150, 0,
                30, 150, 30,
                30, 150, 0,


                0, 0, 0,
                0, 0, 30,
                0, 150, 30,
                0, 0, 0,
                0, 150, 30,
                0, 150, 0,
            ]),
            this.gl.STATIC_DRAW);

        var size = 3;
        var type = this.gl.FLOAT;
        var normalize = false;
        var stride = 0;
        var offset = 0;
        this.gl.vertexAttribPointer(this.positionAttributeLocation, size, type, normalize, stride, offset);


        //console.log("[setGeometry] > Success!");
    }

    setColors() {
        var colorBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
        this.gl.bufferData(
            this.gl.ARRAY_BUFFER,
            new Uint8Array([

                200, 70, 120,
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,


                200, 70, 120,
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,


                200, 70, 120,
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,
                200, 70, 120,


                80, 70, 200,
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,


                80, 70, 200,
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,


                80, 70, 200,
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,
                80, 70, 200,


                70, 200, 210,
                70, 200, 210,
                70, 200, 210,
                70, 200, 210,
                70, 200, 210,
                70, 200, 210,


                200, 200, 70,
                200, 200, 70,
                200, 200, 70,
                200, 200, 70,
                200, 200, 70,
                200, 200, 70,


                210, 100, 70,
                210, 100, 70,
                210, 100, 70,
                210, 100, 70,
                210, 100, 70,
                210, 100, 70,


                210, 160, 70,
                210, 160, 70,
                210, 160, 70,
                210, 160, 70,
                210, 160, 70,
                210, 160, 70,


                70, 180, 210,
                70, 180, 210,
                70, 180, 210,
                70, 180, 210,
                70, 180, 210,
                70, 180, 210,


                100, 70, 210,
                100, 70, 210,
                100, 70, 210,
                100, 70, 210,
                100, 70, 210,
                100, 70, 210,


                76, 210, 100,
                76, 210, 100,
                76, 210, 100,
                76, 210, 100,
                76, 210, 100,
                76, 210, 100,


                140, 210, 80,
                140, 210, 80,
                140, 210, 80,
                140, 210, 80,
                140, 210, 80,
                140, 210, 80,


                90, 130, 110,
                90, 130, 110,
                90, 130, 110,
                90, 130, 110,
                90, 130, 110,
                90, 130, 110,


                160, 160, 220,
                160, 160, 220,
                160, 160, 220,
                160, 160, 220,
                160, 160, 220,
                160, 160, 220,
            ]),
            this.gl.STATIC_DRAW);

        this.gl.enableVertexAttribArray(this.colorAttributeLocation);
        var size = 3;
        var type = this.gl.UNSIGNED_BYTE;
        var normalize = true;
        var stride = 0;
        var offset = 0;
        this.gl.vertexAttribPointer(this.colorAttributeLocation, size, type, normalize, stride, offset);

    }


    // WebGL - Draw Scenes
    drawScene() {

        this.setSettingsToDraw();

        for (let index = 0; index < this.listObjects.length; index++) {
            let object = this.getObject(index);
            this.calculateMatrix(object);
            this.drawColorAndMatrix(object);
        }
    }

    setSettingsToDraw() {
        //console.log("[WebGL][drawFirstScene] > Running Settings...");
        webglUtils.resizeCanvasToDisplaySize(this.gl.canvas);

        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        this.gl.useProgram(this.program);

        this.gl.bindVertexArray(this.vao);

    }

    getObject(index) {
        //console.log("[WebGL][getObject] > Running...");
        return this.listObjects[index];
    }

    calculateMatrix(object) {
        //console.log("[WebGL][calculateMatrix] > Running Matrix...");

        let X = 0;
        let Y = 1;
        let Z = 2;

        object.matrix = this.camera.selectCamera(this.currentCamera);
        object.matrix = utils.m4.translate(object.matrix, object.translation[X], object.translation[Y], object.translation[Z]);
        object.matrix = utils.m4.xRotate(object.matrix, object.rotation[X]);
        object.matrix = utils.m4.yRotate(object.matrix, object.rotation[Y]);
        object.matrix = utils.m4.zRotate(object.matrix, object.rotation[Z]);
        object.matrix = utils.m4.scale(object.matrix, object.scale[X], object.scale[Y], object.scale[Z]);
    }

    drawColorAndMatrix(object) {
        //console.log("[WebGL][drawScene][drawColorAndMatrix] > Running Draw...");
        this.gl.uniform4fv(this.colorLocation, object.color);
        this.gl.uniformMatrix4fv(this.matrixLocation, false, object.matrix);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 16 * 6);
    }

};


class Interface {
    constructor(objWebGL) {
        this.webGL = objWebGL;
        this.indexInterface = 1;
    }


    // Buttons Add Object
    buttonAddObject() {
        //console.log("[Interface][buttonAddObject]");

        // Add Object to WebGL

        do {
            var x = Math.floor(Math.random() * Number(objWebGL.gl.canvas.clientWidth));
        } while (x < 150 || x > Math.random() * Number(objWebGL.gl.canvas.clientWidth + 150));
        do {
            var y = Math.floor(Math.random() * Number(objWebGL.gl.canvas.clientHeight));
        } while (y < 150 || y > Math.random() * Number(objWebGL.gl.canvas.clientHeight + 150));

        var z = Math.floor(Math.random() * 800);
        console.log(x, y);
        this.webGL.listObjects.push(new ObjectF(x, y, z));
        this.webGL.drawScene();


        // Add Object to a Select Interface
        let selectObjectHTML = document.getElementById('selectObject');

        let option = document.createElement('option');
        this.indexInterface += 1;
        let name = "Object " + String(this.indexInterface);
        option.appendChild(document.createTextNode(name));
        option.value = "Object-" + String(this.webGL.listObjects.length)
        selectObjectHTML.appendChild(option);
    }

    buttonRemoveObject() {
        //console.log("[Interface][buttonRemoveObject]");

        // Get Current Selected
        let selectObjectHTML = document.getElementById("selectObject");
        let currentIndex = selectObjectHTML.selectedIndex;
        //console.log("Index:", currentIndex)

        // Remove Object from WebGL
        this.webGL.listObjects.splice(currentIndex, 1);
        this.webGL.drawScene();

        // Remove Object from Select Interface
        selectObjectHTML.remove(currentIndex);

    }

    // Buttons Add Commands
    buttonAddCommand() {
        //console.log("[Interface][buttonAddCommand]");

        // Create Command By Input
        let command = this.createCommand();

        // Add Command to Unique Object
        objWebGL.listCommands.push(command);

        // Add Command to a Select Interface
        let selectCommandHTML = document.getElementById('listCommands');
        let name = command["nameObject"] + " = " + command['type'][0].toUpperCase() + ", " + command['axisX1'] + ", " + command['axisY1'] + ", " + command['axisZ1'] + ", " + command['time'];

        let option = document.createElement('option');
        option.appendChild(document.createTextNode(name));
        option.value = listCommands.length;
        selectCommandHTML.appendChild(option);

        // Clear Inputs
        this.clearCommand();
    }

    buttonRunAllCommands() {
        //console.log("[Interface][runAllCommands] > Running...");
        //console.log(this.listCommands);

        requestAnimationFrame(animation);

    }

    buttonRunCommand() {
        let selectCommandsHTML = document.getElementById("listCommands");
        let commandIndex = selectCommandsHTML.selectedIndex;


        this.webGL.runCommand = commandIndex;
        console.log(this.webGL.runCommand)
        requestAnimationFrame(animationUnique);
    }

    buttonClearCommands() {
        // Clear List Commands of WebGL
        objWebGL.listCommands = [];

        // Clear Select Interface
        let selectCommandsHTML = document.getElementById("listCommands");
        console.log(selectCommandsHTML);

        var length = selectCommandsHTML.options.length;
        for (let i = length - 1; i >= 0; i--) {
            selectCommandsHTML.options[i] = null;
        }
    }

    buttonRemoveCommand() {

        // Get Index Selected
        let selectCommandsHTML = document.getElementById("listCommands");
        let currentIndex = selectCommandsHTML.selectedIndex;

        // Remove Selected Command
        objWebGL.listCommands.splice(currentIndex, 1);

        selectCommandsHTML.options[currentIndex] = null;


    }

    // Buttons Utils
    changeIndexObject() {
        //console.log("[Interface][changeIndexObject]");
        let selectObjectHTML = document.getElementById("selectObject");
        let currentIndex = selectObjectHTML.selectedIndex;

        // Seta o objeto atual pelo index.
        //console.log("index", currentIndex);
        return currentIndex;
    }

    createCommand() {
        //console.log("[Interface][createCommand] > Running...");
        let axisX1 = Number(document.getElementById('axisX1').value);
        let axisX2 = Number(document.getElementById('axisX2').value);
        let axisX3 = Number(document.getElementById('axisX3').value);

        let axisY1 = Number(document.getElementById('axisY1').value);
        let axisY2 = Number(document.getElementById('axisY2').value);
        let axisY3 = Number(document.getElementById('axisY3').value);

        let axisZ1 = Number(document.getElementById('axisZ1').value);
        let axisZ2 = Number(document.getElementById('axisZ2').value);
        let axisZ3 = Number(document.getElementById('axisZ3').value);

        let time = Number(document.getElementById('time').value);


        const command = {
            nameObject: String(document.getElementById("selectObject").value),
            idObject: this.changeIndexObject(),
            type: String(document.getElementById("menuCommands").value),
            axisX1: axisX1,
            axisY1: axisY1,
            axisZ1: axisZ1,

            axisX2: axisX2,
            axisY2: axisY2,
            axisZ2: axisZ2,

            axisX3: axisX3,
            axisY3: axisY3,
            axisZ3: axisZ3,


            time: time,

            translationSpeedX: this.calculateTranslationSpeed(axisX1, time),
            translationSpeedY: this.calculateTranslationSpeed(axisY1, time),
            translationSpeedZ: this.calculateTranslationSpeed(axisZ1, time),
            rotationSpeedX: this.calculateRotationSpeed(axisX1, time),
            rotationSpeedY: this.calculateRotationSpeed(axisY1, time),
            rotationSpeedZ: this.calculateRotationSpeed(axisZ1, time),
            scaleSpeedX: this.calculateScaleSpeed(axisX1, time),
            scaleSpeedY: this.calculateScaleSpeed(axisY1, time),
            scaleSpeedZ: this.calculateScaleSpeed(axisZ1, time)

        }
        return command;

    }

    clearCommand() {
        //console.log("[Interface][clearCommand] > Running...");
        document.getElementById('axisX1').value = 0
        document.getElementById('axisY1').value = 0
        document.getElementById('axisZ1').value = 0
        document.getElementById('time').value = 2
    }

    changeNameCamera() {
        //console.log("[Interface][changeIndexObject]");
        let selectObjectHTML = document.getElementById("selectCamera");
        let nameCamera = selectObjectHTML[selectObjectHTML.selectedIndex].value;

        // Seta o nameCamera atual pelo index.
        console.log(nameCamera);
        objWebGL.currentCamera = nameCamera;
        objWebGL.drawScene();
        return nameCamera;

    }

    // Buttons Calculates Speed
    calculateTranslationSpeed(axis, time) {
        return Number(axis) / Number(time);

    }

    calculateRotationSpeed(axis, time) {
        if (axis == 0) {
            return -1;
        } else {

            // Ok
            var speed = 0;
            if (time == 5) {
                if (axis >= 360) {
                    speed = (1.26 * axis) / 360;
                } else if (axis < 360) {
                    speed = (axis * 1.26) / 360;
                }
            }

            else if (time > 5) {
                if (axis > 360) {
                    speed = (1.26 * 5 * axis) / (time * 360)
                } else {
                    speed = (1.26 * 5 * axis) / (time * 360);
                }



            } else if (time < 5) {
                if (axis >= 360) {
                    speed = (1.26 * 5 * axis) / (time * 360);
                } else {
                    console.log("here")
                    speed = (1.26 * 5 * axis) / (time * 360);
                }

            }
            console.log("Axis: ", axis, " Time: ", time, " Speed:", speed);
            return speed;
        }
    }

    calculateScaleSpeed(axis, time) {
        return Number(axis) / Number(time);
    }

    // Controls if is Bezier
    isBezier(value) {


        var bezierM2 = document.getElementById("bezierM2");
        var bezierM3 = document.getElementById("bezierM3");

        if (value == "bezierQuadratic") {
            bezierM2.style = "display:block";
            bezierM3.style = "display:none";

        } else if (value == "bezierCubic") {
            bezierM2.style = "display:block";
            bezierM3.style = "display:block";

        } else {
            bezierM2.style = "display:none";
            bezierM3.style = "display:none";

        }
    }
};


utils = new Utils();
objWebGL = new WebGL();
objInterface = new Interface(objWebGL);


var then = 0;
var temp = 0;
function animation(now) {

    now *= 0.001;
    var deltaTime = now - then;
    temp = temp + deltaTime;

    var command = objWebGL.listCommands[objWebGL.indexObject]
    var object = objWebGL.getObject(command.idObject);

    //console.log(command);
    if (then == 0) {
        then = now;
        temp = 0;
        requestAnimationFrame(animation);
    } else {
        then = now;

        if (temp <= command.time) {
            if (command.type == "translation") {
                object.translation[0] += command.translationSpeedX * deltaTime;
                object.translation[1] += command.translationSpeedY * deltaTime;
                object.translation[2] += command.translationSpeedZ * deltaTime;
            } else if (command.type == "rotation") {
                if (command.rotationSpeedX != -1) {
                    object.rotation[0] += command.rotationSpeedX * deltaTime;
                }
                if (command.rotationSpeedY != -1) {
                    object.rotation[1] += command.rotationSpeedY * deltaTime;
                }
                if (command.rotationSpeedZ != -1) {
                    object.rotation[2] += command.rotationSpeedZ * deltaTime;
                }
            } else if (command.type == "scale") {

                object.scale[0] += command.scaleSpeedX * deltaTime;
                object.scale[1] += command.scaleSpeedY * deltaTime;
                object.scale[2] += command.scaleSpeedZ * deltaTime;
            } else if (command.type == "bezierQuadratic") {
                var points = [
                    {
                        "x": object.translation[0],
                        "y": object.translation[1],
                    },
                    {
                        "x": command.axisX1,
                        "y": command.axisY1,
                    },
                    {
                        "x": command.axisX2,
                        "y": command.axisY2,
                    },
                ];
                var minPercentage = utils.ruleOfThree(maxValue = command.time, maxPercentage = 1.0, minValue = temp);

                var T = minPercentage;
                object.translation[0] = 2 * (1 - T) * T * points[1].x + T * T * points[2].x + (1 - T) * (1 - T) * object.translation[0];
                object.translation[1] = 2 * (1 - T) * T * points[1].y + T * T * points[2].y + (1 - T) * (1 - T) * object.translation[1];

            } else if (command.type == "bezierCubic") {
                var p = [
                    {
                        "x": object.translation[0],
                        "y": object.translation[1],
                    },
                    {
                        "x": command.axisX1,
                        "y": command.axisY1,
                    },
                    {
                        "x": command.axisX2,
                        "y": command.axisY2,
                    },
                    {
                        "x": command.axisX3,
                        "y": command.axisY3,
                    },
                ];

                var minPercentage = utils.ruleOfThree(maxValue = command.time, maxPercentage = 1.0, minValue = temp);

                var t = minPercentage;
                object.translation[0] = (1 - t) * (1 - t) * (1 - t) * object.translation[0] + 3 * (1 - t) * (1 - t) * t * p[1].x + 3 * (1 - t) * t * t * p[2].x + t * t * t * p[3].x;
                object.translation[1] = (1 - t) * (1 - t) * (1 - t) * object.translation[1] + 3 * (1 - t) * (1 - t) * t * p[1].y + 3 * (1 - t) * t * t * p[2].y + t * t * t * p[3].y;
            }

            objWebGL.drawScene();
            requestAnimationFrame(animation);

        } else if (objWebGL.indexObject != objWebGL.listCommands.length - 1) {
            objWebGL.indexObject += 1;
            temp = 0;
            then = 0;
            requestAnimationFrame(animation);
        } else {
            objWebGL.indexObject = 0;
            temp = 0;
            then = 0;
            return;
        }
    }
};

function animationUnique(now) {

    now *= 0.001;
    var deltaTime = now - then;
    temp = temp + deltaTime;

    var command = objWebGL.listCommands[objWebGL.runCommand];

    var object = objWebGL.getObject(command.idObject);


    if (then == 0) {
        then = now;
        temp = 0;
        requestAnimationFrame(animationUnique);
    } else {
        then = now;

        if (temp <= command.time) {
            if (command.type == "translation") {
                object.translation[0] += command.translationSpeedX * deltaTime;
                object.translation[1] += command.translationSpeedY * deltaTime;
                object.translation[2] += command.translationSpeedZ * deltaTime;
            } else if (command.type == "rotation") {
                if (command.rotationSpeedX != -1) {
                    object.rotation[0] += command.rotationSpeedX * deltaTime;
                }
                if (command.rotationSpeedY != -1) {
                    object.rotation[1] += command.rotationSpeedY * deltaTime;
                }
                if (command.rotationSpeedZ != -1) {
                    object.rotation[2] += command.rotationSpeedZ * deltaTime;
                }
            } else if (command.type == "scale") {

                object.scale[0] += command.scaleSpeedX * deltaTime;
                object.scale[1] += command.scaleSpeedY * deltaTime;
                object.scale[2] += command.scaleSpeedZ * deltaTime;
            } else if (command.type == "bezierQuadratic") {
                var points = [
                    {
                        "x": object.translation[0],
                        "y": object.translation[1],
                    },
                    {
                        "x": command.axisX1,
                        "y": command.axisY1,
                    },
                    {
                        "x": command.axisX2,
                        "y": command.axisY2,
                    },
                ];
                var minPercentage = utils.ruleOfThree(maxValue = command.time, maxPercentage = 1.0, minValue = temp);

                var T = minPercentage;
                object.translation[0] = 2 * (1 - T) * T * points[1].x + T * T * points[2].x + (1 - T) * (1 - T) * object.translation[0];
                object.translation[1] = 2 * (1 - T) * T * points[1].y + T * T * points[2].y + (1 - T) * (1 - T) * object.translation[1];

            } else if (command.type == "bezierCubic") {
                var p = [
                    {
                        "x": object.translation[0],
                        "y": object.translation[1],
                    },
                    {
                        "x": command.axisX1,
                        "y": command.axisY1,
                    },
                    {
                        "x": command.axisX2,
                        "y": command.axisY2,
                    },
                    {
                        "x": command.axisX3,
                        "y": command.axisY3,
                    },
                ];

                var minPercentage = utils.ruleOfThree(maxValue = command.time, maxPercentage = 1.0, minValue = temp);

                var t = minPercentage;
                object.translation[0] = (1 - t) * (1 - t) * (1 - t) * object.translation[0] + 3 * (1 - t) * (1 - t) * t * p[1].x + 3 * (1 - t) * t * t * p[2].x + t * t * t * p[3].x;
                object.translation[1] = (1 - t) * (1 - t) * (1 - t) * object.translation[1] + 3 * (1 - t) * (1 - t) * t * p[1].y + 3 * (1 - t) * t * t * p[2].y + t * t * t * p[3].y;
            }

            objWebGL.drawScene();
            requestAnimationFrame(animation);

        } else {
            objWebGL.indexObject = 0;
            temp = 0;
            then = 0;
            return;
        }
    }
};


webglLessonsUI.setupSlider("#cameraX", { value: 0, slide: objWebGL.camera.updateCameraPosition(0, objWebGL), min: -800, max: 800 });
webglLessonsUI.setupSlider("#cameraY", { value: 0, slide: objWebGL.camera.updateCameraPosition(1, objWebGL), min: -800, max: 800 });
webglLessonsUI.setupSlider("#cameraZ", { value: -200, slide: objWebGL.camera.updateCameraPosition(2, objWebGL), min: -2000, max: 2000 });
webglLessonsUI.setupSlider("#cameraZoom", { value: 100, slide: objWebGL.camera.updateCameraZoom(objWebGL), min: 0, max: 180 });

webglLessonsUI.setupSlider("#cameraRotationX", { value: 0, slide: objWebGL.camera.updateRotationX(objWebGL), min: 0, max: 360, step: 0.01 });
webglLessonsUI.setupSlider("#cameraRotationY", { value: 0, slide: objWebGL.camera.updateRotationY(objWebGL), min: 0, max: 360, step: 0.01 });
webglLessonsUI.setupSlider("#cameraRotationZ", { value: 180, slide: objWebGL.camera.updateRotationZ(objWebGL), min: 0, max: 360, step: 0.01 });

webglLessonsUI.setupSlider("#cameraBezierQuadratic", { value: 0, slide: objWebGL.camera.updateBezierQuadratic(objWebGL), min: 0, max: 1, step: 0.01 });

