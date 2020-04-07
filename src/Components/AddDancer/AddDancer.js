import React from "react";
import "./AddDancer.css"

class AddDancer extends React.Component {
    render() {
        const display = {
            display: "none"
        }
        const none = {};
        return (
            <div className="addDancer">
                <h1>Add Dancer</h1>
            <form className="dancerInfo" onSubmit={this.props.handleFormSubmit}>
            <input id="name" type="text" name="name" placeholder="Dancer Name:" value={this.props.newName} onChange={this.props.handleInputChange} />
            <input id="score1" type="number" min="0" max="10" name="score1" placeholder="Score 1" value={this.props.newScore1} onChange={this.props.handleInputChange} />
            <input id="score2" type="number" min="0" max="10" name="score2" placeholder="Score 2" value={this.props.newScore2} onChange={this.props.handleInputChange} />
            <input id="score3" type="number" min="0" max="10" name="score3" placeholder="Score 3" value={this.props.newScore3} onChange={this.props.handleInputChange} />
            <input id="score4" type="number" min="0" max="10" name="score4" placeholder="Score 4" style={this.props.addJudges ? none : display} value={this.props.newScore4} onChange={this.props.handleInputChange} />
            <input id="score5" type="number" min="0" max="10" name="score5" placeholder="Score 5" style={this.props.addJudges ? none : display} value={this.props.newScore5} onChange={this.props.handleInputChange} />
            <div className="createButtons">
            <button type="submit" value="Submit" className="new-button">Add</button>
            </div>
        </form>
        </div>
        )
    }
}
export default AddDancer;