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
  private timerID: number;

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

   this.timerID = -1;

   this.makeBtnActive = this.makeBtnActive.bind(this);
   this.tick = this.tick.bind(this);
   this.stopTick = this.stopTick.bind(this);
  }

  private setTime(time: number) {
    this.setState({
      currentTime: time,
      additionalAttrs: {},
    });
  }

  private makeBtnActive(ev: any) {
    const parent = ev.currentTarget;
    Array.prototype.forEach.call(parent.children, (el: any) => {
      el.classList.remove('active');
    });

    const current = ev.target;
    current.classList.add('active');
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
    this.timerID = setInterval(() => {
      tickTime();

      if (time === 0) {
        this.setState({
          additionalAttrs: {
            disabled: 'disabled',
          }
        });

        this.stopTick();
      }
    }, 1000);
  }

  private stopTick() {
    clearInterval(this.timerID);
  }

  public render() {
    const {
      currentTime,
      firstTime,
      secondTime,
      thirdTime,
      additionalAttrs } = this.state;

    return (
      <div className="d-flex flex-column align-items-center m-auto pt-5">
        <Screen>{ currentTime }</Screen>
        <div className="d-flex flex-column align-items-center">
          <div onClick={this.makeBtnActive} className="mt-2">
            <ControlButton className="mr-2" onClick={this.setTime.bind(this, firstTime)}>
              { firstTime } сек
            </ControlButton>

            <ControlButton className="mr-2" onClick={this.setTime.bind(this, secondTime)}>
              { secondTime } сек
            </ControlButton>

            <ControlButton className="mr-2" onClick={this.setTime.bind(this, thirdTime)}>
              { thirdTime } сек
            </ControlButton>
          </div>

          <div className="mt-2">
            <ControlButton
              {...additionalAttrs}
              onClick={this.tick}
              className="btn-success mr-2">
                Старт
            </ControlButton>

            <ControlButton
              className="btn-danger"
              onClick={this.stopTick}>
                Стоп
            </ControlButton>
          </div>
        </div>
    </div>);
  }
}

export default Timer;
