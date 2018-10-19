// Rover Object Goes Here
// ======================

var Rover = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog: [["N",0,0]],
}

var Rover2 = {
  direction: "N",
  x: 1,
  y: 0,
  travelLog: [["N",0,0]],
}

var fieldSize = [3,5] // Actual size is one whole number higher due to counting number 0. I.e.: size 10x10 --> [9,9]
var field=[];
var obstacleNumber;

var consoleLogSwitch = false;
// ======================

function showInstructions(){
  console.log("The Rover moves on a grid where East and South are positive directions." + 
  "\n\nTo move the Rover we use the following methods:\n\n\t--turnLeft(Rover)\n\t" + 
  "--turnRight(Rover)\n\n\t--moveForward(Rover)\n\t--moveBackward(Rover)\n\n\t" + 
  "--chainMoves(string) ,where: \n\n\t\tf:moveForward \n\t\tb:moveBackward \n\t\tr:turnRight \n\t\tl:turnLeft" +
  "\n\t\tExample: chainMoves(\"rrffflffrbblff\")" +
  "\n\nYou may change the size of the playing field by editing the fieldSize[x-1, y-1] array." +
  "\n\n\t i.e.: type fieldSize = [5, 3] for a 6x4 field." +
  "\n\n\tHave Fun!")
}

function createObstacles(obstacleNum) {
  var obstX;
  var obstY;

  for (i=0; i<obstacleNum; i++) {
    do {
    obstX = Math.floor(Math.random()*(fieldSize[0]+1));
    obstY = Math.floor(Math.random()*(fieldSize[1]+1));
    } while (obstX == Rover.x && obstY == Rover.y || obstX == Rover2.x && obstY == Rover2.y || field[obstX][obstY] == "X")
    field[obstX][obstY] = "X";
    console.log("Obstacle " +(i+1) + " coordinates: " + obstX + ", " + obstY + "\n")
  }
}

function renderer(str) {
  switch (str) {
    case "_":
      return "<div class=\"square\"></div>";
    case "X":
      return "<div class=\"square\">X</div>";
    case "N":
      return "<div class=\"square\">N</div>";
    case "E":
      return "<div class=\"square\">E</div>";
    case "S":
      return "<div class=\"square\">S</div>";
    case "W":
      return "<div class=\"square\">W</div>";
    case "N2":
      return "<div class=\"square\">N<sup>2</sup></div>";
    case "E2":
      return "<div class=\"square\">E<sup>2</sup></div>";
    case "S2":
      return "<div class=\"square\">S<sup>2</sup></div>";
    case "W2":
      return "<div class=\"square\">W<sup>2</sup></div>";
      
  }

}

function createField(fSize) {
  
  //First, we create the standard columns (second parameter of the array = coordinate y).
  var col = [];
  for (i=0; i<=fSize[1]; i++) {
    col.push("_");
  }
  //Then the columns are added up to compose a matrix with our desired field size. (.slice() method use to avoid passing columns by reference)
  field = []
  for(j=0; j<=fSize[0]; j++) {
    field.push(col.slice(0));
  }

  // Here the position of the Rover will be rendered on the field.
  // ===========================
    field[Rover.x][Rover.y] = Rover.direction;
  // Here the position of the second Rover will be rendered on the field.
  // ===========================
    field[Rover2.x][Rover2.y] = Rover2.direction + "2";
  // ===========================


  createObstacles(document.getElementById("obst-num").value);
  
  if (consoleLogSwitch) {
    var outputMat1 = "";
    for (t=0; t<= fSize[1]; t++) {
      outputMat1 += "[";
      for (s=0; s<= fSize[0]; s++){
        outputMat1 += " " + s + "," + t ;
      }
      outputMat1 += " ]\n";
    }

    var outputMat2 = "";
    for (t=0; t<= fSize[1]; t++) {
      outputMat2 += "[";
      for (s=0; s<= fSize[0]; s++){
        outputMat2 += " " + field[s][t] ;
      }
      outputMat2 += " ]\n";
    }
  }

  var outputMat3 = "";
  for (t=0; t<= fSize[1]; t++) {
    outputMat3 += "";
    for (s=0; s<= fSize[0]; s++){
      outputMat3 += " " + renderer(field[s][t]) ;
    }
    outputMat3 += "<br class=\"defloat\">";
  }

  if (consoleLogSwitch) { 
    console.log("field created:\n" + outputMat1 + "\n" + outputMat2);
  } 
  else {
    console.log("field created and rendered");
  }

  document.getElementById("playing-field").innerHTML = outputMat3;
}

