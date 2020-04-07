import React from "react";
import "./Top16.css";
import {Link} from "react-router-dom";

class Top16  extends React.Component {
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
        if (dancers.length === 16) {
            this.setState({ tieBreaker: false })
        } else if (dancers[15].totalScore === dancers[16].totalScore) {
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
                <h1 className="bold">{this.state.tieBreaker === true ? "Top 16 With Tiebreaker (check the list)" : "Top 16"}</h1>
                <h1>{dancers[0].name} vs {this.state.tieBreaker === true ? `${dancers[15].name} / ${dancers[16].name}` : dancers[15].name}</h1>
                <h1>{dancers[7].name} vs {dancers[8].name}</h1>
                <h1>{dancers[3].name} vs {dancers[12].name}</h1>
                <h1>{dancers[4].name} vs {dancers[11].name}</h1>
                <h1>{dancers[1].name} vs {dancers[14].name}</h1>
                <h1>{dancers[6].name} vs {dancers[9].name}</h1>
                <h1>{dancers[2].name} vs {dancers[13].name}</h1>
                <h1>{dancers[5].name} vs {dancers[10].name}</h1>
                </div>
                <div className="resultList">
                <ol>
                {dancers.map((dancer, index) => {
                    return (
                        <li style={index > 15 ? red : none} key={index}>{dancer.name} - {dancer.totalScore}</li>
                    )
                })}
            </ol>
                </div></div>
                <Link to={{ pathname: "/add"}} ><button className="close-top-button">Close</button></Link>
            </div>
        )
    }
};
export default Top16;