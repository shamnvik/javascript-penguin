API :
https://bouvetpenguinsondre.azurewebsites.net/api/

function priorityWeaponRange()
  -> int: prioritering
  -> String : kommando

function priorityStrength()
  -> int: prioritering
  -> String : kommando

function priorityWeaponDamage()
  -> int: prioritering
  -> String : kommando

function priorityHealth()
  -> int: prioritering
  -> String : kommando

function priorityFire()
  -> int: prioritering
  -> String : kommando

function priorityEnemy()
  -> int: prioritering
  -> String : kommando

function priorityEvade()
  -> int: prioritering
  -> String : kommando


function doMove()
  Sjekker alle priorityMetodene, og gjennomfører bevegelsen som har høyest prioritet
