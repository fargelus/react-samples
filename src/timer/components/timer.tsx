import React from 'react';
import TimerButton from "./timer-button";
import Screen from "./screen";

interface ITimerState {
  currentTime: number;
  firstTime: number;
  secondTime: number;
  thirdTime: number;
  activeBtnID: number;
  enabledControlBtns: string[];
}

class Timer extends React.Component<{}, ITimerState> {
  public readonly state: Readonly<ITimerState>;
  private timerID: number;
  private startBtnID: string;
  private stopBtnID: string;

  public constructor(props: {}) {
    super(props);

    this.state = {
      currentTime: 0,
      firstTime: 5,
      secondTime: 10,
      thirdTime: 15,
      activeBtnID: -1,
      enabledControlBtns: [],
    };
   this.timerID = -1;
   this.startBtnID = 'start';
   this.stopBtnID = 'stop';

   this.tick = this.tick.bind(this);
   this.stopTick = this.stopTick.bind(this);
  }

  private tick() {
    let time = this.state.currentTime;

    this.setState({
      enabledControlBtns: [this.stopBtnID],
    });

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
          activeBtnID: -1,
          enabledControlBtns: [],
        });
        this.stopTick();
      }
    }, 1000);
  }

  private stopTick(ev?: any) {
    clearInterval(this.timerID);
    if (ev) {
      this.setState({
        enabledControlBtns: [this.startBtnID],
      });
    }
  }

  public render() {
    const { currentTime, enabledControlBtns } = this.state;
    const timeBtns = this.createTimeBtns();

    return (
      <div className="d-flex flex-column align-items-center m-auto pt-5">
        <Screen>{ currentTime }</Screen>
        <div className="d-flex flex-column align-items-center">
          <div className="mt-2">
            { timeBtns }
          </div>

          <div className="mt-2">
            <TimerButton
              onClick={this.tick}
              id={this.startBtnID}
              disabled={!enabledControlBtns.includes(this.startBtnID)}
              className="btn-success mr-2">
                Старт
            </TimerButton>

            <TimerButton
              className="btn-danger"
              id={this.stopBtnID}
              disabled={!enabledControlBtns.includes(this.stopBtnID)}
              onClick={this.stopTick}>
                Стоп
            </TimerButton>
          </div>
        </div>
    </div>);
  }

  private createTimeBtns() {
    const {
      firstTime,
      secondTime,
      thirdTime,
      activeBtnID
    } = this.state;

    return [ firstTime, secondTime, thirdTime ].map((time, index) =>
        <TimerButton
          className={'mr-2' + (index === activeBtnID ? ' active' : '')}
          id={`btn-${index}`}
          onClick={this.setTime.bind(this, time)}
          key={index}>
            {time} сек
          </TimerButton>
    );
  }

  private setTime(time: number, ev: any) {
    const activeID: number = Timer.getIDNumber(ev.target);
    this.stopTick();
    this.setState({
      currentTime: time,
      activeBtnID: activeID,
      enabledControlBtns: [this.startBtnID],
    });
  }

  static getIDNumber(node: any) {
    return +node.getAttribute('id').match(/[0-9]/)[0];
  }
}

export default Timer;
