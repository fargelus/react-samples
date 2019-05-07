import React from 'react';

interface ICounterState {
  value: number;
}

class ButtonCounter extends React.Component<{}, ICounterState> {
  public readonly state: Readonly<ICounterState>;
  protected counter: number;

  public constructor(props: any) {
    super(props);

    this.counter = 0;
    this.state = { value: this.counter };
    this.incCounter = this.incCounter.bind(this);
  }

  private incCounter() {
    this.counter++;
    this.setState({
      value: this.counter
    });
  }

  public render() {
    return (
      <div>
        <div>{this.state.value}</div>
        <button onClick={this.incCounter} type="button">+</button>
      </div>
    );
  }
}

export default ButtonCounter;
