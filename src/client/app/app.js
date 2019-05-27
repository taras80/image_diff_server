import * as React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";

class App extends React.Component {
    render() {

        return (
            <div className="app">
                <Header jobName="TestJob" lastJobFinished="10.10.10" maxPixDiff="100" progress="100%" />
                <Footer />
            </div>
        );
    }
}

export default App;