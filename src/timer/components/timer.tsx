import React from 'react';
import TimerButton from "./timer-button";
import Screen from "./screen";
import TimerSetup from "./timer-setup";

interface ITimerState {
  currentTime: number;
  activeBtnID: number;
  timers: string[];
  enabledControlBtns: string[];
}

class Timer extends React.Component<{}, ITimerState> {
  public readonly state: Readonly<ITimerState>;
  private currentTimerIntervalID: number;
  private startBtnID: string;
  private stopBtnID: string;
  private timerSetupStyles: object;

  public constructor(props: {}) {
    super(props);

    this.state = {
      currentTime: 0,
      activeBtnID: -1,
      enabledControlBtns: [],
      timers: ['5 сек', '10 сек', '15 сек'],
    };

    this.currentTimerIntervalID = -1;
    this.startBtnID = 'start';
    this.stopBtnID = 'stop';
    this.timerSetupStyles = {
      position: 'absolute',
      left: 'calc(100% + 20px)'
    };

    this.rmTimer = this.rmTimer.bind(this);
    this.tick = this.tick.bind(this);
    this.stopTick = this.stopTick.bind(this);
    this.stopBtnClick = this.stopBtnClick.bind(this);
  }

  public render() {
    const { currentTime, enabledControlBtns } = this.state;
    const timeBtns = this.createTimeBtns();

    return (
      <div className="d-flex flex-column align-items-center m-auto pt-5">
        <Screen>{ currentTime }</Screen>
        <div className="d-flex flex-column align-items-center">
          <div className="mt-2 d-flex align-items-center position-relative">
            { timeBtns }

            <div style={this.timerSetupStyles}>
              <TimerSetup onChange={this.rmTimer} timers={this.state.timers}/>
            </div>
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
              onClick={this.stopBtnClick}>
                Стоп
            </TimerButton>
          </div>
        </div>
    </div>);
  }

  private rmTimer(ev: any) {
    const target = ev.value;
    let { timers } = this.state;
    timers = timers.filter(timer => timer !== target);
    this.setState({
      timers: timers
    });
  }

  private createTimeBtns() {
    const {
      activeBtnID,
      timers,
    } = this.state;

    return timers.map((time, index) =>
        <TimerButton
          className={'mr-2' + (index === activeBtnID ? ' active' : '')}
          id={`btn-${index}`}
          onClick={this.setTime.bind(this, time)}
          key={index}>
            {time}
          </TimerButton>
    );
  }

  private setTime(timeHTML: string, ev: any) {
    const activeID: number = Timer.getIDNumber(ev.target);
    const time = parseInt(timeHTML);
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

  private tick() {
    this.setState({
      enabledControlBtns: [this.stopBtnID],
    });

    let time = this.state.currentTime;
    const updateTimeState = () => {
      --time;

      this.setState({
        currentTime: time,
      });
    };
    updateTimeState();

    this.currentTimerIntervalID = setInterval(() => {
      time === 0 ? this.timeout() : updateTimeState();
    }, 1000);
  }

  private timeout() {
    this.setState({
      activeBtnID: -1,
      enabledControlBtns: [],
    });
    this.stopTick();
  }

  private stopTick() {
    clearInterval(this.currentTimerIntervalID);
  }

  private stopBtnClick() {
    this.stopTick();
    this.setState({
      enabledControlBtns: [this.startBtnID],
    });
  }
}

export default Timer;
