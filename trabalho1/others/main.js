var canvas = document.querySelector("#canvas");
var gl = canvas.getContext("webgl2");

var vertexShaderSource = `#version 300 es 
// um atributo é um input (in) para um vertex shader.
// ele receberá dados de um buffer
in vec4 a_position;
 
// todos os shaders possuem uma função main
void main() {
 
// gl_Position é uma variável especial de um vertex shader
// é responsável pela configuração
gl_Position = a_position;
}
`; 
var fragmentShaderSource = `#version 300 es


// fragment shaders não tem uma precisão padrão, então nós precisamos
// escolher uma. highp é um bom valor padrão. Do Inglês "high precision", significa "precisão média"
precision highp float;
 
// precisamos declarar um output para o fragment shader
out vec4 outColor;
 
void main() {
  // Simplesmente defina o output para um constante com uma cor avermelhada-roxa
  outColor = vec4(1, 0, 0.5, 1);
}
`;

function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
 
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}
var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
 
  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}
var program = createProgram(gl, vertexShader, fragmentShader);



function setRectangle(gl, x, y, width, height) {
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
     x1, y1,
     x2, y1,
     x1, y2,
     x1, y2,
     x2, y1,
     x2, y2,
  ]), gl.STATIC_DRAW);
}

// Returns a random integer from 0 to range - 1.
function randomInt(range) {
  return Math.floor(Math.random() * range);
}




// Crio a Vertex Array (Tabela Azul Forte) , e digo pro programa que é essa tabela. (VERTEX_ARRAY_BINDING)
var triangleVAO = gl.createVertexArray();
gl.bindVertexArray(triangleVAO);


// Crio o Buffer (Tabela Verde Forte), e digo pro programa que é esse Buffer. (ARRAY_BUFFER_BINDFING)
// Preencho o buffer com valores.
var positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
setRectangle(gl, 0, 0.5, -0.3, -0.8);
/*var vertexPositions = new Float32Array([
  0,   0.7,
  0.5,  -0.7,
-0.5,  -0.7,
0.1,   0.8,
0.6,  -0.6,
-0.4,  -0.6,
]);
gl.bufferData(gl.ARRAY_BUFFER, vertexPositions, gl.STATIC_DRAW);
*/

// Habilito a VAO dado o atributo
// Passo a maneira que sera lido, e o buffer que seralid
var a_position = gl.getAttribLocation(program, "a_position");
gl.enableVertexAttribArray(a_position);
gl.vertexAttribPointer(
  a_position,  
  2,            // 2 values per vertex shader iteration
  gl.FLOAT,     // data is 32bit floats
  false,        // don't normalize
  0,            // stride (0 = auto)
  0,            // offset into buffer
);


gl.useProgram(program);

// compute 3 vertices for 1 triangle
// compute 6 vertices for 1 rectangle
gl.drawArrays(gl.TRIANGLES, 0, 6);




