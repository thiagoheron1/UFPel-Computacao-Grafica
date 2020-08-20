

class Utils {
    constructor() {
        let MatType = Float32Array;
        this.m4 = {

            projection: function (width, height, depth) {
                // Note: This matrix flips the Y axis so 0 is at the top.
                ////console.log("[projection] > Starting...");
                return [
                    2 / width, 0, 0, 0,
                    0, -2 / height, 0, 0,
                    0, 0, 2 / depth, 0,
                    -1, 1, 0, 1,
                ];
            },

            multiply: function (a, b) {
                ////console.log("[multiply] > Starting...");
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
                ////console.log("[translation] > Starting...");
                return [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    tx, ty, tz, 1,
                ];
            },

            xRotation: function (angleInRadians) {
                ////console.log("[xRotation] > Starting...");
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
                ////console.log("[yRotation] > Starting...");
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
                ////console.log("[zRotation] > Starting...");
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
                ////console.log("[scalling] > Starting...");
                return [
                    sx, 0, 0, 0,
                    0, sy, 0, 0,
                    0, 0, sz, 0,
                    0, 0, 0, 1,
                ];
            },

            translate: function (m, tx, ty, tz) {
                ////console.log("[translate] > Starting...");
                return this.multiply(m, this.translation(tx, ty, tz));
            },

            xRotate: function (m, angleInRadians) {
                ////console.log("[xRotate] > Starting...");
                return this.multiply(m, this.xRotation(angleInRadians));
            },

            yRotate: function (m, angleInRadians) {
                ////console.log("[yRotate] > Starting...");
                return this.multiply(m, this.yRotation(angleInRadians));
            },

            zRotate: function (m, angleInRadians) {
                ////console.log("[zRotate] > Starting...");
                return this.multiply(m, this.zRotation(angleInRadians));
            },

            scale: function (m, sx, sy, sz) {
                ////console.log("[scale] > Starting...");
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
};


class ObjectF {
    constructor(x = 0, y = 0, z = 0) {

        this.matrix = []; //[50, -60, 0];
        this.translation = [x, y, z];
        this.rotation = [utils.degToRad(0), utils.degToRad(180), utils.degToRad(0)];
        this.scale = [-1, 1, 1];

        this.color = [Math.random(), Math.random(), Math.random(), 1];
    }
};



class WebGL {
    constructor() {
        this.gl = this.connectWebGL();

        // Source
        this.vertexShaderSource = `#version 300 es
            in vec4 a_position;
            uniform mat4 u_matrix;
            
            void main() {
              gl_Position = u_matrix * a_position;
            }
            `;
        this.fragmentShaderSource = `#version 300 es
            
            precision highp float;
            uniform vec4 u_color;
            out vec4 outColor;
            
            void main() {
              outColor = u_color;
            }
            `;

        // Shaders
        this.vertexShader = this.createShader(this.gl.VERTEX_SHADER, this.vertexShaderSource);
        this.fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, this.fragmentShaderSource);
        this.program = this.createProgram(this.vertexShader, this.fragmentShader)

        // Attributes and Uniforms
        this.positionAttributeLocation = this.gl.getAttribLocation(this.program, "a_position");
        this.matrixLocation = this.gl.getUniformLocation(this.program, "u_matrix");
        this.colorLocation = this.gl.getUniformLocation(this.program, "u_color");

        // Binds
        this.createGeometryBuffer();
        this.vao = this.createVertexArrayObject();
        this.setConfigsBuffer();

        this.listObjects = [new ObjectF(0, 0, 0)];
        this.currentObject = this.listObjects[0];

        // runAllCommands
        this.drawScene();
    }

    // WebGL
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
            ////console.log("[WebGL][createShader][" + type + "] > Success!");
            return shader;
        }

        ////console.log(this.gl.getShaderInfoLog(shader));
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
            ////console.log("[createProgram] > Success!");
            return program;
        }
    }

    createGeometryBuffer() {
        //console.log("[WebGL][createGeometryBuffer] > Running...");
        var MeshBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, MeshBuffer);
        this.gl.bufferData(
            this.gl.ARRAY_BUFFER,
            new Float32Array([
                // left column front
                0, 0, 0,
                0, 0, 0,
                0, 150, 0,
                0, 150, 0,
                30, 0, 0,
                30, 150, 0,

                // top rung front
                30, 0, 0,
                100, 0, 0,
                30, 30, 0,
                30, 30, 0,
                100, 0, 0,
                100, 30, 0,

                // middle rung front
                30, 60, 0,
                67, 60, 0,
                30, 90, 0,
                30, 90, 0,
                67, 60, 0,
                67, 90, 0,

                // left column back
                0, 0, 30,
                30, 0, 30,
                0, 150, 30,
                0, 150, 30,
                30, 0, 30,
                30, 150, 30,

                // top rung back
                30, 0, 30,
                100, 0, 30,
                30, 30, 30,
                30, 30, 30,
                100, 0, 30,
                100, 30, 30,

                // middle rung back
                30, 60, 30,
                67, 60, 30,
                30, 90, 30,
                30, 90, 30,
                67, 60, 30,
                67, 90, 30,

                // top
                0, 0, 0,
                100, 0, 0,
                100, 0, 30,
                0, 0, 0,
                100, 0, 30,
                0, 0, 30,

                // top rung right
                100, 0, 0,
                100, 30, 0,
                100, 30, 30,
                100, 0, 0,
                100, 30, 30,
                100, 0, 30,

                // under top rung
                30, 30, 0,
                30, 30, 30,
                100, 30, 30,
                30, 30, 0,
                100, 30, 30,
                100, 30, 0,

                // between top rung and middle
                30, 30, 0,
                30, 30, 30,
                30, 60, 30,
                30, 30, 0,
                30, 60, 30,
                30, 60, 0,

                // top of middle rung
                30, 60, 0,
                30, 60, 30,
                67, 60, 30,
                30, 60, 0,
                67, 60, 30,
                67, 60, 0,

                // right of middle rung
                67, 60, 0,
                67, 60, 30,
                67, 90, 30,
                67, 60, 0,
                67, 90, 30,
                67, 90, 0,

                // bottom of middle rung.
                30, 90, 0,
                30, 90, 30,
                67, 90, 30,
                30, 90, 0,
                67, 90, 30,
                67, 90, 0,

                // right of bottom
                30, 90, 0,
                30, 90, 30,
                30, 150, 30,
                30, 90, 0,
                30, 150, 30,
                30, 150, 0,

                // bottom
                0, 150, 0,
                0, 150, 30,
                30, 150, 30,
                0, 150, 0,
                30, 150, 30,
                30, 150, 0,

                // left side
                0, 0, 0,
                0, 0, 30,
                0, 150, 30,
                0, 0, 0,
                0, 150, 30,
                0, 150, 0,
            ]),
            this.gl.STATIC_DRAW);
        ////console.log("[createGeometryBuffer] > Success!");
    }

    createVertexArrayObject() {
        //console.log("[WebGL][createVertexArrayObject] > Running...");
        var vao = this.gl.createVertexArray();
        this.gl.bindVertexArray(vao);
        this.gl.enableVertexAttribArray(this.positionAttributeLocation);
        ////console.log("[createVertexArrayObject] > Success!");
        return vao
    }

    setConfigsBuffer() {
        //console.log("[WebGL][setConfigsBuffer] > Running...");
        var size = 3;               // 3 components per iteration
        var type = this.gl.FLOAT;   // the data is 32bit floats
        var normalize = false;      // don't normalize the data
        var stride = 0;             // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;             // start at the beginning of the buffer
        this.gl.vertexAttribPointer(this.positionAttributeLocation, size, type, normalize, stride, offset);

    }

    drawScene() {

        this.setSettingsToDraw();

        for (let index = 0; index < this.listObjects.length; index++) {
            let object = this.getObject(index);
            this.calculateMatrix(object);
            this.drawColorAndMatrix(object);
        }
    }

    setSettingsToDraw(){
        console.log("[WebGL][drawFirstScene] > Running Settings...");
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.useProgram(this.program);
        this.gl.bindVertexArray(this.vao);

    }

    getObject(index) {
        console.log("[WebGL][getObject] > Running...");
        return this.listObjects[index];
    }

    calculateMatrix(object) {
        console.log("[WebGL][calculateMatrix] > Running Matrix...");

        let X = 0;
        let Y = 1;
        let Z = 2;

        object.matrix = utils.m4.projection(this.gl.canvas.clientWidth, this.gl.canvas.clientHeight, 400);
        object.matrix = utils.m4.translate(object.matrix, object.translation[X], object.translation[Y], object.translation[Z]);
        object.matrix = utils.m4.xRotate(object.matrix, object.rotation[X]);
        object.matrix = utils.m4.yRotate(object.matrix, object.rotation[Y]);
        object.matrix = utils.m4.zRotate(object.matrix, object.rotation[Z]);
        object.matrix = utils.m4.scale(object.matrix, object.scale[X], object.scale[Y], object.scale[Z]);
    }

    drawColorAndMatrix(object) {
        console.log("[WebGL][drawScene][drawColorAndMatrix] > Running Draw...");
        this.gl.uniform4fv(this.colorLocation, object.color);
        this.gl.uniformMatrix4fv(this.matrixLocation, false, object.matrix);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 16 * 6);
    }

    setCommandsToExecute(listCommands) {
        console.log(listCommands);
        this.listCommands = listCommands;
    }
}



