import React, { Component } from 'react';

function Armor(props) {
  const {
    thickness,
    width,
    rotation,
    x,
    y,
  } = props;

  const Width = width;
  const Height = thickness;
  const X = x - (Width/2);
  const Y = y - (Height/2);
  const Transform = `rotate(${rotation} ${Width/2} ${Height/2})`;

  return (
    <g transform={`translate(${X}, ${Y})`}>
      <rect
        width={Width}
        height={Height}
        transform={Transform}
        fill="black"
      />
    </g>
  );
};

export default Armor;
