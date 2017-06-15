import React, { Component } from 'react';

function Armor(props) {
  const {
    thickness,
    width,
    rotation,
    x,
    y,
    hp,
    iHp,
  } = props;

  const Width = width;
  const Height = thickness;
  const X = x;
  const Y = y;
  const Rotate = `rotate(${rotation})`;
  const red = parseInt(255 - (255*(hp/iHp)));
  const color = `rgb(${red}, 130, 30)`;

  return (
    <g transform={`translate(${X}, ${Y}) ${Rotate}`}>
      <line
        strokeWidth={Height}
        x1={-Width/2}
        y1={0}
        x2={Width/2}
        y2={0}
        stroke={color}
        strokeLinecap="round"
      />
    </g>
  );
};

export default Armor;
