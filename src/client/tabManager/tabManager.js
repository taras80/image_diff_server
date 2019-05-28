import * as React from "react";
import ContentTable from "../contentTable/contentTable";

class TabManager extends React.Component {
    render() {
        return (
            <div className="tabManager">
                <ContentTable />
            </div>
        );
    }
}

export default TabManager;