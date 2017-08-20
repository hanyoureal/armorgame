import React, { Component } from 'react';

function Shot(props) {
  const {
    x1,
    y1,
    x2,
    y2,
    range,
    direction,
    calibre,
  } = props;

  if (typeof direction !== 'undefined') {
    const X = x1;
    const Y = y1;
    const Transform = `rotate(${direction} )`;
    const X2 = 0;
    const Y2 = -(range);

    return (
      <g transform={`translate(${X}, ${Y})`}>
        <line
          x1="0" y1="0" x2={X2} y2={Y2}
          stroke="rgba(225, 0, 0, 0.16)"
          transform={Transform}
          strokeWidth={calibre}
        />
      </g>
    );
  }

  return (
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="rgba(225, 0, 0, 0.16)"
      strokeWidth={calibre}
    />
  );
};

export default Shot;
