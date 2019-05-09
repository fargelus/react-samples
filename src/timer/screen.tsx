import React from 'react';

const Screen = (props: any) => {
  const seconds: string = '' + props.children;
  const secondsFmt: string = seconds.length === 1 ? `0${seconds}` : seconds;
  return <div style={props.style}>{`00:${secondsFmt}`}</div>
}

export default Screen;