function renderField(fSize) {
  
    // Here the position of the Rover will be rendered on the field.
  // ===========================
    field[Rover.x][Rover.y] = Rover.direction ;
  // Here the position of the second Rover will be rendered on the field.
  // ===========================
  field[Rover2.x][Rover2.y] = Rover2.direction + "2";
  // ===========================
  
  if (consoleLogSwitch) {
    var outputMat1 = "";
    for (t=0; t<= fSize[1]; t++) {
      outputMat1 += "[";
      for (s=0; s<= fSize[0]; s++){
        outputMat1 += " " + s + "," + t ;
      }
      outputMat1 += " ]\n";
    }

    var outputMat2 = "";
    for (t=0; t<= fSize[1]; t++) {
      outputMat2 += "[";
      for (s=0; s<= fSize[0]; s++){
        outputMat2 += " " + field[s][t] ;
      }
      outputMat2 += " ]\n";
    }
  }

  var outputMat3 = "";
  for (t=0; t<= fSize[1]; t++) {
    outputMat3 += "";
    for (s=0; s<= fSize[0]; s++){
      outputMat3 += " " + renderer(field[s][t]) ;
    }
    outputMat3 += "<br class=\"defloat\">";
  }

  if (consoleLogSwitch) { 
    console.log("field created:\n" + outputMat1 + "\n" + outputMat2);
  } 
  else {
    console.log("field rendered");
  }

  document.getElementById("playing-field").innerHTML = outputMat3;
}

function turnRight(rover){

  switch (rover["direction"]) {
    case "N":
      rover["direction"] = "E";
      renderField(fieldSize);
      break;
    case "E":
      rover["direction"] = "S";
      renderField(fieldSize);
      break;
    case "S":
      rover["direction"] = "W";
      renderField(fieldSize);
      break;
    case "W":
      rover["direction"] = "N";
      renderField(fieldSize);
      break;
  }

  console.log("New Rover Direction: " + rover["direction"] );
  rover["travelLog"].push([rover["direction"], rover["x"], rover["y"]]);
}

function turnLeft(rover){

  switch (rover["direction"]) {
    case "N":
      rover["direction"] = "W";
      renderField(fieldSize);
      break;
    case "E":
      rover["direction"] = "N";
      renderField(fieldSize);
      break;
    case "S":
      rover["direction"] = "E";
      renderField(fieldSize);
      break;
    case "W":
      rover["direction"] = "S";
      renderField(fieldSize);
      break;
  }

  console.log("New Rover Direction: " + rover["direction"] );
  rover["travelLog"].push([rover["direction"], rover["x"], rover["y"]]);
}

function checkLimits(rover, axis, sense, lowerLimit, upperLimit) {
  /* This functions takes the movement axis and a boolean parameter for the sense of movement: True = forward or False = backward.
     Then, both the upper and lower limits of the grid must be given (i.e.: 0 and 9).
     It returns true if a limit has been reached.*/
  
  if (sense == true) {
    switch (rover[axis]) {
      case lowerLimit:
        if (rover["direction"] == "W" || (rover["direction"] == "N" )) {
          console.log("field limit reached, cannot move further.\n\n\t" + rover["travelLog"][rover["travelLog"].length-1])
          return true
        }
        break;
      case upperLimit:
        if (rover["direction"] == "E" || (rover["direction"] == "S" )) {
          console.log("field limit reached, cannot move further.\n\n\t" + rover["travelLog"][rover["travelLog"].length-1])
          return true
        }
        break;
    }
  } else {
    switch (rover[axis]) {
      case upperLimit:
        if (rover["direction"] == "W" || (rover["direction"] == "N" )) {
          console.log("field limit reached, cannot move further.\n\n\t" + rover["travelLog"][rover["travelLog"].length-1])
          return true
        }
        break;
      case lowerLimit:
        if (rover["direction"] == "E" || (rover["direction"] == "S" )) {
          console.log("field limit reached, cannot move further.\n\n\t" + rover["travelLog"][rover["travelLog"].length-1])
          return true
        }
        break;
    }
  } 
}

function checkObstacles(rover, sense) {
  // parameters: --dir: string containing "N","E","S" or "W". --sense: boolean true --> forward sense.

  if (sense) {
    switch (rover.direction) {
      case "N":
        return field[rover.x][rover.y-1]=="X" ? true : false;
      case "E":
        return field[rover.x+1][rover.y]=="X" ? true : false;
      case "S":
        return field[rover.x][rover.y+1]=="X" ? true : false;
      case "W":
        return field[rover.x-1][rover.y]=="X" ? true : false;
    }
  } else {
    switch (rover.direction) {
      case "N":
        return field[rover.x][rover.y+1]=="X" ? true : false;
      case "E":
        return field[rover.x-1][rover.y]=="X" ? true : false;
      case "S":
        return field[rover.x][rover.y-1]=="X" ? true : false;
      case "W":
        return field[rover.x+1][rover.y]=="X" ? true : false;
    }
  }
}

