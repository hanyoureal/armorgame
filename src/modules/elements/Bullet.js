import React, { Component } from 'react';

function Armor(props) {
  const {
    x,
    y,
    penetration,
    direction,
  } = props;

  const width = 4;

  return (
    <ellipse
      cx={x}
      cy={y}
      rx={width}
      ry={penetration/2}
      transform={`rotate(${direction} ${(width/2)+x} ${(penetration/4)+y})`}
      fill="red"
    />
  );
};

export default Armor;