class Interface {
    constructor(objWebGL) {
        this.index = 0;
        this.listCommands = [];
        this.webGL = objWebGL;
    }

    createCommand() {
        console.log("[Interface][createCommand] > Running...");
        let axisX = Number(document.getElementById('axisX').value);
        let axisY = Number(document.getElementById('axisY').value);
        let axisZ = Number(document.getElementById('axisZ').value);
        let time = Number(document.getElementById('time').value);

        const command = {
            type: String(document.getElementById("menuSelect").value),
            axisX: axisX,
            axisY: axisY,
            axisZ: axisZ,
            time: time,
            translationSpeedX: axisX / time,
            translationSpeedY: axisY / time,
            translationSpeedZ: axisZ / time,
            scaleSpeedX: axisX / time,
            scaleSpeedY: axisY / time,
            scaleSpeedZ: axisZ / time,

            
        }
        return command;
    }

    buttonAdd() {
        let command = this.createCommand();
        this.addCommand(command);
        this.addToSelectHTML(command);
        this.clearCommand();
    }

    addCommand() {
        console.log("[Interface][addCommand] > Running...");

        this.listCommands.push(this.createCommand());
    }

    removeCommand(index) {
        console.log("[Interface][removeCommand] > Running...");

        var listOptions = document.getElementById("listOptions");
        var indexOption = listOptions.options[listOptions.selectedIndex].value;

        listOptions.removeChild(listOptions.options[indexOption]);

        main.removeObject(indexOption);

        listOptions.selectedIndex = String(indexOption - 1);

        this.listObjects.splice(index);
        this.drawAllObjects();
    }

