// Rover Object Goes Here
// ======================

var Rover = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog: [["N",0,0]],
}

var fieldSize = [3,5] // Actual size is one whole number higher due to counting number 0. I.e.: size 10x10 --> [9,9]
var field=[];

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
    field[Rover.x][Rover.y] = "<u>" + Rover.direction + "</u>";
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
    outputMat3 += "[";
    for (s=0; s<= fSize[0]; s++){
      outputMat3 += " " + field[s][t] ;
    }
    outputMat3 += " ]<br>";
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
    field[Rover.x][Rover.y] = "<u>" + Rover.direction + "</u>";
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
    outputMat3 += "[";
    for (s=0; s<= fSize[0]; s++){
      outputMat3 += " " + field[s][t] ;
    }
    outputMat3 += " ]<br>";
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
      Rover["direction"] = "E";
      renderField(fieldSize);
      break;
    case "E":
      Rover["direction"] = "S";
      renderField(fieldSize);
      break;
    case "S":
      Rover["direction"] = "W";
      renderField(fieldSize);
      break;
    case "W":
      Rover["direction"] = "N";
      renderField(fieldSize);
      break;
  }

  console.log("New Rover Direction: " + Rover["direction"] );
  Rover["travelLog"].push([Rover["direction"], Rover["x"], Rover["y"]]);
}

function turnLeft(rover){

  switch (rover["direction"]) {
    case "N":
      Rover["direction"] = "W";
      renderField(fieldSize);
      break;
    case "E":
      Rover["direction"] = "N";
      renderField(fieldSize);
      break;
    case "S":
      Rover["direction"] = "E";
      renderField(fieldSize);
      break;
    case "W":
      Rover["direction"] = "S";
      renderField(fieldSize);
      break;
  }

  console.log("New Rover Direction: " + Rover["direction"] );
  Rover["travelLog"].push([Rover["direction"], Rover["x"], Rover["y"]]);
}

function checkLimits(axis, sense, lowerLimit, upperLimit) {
  /* This functions takes the movement axis and a boolean parameter for the sense of movement: True = forward or False = backward.
     Then, both the upper and lower limits of the grid must be given (i.e.: 0 and 9).
     It returns true if a limit has been reached.*/
  
  if (sense == true) {
    switch (Rover[axis]) {
      case lowerLimit:
        if (Rover["direction"] == "W" || (Rover["direction"] == "N" )) {
          console.log("field limit reached, cannot move further.\n\n\t" + Rover["travelLog"][Rover["travelLog"].length-1])
          return true
        }
        break;
      case upperLimit:
        if (Rover["direction"] == "E" || (Rover["direction"] == "S" )) {
          console.log("field limit reached, cannot move further.\n\n\t" + Rover["travelLog"][Rover["travelLog"].length-1])
          return true
        }
        break;
    }
  } else {
    switch (Rover[axis]) {
      case upperLimit:
        if (Rover["direction"] == "W" || (Rover["direction"] == "N" )) {
          console.log("field limit reached, cannot move further.\n\n\t" + Rover["travelLog"][Rover["travelLog"].length-1])
          return true
        }
        break;
      case lowerLimit:
        if (Rover["direction"] == "E" || (Rover["direction"] == "S" )) {
          console.log("field limit reached, cannot move further.\n\n\t" + Rover["travelLog"][Rover["travelLog"].length-1])
          return true
        }
        break;
    }
  } 
}

function moveForward(rover){

  if (rover["direction"]=="W" || rover["direction"]=="E") {
    if (checkLimits("x",true,0,fieldSize[0])){
      return;
    };  
  } else {
    if (checkLimits("y",true,0,fieldSize[1])){
      return;
    };  
  }

  switch (rover["direction"]) {
    case "N":
      field[Rover.x][Rover.y] = "_";
      Rover["y"] -= 1;      
      renderField(fieldSize);
      break;
    case "E":
      field[Rover.x][Rover.y] = "_";
      Rover["x"] += 1;
      renderField(fieldSize);
      break;
    case "S":
      field[Rover.x][Rover.y] = "_";
      Rover["y"] += 1;
      renderField(fieldSize);
      break;
    case "W":
      field[Rover.x][Rover.y] = "_";
      Rover["x"] -= 1;
      renderField(fieldSize);
      break;
  }
  
  console.log("Rover's new position>: [ " + Rover["x"] + ", " + Rover["y"] + "]");
  Rover["travelLog"].push([Rover["direction"], Rover["x"], Rover["y"]]);
}

function moveBackward(rover){

  if (rover["direction"]=="W" || rover["direction"]=="E") {
    if (checkLimits("x",false,0,fieldSize[0])) {
      return;
    };  
  } else {
    if (checkLimits("y",false,0,fieldSize[1])) {
      return;
    };  
  }
  
  switch (rover["direction"]) {
    case "N":
      field[Rover.x][Rover.y] = "_";
      Rover["y"] += 1;
      renderField(fieldSize);
      break;
    case "E":
      field[Rover.x][Rover.y] = "_";
      Rover["x"] -= 1;
      renderField(fieldSize);
      break;
    case "S":
      field[Rover.x][Rover.y] = "_";
      Rover["y"] -= 1;
      renderField(fieldSize);
      break;
    case "W":
      field[Rover.x][Rover.y] = "_";
      Rover["x"] += 1;
      renderField(fieldSize);
      break;
  }
  
  console.log("Rover's new position>: [ " + Rover["x"] + ", " + Rover["y"] + "]");
  Rover["travelLog"].push([Rover["direction"], Rover["x"], Rover["y"]]);
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
    case "ArrowUp":
      moveForward(Rover);
      break;
    case "s":
    case "ArrowDown":
      moveBackward(Rover);
      break;
    case "a":
    case "ArrowLeft":
      turnLeft(Rover);
      break;
    case "d":
    case "ArrowRight":
      turnRight(Rover);
      break;
    case "Enter":
      createFieldButton();
      break;
  }
}