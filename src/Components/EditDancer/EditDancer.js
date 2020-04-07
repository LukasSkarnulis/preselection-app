import React from "react";
import "./EditDancer.css";
import {Link} from "react-router-dom";

class EditDancer extends React.Component {
    render() { 
        const dancers = this.props.dancers;
        const index = this.props.location.state.prodIndex;
        const display = {
            display: "none"
        }
        const none = {};
        return (
            <div>
                <h1>Edit {dancers[index].name}</h1>
            <form className="editForm" onSubmit={(e) => this.props.handleEditFormSubmit(index, e)} >
            <input id="editname" type="text" name="name" placeholder={`Name: ${dancers[index].name}`} value={this.props.editName} onChange={this.props.handleInputChange} />
            <input id="editscore1" type="number" min="0" max="10" name="score1" placeholder={`Score 1: ${dancers[index].score1}`} value={this.props.editScore1} onChange={this.props.handleInputChange} />
            <input id="editscore2" type="number" min="0" max="10" name="score2" placeholder={`Score 2: ${dancers[index].score2}`} value={this.props.editScore2} onChange={this.props.handleInputChange} />
            <input id="editscore3" type="number" min="0" max="10" name="score3" placeholder={`Score 3: ${dancers[index].score3}`} value={this.props.editScore3} onChange={this.props.handleInputChange} />
            <input id="editscore4" type="number" min="0" max="10" name="score4" style={this.props.addJudges ? none : display} placeholder={`Score 4: ${dancers[index].score4}`} value={this.props.editScore4} onChange={this.props.handleInputChange} />
            <input id="editscore5" type="number" min="0" max="10" name="score5" style={this.props.addJudges ? none : display} placeholder={`Score 5: ${dancers[index].score5}`} value={this.props.editScore5} onChange={this.props.handleInputChange} />
            <div className="editButtons">
            <button className="edit-save-button" type="submit" value="Submit">Save</button>
            <Link to={{ pathname: "/add"}} ><button className="close-edit-button">Close</button></Link>
            </div>
        </form>
            </div>
        )
    }
};
export default EditDancer;
