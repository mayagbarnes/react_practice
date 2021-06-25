import React from "react";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerId: 0,
      status: "inactive",
      display: {
        h: 0,
        m: 0,
        s: 0
      },
      entry: {
        h: 0,
        m: 0,
        s: 0
      }
    };
    this.setHours = this.setHours.bind(this);
    this.setMinutes = this.setMinutes.bind(this);
    this.setSeconds = this.setSeconds.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.deductSec = this.deductSec.bind(this);
    this.endTimer = this.endTimer.bind(this);
  }

  endTimer() {
    clearInterval(this.state.timerId);
    this.setState({
      status: "inactive",
      display: {
        h: 0,
        m: 0,
        s: 0
      }
    });
  }

  startTimer() {
    this.setState(
      {
        display: {
          h: this.state.entry.h || 0,
          m: this.state.entry.m || 0,
          s: this.state.entry.s || 0
        }
      },
      () => {
        clearInterval(this.state.timerId);
        let id = setInterval(this.deductSec, 1000);
        this.setState({ timerId: id });
      }
    );

    this.setState({
      status: "active",
      entry: {
        h: 0,
        m: 0,
        s: 0
      }
    });
  }

  deductSec() {
    let sec = this.state.display.s - 1;
    let min = this.state.display.m;
    let hr = this.state.display.h;

    if (sec === -1) {
      if (min > 0) {
        min -= 1;
        sec = 59;
      } else if (hr > 0) {
        hr -= 1;
        min = 59;
        sec = 59;
      } else {
        sec = 0;
        min = 0;
        hr = 0;
        this.setState({ status: "inactive" });
        clearInterval(this.state.timerId);
      }
    }
    this.setState({
      display: {
        h: hr,
        m: min,
        s: sec
      }
    });
  }

  setHours(e) {
    this.setState({ entry: { h: e.currentTarget.value } });
  }

  setMinutes(e) {
    this.setState({ entry: { m: e.currentTarget.value } });
  }

  setSeconds(e) {
    this.setState({ entry: { s: e.currentTarget.value } });
  }

  render() {
    let display;
    let sec = this.state.display.s;
    let min = this.state.display.m;
    let hr = this.state.display.h;
    let active = this.state.status === "active";
    let zero = sec === 0 && min === 0 && hr === 0;

    if (active && zero) {
      display = <h2>Times Up!</h2>;
    } else if (active) {
      display = (
        <h2>
          {hr} Hours : {min} Minutes : {sec} Seconds
        </h2>
      );
    }

    return (
      <div>
        <h1>Timer</h1>
        {display}
        <div>
          <label>
            {" "}
            Hours:
            <input
              type="number"
              onChange={this.setHours}
              value={this.state.entry.h}
            />
          </label>
          <br />
          <label>
            {" "}
            Minutes:
            <input
              type="number"
              onChange={this.setMinutes}
              value={this.state.entry.m}
            />
          </label>
          <br />
          <label>
            Seconds:
            <input
              type="number"
              onChange={this.setSeconds}
              value={this.state.entry.s}
            />
          </label>
          <br />
          <button onClick={this.startTimer}>Start Timer</button>
          <br />
          <button onClick={this.endTimer}>Clear Timer</button>
        </div>
      </div>
    );
  }
}

export default Timer;
