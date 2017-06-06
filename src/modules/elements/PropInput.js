import React, { Component } from 'react';

function PropInput(props) {
  const {
    dataParam,
    dataValue,
    onDataChange,
  } = props;

  return (
    <div>
      <label style={{ width: "100px", display: "inline-block" }}>{dataParam}:</label>
      <input
        type="number"
        data-param={dataParam}
        value={dataValue}
        onChange={onDataChange}
      />
    </div>
  );
};

export default PropInput;
