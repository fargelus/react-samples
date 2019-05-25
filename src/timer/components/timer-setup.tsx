import React from 'react';
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';

const TimerSetup = () => {
  const styles = {
    fontSize: '14px',
    'white-space': 'nowrap',
  };
  const options = ['one', 'two', 'three'];

  return (
    <div style={styles}>
      <Dropdown options={options} placeholder="Удалить таймер"/>
    </div>
  );
};

export default TimerSetup;
