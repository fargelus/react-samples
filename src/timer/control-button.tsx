import React from 'react';

const ControlButton = (props: any) => {
  const attrs = Object.assign({}, props);
  const classes = 'btn ' + (props.className || 'btn-primary');
  attrs.className = classes;
  return (
      <button {...attrs} type="button">
        { props.children }
      </button>
    );
}

export default ControlButton;
