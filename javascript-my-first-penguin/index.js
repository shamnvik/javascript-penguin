const ROTATE_LEFT = "rotate-left";
const ROTATE_RIGHT = "rotate-right";
const ADVANCE = "advance";
const RETREAT = "retreat";
const SHOOT = "shoot";
const PASS = "pass";

const MOVE_UP = {
    "top": ADVANCE,
    "bottom": ROTATE_LEFT,
    "right": ROTATE_LEFT,
    "left": ROTATE_RIGHT
};
const MOVE_DOWN = {
    "top": ROTATE_LEFT,
    "bottom": ADVANCE,
    "right": ROTATE_RIGHT,
    "left": ROTATE_LEFT
};
const MOVE_RIGHT = {
    "top": ROTATE_RIGHT,
    "bottom": ROTATE_LEFT,
    "right": ADVANCE,
    "left": ROTATE_LEFT
};
const MOVE_LEFT = {
    "top": ROTATE_LEFT,
    "bottom": ROTATE_RIGHT,
    "right": ROTATE_RIGHT,
    "left": ADVANCE
};

function moveTowardsCenterOfMap(body) {
    let centerPointX = Math.floor((body.mapWidth) / 2);
    let centerPointY = Math.floor((body.mapHeight) / 2);
    return moveTowardsPoint(body, centerPointX, centerPointY);
}

function moveTowardsPoint(body, pointX, pointY) {
    let penguinPositionX = body.you.x;
    let penguinPositionY = body.you.y;
    let plannedAction = PASS;

    if (penguinPositionX < pointX) {
        plannedAction = MOVE_RIGHT[body.you.direction];
    } else if (penguinPositionX > pointX) {
        plannedAction = MOVE_LEFT[body.you.direction];
    } else if (penguinPositionY < pointY) {
        plannedAction = MOVE_DOWN[body.you.direction];
    } else if (penguinPositionY > pointY) {
        plannedAction = MOVE_UP[body.you.direction];
    }
    if (plannedAction === ADVANCE && wallInFrontOfPenguin(body)) {
        return SHOOT;
    }
    return plannedAction
}

function doesCellContainWall(walls, x, y) {
    if (walls.find(wall => wall.x == x && wall.y == y)) {
        return true;
    }
    return false;
}

function wallInFrontOfPenguin(body) {
    switch (body.you.direction) {
        case "top":
            return doesCellContainWall(body.walls, body.you.x, --body.you.y);
        case "bottom":
            return doesCellContainWall(body.walls, body.you.x, ++body.you.y);
        case "left":
            return doesCellContainWall(body.walls, --body.you.x, body.you.y);
        case "right":
            return doesCellContainWall(body.walls, ++body.you.x, body.you.y);
        default:
            return true;
    }
}

function commandReceived(body) {
    let response = PASS;
    response = moveTowardsCenterOfMap(body);
    return {
        command: response
    };
}

function doMove(body) {

    var priorities = [];
    var highestPriority = 100;
    var nextMove = PASS;

    priorities.push(priorityWeaponRange(body));
    priorities.push(priorityStrength());
    priorities.push(priorityWeaponDamage());
    priorities.push(priorityStrength());
    priorities.push(priorityFire());
    priorities.push(priorityEnemy());
    priorities.push(priorityEvade());

    for each(var priority in priorities) {
        if (priority[0] < highestPriority) {
            highestPriority = priority[0];
            nextMove = priority[1];
        }
    }
    return nextMove;
}

