import React from "react";
import PropTypes from "prop-types";
import ReactCalendar from "react-calendar/dist/entry.nostyle";
import moment from "moment";
import "./reactCalendar.css";

export default class MojoCalendar extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    minDate: PropTypes.object,
    calendarZIndex: PropTypes.number,
  };

  static defaultProps = {
    minDate: new Date(),
    calendarZIndex: 2,
  };

  state = {
    date: new Date(),
    activeDateMonth: moment(new Date()).month(),
    showCalendar: false,
  };

  constructor(props) {
    super(props);
    this.calendarWrapperRef = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    const propDate = moment(props.minDate);
    const stateDate = moment(state.date);

    if (stateDate.isBefore(propDate)) {
      return {
        date: props.minDate,
      };
    }

    return null;
  }

  componentDidMount() {
    document.addEventListener("click", this.onComponentClick);
  }


  componentWillUnmount() {
    document.removeEventListener("click", this.onComponentClick);
  }

  onChange = date => {
    this.setState({ date, showCalendar: false });
    this.props.onChange(date);
  };

  onActiveDateChange = ({ activeStartDate }) => this.setState({ activeDateMonth: moment(activeStartDate).month() });

  onComponentClick = (evt) => {
    if (!!this.calendarWrapperRef && !this.calendarWrapperRef.current.contains(evt.target)) {
      this.setState({
        showCalendar: false,
      });
    }
  };


  render() {
    const currentMonth = moment(new Date()).month();
    const prevDisabled = this.state.activeDateMonth <= currentMonth;

    return (
      <div ref={this.calendarWrapperRef} style={{ position: "relative"}}>
        <input
          type="text"
          className="calendar-input"
          value={moment(this.state.date).format("MMM DD, YYYY")}
          onFocus={() => { this.setState({ showCalendar: true })}}
          // onBlur={() => this.setState({ showCalendar: false })}
        />
        <div style={{ zIndex: this.props.calendarZIndex, position: "absolute", visibility: !this.state.showCalendar ? "hidden" : "visible" }}>
          <ReactCalendar
            onChange={this.onChange}
            value={this.state.date}
            minDate={this.props.minDate}
            minDetail={"month"}
            nextLabel={<Next />}
            nextAriaLabel={"Next month"}
            prevLabel={<Prev disabled={prevDisabled} />}
            prevAriaLabel={"Previous month"}
            selectRange={false}
            formatShortWeekday={(locale, date) =>
              moment(date)
                .format("dd")
                .split("")[0]
            }
            onActiveDateChange={this.onActiveDateChange}
          />
        </div>
      </div>
    );
  }
}

const Next = props => {
  let color = "#AAB0D8";
  if (props.disabled) {
    color = "#E1E2E8";
  }

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21.1716 9.1715L14.1005 2.10043C13.3195 1.31939 12.0531 1.31939 11.2721 2.10043C10.491 2.88148 10.491 4.14781 11.2721 4.92886L16.3431 9.99993H2C0.895432 9.99993 0 10.8954 0 11.9999C0 13.1045 0.89543 13.9999 2 13.9999H16.3431L11.2721 19.071C10.491 19.852 10.491 21.1184 11.2721 21.8994C12.0531 22.6805 13.3195 22.6805 14.1005 21.8994L21.1716 14.8284L24 11.9999L21.1716 9.1715Z"
        fill={color}
      />
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="1" width="24" height="22">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M21.1716 9.1715L14.1005 2.10043C13.3195 1.31939 12.0531 1.31939 11.2721 2.10043C10.491 2.88148 10.491 4.14781 11.2721 4.92886L16.3431 9.99993H2C0.895432 9.99993 0 10.8954 0 11.9999C0 13.1045 0.89543 13.9999 2 13.9999H16.3431L11.2721 19.071C10.491 19.852 10.491 21.1184 11.2721 21.8994C12.0531 22.6805 13.3195 22.6805 14.1005 21.8994L21.1716 14.8284L24 11.9999L21.1716 9.1715Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0)"></g>
    </svg>
  );
};

const Prev = props => {
  let color = "#AAB0D8";
  if (props.disabled) {
    color = "#E1E2E8";
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.82843 9.1715L9.8995 2.10043C10.6805 1.31939 11.9469 1.31939 12.7279 2.10043C13.509 2.88148 13.509 4.14781 12.7279 4.92886L7.65685 9.99993H22C23.1046 9.99993 24 10.8954 24 11.9999C24 13.1045 23.1046 13.9999 22 13.9999H7.65685L12.7279 19.071C13.509 19.852 13.509 21.1184 12.7279 21.8994C11.9469 22.6805 10.6805 22.6805 9.8995 21.8994L2.82843 14.8284L0 11.9999L2.82843 9.1715Z"
        fill={color}
      />
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="1" width="24" height="22">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2.82843 9.1715L9.8995 2.10043C10.6805 1.31939 11.9469 1.31939 12.7279 2.10043C13.509 2.88148 13.509 4.14781 12.7279 4.92886L7.65685 9.99993H22C23.1046 9.99993 24 10.8954 24 11.9999C24 13.1045 23.1046 13.9999 22 13.9999H7.65685L12.7279 19.071C13.509 19.852 13.509 21.1184 12.7279 21.8994C11.9469 22.6805 10.6805 22.6805 9.8995 21.8994L2.82843 14.8284L0 11.9999L2.82843 9.1715Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0)"></g>
    </svg>
  );
};
