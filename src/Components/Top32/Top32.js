import React from "react";
import "./Top32.css";
import {Link} from "react-router-dom";

class Top32  extends React.Component {
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
        if (dancers.length === 32) {
            this.setState({ tieBreaker: false })
        } else if (dancers[31].totalScore === dancers[32].totalScore) {
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
                <h1 className="bold">{this.state.tieBreaker === true ? "Top 32 With Tiebreaker (check the list)" : "Top 32"}</h1>
                <h1>{dancers[0].name} vs {this.state.tieBreaker === true ? `${dancers[31].name} / ${dancers[32].name}` : dancers[31].name}</h1>
                <h1>{dancers[15].name} vs {dancers[16].name}</h1>
                <h1>{dancers[7].name} vs {dancers[24].name}</h1>
                <h1>{dancers[8].name} vs {dancers[23].name}</h1>
                <h1>{dancers[3].name} vs {dancers[28].name}</h1>
                <h1>{dancers[12].name} vs {dancers[19].name}</h1>
                <h1>{dancers[4].name} vs {dancers[27].name}</h1>
                <h1>{dancers[11].name} vs {dancers[20].name}</h1>
                <h1>{dancers[1].name} vs {dancers[30].name}</h1>
                <h1>{dancers[14].name} vs {dancers[17].name}</h1>
                <h1>{dancers[6].name} vs {dancers[25].name}</h1>
                <h1>{dancers[9].name} vs {dancers[22].name}</h1>
                <h1>{dancers[2].name} vs {dancers[29].name}</h1>
                <h1>{dancers[13].name} vs {dancers[18].name}</h1>
                <h1>{dancers[5].name} vs {dancers[26].name}</h1>
                <h1>{dancers[10].name} vs {dancers[21].name}</h1>
                </div>
                <div className="resultList">
                <ol>
                {dancers.map((dancer, index) => {
                    return (
                        <li style={index > 31 ? red : none} key={index}>{dancer.name} - {dancer.totalScore}</li>
                    )
                })}
            </ol>
                </div>
            </div>
            <Link to={{ pathname: "/add"}} ><button className="close-top-button">Close</button></Link></div>
        )
    }
};
export default Top32;