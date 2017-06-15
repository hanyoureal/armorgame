import React, { Component } from 'react';

function Armor(props) {
  const {
    x,
    y,
    penetration,
    direction,
    calibre,
    range,
  } = props;

  const Width = 4;
  const Height = penetration;
  const X = x;
  const Y = y;
  const Transform = `rotate(${direction} )`;

  const X2 = 0;
  const Y2 = -(range);

  return (
    <g transform={`translate(${X}, ${Y})`}>
      <line
        x1="0" y1="0" x2={0} y2={-Height/2}
        stroke="black"
        transform={Transform}
        strokeWidth={calibre + 2}
      />
      <line
        x1="0" y1="0" x2={X2} y2={Y2}
        stroke="rgba(0, 0, 0, 0.06)"
        transform={Transform}
        strokeWidth={calibre}
      />
      <ellipse
        rx={Height/6}
        ry={Height/6}
        fill="black"
      />
    </g>
  );
};

export default Armor;
