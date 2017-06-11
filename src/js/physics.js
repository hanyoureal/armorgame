const D2rad = Math.PI / 180;

function shoot(a, b) {
  const intersectionPoint = getIntersectionPoint(a, b);

  if (intersectionPoint) {
    const actualDirection = b.direction + 90 - a.rotation;
    const oppositeThickness = a.thickness / Math.tan(actualDirection * D2rad);
    const actualThickness = Math.sqrt(Math.pow(a.thickness, 2) + Math.pow(oppositeThickness, 2));

    const damagePercent = (b.penetration - actualThickness) / b.penetration * 100;
    let damage = parseInt(b.damage * damagePercent / 100);

    if (damage < 0) damage = 0;

    console.log(`Hitting ${actualThickness} armor with ${b.penetration} penetration results in ${damage} damage`);

    return {
      hit: true,
      actualThickness,
      damage,
      penetration: b.penetration,
      message: `Hitting ${actualThickness} armor with ${b.penetration} penetration results in ${damage} damage`,
    };
  } else {
    return {
      hit: false,
      actualThickness: 0,
      damage: 0,
      penetration: 0,
      message: `Missed`,
    };
  }
}

function getIntersectionPoint(a, b) {
  const armorCoord = getArmorCoord(a);
  const bulletCoord = getBulletCoord(b);
  const isIntersected = checkIntersection(armorCoord, bulletCoord);
  console.log(isIntersected);
  return isIntersected;
}

export default shoot;

function getArmorCoord(a) {
  console.log(a);
  return {
    x1: 1,
    x2: 2,
    y1: 1,
    y2: 3,
  };
}

function getBulletCoord(b) {
  return {
    x3: 5,
    x4: 1,
    y3: 1,
    y4: 5,
  };
}

function checkIntersection({ x1, y1, x2, y2 }, { x3, y3, x4, y4 }) {
    const denom = (y4 - y3)*(x2 - x1) - (x4 - x3)*(y2 - y1);
    if (denom == 0) {
        return null;
    }
    const ua = ((x4 - x3)*(y1 - y3) - (y4 - y3)*(x1 - x3))/denom;
    const ub = ((x2 - x1)*(y1 - y3) - (y2 - y1)*(x1 - x3))/denom;
    const result = {
        x: x1 + ua*(x2 - x1),
        y: y1 + ua*(y2 - y1),
        seg1: ua >= 0 && ua <= 1,
        seg2: ub >= 0 && ub <= 1,
    };

    return (result.seg1 && result.seg2);
}
