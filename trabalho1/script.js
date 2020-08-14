
function add() {
  // get reference to select element

  var listOptions = document.getElementById('listOptions');

  var opt = document.createElement('option');
  opt.appendChild(document.createTextNode(String(listOptions.length).concat(' - Object T')));

  // set value property of opt
  opt.value = listOptions.length;

  // add opt to end of listOptionsect box (listOptions)
  listOptions.appendChild(opt);

  main.addObject();
}
function remove() {


  // remove 2nd option in select box (sel)
  var listOptions = document.getElementById("listOptions");
  var indexOption = listOptions.options[listOptions.selectedIndex].value;


  listOptions.removeChild(listOptions.options[indexOption]);
  main.removeObject(indexOption);




  listOptions.selectedIndex = String(indexOption - 1);
}

class ObjectF {
  constructor() {

    this.matrix = []
    this.translation = [100, 50, 0];
    this.rotation = [this.degToRad(0), this.degToRad(0), this.degToRad(0)];
    this.scale = [1, 1, 1];
    this.color = [Math.random(), Math.random(), Math.random(), 1];
    //console.log(this.color);

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

    };
  }
  degToRad(d) {
    return d * Math.PI / 180;
  }

};

class ObjectT {

  constructor(translation, color) {

    this.matrix = []
    this.translation = translation;
    this.rotation = [this.degToRad(0), this.degToRad(0), this.degToRad(0)];
    this.scale = [1, 1, 1];
    this.color = [color];
    //console.log(this.color);

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

    };



  };

  degToRad(d) {
    return d * Math.PI / 180;
  }

};

class Main {

  constructor() {
    this.gl = this.connectWebGL();
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

    this.vertexShader = this.createShader(this.gl.VERTEX_SHADER, this.vertexShaderSource);
    this.fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, this.fragmentShaderSource);
    this.program = this.createProgram(this.vertexShader, this.fragmentShader)

    this.positionAttributeLocation = this.gl.getAttribLocation(this.program, "a_position");
    this.matrixLocation = this.gl.getUniformLocation(this.program, "u_matrix");
    this.colorLocation = this.gl.getUniformLocation(this.program, "u_color");

    this.createGeometryBuffer();
    this.vao = this.createVertexArrayObject();
    this.setConfigsBuffer();

    this.listObjects = [new ObjectF()];
    this.objectSelected = 0;

    // Print Lines
    var textCanvas = document.querySelector("#text");
    this.ctx = textCanvas.getContext("2d");
    this.listLine = [];

