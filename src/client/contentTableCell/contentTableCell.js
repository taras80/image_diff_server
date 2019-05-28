import * as React from "react";

class ContentTableCell extends React.Component {
    render() {
        return (
            <div className="footer">
                <span> Licence information: </span>
                <ul>
                    <li> The ajax loading icon was created via http://loading.io/ </li>
                    <li> All other icons are part of Font Awesome (https://fontawesome.com/). </li>
                </ul>
            </div>
        );
    }
}

export default ContentTableCell;