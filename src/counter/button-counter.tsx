import React from 'react';
import Counter from './counter';

class ButtonCounter extends React.Component {
  protected counter: number = 0;

  constructor(props: any) {
    super(props);
    this.incCounter = this.incCounter.bind(this);
  }

  private incCounter() {
    this.counter++;
  }

  public render() {
    return (
      <div>
        <Counter value={this.counter}/>
        <button onClick={this.incCounter} type="button">+</button>
      </div>
    );
  }
}

export default ButtonCounter;
