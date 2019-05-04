import React from 'react';
import ReactDOM from 'react-dom';

const GREETINGS = 'Hello world!';

const h1 = React.createElement('h1', null, GREETINGS);

const store = new Array(10).fill(1);
const liCreator = (index: number) => React.createElement('li', { key: index }, GREETINGS);
const listItems = store.map((_:any, index: number) => liCreator(index));
const ul = React.createElement('ul', null, listItems);

ReactDOM.render(
  React.createElement('div', null, h1, ul),
  document.getElementById('app')
);
