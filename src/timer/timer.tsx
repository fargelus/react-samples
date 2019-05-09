import React from 'react';
import ControlButton from "./control-button";
import Screen from "./screen";

interface ITimerState {
  currentTime: number;
  firstTime: number;
  secondTime: number;
  thirdTime: number;
  additionalAttrs: object;
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
      additionalAttrs: {
        disabled: 'disabled',
      },
    };

    this.timerStyle = {
     maxWidth: '350px',
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

   this.tick = this.tick.bind(this);
  }

  private setTime(time: number) {
    this.setState({
      currentTime: time,
      additionalAttrs: {},
    });
  }

  private tick() {
    let time = this.state.currentTime;

    const tickTime = () => {
      --time;

      this.setState({
        currentTime: time,
      });
    };

    tickTime();
    const intervalId = setInterval(() => {
      tickTime();

      if (time === 0) {
        this.setState({
          additionalAttrs: {
            disabled: 'disabled',
          }
        });

        clearInterval(intervalId);
      }
    }, 1000);
  }

  public render() {
    const {
      currentTime,
      firstTime,
      secondTime,
      thirdTime,
      additionalAttrs } = this.state;

    return (
      <div style={this.timerStyle}>
        <Screen style={this.screenStyle}>{ currentTime }</Screen>
        <div style={this.controlStyle}>
          <ControlButton onClick={this.setTime.bind(this, firstTime)}>
            { firstTime } сек
          </ControlButton>

          <ControlButton onClick={this.setTime.bind(this, secondTime)}>
            { secondTime } сек
          </ControlButton>

          <ControlButton onClick={this.setTime.bind(this, thirdTime)}>
            { thirdTime } сек
          </ControlButton>

          <ControlButton
            {...additionalAttrs}
            className="btn-success"
            onClick={this.tick}>
              Старт
          </ControlButton>
        </div>
    </div>);
  }
}

export default Timer;
