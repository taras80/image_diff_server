import * as React from "react";
import connector from "../helper/connector";

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            jobName: props.jobName,
            progress: props.progress,
            maxPixDiff: props.maxPixDiff,
            lastJobFinished: props.lastJobFinished
        };
    }

    render() {
        return (
            <div className="header">
                <title> ICS </title>
                <div className="headerJobInfo">
                    <table>
                        <tr>
                            <td>Job: {this.state.jobName}</td>
                            <td>Max Pix. Difference: {this.state.maxPixDiff}</td>
                        </tr>
                        <tr>
                            <td>Progress: {this.state.progress}</td>
                            <td>Last Job Finished: {this.state.lastJobFinished}</td>
                        </tr>
                    </table>

                </div>
                <div className="headerCTAContainer">
                    <button onClick={() => connector.checkAll(function () {
                        console.log('Yeah');
                    })}>Check all</button>
                </div>
            </div>
        );
    }
}

export default Header;