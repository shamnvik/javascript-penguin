API :
https://bouvetpenguinsondre.azurewebsites.net/api/

RULES:
Map Width & Heigth: 15
Turns to Sudden Death: 150
Weapon damage: 60
Radar range: 7
Weapon range: 5
Wall impact damage: 30
Penguin impact damage: 50
Minimum wall spacing: 3
Vertical wall chance: 0.5
Horizontal wall chance: 0.5
Wall strength: 300
Penguin strength: 300
Ammo: 1000


function priorityWeaponRange() - Sondre
  -> int: prioritering
  -> String : kommando

function priorityStrength() - Hilmar
  -> int: prioritering
  -> String : kommando

function priorityWeaponDamage() - Sondre
  -> int: prioritering
  -> String : kommando

function priorityHealth()
  -> int: prioritering
  -> String : kommando

function priorityFire() -Sondre
  -> int: prioritering
  -> String : kommando

function priorityEnemy()
  -> int: prioritering
  -> String : kommando

function priorityEvade()
  -> int: prioritering
  -> String : kommando


function doMove() -Sondre
  Sjekker alle priorityMetodene, og gjennomfører bevegelsen som har høyest prioritet
