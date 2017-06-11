import React, { Component } from 'react';

function Armor(props) {
  const {
    x,
    y,
    penetration,
    direction,
  } = props;

  const Width = 4;
  const Height = penetration;
  const X = x;
  const Y = y;
  const Transform = `rotate(${direction} ${Width/4} ${Height/4})`;

  const X2 = 0;
  const Y2 = -100;

  return (
    <g transform={`translate(${X}, ${Y})`}>
      <ellipse
        rx={Width/2}
        ry={Height/2}
        transform={Transform}
        fill="red"
      />
      <line x1="0" y1="0" x2={X2} y2={Y2} stroke="pink" transform={Transform} />
    </g>
  );
};

export default Armor;
