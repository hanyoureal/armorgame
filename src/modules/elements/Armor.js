import React, { Component } from 'react';

function Armor(props) {
  const {
    thickness,
    width,
    rotation,
    x,
    y,
  } = props;

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={thickness}
      transform={`rotate(${rotation} ${(width/2)+x} ${(thickness/2)+y} )`}
      fill="black"
    />
  );
};

export default Armor;
