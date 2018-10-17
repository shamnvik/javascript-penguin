function distanceTo(req, x, y){
    let myX = req.you.x;
    let myY = req.you.y;
    return Math.sqrt(pow(x - myX, 2) + pow(y - myY));
} 