    addToSelectHTML(command) {
        console.log("[Interface][updateSelectCommands] > Running...");

        let selectHTML = document.getElementById('listCommands');
        let name = "(" + command['type'][0].toUpperCase() + ", " + command['axisX'] + ", " + command['axisY'] + ", " + command['axisZ'] + ", " + command['time'] + ")"

        let option = document.createElement('option');
        option.appendChild(document.createTextNode(name));
        option.value = listCommands.length;

        selectHTML.appendChild(option);
    }

    removeToSelectHTML(command) {
        console.log("");
    }

    clearCommand() {
        console.log("[Interface][clearCommand] > Running...");
        document.getElementById('axisX').value = 150
        document.getElementById('axisY').value = 0
        document.getElementById('axisZ').value = 0
        document.getElementById('time').value = 3
    }

    runAllCommands() {
        console.log("[Interface][runAllCommands] > Running...");
        console.log(this.listCommands);
        this.index = 0;
        requestAnimationFrame(animation);

    }

    showListCommands() {
        console.log("List Commands: ", this.listCommands);
    }

    getCommand(index) {
        return this.listCommands[index];
    }
};


utils = new Utils();
objWebGL = new WebGL();
objInterface = new Interface(objWebGL);


var then = 0;
var temp = 0;

function animation(now) {
    console.log(now);

    now *= 0.001;
    var deltaTime = now - then;
    temp = temp + deltaTime;


    if (then == 0) {
        then = now;
        temp = 0;
        requestAnimationFrame(animation);
    } else {

        console.log("index", objInterface.index);
        console.log("temp", temp);
        var command = objInterface.getCommand(objInterface.index);
        var object = objWebGL.getObject(0);

        console.log(temp, "<", command.time+then);
        if (temp < command.time+then) {
            if (command.type == "translation") {
                object.translation[0] += command.translationSpeedX * deltaTime;
                object.translation[1] += command.translationSpeedY * deltaTime;
                object.translation[2] += command.translationSpeedZ * deltaTime;
            } else if (command.type == "rotation") {
                console.log("");
            } else if (command.type == "scale") {
                object.scale[0] += command.scaleSpeedX * deltaTime;
                object.scale[1] += command.scaleSpeedY * deltaTime;
                object.scale[2] += command.scaleSpeedZ * deltaTime;
            } else if (command.type == "bezierQuadratic") {
                console.log("");
            } else if (command.type == "bezierCubic") {
                console.log("");
            } else if (command.type == "objectF") {
                this.listObjects.push(new Object(axisX, axisY, axisZ));
            } else if (command.type == "objectT") {
                console.log("");
            }
        
            objWebGL.drawScene();
        } else if (objInterface.index != objInterface.listCommands.length-1){
            objInterface.index += 1;
            temp = 0;
            then = 0;
        } else {
            objInterface.index = 0;
            temp = 0;
            then = 0;
            return ;
        }




        requestAnimationFrame(animation);
    }
};
