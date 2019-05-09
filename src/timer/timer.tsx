import React from 'react';
import ControlButton from "./control-button";
import Screen from "./screen";

interface ITimerState {
  currentTime: number;
  firstTime: number;
  secondTime: number;
  thirdTime: number;
}

class Timer extends React.Component<{}, ITimerState> {
  public readonly state: Readonly<ITimerState>;
  private timerStyle: object;
  private controlStyle: object;
  private screenStyle: object;

  public constructor(props: {}) {
    super(props);

    this.state = {
      currentTime: 0,
      firstTime: 5,
      secondTime: 10,
      thirdTime: 15,
    };

    this.timerStyle = {
     maxWidth: '250px',
     margin: '35px auto',
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'flex-start',
   };

   this.controlStyle = {
     marginTop: '20px',
     display: 'flex',
     justifyContent: 'space-around',
     width: '100%',
   };

   this.screenStyle = {
     alignSelf: 'center',
   };
  }

  private tick(time: number) {
    this.setState({
      currentTime: time,
    });
  }

  public render() {
    const { currentTime, firstTime, secondTime, thirdTime } = this.state;

    return (
      <div style={this.timerStyle}>
        <Screen style={this.screenStyle}>{ currentTime }</Screen>
        <div style={this.controlStyle}>
          <ControlButton onClick={this.tick.bind(this, firstTime)}>
            { firstTime } сек
          </ControlButton>

          <ControlButton onClick={this.tick.bind(this, secondTime)}>
            { secondTime } сек
          </ControlButton>

          <ControlButton onClick={this.tick.bind(this, thirdTime)}>
            { thirdTime } сек
          </ControlButton>
        </div>
    </div>);
  }
}

export default Timer;
