
class InterfaceHTML {
  constructor() {
    this.sliders();
  }

  add() {

    var listOptions = document.getElementById('listOptions');
    var opt = document.createElement('option');

    opt.appendChild(document.createTextNode(String(listOptions.length).concat(' - Object T')));
    opt.value = listOptions.length;

    listOptions.appendChild(opt);

    mainWebGL.addObject();
  }
  remove() {

    var listOptions = document.getElementById("listOptions");
    var indexOption = listOptions.options[listOptions.selectedIndex].value;

    listOptions.removeChild(listOptions.options[indexOption]);
    
    mainWebGL.removeObject(indexOption);

    listOptions.selectedIndex = String(indexOption - 1);
  }
  sliders() {
    webglLessonsUI.setupSlider("#x", { value: mainWebGL.objectSelected.translation[0], slide: mainWebGL.updatePosition(0, mainWebGL), max: mainWebGL.gl.canvas.width });
    webglLessonsUI.setupSlider("#y", { value: mainWebGL.objectSelected.translation[1], slide: mainWebGL.updatePosition(1, mainWebGL), max: mainWebGL.gl.canvas.height });
    webglLessonsUI.setupSlider("#z", { value: mainWebGL.objectSelected.translation[2], slide: mainWebGL.updatePosition(2, mainWebGL), max: mainWebGL.gl.canvas.height });
    webglLessonsUI.setupSlider("#rotationX", { value: utils.radToDeg(mainWebGL.objectSelected.rotation[0]), slide: mainWebGL.updateRotation(0, mainWebGL), max: 360 });
    webglLessonsUI.setupSlider("#rotationY", { value: utils.radToDeg(mainWebGL.objectSelected.rotation[1]), slide: mainWebGL.updateRotation(1, mainWebGL), max: 360 });
    webglLessonsUI.setupSlider("#rotationZ", { value: utils.radToDeg(mainWebGL.objectSelected.rotation[2]), slide: mainWebGL.updateRotation(2, mainWebGL), max: 360 });
    webglLessonsUI.setupSlider("#scaleX", { value: mainWebGL.objectSelected.scale[0], slide: mainWebGL.updateScale(0, mainWebGL), min: -5, max: 5, step: 0.01, precision: 2 });
    webglLessonsUI.setupSlider("#scaleY", { value: mainWebGL.objectSelected.scale[1], slide: mainWebGL.updateScale(1, mainWebGL), min: -5, max: 5, step: 0.01, precision: 2 });
    webglLessonsUI.setupSlider("#scaleZ", { value: mainWebGL.objectSelected.scale[2], slide: mainWebGL.updateScale(2, mainWebGL), min: -5, max: 5, step: 0.01, precision: 2 });
    webglLessonsUI.setupSlider("#bezierQuadratic", { value: 0, slide: mainWebGL.updateBezierQuadratic(mainWebGL), min: 0, max: 1, step: 0.01 });
    webglLessonsUI.setupSlider("#bezierCubic", { value: 0, slide: mainWebGL.updateBezierCubic(mainWebGL), min: 0, max: 1, step: 0.01 });
  }
};