function priorityWeaponRange(body) {
    var bonusTiles = body.bonusTiles;
    var weaponRangeBonus;
    var rangeBonusPriority = [];
    var returnValue = [];

    for each(var bonus in bonusTiles) {
        if (bonus.type === "weapon-range") {
            var priority = 100;
            priority = distance(body, body.enemies.[0].x, body.enemies.[0].y);
            priority = priority * 10;

            rangeBonusPriority.push([priority, bonus);
        }
    }

    var highestPriority = 100;
    for each(var rangeBonus in rangeBonusPriority) {
        if (rangeBonus[0] < highestPriority) {
            highestPriority = rangeBonus[0];
            returnValue[0] = highestPriority;
            returnValue[1] = findPathTo(body, bonus.x, bonus.y);
        }
    }

    return returnValue;
}

module.exports = function(context, req) {
  nextMove = MOVE_DOWN[body.you.direction];



  priorities.push(priorityWeaponRange(body));
  // priorities.push(priorityStrength());
  // priorities.push(priorityWeaponDamage());
  // priorities.push(priorityStrength());
  // priorities.push(priorityFire());
  // priorities.push(priorityEnemy());
  // priorities.push(priorityEvade());
  //

      // for (var i = 0; i < priorities.length; i++) {
      //   nextMove = priorities[i][1];
      // }
  // var test = priorities[0];
  // nextMove = test[1];


  for (i = 0; i < priorities.length; i++){
    var priority = priorities[0];
    if(priority[0] < highestPriority){
      highestPriority = priority[0];
      nextMove = priority[1];
    }

  return { command: nextMove};
}



module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    let response = action(req);
    context.res = {
        headers: {
            "Content-Type": 'application/json'
        },
        body: response
    };
    context.done();
};

function action(req) {
    if (req.params.query == "command") {
        return doMove(req.body);
    } else if (req.params.query == "info") {
        return infoReceived();
    }
    return {};
}



function infoReceived() {
    let penguinName = "Pingu";
    let teamName = "Bouvet";

    return {
        name: penguinName,
        team: teamName
    };
}

// function priorityEvade(req) {
//     let enemies = req.enemies;
//     let my = req.you;
//     var returnObject = {
//         "priority": 100,
//         "command": ADVANCE
//     }
//     if (enemies.length > 0) {
//         //are we in immediate danger?
//
//         for (var i = 0; i < enemies.length; i++) {
//             var enemy = req.enemies[i]
//             if (my.x == enemy.x || my.y == enemy.y) {
//                 if (my.strength < enemy.strength) {
//                     var canBeShot = (my.x < enemy.x && enemy.direction ==
//                         LEFT) || (my.x > enemy.x && enemy.direction ==
//                         RIGHT) || (my.y < enemy.y && enemy.direction ==
//                         TOP) || (my.y < enemy.y && enemy.direction ==
//                         BOTTOM);
//                     if (canBeShot) {
//                         returnObject.priority = 1;
//                         if (wallInFrontOfPenguin) {
//                             returnObject.command = RETREAT;
//                         } else {
//                             returnObject.command = ADVANCE;
//                         }
//                     }
//                 }
//             }
//         }
//     }
//     return [returnObject.priority, returnObject.command];
// }

function priorityWeaponRange(body){
  // var bonusTiles = body.bonusTiles;
  // var rangeBonusPriority = [];
   var returnValue = [];
  //
  // for each (var bonus in bonusTiles){
  //   if(bonus.type === "weapon-range"){
  //     var priority = 0; //TODO
  //     //priority = distance(body, body.enemies.[0].x, body.enemies.[0].y); //TODO
  //     priority = priority * 10;
  //
  //
  //     rangeBonusPriority.push(priority);
  //     rangeBonusPriority.push(bonus);
  //
  //   }
  // }
  //
  var highestPriority = 1;
  returnValue[0] = highestPriority;
  returnValue[1] = MOVE_UP[body.you.direction];

  // for each (var rangeBonus in rangeBonusPriority){
  //   if(rangeBonus[0] < highestPriority){
  //     highestPriority = rangeBonus[0];
  //     returnValue[0] = highestPriority;
  //     //returnValue[1] = findPathTo(body,bonus.x,bonus.y);//TODO
  //     returnValue[1] = MOVE_UP[body.you.direction];
  //
  //   }
  // }

  return returnValue;
}

// function priorityWeaponDamage(body){
//   var bonusTiles = body.bonusTiles;
//   var weaponDamageBonus;
//   var rangeBonusPriority = [];
//   var returnValue = [];
//
//   for each (var bonus in bonusTiles){
//     if(bonus.type === "weapon-power"){
//       var priority = 100;
//       priority = distance(body, body.enemies.[0].x, body.enemies.[0].y);
//       priority = priority * 10;
//
//       rangeBonusPriority.push([priority,bonus);
//     }
//   }
//
//   var highestPriority = 100;
//   for each (var rangeBonus in rangeBonusPriority){
//     if(rangeBonus[0] < highestPriority){
//       highestPriority = rangeBonus[0];
//       returnValue[0] = highestPriority;
//       returnValue[1] = findPathTo(body,bonus.x,bonus.y);
//     }
//   }
//
//   return returnValue;
// }

// function priorityStrength(req) {
//     var my = req.you;
//     var powerups = req.bonusTiles;
//     var closest = undefined;
//     //get the closest health powerup
//     for (var i = 0; i < powerups.length; i++) {
//
//         if (powerups[i].type === "strength"){
//             powerup = powerups[i];
//             x = powerup.x;
//             y = powerup.y;
//
//             if ((distanceTo(req, x, y) < distanceTo(req, closest.x, closest.y)) || closest === undefined  ){
//                 closest = powerup;
//             }
//         }
//     }
//
//     var returnObject = {
//         "priority" :  100,
//         "command"  :  PASS
//     }
//
//     if (closest !== undefined){
//         returnObject.priority = math.floor(distanceTo(req, closest.x, closest.y));
//         if (my.strength < 50){
//             returnObject.priority = 1;
//             returnObject.command = findPathTo(closest.x, closest.y);
//         }else if (my.strength < 100){
//             returnObject.priority = math.floor(distanceTo(req, closest.x, closest.y));
//         }else if (my.strength < 200){
//             returnObject.priority = 7 * math.floor(distanceTo(req, closest.x, closest.y));
//         }else{
//             returnObject.priority = 10 * math.floor(distanceTo(req, closest.x, closest.y));
//         }
//     }
//     return [returnObject.priority, returnObject.command]
//
// }
//
// function priorityFire(body){
//   var my = body.you;
//   var fire = body.fire;
//   var priority = 100;
//   var command = PASS;
//   var returnValue = []
//
//   for (var i = 0; i < fire.length; i++) {
//     if (fire[i].x == my.x && fire[i].y = my.y{
//       priority = 0;
//       command = escapeFire(body);
//     }else{
//       priority = 5;
//       command = escapeFire(body);
//     }
//   }
//   returnValue[0] = priority;
//   returnValue[1] = command;
//
//   return returnValue;
// }
//
//
//
// function escapeFire(body){
//   var my = body.you;
//   var fire = body.fire;
//   var command = PASS;
//   for (var i = 0; i < fire.length; i++) {
//       if (!fire[i].x == my.x-1 || !doesCellContainWall(body.walls, my.x-1, my.y)){
//         command = MOVE_LEFT[my.direction];
//       } else if (!fire[i].x == my.x+1 || !doesCellContainWall(body.walls, my.x+1, my.y)){
//         command = MOVE_RIGHT[my.direction];
//       } else if (!fire[i].y-1 == my.y || !doesCellContainWall(body.walls, my.x, my.y-1)){
//         command = MOVE_DOWN[my.direction];
//       } else if (!fire[i].y+1 == my.y || !doesCellContainWall(body.walls, my.x, my.y+1)){
//         command = MOVE_UP[my.direction];
//       }
//   }
//   return command;
// }
/*function priorityEnemy(body){
  var returnObject = {
        "priority" :  100,
        "command"  :  PASS
    }
    var enemy = body.enemies;
    var my = body.you;
    if(canShoot && my.strength > enemy.strength){
      returnObject.priority = 1;
      returnObject.command = shoot;
    }
    else if(canShoot && my.strength < enemy.strength){
      returnObject.priority = 50;
      returnObject.command = shoot;
    }
    else{
      return returnObject;
    }
>>>>>>> 2e7e3273fed5da609deeff17525baaa155adfb04




function canShoot(body){
    if(body.you.y == body.enemies.y){
        if(body.you.x < body.enemies.x && body.you.direction == rigth) {
          if((body.enemies.x - body.you.x) < 7){
              return true;
          }
        }
      else if (body.you.x > body.enemies.x && body.you.direction == left){
            if((body.you.x - body.enemies.x) < 7){
            return true;
          }
        }
    }
  else if (body.you.x == body.enemies.x){
      if(body.you.y < body.enemies.y && body.you.direction == down){
        if((body.enemies.y - body.you.y) < 7){
          return true;
        }
        else if(body.you.y > body.enemies.y && body.you.direction == up){
              if((body.you.y - body.enemies.y) < 7){
              return true;
            }
        }
    }
  }
    return false;
}*/
