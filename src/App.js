import React from "react";
import TimeInput from "./TimeInput";
import MojoCalendar from "./Calendar";
import Checkbox from "./Checkbox";
import "./App.css";

export default class App extends React.Component {
  state = {
    startDate: new Date(),
    startTime: "",
    endDate: new Date(),
    endTime: "",
    allDay: false,
  };

  onChangeStartDate = date => this.setState({ startDate: date });
  onChangeEndDate = date => this.setState({ endDate: date });
  onChangeStartTime = time => this.setState({ startTime: time });
  onChangeEndTime = time => this.setState({ endTime: time });

  render() {
    return (
      <div className="App">
        <span>Calendar Example:</span>
        <div style={{ marginLeft: "5%", marginTop: "2%" }}>
          <MojoCalendar onChange={() => {}}/>
        </div>
        <br />
        <br />
        <span>Time Example:</span>
        <div style={{ marginLeft: "5%", marginTop: "2%" }}>
          <TimeInput onChange={() => {}}/>
        </div>
        <br /><br /><br/><br/>
        <h2>Complete example</h2>
        <div style={{ display: "flex", flex: 1, alignItems: "center", marginLeft: "3%"}}>
          <span className="App-span">Date & Time</span>
          <MojoCalendar onChange={this.onChangeStartDate}/>
          {
            !this.state.allDay && <div style={{ marginLeft: "1%"}}><TimeInput onChange={this.onChangeStartTime}/></div>
          }
          <span className="App-span-to">to</span>
          <MojoCalendar onChange={this.onChangeEndDate} minDate={this.state.startDate}/>
          {
            !this.state.allDay && <div style={{ marginLeft: "1%"}}><TimeInput onChange={this.onChangeEndTime}/></div>
          }
          <div style={{ display: "flex", flex: 1, alignItems: "center", marginLeft: "2%"}}>
            <Checkbox onChange={(value) => this.setState({allDay: value})}/>
            <span className={"App-span-allday"}>All Day</span>
          </div>
        </div>
      </div>
    );
  }
}
