function drawAnimation(now){
  now *= 0.001;
  var deltaTime = now - then;
  temp = temp + deltaTime;
  var index = orderAnimation.length-1;
  console.log("TAMANHO", orderAnimation.length);
  if(then == 0){
    then = now;
    temp = 0;
    requestAnimationFrame(drawAnimation);
  }else{
    var step = 0;
    var timeTransformationAnimation = 5;
    if(orderAnimation[index].isTransformation == "translationX"){
      step = orderAnimation[index].translationX / timeTransformationAnimation;
      allObjects.teste[objectSelected].translation[0] += step * deltaTime;
    }else if(orderAnimation[index].isTransformation == "translationY"){
      step = orderAnimation[index].translationY / timeTransformationAnimation;
      allObjects.teste[objectSelected].translation[1] += step * deltaTime;
    }else if(orderAnimation[index].isTransformation == "translationZ"){
      step = orderAnimation[index].translationZ / timeTransformationAnimation;
      allObjects.teste[objectSelected].translation[0] += step * deltaTime;
    }else if(orderAnimation[index].isTransformation == "rotationX"){
      //Regra de tres
      theRuleOfThree();
    }else if(orderAnimation[index].isTransformation == "rotationY"){
      //Regra de tres
      theRuleOfThree();
    }else if(orderAnimation[index].isTransformation == "rotationZ"){
      //Regra de tres
      theRuleOfThree();
    }else if(orderAnimation[index].isTransformation == "scaleX"){
      step = orderAnimation[index].scaleX / timeTransformationAnimation;
      allObjects.teste[objectSelected].scale[0] += step * deltaTime;
    }else if(orderAnimation[index].isTransformation == "scaleY"){
      step = orderAnimation[index].scaleY / timeTransformationAnimation;
      allObjects.teste[objectSelected].scale[1] += step * deltaTime;
    }else if(orderAnimation[index].isTransformation == "scaleZ"){
      step = orderAnimation[index].scaleZ / timeTransformationAnimation;
      allObjects.teste[objectSelected].scale[2] += step * deltaTime;
    };
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    then = now;

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Specify the color for clearing <canvas>
    gl.clearColor(1, 1, 1, 1);

    //gl.clear(gl.COLOR_BUFFER_BIT);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // turn on depth testing
    gl.enable(gl.DEPTH_TEST);

    // tell webgl to cull faces
    gl.enable(gl.CULL_FACE);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    var i =0;
    for (i = 0; i < allObjects.teste.length; i++){
      allObjects.teste[i].matrix = m4.projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 500);
      allObjects.teste[i].matrix = m4.translate(allObjects.teste[i].matrix, allObjects.teste[i].translation[0], allObjects.teste[i].translation[1], allObjects.teste[i].translation[2]);
      allObjects.teste[i].matrix = m4.xRotate(allObjects.teste[i].matrix, allObjects.teste[i].rotation[0]);
      allObjects.teste[i].matrix = m4.yRotate(allObjects.teste[i].matrix, allObjects.teste[i].rotation[1]);
      allObjects.teste[i].matrix = m4.zRotate(allObjects.teste[i].matrix, allObjects.teste[i].rotation[2]);
      allObjects.teste[i].matrix = m4.scale(allObjects.teste[i].matrix, allObjects.teste[i].scale[0], allObjects.teste[i].scale[1], allObjects.teste[i].scale[2]);

      // Set the matrix.
      gl.uniformMatrix4fv(matrixLocation, false, allObjects.teste[i].matrix);


      //Tem o jeito que e bem explicadinho mas vou deixar assim no momento
      gl.drawArrays(gl.TRIANGLES, 0, n);

    };

    if( temp < 5 ){
      requestAnimationFrame(drawAnimation);
    }else{
      console.log("END");
    }
  }
  console.log("order", orderAnimation);
};