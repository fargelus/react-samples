import React from 'react';

const ControlButton = (props: any) => {
  const getCustomClasses = () => {
    const { className } = props;
    const isExist = typeof className === 'string';
    const isOverride = isExist && className.includes('btn');

    return isOverride ? className : `btn-primary${isExist ? ` ${className}` : ''}`;
  }

  const attrs = Object.assign({}, props);
  attrs.className = `btn ${getCustomClasses()}`;
  return (
      <button {...attrs} type="button">
        { props.children }
      </button>
    );
}

export default ControlButton;
