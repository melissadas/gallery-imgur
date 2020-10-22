import React from "react";
import {
    Spinner

} from "react-bootstrap";

class Loader extends React.Component {
    render() {
        return (
            <Spinner animation="border" role="status">
                <span className="sr-only loading">Loading...</span>
            </Spinner>
        )
    }
}
export default Loader;