function moveForward(rover){

  if (rover["direction"]=="W" || rover["direction"]=="E") {
    if (checkLimits(rover,"x",true,0,fieldSize[0])){
      return;
    };  
  } else {
    if (checkLimits(rover,"y",true,0,fieldSize[1])){
      return;
    };  
  }

  switch (rover["direction"]) {
    case "N":
      if (!checkObstacles(rover,true)){
        field[rover.x][rover.y] = "_";
        rover["y"] -= 1;      
        renderField(fieldSize);
      } else {
        console.log("cannot move forward: obstacle ahead");
      }
      break;
    case "E":
      if (!checkObstacles(rover,true)){
        field[rover.x][rover.y] = "_";
        rover["x"] += 1;
        renderField(fieldSize);
      } else {
        console.log("cannot move forward: obstacle ahead");
      }
      break;
    case "S":
      if (!checkObstacles(rover,true)){
        field[rover.x][rover.y] = "_";
        rover["y"] += 1;
        renderField(fieldSize);
      } else {
        console.log("cannot move forward: obstacle ahead");
      }
      break;
    case "W":
      if (!checkObstacles(rover,true)){
        field[rover.x][rover.y] = "_";
        rover["x"] -= 1;
        renderField(fieldSize);
      } else {
        console.log("cannot move forward: obstacle ahead");
      }
      break;
  }
  
  console.log("Rover's new position>: [ " + rover["x"] + ", " + rover["y"] + "]");
  rover["travelLog"].push([rover["direction"], rover["x"], rover["y"]]);
}

function moveBackward(rover){

  if (rover["direction"]=="W" || rover["direction"]=="E") {
    if (checkLimits(rover,"x",false,0,fieldSize[0])) {
      return;
    };  
  } else {
    if (checkLimits(rover,"y",false,0,fieldSize[1])) {
      return;
    };  
  }
  
  switch (rover["direction"]) {
    case "N":
      if (!checkObstacles(rover,false)){
        field[rover.x][rover.y] = "_";
        rover["y"] += 1;
        renderField(fieldSize);
      } else {
        console.log("cannot move rearwards: obstacle behind");
      }
      break;
    case "E":
      if (!checkObstacles(rover,false)){
        field[rover.x][rover.y] = "_";
        rover["x"] -= 1;
        renderField(fieldSize);
      } else {
        console.log("cannot move rearwards: obstacle behind");
      }
      break;
    case "S":
      if (!checkObstacles(rover,false)){
        field[rover.x][rover.y] = "_";
        rover["y"] -= 1;
        renderField(fieldSize);
      } else {
        console.log("cannot move rearwards: obstacle behind");
      }
      break;
    case "W":
    if (!checkObstacles(rover,false)){
      field[rover.x][rover.y] = "_";
      rover["x"] += 1;
      renderField(fieldSize);
    } else {
      console.log("cannot move rearwards: obstacle behind");
    }      
      break;
  }
  
  console.log("Rover's new position>: [ " + rover["x"] + ", " + rover["y"] + "]");
  rover["travelLog"].push([rover["direction"], rover["x"], rover["y"]]);
}

function chainMoves(moves) {

  for (var t=0; t<moves.length; t++) {
    if (moves[t] != "f" && moves[t] != "b" && moves[t] != "l" && moves[t] != "r"){
      console.log("Please, make sure all commands are either f,b,r or l. Otherwise the validator will abort execution of the command string.")
      return
    }
  }

  for (var i=0; i<moves.length; i++) {
    switch (moves[i]) {
      case "f":
        moveForward(Rover);
        break;
      case "b":
        moveBackward(Rover);
        break;
      case "r":
        turnRight(Rover);
        break;
      case "l":
        turnLeft(Rover);
        break;
    }
  }
  Rover["travelLog"].forEach(function(entry){
    console.log(entry);
  })
}

function createFieldButton() {
  fieldSize[0] = document.getElementById("x-input").value -1;
  fieldSize[1] = document.getElementById("y-input").value -1;
  createField(fieldSize);
}

function keyListener() {
  var key = event.key;

  switch (key) {
    case "w":
      moveForward(Rover);
      break;
    case "ArrowUp":
      moveForward(Rover2);
      break;
    case "s":
      moveBackward(Rover);
      break;
    case "ArrowDown":
      moveBackward(Rover2);
      break;
    case "a":
      turnLeft(Rover);
      break;
    case "ArrowLeft":
      turnLeft(Rover2);
      break;
    case "d":
      turnRight(Rover);
      break;
    case "ArrowRight":
      turnRight(Rover2);
      break;
    case "Enter":
      createFieldButton();
      break;
  }
}