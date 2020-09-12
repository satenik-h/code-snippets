import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function twoDigits(val) {
  if (val.toString().length <= 1) {
    return '0' + val.toString();
  }

  return val.toString();
}

class CountDownTimer extends React.Component {
  constructor(props) {
    super(props);

    let now = moment();

    this.state = ({
      days: twoDigits(this.props.goalTime.diff(now, 'days')),
      hours: twoDigits(this.props.goalTime.diff(now, 'hours') % 60),
      minutes: twoDigits(this.props.goalTime.diff(now, 'minutes') % 60),
      secs: twoDigits(this.props.goalTime.diff(now, 'seconds') % 60)
    });
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      let now = moment();

      this.setState({
        days: twoDigits(this.props.goalTime.diff(now, 'days')),
        hours: twoDigits(this.props.goalTime.diff(now, 'hours') % 60),
        minutes: twoDigits(this.props.goalTime.diff(now, 'minutes') % 60),
        secs: twoDigits(this.props.goalTime.diff(now, 'seconds') % 60)
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className={"countdown-timer " + this.props.className} style={this.props.style ? this.props.style : {}}>
        <div className="counter-field">
          <span className="counter-digits">{this.state.days}</span>
          <span className="counter-label">DAYS</span>
        </div>
        <div className="counter-field">
          <span className="counter-digits">:</span>
        </div>
        <div className="counter-field">
          <span className="counter-digits">{this.state.hours}</span>
          <span className="counter-label">HOURS</span>
        </div>
        <div className="counter-field">
          <span className="counter-digits">:</span>
        </div>
        <div className="counter-field">
          <span className="counter-digits">{this.state.minutes}</span>
          <span className="counter-label">MINUTES</span>
        </div>
        <div className="counter-field">
          <span className="counter-digits">:</span>
        </div>
        <div className="counter-field">
          <span className="counter-digits">{this.state.secs}</span>
          <span className="counter-label">SECONDS</span>
        </div>
      </div>
    );
  }
}

CountDownTimer.propTypes = {
  goalTime: PropTypes.object.isRequired,
  className: PropTypes.string,
  style: PropTypes.object
};

export default CountDownTimer;
