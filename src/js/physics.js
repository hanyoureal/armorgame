const D2rad = Math.PI / 180;

function shoot(a, b) {
  const actualDirection = b.direction + 90 - a.rotation;
  const oppositeThickness = a.thickness / Math.tan(actualDirection * D2rad);
  const actualThickness = Math.sqrt(Math.pow(a.thickness, 2) + Math.pow(oppositeThickness, 2));

  const damagePercent = (b.penetration - actualThickness) / b.penetration * 100;
  let damage = parseInt(b.damage * damagePercent / 100);

  if (damage < 0) damage = 0;

  console.log(`Hitting ${actualThickness} armor with ${b.penetration} penetration results in ${damage} damage`);
}

export default shoot;
