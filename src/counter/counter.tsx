import React from 'react';

export default (props: any) => {
  const val = props.value || 0;
  return <div>{val}</div>;
}
