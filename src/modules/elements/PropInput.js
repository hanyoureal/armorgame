import React, { Component } from 'react';

function PropInput(props) {
  const {
    id,
    dataParam,
    dataValue,
    onDataChange,
  } = props;
  const max = dataParam === 'direction' ? 360 : 800;
  return (
    <div>
      <label style={{ width: "100px", display: "inline-block" }}>{dataParam}:</label>
      {
        dataParam !== 'id' ?
          <span>
            <input
              data-id={id}
              type="range"
              max={max}
              data-param={dataParam}
              value={dataValue}
              onChange={onDataChange}
              title={dataValue}
            />
            <input
              style={{ width: '50px' }}
              data-id={id}
              type="number"
              data-param={dataParam}
              value={dataValue}
              onChange={onDataChange}
              title={dataValue}
            />
          </span>
          :
          <label>{dataValue}</label>
      }
    </div>
  );
};

export default PropInput;