    this.drawAllObjects();


  }

  addObject() {
    this.listObjects.push(new ObjectF());
    this.drawAllObjects();
  }

  addObjectT(translation) {
    var obj = new ObjectT(translation);
    console.log(obj);
    this.listObjects.push(obj);
    this.drawAllObjects();
  }

  removeObject(index) {
    console.log("index", index);
    console.log(this.listObjects);
    this.listObjects.splice(index);
    console.log(this.listObjects);
    this.drawAllObjects();
  }

  selectObject(index) {
    this.objectSelected = index;
  }

  connectWebGL() {
    /** @type {HTMLCanvasElement} */
    var canvas = document.querySelector("#canvas");
    var gl = canvas.getContext("webgl2");
    if (!gl) {
      return;
    }
    return gl;
  }

  createShader(type, source) {
    var shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    var success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
    if (success) {
      //console.log("[createShader][" + type + "] > Success!");
      return shader;
    }

    //console.log(this.gl.getShaderInfoLog(shader));
    this.gl.deleteShader(shader);
  }

  createProgram(vertexShader, fragmentShader) {
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
    var vao = this.gl.createVertexArray();
    this.gl.bindVertexArray(vao);
    this.gl.enableVertexAttribArray(this.positionAttributeLocation);
    //console.log("[createVertexArrayObject] > Success!");
    return vao
  }

  setConfigsBuffer() {
    var size = 3;          // 3 components per iteration
    var type = this.gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    this.gl.vertexAttribPointer(this.positionAttributeLocation, size, type, normalize, stride, offset);
    //console.log("[setConfigsBuffer] > Success!")
  }

  radToDeg(r) {
    return r * 180 / Math.PI;
  }

  updatePosition(index, main) {
    //console.log("[updatePosition] > Success!");
    return function (event, ui) {
      main.listObjects[main.objectSelected].translation[index] = ui.value;
      main.drawScene();
    };
  }

  updateRotation(index, main) {
    //console.log("[updateRotation] > Success!");
    return function (event, ui) {
      var angleInDegrees = ui.value;
      var angleInRadians = main.listObjects[main.objectSelected].degToRad(angleInDegrees);
      main.listObjects[main.objectSelected].rotation[index] = angleInRadians;
      main.drawScene();
    };
  }

  updateScale(index, main) {
    //console.log("[updateScale] > Success!");
    return function (event, ui) {
      main.listObjects[main.objectSelected].scale[index] = ui.value;
      main.drawScene();
    };
  }

  updateDeltaTQuadratic(main) {
    //console.log("[updateDeltaTQuadratic] > Success!");

    return function (event, ui) {
      var p = [
        {
          "x": main.listObjects[main.objectSelected].translation[0],
          "y": main.listObjects[main.objectSelected].translation[1],
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
      var t = ui.value;

      main.listObjects[main.objectSelected].translation[0] = (1 - t) * (1 - t) * main.listObjects[main.objectSelected].translation[0] + 2 * (1 - t) * t * p[1].x + t * t * p[2].x;
      main.listObjects[main.objectSelected].translation[1] = (1 - t) * (1 - t) * main.listObjects[main.objectSelected].translation[1] + 2 * (1 - t) * t * p[1].y + t * t * p[2].y;
      //main.addObjectT([main.listObjects[main.objectSelected].translation[0],main.listObjects[main.objectSelected].translation[1],main.listObjects[main.objectSelected].translation[2]], main.listObjects[main.objectSelected].color);
      main.listLine.push(
        [
          main.listObjects[main.objectSelected].translation[0], 
          main.listObjects[main.objectSelected].translation[1]
        ]);
      main.drawScene();
    };
  }

  updateDeltaTCubic(main) {
    //console.log("[updateDeltaTCubic] > Success!");
    return function (event, ui) {
      var p = [
        {
          "x": main.listObjects[main.objectSelected].translation[0],
          "y": main.listObjects[main.objectSelected].translation[1],
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
      main.listObjects[main.objectSelected].translation[0] = (1 - t) * (1 - t) * (1 - t) * main.listObjects[main.objectSelected].translation[0] + 3 * (1 - t) * (1 - t) * t * p[1].x + 3 * (1 - t) * t * t * p[2].x + t * t * t * p[3].x;
      main.listObjects[main.objectSelected].translation[1] = (1 - t) * (1 - t) * (1 - t) * main.listObjects[main.objectSelected].translation[1] + 3 * (1 - t) * (1 - t) * t * p[1].y + 3 * (1 - t) * t * t * p[2].y + t * t * t * p[3].y;
      main.listLine.push(
        [
          main.listObjects[main.objectSelected].translation[0], 
          main.listObjects[main.objectSelected].translation[1]
        ]);
      main.drawScene();
    };
  }

  drawAllObjects() {

    //console.log("[drawScene][resizeCanvasToDisplaySize] > Setting...");
    webglUtils.resizeCanvasToDisplaySize(this.gl.canvas);
    webglUtils.resizeCanvasToDisplaySize(this.ctx.canvas);

    // Clear the 2D canvas
    //
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.ctx.save();
    this.ctx.translate(this.listObjects[this.objectSelected].translation[0], this.listObjects[this.objectSelected].translation[1]);
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

    //console.log("[drawScene][viewPort] > Setting...");
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

    //console.log("[drawScene][clearColor] > Setting...");
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    //console.log("[drawScene][useProgram] > Setting...");
    this.gl.useProgram(this.program);

    //console.log("[drawScene][bindVertexArray] > Setting...");
    this.gl.bindVertexArray(this.vao);

    for (let index = 0; index < this.listObjects.length; index++) {

      //console.log("[drawScene][uniform4fv] > Setting...");
      this.gl.uniform4fv(this.colorLocation, this.listObjects[index].color);

      //console.log("[drawScene][m4] > Setting...");
      this.listObjects[index].matrix = this.listObjects[index].m4.projection(this.gl.canvas.clientWidth, this.gl.canvas.clientHeight, 400);
      this.listObjects[index].matrix = this.listObjects[index].m4.translate(this.listObjects[index].matrix, this.listObjects[index].translation[0], this.listObjects[index].translation[1], this.listObjects[index].translation[2]);
      this.listObjects[index].matrix = this.listObjects[index].m4.xRotate(this.listObjects[index].matrix, this.listObjects[index].rotation[0]);
      this.listObjects[index].matrix = this.listObjects[index].m4.yRotate(this.listObjects[index].matrix, this.listObjects[index].rotation[1]);
      this.listObjects[index].matrix = this.listObjects[index].m4.zRotate(this.listObjects[index].matrix, this.listObjects[index].rotation[2]);
      this.listObjects[index].matrix = this.listObjects[index].m4.scale(this.listObjects[index].matrix, this.listObjects[index].scale[0], this.listObjects[index].scale[1], this.listObjects[index].scale[2]);

      //console.log("[drawScene][uniformMatrix4fv] > Setting...");
      this.gl.uniformMatrix4fv(this.matrixLocation, false, this.listObjects[index].matrix);

      //console.log("[drawScene][drawArrays] > Setting...");
      var primitiveType = this.gl.TRIANGLES;
      var offset = 0;
      var count = 16 * 6;
      this.gl.drawArrays(primitiveType, offset, count);

    }
  }

  drawScene() {

    //console.log("[drawScene][resizeCanvasToDisplaySize] > Setting...");
    webglUtils.resizeCanvasToDisplaySize(this.gl.canvas);
    webglUtils.resizeCanvasToDisplaySize(this.ctx.canvas);

    // Print Line
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.save();
    this.ctx.translate(0, 150);
    this.ctx.beginPath();
    this.ctx.moveTo(100, 5);
    this.listLine.forEach(element => {
      this.ctx.lineTo(element[0], element[1]);
      console.log(element);
    });
    this.ctx.stroke();
    this.ctx.fillText(
      "X: " + String(this.listObjects[this.objectSelected].translation[0]) + " " +
      "Y: " + String(this.listObjects[this.objectSelected].translation[1]) + " " +
      "Z: " + String(this.listObjects[this.objectSelected].translation[2]), 20, 20);
    this.ctx.restore();


    //console.log("[drawScene][viewPort] > Setting...");
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

    //console.log("[drawScene][clearColor] > Setting...");
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    //console.log("[drawScene][useProgram] > Setting...");
    this.gl.useProgram(this.program);

    //console.log("[drawScene][bindVertexArray] > Setting...");
    this.gl.bindVertexArray(this.vao);

    //console.log("[drawScene][m4] > Setting...");
    this.listObjects[this.objectSelected].matrix = this.listObjects[this.objectSelected].m4.projection(this.gl.canvas.clientWidth, this.gl.canvas.clientHeight, 400);
    this.listObjects[this.objectSelected].matrix = this.listObjects[this.objectSelected].m4.translate(this.listObjects[this.objectSelected].matrix, this.listObjects[this.objectSelected].translation[0], this.listObjects[this.objectSelected].translation[1], this.listObjects[this.objectSelected].translation[2]);
    this.listObjects[this.objectSelected].matrix = this.listObjects[this.objectSelected].m4.xRotate(this.listObjects[this.objectSelected].matrix, this.listObjects[this.objectSelected].rotation[0]);
    this.listObjects[this.objectSelected].matrix = this.listObjects[this.objectSelected].m4.yRotate(this.listObjects[this.objectSelected].matrix, this.listObjects[this.objectSelected].rotation[1]);
    this.listObjects[this.objectSelected].matrix = this.listObjects[this.objectSelected].m4.zRotate(this.listObjects[this.objectSelected].matrix, this.listObjects[this.objectSelected].rotation[2]);
    this.listObjects[this.objectSelected].matrix = this.listObjects[this.objectSelected].m4.scale(this.listObjects[this.objectSelected].matrix, this.listObjects[this.objectSelected].scale[0], this.listObjects[this.objectSelected].scale[1], this.listObjects[this.objectSelected].scale[2]);

    //console.log("[drawScene][uniformMatrix4fv] > Setting...");
    for (let index = 0; index < this.listObjects.length; index++) {

      //console.log("[drawScene][uniform4fv] > Setting...");
      this.gl.uniform4fv(this.colorLocation, this.listObjects[index].color);

      //console.log("Prints:", index);
      this.gl.uniformMatrix4fv(this.matrixLocation, false, this.listObjects[index].matrix);

      //console.log("[drawScene][drawArrays] > Setting...");
      var primitiveType = this.gl.TRIANGLES;
      var offset = 0;
      var count = 16 * 6;
      this.gl.drawArrays(primitiveType, offset, count);

    }
  }

};




main = new Main();
webglLessonsUI.setupSlider("#x", { value: main.listObjects[main.objectSelected].translation[0], slide: main.updatePosition(0, main), max: main.gl.canvas.width });
webglLessonsUI.setupSlider("#y", { value: main.listObjects[main.objectSelected].translation[1], slide: main.updatePosition(1, main), max: main.gl.canvas.height });
webglLessonsUI.setupSlider("#z", { value: main.listObjects[main.objectSelected].translation[2], slide: main.updatePosition(2, main), max: main.gl.canvas.height });
webglLessonsUI.setupSlider("#rotationAxisX", { value: main.radToDeg(main.listObjects[main.objectSelected].rotation[0]), slide: main.updateRotation(0, main), max: 360 });
webglLessonsUI.setupSlider("#rotationAxisY", { value: main.radToDeg(main.listObjects[main.objectSelected].rotation[1]), slide: main.updateRotation(1, main), max: 360 });
webglLessonsUI.setupSlider("#rotationAxisZ", { value: main.radToDeg(main.listObjects[main.objectSelected].rotation[2]), slide: main.updateRotation(2, main), max: 360 });
webglLessonsUI.setupSlider("#scaleX", { value: main.listObjects[main.objectSelected].scale[0], slide: main.updateScale(0, main), min: -5, max: 5, step: 0.01, precision: 2 });
webglLessonsUI.setupSlider("#scaleY", { value: main.listObjects[main.objectSelected].scale[1], slide: main.updateScale(1, main), min: -5, max: 5, step: 0.01, precision: 2 });
webglLessonsUI.setupSlider("#scaleZ", { value: main.listObjects[main.objectSelected].scale[2], slide: main.updateScale(2, main), min: -5, max: 5, step: 0.01, precision: 2 });
webglLessonsUI.setupSlider("#deltaTQuadratic", { value: 0, slide: main.updateDeltaTQuadratic(main), min: 0, max: 1, step: 0.05 });
webglLessonsUI.setupSlider("#deltaTCubic", { value: 0, slide: main.updateDeltaTCubic(main), min: 0, max: 1, step: 0.01 });

