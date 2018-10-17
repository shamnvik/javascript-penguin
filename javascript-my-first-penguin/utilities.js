function distanceTo(req, x, y){
    let myX = req.you.x;
    let myY = req.you.y;
    var currentX = myX;
    var currentY = myY;
    var distX = x - currentX;
    var distY = y - currentY;
    distanceCount = 0;
    //var pathCountX = 0;
    //var pathCountY = 0;
    //var priority = 0;
    //prio = 1 -> x bigger
    // prio = -1 -> y bigger
    if (distX > distY) priority = 1;
    else if (distX < distY) priority = -1;

    var i;
    while (priority != 2)){

        while (priority == 1) {
            //x coord is in priority
            if (distX > 0) {
                //try move right
                if (!doesCellContainWall(req.walls, currentX + 1, currentY)){
                    currentX ++;
                    distanceCount ++;
                }
                else{
                    if (distY > 0 && doesCellContainWall(req.walls, currentX, currentY + 1)){
                        currentX ++;
                        distanceCount ++;
                    }
                    else if (distY < 0 && doesCellContainWall(req.walls, currentX, currentY - 1)){
                        currentX ++;
                        distanceCount ++;
                    }
                    priority == -1;
                }
            }
            else if (distX < 0){
                //try move left
                if (!doesCellContainWall(req.walls, currentX - 1, currentY)){
                    currentX --;
                    distanceCount ++;
                }
                else{
                    if (distY > 0 && doesCellContainWall(req.walls, currentX, currentY + 1)){
                        currentX --;
                        distanceCount ++;
                    }
                    else if (distY < 0 && doesCellContainWall(req.walls, currentX, currentY - 1)){
                        currentX --;
                        distanceCount ++;
                    }
                    priority == -1;
                }
            }
            else if (distY == 0) priority = 2;
            distX = x - currentX;
        }

        while (priority == -1) {
            //y coord is in priority
            if (distY > 0) {
                //try move south
                if (!doesCellContainWall(req.walls, currentX, currentY + 1)){
                    currentY ++;
                    distanceCount ++;
                }
                else{
                    priority == 1;
                }
            }
            else if (distX < 0){
                //try move north
                if (!doesCellContainWall(req.walls, currentX, currentY + 1)){
                    currentY --;
                    distanceCount ++;
                }
                else{
                    priority == 1;
                }
            }
            else if (distX == 0) priority = 2;
            distY = y - currentY;
        }
        distY = y - currentY;
    }

    return ;
}



function distance(fromX, fromY, toX, toY){
    return (Math.sqrt(pow(toX - fromX, 2) + pow(toY - myY), 2);
}
