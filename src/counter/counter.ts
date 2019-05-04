import React from 'react';
import ReactDOM from 'react-dom';

class ButtonCounter extends React.Component {
  render() {
    return React.createElement('div', null, 'Test From Component');
  }
}

ReactDOM.render(
  React.createElement(ButtonCounter, null),
  document.getElementById('app'),
);
