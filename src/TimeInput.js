import React from "react";
import PropTypes from "prop-types";
import "./timeInput.css";

const TIME_REGEXP = /^(\d{1,2}:?\d{2})\s?(am|AM|pm|PM|aM|Am|pM|Pm)?$/;

export default class TimeInput extends React.Component {
  propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  state = {
    value: "",
    lastValidValue: "",
    valid: true,
  };

  onChange = (evt) => {
    evt.preventDefault();
    const {value} = evt.target;
    const valid = TIME_REGEXP.test(value);
    this.setState({
      value,
      valid,
    });

    if(valid) {
      this.props.onChange(value);
    }
  };

  formatTime = (evt) => {
    evt.preventDefault();
    if (this.state.valid) {
      const value = formatTime(this.state.value);
      this.setState({
        value,
        lastValidValue: value,
      });
    } else {
      this.setState({
        value: this.state.lastValidValue,
        valid: true,
      });
    }
  };

  render() {
    const { valid, value } = this.state;

    let displayTime = value;

    return(
      <div>
        <input type="text" className={`time-input ${!valid ? "invalid" : ""}`} value={displayTime} onChange={this.onChange} onBlur={this.formatTime}/>
      </div>
    );
  }
}

function formatTime(value) {
  if (!TIME_REGEXP.test(value)) {
    return value;
  }

  const parts = value.match(TIME_REGEXP);
  const hourAndMinutes = parts[1].replace(":", ""); //remove the : from the time if it exist.

  // Here comes the tricky part:
  // We need to get the last two digits for minutes and the first or two first for the hour.
  let hour = +hourAndMinutes.slice(0, -2);
  const minutes = +hourAndMinutes.slice(-2);

  const ampm = parts[2] || "am";
  if (hour < 13 && ampm.trim().toLowerCase() === "pm") {
    hour = hour + 12;
  }

  const dateToFormat = new Date();
  dateToFormat.setHours(+hour);
  dateToFormat.setMinutes(+minutes);


  return dateToFormat.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}