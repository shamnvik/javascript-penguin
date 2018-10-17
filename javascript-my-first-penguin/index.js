const ROTATE_LEFT = "rotate-left";
const ROTATE_RIGHT = "rotate-right";
const ADVANCE = "advance";
const RETREAT = "retreat";
const SHOOT = "shoot";
const PASS = "pass";

const MOVE_UP =  {"top" : ADVANCE, "bottom" : ROTATE_LEFT, "right" : ROTATE_LEFT ,"left" : ROTATE_RIGHT };
const MOVE_DOWN =  {"top" : ROTATE_LEFT, "bottom" : ADVANCE, "right" : ROTATE_RIGHT ,"left" : ROTATE_LEFT };
const MOVE_RIGHT = {"top" : ROTATE_RIGHT, "bottom" : ROTATE_LEFT, "right" : ADVANCE ,"left" : ROTATE_LEFT };
const MOVE_LEFT = {"top" : ROTATE_LEFT, "bottom" : ROTATE_RIGHT, "right" : ROTATE_RIGHT,"left" : ADVANCE };

function moveTowardsCenterOfMap(body) {
    let centerPointX = Math.floor((body.mapWidth)/2);
    let centerPointY = Math.floor((body.mapHeight)/2);
    return moveTowardsPoint(body, centerPointX, centerPointY);
}

function moveTowardsPoint(body, pointX, pointY) {
    let penguinPositionX = body.you.x;
    let penguinPositionY = body.you.y;
    let plannedAction = PASS;

    if (penguinPositionX < pointX) {
        plannedAction =  MOVE_RIGHT[body.you.direction];
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
    switch(body.you.direction) {
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
    return { command: response};
}

function doMove(body){

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

  for each (var priority in priorities){
    if(priority[0] < highestPriority){
      highestPriority = priority[0];
      nextMove = priority[1];
    }
  }
  return nextMove;
}

function priorityWeaponRange(body){
  let bonusTiles = body.bonusTiles;
  var weaponRangeBonus;
  let rangeBonus;
  for each (var bonus in bonusTiles){
    if(bonus.type === "weapon-range"){
      weapon.rangeBonus,push(bonus);
    }
  }

  
}

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    let response = action(req);
    context.res = {
        headers: {"Content-Type": 'application/json'},
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

    return {name: penguinName, team: teamName};
}
function priorityStrength(req) {
    var my = req.you;
    var powerups = req.bonusTiles;
    var closest = undefined;
    //get the closest health powerup
    for (var i = 0; i < powerups.length; i++) {

        if (powerups[i].type === "strength"){
            powerup = powerups[i];
            x = powerup.x;
            y = powerup.y;

            if ((distanceTo(req, x, y) < distanceTo(req, closest.x, closest.y)) || closest === undefined  ){
                closest = powerup;
            }
        }
    }
    
    var returnObject = {
        "priority" :  100,
        "command"  :  PASS
    }

    if (closest !== undefined){
        returnObject.priority = math.floor(distanceTo(req, closest.x, closest.y));
        if (my.strength < 50){
            returnObject.priority = 1;    
            returnObject.command = findPathTo(closest.x, closest.y);
        }else if (my.strength < 100){
            returnObject.priority = math.floor(distanceTo(req, closest.x, closest.y));
        }else if (my.strength < 200){
            returnObject.priority = 7 * math.floor(distanceTo(req, closest.x, closest.y));
        }else{
            returnObject.priority = 10 * math.floor(distanceTo(req, closest.x, closest.y));
        } 
    }
    return returnObject

}
