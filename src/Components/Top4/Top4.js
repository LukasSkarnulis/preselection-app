import React from "react";
import "./Top4.css";
import {Link} from "react-router-dom";
class Top4  extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tieBreaker: false
        }
    }
    componentDidMount() {
        {this.sortDancers()}
        {this.checkTieBreaker()}
    }
    sortDancers() {
        const dancers = this.props.dancers;
        dancers.sort((a, b) => parseFloat(b.totalScore) - parseFloat(a.totalScore));
    }
    checkTieBreaker() {
        const dancers = this.props.dancers;
        if (dancers.length === 4) {
            this.setState({ tieBreaker: false })
        } else if (dancers[3].totalScore === dancers[4].totalScore) {
            this.setState({ tieBreaker: true })
        }
    }
    render() {
        const dancers = this.props.dancers;
        const none = {};
        const red = {
            color: "red",
        }
        return (
            <div>
            <div className="wholeTop">
            <div className="results">
                {this.sortDancers()}
                <h1 className="bold">{this.state.tieBreaker === true ? "Top 4 With Tiebreaker (check the list)" : "Top 4"}</h1>
                <h1>{dancers[0].name} vs {this.state.tieBreaker === true ? `${dancers[3].name} / ${dancers[4].name}` : dancers[3].name}</h1>
                <h1>{dancers[1].name} vs {dancers[2].name}</h1>
                </div>
                <div className="resultList">
                <ol>
                {dancers.map((dancer, index) => {
                    return (
                        <li style={index > 3 ? red : none} key={index}>{dancer.name} - {dancer.totalScore}</li>
                    )
                })}
            </ol>
                </div></div>
                <Link to={{ pathname: "/add"}} ><button className="close-top-button">Close</button></Link></div>
        )
    }
};
export default Top4;