import React from 'react';

const ControlButton = (props: any) => {
  return (
      <button onClick={props.onClick} className="btn btn-primary" type="button">
        { props.children }
      </button>
    );
}

export default ControlButton;