class Utils {
  constructor() {
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

      lookAt: function (cameraPosition, target, up, dst) {
        dst = dst || new MatType(16);
        var zAxis = normalize(
          subtractVectors(cameraPosition, target));
        var xAxis = normalize(cross(up, zAxis));
        var yAxis = normalize(cross(zAxis, xAxis));

        dst[0] = xAxis[0];
        dst[1] = xAxis[1];
        dst[2] = xAxis[2];
        dst[3] = 0;
        dst[4] = yAxis[0];
        dst[5] = yAxis[1];
        dst[6] = yAxis[2];
        dst[7] = 0;
        dst[8] = zAxis[0];
        dst[9] = zAxis[1];
        dst[10] = zAxis[2];
        dst[11] = 0;
        dst[12] = cameraPosition[0];
        dst[13] = cameraPosition[1];
        dst[14] = cameraPosition[2];
        dst[15] = 1;
      },

      inverse: function (m, dst) {
        dst = dst || new MatType(16);
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

        dst[0] = d * t0;
        dst[1] = d * t1;
        dst[2] = d * t2;
        dst[3] = d * t3;
        dst[4] = d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
          (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
        dst[5] = d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
          (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
        dst[6] = d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
          (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
        dst[7] = d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
          (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));
        dst[8] = d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
          (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
        dst[9] = d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
          (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
        dst[10] = d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
          (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
        dst[11] = d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
          (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));
        dst[12] = d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
          (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
        dst[13] = d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
          (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
        dst[14] = d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
          (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
        dst[15] = d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
          (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02));

        return dst;
      }
    }
  }
  radToDeg(r) {
    return r * 180 / Math.PI;
  }

  degToRad(d) {
    return d * Math.PI / 180;
  }


};

class Object extends Utils {
  constructor() {
    super();
    this.matrix = []
    this.translation = [100, 50, 0];
    this.rotation = [this.degToRad(0), this.degToRad(0), this.degToRad(0)];
    this.scale = [1, 1, 1];
    this.color = [Math.random(), Math.random(), Math.random(), 1];
  }
};

class Camera extends Utils {
  constructor(gl) {
    super();
    this.gl = gl;
    this.fieldOfViewRadians = this.degToRad(60);
    this.cameraAngleRadians = this.degToRad(0);

    this.aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
    this.zNear = 1;
    this.zFar = 2000;

    this.radius = 200;
    this.generateProjectionMatrix();
  }

  generateProjectionMatrix() {
    this.projectionMatrix = this.m4.perspective(this.fieldOfViewRadians, this.aspect, this.zNear, this.zFar);
    this.cameraMatrix = this.m4.yRotation(this.cameraAngleRadians);
    this.cameraMatrix = this.m4.translate(this.cameraMatrix, 0, 50, this.radius * 1.5);

    this.cameraPosition = [
      cameraMatrix[12],
      cameraMatrix[13],
      cameraMatrix[14],
    ];
    this.fPosition = [radius, 0, 0];
    this.up = [0, 1, 0];

    this.cameraMatrix = this.m4.lookAt(this.cameraPosition, this.fPosition, this.up);
    this.viewMatrix = this.m4.inverse(this.cameraMatrix);
    var viewProjectionMatrix = this.m4.multiply(this.projectionMatrix, this.viewMatrix);

    return viewProjectionMatrix;
  }

  updateCameraAngle(camera) {

    return function (event, ui) {
      console.log("[Camera][updateCameraAngle] > Starting...");
      this.cameraAngleRadians = this.degToRad(ui.value);
    }
  }
};

class MainWebGL extends Utils {

  constructor() {
    super();

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

    this.gl = this.connectWebGL();
    this.vertexShader = this.createShader(this.gl.VERTEX_SHADER, this.vertexShaderSource);
    this.fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, this.fragmentShaderSource);
    this.program = this.createProgram(this.vertexShader, this.fragmentShader)

    this.positionAttributeLocation = this.gl.getAttribLocation(this.program, "a_position");
    this.matrixLocation = this.gl.getUniformLocation(this.program, "u_matrix");
    this.colorLocation = this.gl.getUniformLocation(this.program, "u_color");

    this.createGeometryBuffer();
    this.vao = this.createVertexArrayObject();
    this.setConfigsBuffer();

    this.listObjects = [new Object()];
    this.objectSelected = this.listObjects[0];

    // Canvas for Labels
    var textCanvas = document.querySelector("#text");
    this.ctx = textCanvas.getContext("2d");
    this.listLine = [];

    webglUtils.resizeCanvasToDisplaySize(this.gl.canvas);
    webglUtils.resizeCanvasToDisplaySize(this.ctx.canvas);

    this.drawScene();
  }

  addObject() {
    console.log("[MainWebGL][addObject] > Running...");
    this.listObjects.push(new Object());
    this.drawAllObjects();
  }

  removeObject(index) {
    console.log("[MainWebGL][removeObject] > Running...");
    this.listObjects.splice(index);
    this.drawAllObjects();
  }

  selectObject(index) {
    console.log("[MainWebGL][selectObject] > Running...");
    this.objectSelected = this.listObjects[index];
  }

  connectWebGL() {
    /** @type {HTMLCanvasElement} */
    console.log("[MainWebGL][connectWebGL] > Running...");
    var canvas = document.querySelector("#canvas");
    var gl = canvas.getContext("webgl2");
    if (!gl) {
      return;
    }
    return gl;
  }

  createShader(type, source) {
    console.log("[MainWebGL][createShader] > Running...");

    var shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    var success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
    if (success) {
      //console.log("[MainWebGL][createShader][" + type + "] > Success!");
      return shader;
    }

    //console.log(this.gl.getShaderInfoLog(shader));
    this.gl.deleteShader(shader);
  }

  createProgram(vertexShader, fragmentShader) {
    console.log("[MainWebGL][createProgram] > Running...");
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

  createGeometryBuffer() {
    console.log("[MainWebGL][createGeometryBuffer] > Running...");
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
    //console.log("[createGeometryBuffer] > Success!");
  }

  createVertexArrayObject() {
    console.log("[MainWebGL][createVertexArrayObject] > Running...");
    var vao = this.gl.createVertexArray();
    this.gl.bindVertexArray(vao);
    this.gl.enableVertexAttribArray(this.positionAttributeLocation);
    //console.log("[createVertexArrayObject] > Success!");
    return vao
  }

  setConfigsBuffer() {
    console.log("[MainWebGL][setConfigsBuffer] > Running...");
    var size = 3;               // 3 components per iteration
    var type = this.gl.FLOAT;   // the data is 32bit floats
    var normalize = false;      // don't normalize the data
    var stride = 0;             // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;             // start at the beginning of the buffer
    this.gl.vertexAttribPointer(this.positionAttributeLocation, size, type, normalize, stride, offset);

  }

  drawCanvasLabel() {
    console.log("[MainWebGL][drawCanvasLabel] > Running...");
    // Clear the 2D Canvas
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);


    this.ctx.save();
    this.ctx.translate(
      this.listObjects[this.objectSelected].translation[0],
      this.listObjects[this.objectSelected].translation[1]);
    this.ctx.beginPath();
    this.listLine.forEach(element => {
      this.ctx.lineTo(element[0], element[1]);
      console.log(element);
    });

    this.ctx.stroke();
    this.ctx.fillText(
      "X: " + String(this.listObjects[this.objectSelected].translation[0]) + " " +
      "Y: " + String(this.listObjects[this.objectSelected].translation[1]) + " " +
      "Z: " + String(this.listObjects[this.objectSelected].translation[2]), -100, -45);
    this.ctx.restore();

  }

  drawAllObjects() {
    console.log("[MainWebGL][drawAllObjects] > Running...");

    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.useProgram(this.program);
    this.gl.bindVertexArray(this.vao);

    let X = 0;
    let Y = 1;
    let Z = 2;

    for (let index = 0; index < this.listObjects.length; index++) {
      //console.log("[drawAllObjects][m4] > Setting...");

      let objectSelected = this.listObjects[this.objectSelected];
      objectSelected.matrix = objectSelected.m4.projection(this.gl.canvas.clientWidth, this.gl.canvas.clientHeight, 400);
      objectSelected.matrix = objectSelected.m4.translate(objectSelected.matrix, objectSelected.translation[X], objectSelected.translation[Y], objectSelected.translation[Z]);
      objectSelected.matrix = objectSelected.m4.xRotate(objectSelected.matrix, objectSelected.rotation[X]);
      objectSelected.matrix = objectSelected.m4.yRotate(objectSelected.matrix, objectSelected.rotation[Y]);
      objectSelected.matrix = objectSelected.m4.zRotate(objectSelected.matrix, objectSelected.rotation[Z]);
      objectSelected.matrix = objectSelected.m4.scale(objectSelected.matrix, objectSelected.scale[X], objectSelected.scale[Y], objectSelected.scale[Z]);

      //console.log("[drawAllObjects][uniformMatrix4fv] > Setting...");
      this.gl.uniform4fv(this.colorLocation, objectSelected.color);
      this.gl.uniformMatrix4fv(this.matrixLocation, false, objectSelected.matrix);
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 16 * 6);
    }
  }

  drawScene() {
    console.log("[MainWebGL][drawScene][Settings] > Running...");

    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.useProgram(this.program);
    this.gl.bindVertexArray(this.vao);

    console.log("[MainWebGL][drawScene][m4] > Multiplying...");
    let X = 0;
    let Y = 1;
    let Z = 2;
    this.objectSelected.matrix = this.objectSelected.m4.projection(this.gl.canvas.clientWidth, this.gl.canvas.clientHeight, 400);
    this.objectSelected.matrix = this.objectSelected.m4.translate(this.objectSelected.matrix, this.objectSelected.translation[X], this.objectSelected.translation[Y], this.objectSelected.translation[Z]);
    this.objectSelected.matrix = this.objectSelected.m4.xRotate(this.objectSelected.matrix, this.objectSelected.rotation[X]);
    this.objectSelected.matrix = this.objectSelected.m4.yRotate(this.objectSelected.matrix, this.objectSelected.rotation[Y]);
    this.objectSelected.matrix = this.objectSelected.m4.zRotate(this.objectSelected.matrix, this.objectSelected.rotation[Z]);
    this.objectSelected.matrix = this.objectSelected.m4.scale(this.objectSelected.matrix, this.objectSelected.scale[X], this.objectSelected.scale[Y], this.objectSelected.scale[Z]);

    console.log("[MainWebGL][drawScene][uniformMatrix] > Running...");
    for (let index = 0; index < this.listObjects.length; index++) {
      this.gl.uniform4fv(this.colorLocation, this.listObjects[index].color);
      this.gl.uniformMatrix4fv(this.matrixLocation, false, this.listObjects[index].matrix);
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 16 * 6);
    }
  }

  updatePosition(index, mainWebGL) {
    console.log("[MainWebGL][updatePosition] > Running...");
    return function (event, ui) {
      mainWebGL.objectSelected.translation[index] = ui.value;
      mainWebGL.drawScene();
    };
  }

  updateRotation(index, mainWebGL) {
    console.log("[MainWebGL][updateRotation] > Running...");
    return function (event, ui) {
      var angleInDegrees = ui.value;
      var angleInRadians = mainWebGL.objectSelected.degToRad(angleInDegrees);
      mainWebGL.objectSelected.rotation[index] = angleInRadians;
      mainWebGL.drawScene();
    };
  }

  updateScale(index, mainWebGL) {
    console.log("[MainWebGL][updateScale] > Running...");
    return function (event, ui) {
      mainWebGL.objectSelected.scale[index] = ui.value;
      mainWebGL.drawScene();
    };
  }

  updateBezierQuadratic(mainWebGL) {
    console.log("[MainWebGL][updatebezierQuadratic] > Running...");

    return function (event, ui) {
      var points = [
        {
          "x": mainWebGL.objectSelected.translation[0],
          "y": mainWebGL.objectSelected.translation[1],
        },
        {
          "x": 500,
          "y": 200,
        },
        {
          "x": 100,
          "y": 300,
        },
      ];
      var T = ui.value;
      mainWebGL.objectSelected.translation[0] = 2 * (1 - T) * T * points[1].x + T * T * points[2].x + (1 - T) * (1 - T) * mainWebGL.objectSelected.translation[0];
      mainWebGL.objectSelected.translation[1] = 2 * (1 - T) * T * points[1].y + T * T * points[2].y + (1 - T) * (1 - T) * mainWebGL.objectSelected.translation[1];
      mainWebGL.drawScene();
    };
  }

  updateBezierCubic(mainWebGL) {
    console.log("[MainWebGL][updateBezierCubic] > Running...");

    return function (event, ui) {
      var p = [
        {
          "x": mainWebGL.objectSelected.translation[0],
          "y": mainWebGL.objectSelected.translation[1],
        },
        {
          "x": 500,
          "y": 200,
        },
        {
          "x": 100,
          "y": 300,
        },
        {
          "x": 500,
          "y": 400,
        },
      ];
      var t = ui.value;
      mainWebGL.objectSelected.translation[0] = (1 - t) * (1 - t) * (1 - t) * mainWebGL.objectSelected.translation[0] + 3 * (1 - t) * (1 - t) * t * p[1].x + 3 * (1 - t) * t * t * p[2].x + t * t * t * p[3].x;
      mainWebGL.objectSelected.translation[1] = (1 - t) * (1 - t) * (1 - t) * mainWebGL.objectSelected.translation[1] + 3 * (1 - t) * (1 - t) * t * p[1].y + 3 * (1 - t) * t * t * p[2].y + t * t * t * p[3].y;
      mainWebGL.drawScene();
    };
  }

};


// Starting...
mainWebGL = new MainWebGL();
utils = new Utils();
interfaceHTML = new InterfaceHTML();
//camera = new Camera();
