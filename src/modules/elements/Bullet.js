import React, { Component } from 'react';

function Bullet(props) {
  const {
    x,
    y,
    penetration,
    direction,
    calibre,
    range,
    turret,
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
        x1="0" y1="0" x2={X2} y2={Y2}
        stroke="rgba(0, 0, 0, 0.06)"
        transform={Transform}
        strokeWidth={calibre}
      />
      <line
        x1="0" y1="0" x2={0} y2={-Height}
        stroke="black"
        transform={Transform}
        strokeWidth={calibre + 2}
      />
      <ellipse
        rx={Height/4}
        ry={Height/4}
        fill="black"
      />
    </g>
  );
};

export default Bullet;
