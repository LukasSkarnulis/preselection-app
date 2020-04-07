import React from "react";
import {Redirect} from "react-router-dom";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false }
    }
componentDidCatch(error) {
    this.setState({ hasError: true });
    console.log(error);
}
render() {
    if (this.state.hasError) {
        return <Redirect to="/" />
    } return this.props.children;
}
}
export default ErrorBoundary;