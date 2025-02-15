//grid for the rover to move around on
let grid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0], //obstacle in grid[1][2]
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0], //obstacle in grid[2][2]
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0], //obstacle in grid[3][4]
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0], //obstacle in grid[4][4]
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0], //obstacle in grid[5][4]
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0], //obstacle in grid[7][6]
  [0, 0, 0, 0, 0, 0, 1, 1, 0, 0], //obstacle in grid[8][6] and grid[8][7]
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
// Rover Object Goes Here
// ======================

let marsRover = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog: [{ x: 0, y: 0 }]
};
// ======================
//changes Rover's direction to left based off its current direction
function turnLeft(rover) {
  switch (rover.direction) {
    case "N":
      rover.direction = "W";
      break;
    case "W":
      rover.direction = "S";
      break;
    case "S":
      rover.direction = "E";
      break;
    case "E":
      rover.direction = "N";
      break;
  }
  console.log(`Turning left to ${rover.direction}`);
}

//changes Rover's direction to right based off its current direction
function turnRight(rover) {
  switch (rover.direction) {
    case "N":
      rover.direction = "E";
      break;
    case "W":
      rover.direction = "N";
      break;
    case "S":
      rover.direction = "W";
      break;
    case "E":
      rover.direction = "S";
      break;
  }
  console.log(`Turning right to ${rover.direction}`);
}

//moves Rover forward
const moveForward = rover => {
  //determines the previous location of the Rover
  let previousPosition={x: rover.x, y:rover.y};
  /*pushes the coordinates of the previous place where the rover was
  to the travelLog property*/
  rover.travelLog.push(previousPosition);

  if (rover.direction === "N" && rover.y > 0){
    rover.y--;
  } else if (rover.direction === "W" && rover.x > 0){
    rover.x--;
  } else if (rover.direction === "S" && rover.y < 10){
    rover.y++;
  } else if (rover.direction === "E" && rover.x < 10){
    rover.x++;
  } else {
    console.log("You can't move the Rover outside the map!");
    return;
  }
  console.log(`Moving forward to position ${rover.x}:${rover.y}`);
  
  if (grid[rover.x][rover.y] !== 0) {
    console.log(`There's an obstacle at ${rover.x}:${rover.y}, Rover can't continue`);
    moveBackwards(rover);
  }
  
}

//moves Rover backwards
const moveBackwards = rover => {
  //determines the previous location of the Rover
  let previousPosition={x: rover.x, y:rover.y};
  /*pushes the coordinates of the previous place where the rover 
  was to the travelLog property*/
  rover.travelLog.push(previousPosition);

  if (rover.direction === "N" && rover.y < 10){
    rover.y++;
  } else if (rover.direction === "W" && rover.x < 10){
    rover.x++;
  } else if (rover.direction === "S" && rover.y > 0){
    rover.y--;
  } else if (rover.direction === "E" && rover.x > 0){
    rover.x--;
  } else {
    console.log("You can't move the Rover outside the map!");
    return;

  }
  console.log(`Moving backwards to position ${rover.x}:${rover.y}`);
  /*checks for obstacles, stops the Rover from moving forward
  and reports the obstacle as found  */
  if (grid[rover.x][rover.y] !== 0) {
    console.log(`There's an obstacle at ${rover.x}:${rover.y}, Rover can't continue`);
    moveForward(rover);
  }
}

// receives a list of commands and moves Rover accordingly
function command(rover, orders) {
  for (let i = 0; i < orders.length; i++) {
    let order = orders[i];
    //adds validation so that the inputs must be f, b, r, or l
    if (order === "f" || order === "b" || order === "r" || order === "l" ){
      switch (order) {
        case "f":
          moveForward(rover);
          break;
        case "b":
          moveBackwards(rover);
          break;
        case "r":
          turnRight(rover);
          break;
        case "l":
          turnLeft(rover);
          break;
      } 
    } else {
      console.log(`Invalid command: ${orders[i]}`);
      return;
    }
  }
  /*determines the final location of the Rover and 
  pushes its position to the travelLog property*/
  let lastPosition={x:rover.x, y:rover.y};
  rover.travelLog.push(lastPosition);
  console.log(rover.travelLog);
}


command(marsRover, "ff");