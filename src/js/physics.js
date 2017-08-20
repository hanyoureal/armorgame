const D2rad = Math.PI / 180;

export function getHitAngle(actualItem, bullet) {
  let hitAngle = Math.abs(actualItem.rotation - bullet.direction + 90);
  while (hitAngle > 180) {
    hitAngle = hitAngle - 180;
  }

  if (hitAngle < 90) {
    hitAngle = 180 - hitAngle;
  }
  return hitAngle;
}

export function getHitAngleSign(actualItem, bullet) {
  let minus = false;
  let hitAngle = parseInt(actualItem.rotation - bullet.direction + 90);
  while (hitAngle > 90) {
    hitAngle = hitAngle - 90;
    minus = !minus;
  }
  return minus;
}

export function getClosestItem(armorMap, armor, bullet, ignoreId) {
  let closestItem = null;
  let actualItem = null;
  let X = null;

  armorMap.forEach((a) => {
    if (armor[a].id !== ignoreId) {
      const checkX = getIntersectionPoint(armor[a], bullet);
      if (checkX.seg1 && checkX.seg2) {
        const distance = (Math.abs(checkX.x - bullet.x))+(Math.abs(checkX.y - bullet.y));
        if (closestItem === null || distance < closestItem) {
          actualItem = armor[a];
          X = checkX;
          closestItem = distance;
        }
      }
    }
  });
  return ({ actualItem, X });
}

export function shoot(a, b) {
  const actualDirection = b.direction + 90 - a.rotation;
  const oppositeThickness = a.thickness / Math.tan(actualDirection * D2rad);
  const actualThickness = Math.sqrt(Math.pow(a.thickness, 2) + Math.pow(oppositeThickness, 2));
  const damagePercent = (b.penetration - actualThickness) / b.penetration * 100;
  let damage = parseInt(b.damage * damagePercent / 100);

  if (damage < 0) damage = 0;

  return {
    id: a.id,
    name: a.name,
    hit: true,
    actualThickness,
    damage,
    penetration: b.penetration,
    message: `Hitting ${a.name}, ${actualThickness} armor with ${b.penetration} penetration results in ${damage} damage`,
  };
}

function getIntersectionPoint(a, b) {
  const armorCoord = getArmorCoord(a);
  const bulletCoord = getBulletCoord(b);
  return checkIntersection(armorCoord, bulletCoord);
}

function getArmorCoord({ rotation, width, x, y }) {
  const w = width/2;
  const cos = Math.cos(rotation * D2rad);
  const sin = Math.sin(rotation * D2rad);
  const cosW = cos * w;
  const sinW = sin * w;

  const coord = {
    x1: x + cosW,
    x2: x - cosW,
    y1: y + sinW,
    y2: y - sinW,
  };

  return coord;
}

function getBulletCoord({ direction, range, x, y}) {
  const d = direction + 90;
  const cos = Math.cos(d * D2rad);
  const sin = Math.sin(d * D2rad);
  const cosW = cos * range;
  const sinW = sin * range;

  const coord = {
    x3: x,
    x4: x - cosW,
    y3: y,
    y4: y - sinW,
  };
  return coord;
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

  return result;
}
