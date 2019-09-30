import React from "react";
import PropTypes from "prop-types";
import "./Checkbox.css";

export default class Checkbox extends React.Component {
  propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  onChange = (evt) => {
    this.props.onChange(evt.target.checked);
  };

  render() {
    return (
      <div>
        <input id="checkbox1" className="mojo-checkbox" type={"checkbox"} onChange={this.onChange}/>
        <label htmlFor={"checkbox1"} />
      </div>
    );
  }
}