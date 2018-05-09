import React, { Component } from 'react';
import humanInterval from 'human-interval';
import Widget from '../../components/Widget';
import './styles.css';

class Countdown extends Component {
  state = {
    days: null,
    hours: null,
    minutes: null,
    seconds: null
  }

  updateTimeRemaining() {
    const { date } = this.props;

    const t = Date.parse(date) - Date.parse(new Date());
    const seconds = Math.floor( (t / 1000) % 60 );
    const minutes = Math.floor( (t / 1000 /60) % 60 );
    const hours = Math.floor( (t / (1000 * 60 * 60)) % 24 );
    const days = Math.floor( t / (1000 * 60 * 60 * 24) );
  
    this.setState({
      days,
      hours,
      minutes,
      seconds
    });
  }

  componentWillMount() {
    this.updateTimeRemaining();
  }

  componentDidMount() {
    setInterval(this.updateTimeRemaining.bind(this), humanInterval('one second'));
  }

  render() {
    const { days, hours, minutes, seconds } = this.state;
    const { title } = this.props;

    return (
      <Widget col="1" title={title}>
        <div className="countdown">
          <div className="countdown-block">
            <span className="days">{days}</span>
            <div className="countdown-text">Days</div>
          </div>
          <div className="countdown-block">
            <span className="hours">{hours}</span>
            <div className="countdown-text">Hours</div>
          </div>
          <div className="countdown-block">
            <span className="minutes">{minutes}</span>
            <div className="countdown-text">Minutes</div>
          </div>
          <div className="countdown-block">
            <span className="seconds">{seconds}</span>
            <div className="countdown-text">Seconds</div>
          </div>
        </div>
      </Widget>
    );
  }
}

export default Countdown;
