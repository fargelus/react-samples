import React from 'react';
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';

const TimerSetup = (props: any) => {
  const styles = {
    fontSize: '14px',
    'white-space': 'nowrap',
  };

  return (
    <div style={styles}>
      <Dropdown onChange={props.onChange} options={props.timers} placeholder="Удалить таймер"/>
    </div>
  );
};

export default TimerSetup;
